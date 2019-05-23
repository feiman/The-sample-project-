<template>
   <div id="wrapper">
        <div id="container">
            <!--头部，相册选择和格式选择-->

            <div id="uploader">
                <div class="queueList">
                    <div id="dndArea" class="placeholder">
                        <div id="filePicker"></div>
                        <p>或将素材拖到这里，单次最多可选10个</p>
                    </div>
                </div>
                <div class="statusBar" style="display:none;">
                    <div class="progress">
                        <span class="text">0%</span>
                        <span class="percentage"></span>
                    </div><div class="info"></div>
                    <div class="btns">
                        <div id="filePicker2"></div>
                        <div class="uploadBtn">开始上传</div>
                        <router-link to="MaterialList" class="uploadBtn333">返回素材列表</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import webUploader from "./image-upload/webuploader";
// require('./image-upload/webuploader.js')
// require('./image-upload/upload.js')
// import './image-upload/upload.js'
import * as qiniu from "qiniu-js";
import { findQniuToken } from "./../api/user";
import * as getinfo from "./../api/getinfo";
import { mapGetters } from "vuex";
import { addmymaterial } from "./../api/ProgramReleased";

export default {
  props: {
    materialGroupId: {
      default: null
    }
  },
  data() {
    return {
      qiniuToken: "",
      stupfile: []
    };
  },
  computed: { ...mapGetters(["userInfo"]) },
  methods: {
    gettoken() {
      findQniuToken({}).then(data => {
        this.qiniuToken = data.data.qiniuToken;
      });
    },
    getinfo(file) {
      var self = this;
      var exps = /(jpeg|png|jpg)/;
      // console.log(file)
      if (exps.test(file.ext)) {
        let senddata = {
          userId: this.userInfo.id,
          materialGroupId: this.materialGroupId,
          material: [
            {
              name: file.name,
              imagePath: file.urldataurl + "?imageMogr2/rotate/" + file.rotation,
              resolution: `${file._info.width}*${file._info.height}`,
              size: file.size,
              showTime: 6,
              playImg: "",
              remark: "图片",
              materialType: "0",
              materialFormat: file.type
            }
          ]
        };
        self.uploadmymaterial(senddata);
      } else {
        // file.datas
        // console.log(file.datas.avinfo)
        var avinfo =JSON.parse(file.datas.avinfo);
        // console.log(avinfo);
        let senddata = {
            userId: this.userInfo.id,
            materialGroupId: this.materialGroupId,
            material: [
              {
                name: file.name,
                imagePath: file.urldataurl,
                resolution: `${avinfo.streams[0].width}*${
                  avinfo.streams[0].height
                }`,
                size: file.size,
                showTime: avinfo.format.duration,
                playImg: `${file.urldataurl}?vframe/jpg/offset/2`,
                remark: "视频",
                materialType: "1",
                materialFormat: file.type
              }
            ]
          };
          self.uploadmymaterial(senddata);

        return;
        getinfo.getavinfo(file.rename).then(resdata => {
          let senddata = {
            userId: this.userInfo.id,
            materialGroupId: this.materialGroupId,
            material: [
              {
                name: file.name,
                imagePath: file.urldataurl,
                resolution: `${resdata.streams[0].width}*${
                  resdata.streams[0].height
                }`,
                size: file.size,
                showTime: resdata.format.duration,
                playImg: `${file.urldataurl}?vframe/jpg/offset/2`,
                remark: "视频",
                materialType: "1",
                materialFormat: file.type
              }
            ]
          };
          self.uploadmymaterial(senddata);
        });
      }
    },
    uploadmymaterial(data) {
      addmymaterial(data).then(res => {
        if (res.success) {
          this.$message({ type: "success", message: "上传素材成功" });
          // this.$router.push('MaterialList');
        } else {
          this.$message({ type: "success", message: "上传素材失败" });
        }
      });
    },
    upload() {
      const selsf = this;
      var $wrap = $("#uploader"),
        // 图片容器
        $queue = $('<ul class="filelist"></ul>').appendTo(
          $wrap.find(".queueList")
        ),
        // 状态栏，包括进度和控制按钮
        $statusBar = $wrap.find(".statusBar"),
        // 文件总体选择信息。
        $info = $statusBar.find(".info"),
        // 上传按钮
        $upload = $wrap.find(".uploadBtn"),
        // 没选择文件之前的内容。
        $placeHolder = $wrap.find(".placeholder"),
        $progress = $statusBar.find(".progress").hide(),
        // 添加的文件数量
        fileCount = 0,
        // 添加的文件总大小
        fileSize = 0,
        // 优化retina, 在retina下这个值是2
        ratio = window.devicePixelRatio || 1,
        // 缩略图大小
        thumbnailWidth = 110 * ratio,
        thumbnailHeight = 110 * ratio,
        // 可能有pedding, ready, uploading, confirm, done.
        state = "pedding",
        // 所有文件的进度信息，key为file id
        percentages = {},
        // 判断浏览器是否支持图片的base64
        isSupportBase64 = (function() {
          var data = new Image();
          var support = true;
          data.onload = data.onerror = function() {
            if (this.width != 1 || this.height != 1) {
              support = false;
            }
          };
          data.src =
            "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
          return support;
        })(),
        // 检测是否已经安装flash，检测flash的版本
        flashVersion = (function() {
          var version;

          try {
            version = navigator.plugins["Shockwave Flash"];
            version = version.description;
          } catch (ex) {
            try {
              version = new ActiveXObject(
                "ShockwaveFlash.ShockwaveFlash"
              ).GetVariable("$version");
            } catch (ex2) {
              version = "0.0";
            }
          }
          version = version.match(/\d+/g);
          return parseFloat(version[0] + "." + version[1], 10);
        })(),
        supportTransition = (function() {
          var s = document.createElement("p").style,
            r =
              "transition" in s ||
              "WebkitTransition" in s ||
              "MozTransition" in s ||
              "msTransition" in s ||
              "OTransition" in s;
          s = null;
          return r;
        })(),
        // webUploader实例
        uploader;

      if (!webUploader.Uploader.support("flash") && webUploader.browser.ie) {
        // flash 安装了但是版本过低。
        if (flashVersion) {
          (function(container) {
            window["expressinstallcallback"] = function(state) {
              switch (state) {
                case "Download.Cancelled":
                  alert("您取消了更新！");
                  break;

                case "Download.Failed":
                  alert("安装失败");
                  break;

                default:
                  alert("安装已成功，请刷新！");
                  break;
              }
              delete window["expressinstallcallback"];
            };

            var swf = "./expressInstall.swf";
            // insert flash object
            var html =
              '<object type="application/' +
              'x-shockwave-flash" data="' +
              swf +
              '" ';

            if (webUploader.browser.ie) {
              html += 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" ';
            }

            html +=
              'width="100%" height="100%" style="outline:0">' +
              '<param name="movie" value="' +
              swf +
              '" />' +
              '<param name="wmode" value="transparent" />' +
              '<param name="allowscriptaccess" value="always" />' +
              "</object>";

            container.html(html);
          })($wrap);

          // 压根就没有安转。
        } else {
          $wrap.html(
            '<a href="http://www.adobe.com/go/getflashplayer" target="_blank" border="0"><img alt="get flash player" src="http://www.adobe.com/macromedia/style_guide/images/160x41_Get_Flash_Player.jpg" /></a>'
          );
        }

        return;
      } else if (!webUploader.Uploader.support()) {
        alert("Web Uploader 不支持您的浏览器！");
        return;
      }

      // 实例化
      uploader = webUploader.create({
        pick: {
          id: "#filePicker",
          label: "点击选择素材"
        },
        formData: {
          uid: 123
        },
        dnd: "#dndArea",
        paste: "#uploader",
        swf: "../../dist/Uploader.swf",
        chunked: false,
        chunkSize: 512 * 1024,
        server: "/criussell/sell/show/upfile",
        // runtimeOrder: 'flash',

        // accept: {
        //     title: 'Images',
        //     extensions: 'gif,jpg,jpeg,bmp,png,video,avi,mp4',
        //     mimeTypes: 'image/*'
        // },

        // 禁掉全局的拖拽功能。这样不会出现图片拖进页面的时候，把图片打开。
        disableGlobalDnd: false,
        fileNumLimit: 300,
        fileSizeLimit: 200 * 1024 * 1024, // 200 M
        fileSingleSizeLimit: 50 * 1024 * 1024 // 50 M
      });

      // 拖拽时不接受 js, txt 文件。
      uploader.on("dndAccept", function(items) {
        var denied = false,
          len = items.length,
          i = 0,
          // 修改js类型
          unAllowed = "text/plain;application/javascript ";

        for (; i < len; i++) {
          // 如果在列表里面
          if (~unAllowed.indexOf(items[i].type)) {
            denied = true;
            break;
          }
        }

        return !denied;
      });

      uploader.on("dialogOpen", function() {
        console.log("here");
      });

      // uploader.on('filesQueued', function() {
      //     uploader.sort(function( a, b ) {
      //         if ( a.name < b.name )
      //           return -1;
      //         if ( a.name > b.name )
      //           return 1;
      //         return 0;
      //     });
      // });

      // 添加“添加文件”的按钮，
      // uploader.addButton({
      //   id: "#filePicker2",
      //   label: "继续添加"
      // });

      uploader.on("ready", function() {
        window.uploader = uploader;
      });

      // 当有文件添加进来时执行，负责view的创建
      function addFile(file) {
        console.log(file)
        var $li = $(
            '<li id="' +
              file.id +
              '">' +
              // '<p class="title">' +
              // file.name +
              // "</p>" +
              '<p class="imgWrap"></p>' +
              '<p class="progress"><span></span></p>' +
              '<p style="color: #000;position: absolute; bottom: -20px;left: 0px; z-index: 1000;text-align: left;width: 110px; overflow: hidden;text-overflow: ellipsis;word-wrap: initial;">'+file.name+'</p>'+
              "</li>"
          ),
          $btns = $(
            '<div class="file-panel">' +
              '<span class="cancel">删除</span>' +
              '<span class="rotateRight">向右旋转</span>' +
              '<span class="rotateLeft">向左旋转</span></div>'
          ).appendTo($li),
          $prgress = $li.find("p.progress span"),
          $wrap = $li.find("p.imgWrap"),
          $info = $('<p class="error"></p>'),
          showError = function(code) {
            switch (code) {
              case "exceed_size":
                text = "文件大小超出";
                break;

              case "interrupt":
                text = "上传暂停";
                break;

              default:
                text = "上传失败，请重试";
                break;
            }

            $info.text(text).appendTo($li);
          };

        if (file.getStatus() === "invalid") {
          showError(file.statusText);
        } else {
          // @todo lazyload
          $wrap.text("预览中");
          uploader.makeThumb(
            file,
            function(error, src) {
              var img;

              if (error) {
                // var imgDom=`<img src="./image-upload/playe.png"/>`
                img = $('<img src="static/img/playe.png">');
                $wrap.empty().append(img);
                // $wrap.text("视频不能预览");
                return;
              }
              if (isSupportBase64) {
                img = $('<img src="' + src + '">');
                $wrap.empty().append(img);
              } else {
                return;
                // $.ajax('../../server/preview.php', {
                //     method: 'POST',
                //     data: src,
                //     dataType:'json'
                // }).done(function( response ) {
                //     if (response.result) {
                //         img = $('<img src="'+response.result+'">');
                //         $wrap.empty().append( img );
                //     } else {
                //         $wrap.text("预览出错");
                //     }
                // });
              }
            },
            thumbnailWidth,
            thumbnailHeight
          );

          percentages[file.id] = [file.size, 0];
          file.rotation = 0;
        }

        file.on("statuschange", function(cur, prev) {
          if (prev === "progress") {
            $prgress.hide().width(0);
          } else if (prev === "queued") {
            $li.off("mouseenter mouseleave");
            $btns.remove();
          }

          // 成功
          if (cur === "error" || cur === "invalid") {
            console.log(file.statusText);
            showError(file.statusText);
            percentages[file.id][1] = 1;
          } else if (cur === "interrupt") {
            showError("interrupt");
          } else if (cur === "queued") {
            $info.remove();
            $prgress.css("display", "block");
            percentages[file.id][1] = 0;
          } else if (cur === "progress") {
            $info.remove();
            $prgress.css("display", "block");
          } else if (cur === "complete") {
            $prgress.hide().width(0);
            $li.append('<span class="success"></span>');
          }

          $li.removeClass("state-" + prev).addClass("state-" + cur);
        });

        $li.on("mouseenter", function() {
          $btns.stop().animate({ height: 30 });
        });

        $li.on("mouseleave", function() {
          $btns.stop().animate({ height: 0 });
        });

        $btns.on("click", "span", function() {
          var index = $(this).index(),
            deg;

          switch (index) {
            case 0:
              uploader.removeFile(file);
              return;

            case 1:
              file.rotation += 90;
              break;

            case 2:
              file.rotation -= 90;
              break;
          }

          if (supportTransition) {
            deg = "rotate(" + file.rotation + "deg)";
            $wrap.css({
              "-webkit-transform": deg,
              "-mos-transform": deg,
              "-o-transform": deg,
              transform: deg
            });
          } else {
            $wrap.css(
              "filter",
              "progid:DXImageTransform.Microsoft.BasicImage(rotation=" +
                ~~((file.rotation / 90) % 4 + 4) % 4 +
                ")"
            );
            // use jquery animate to rotation
            // $({
            //     rotation: rotation
            // }).animate({
            //     rotation: file.rotation
            // }, {
            //     easing: 'linear',
            //     step: function( now ) {
            //         now = now * Math.PI / 180;

            //         var cos = Math.cos( now ),
            //             sin = Math.sin( now );

            //         $wrap.css( 'filter', "progid:DXImageTransform.Microsoft.Matrix(M11=" + cos + ",M12=" + (-sin) + ",M21=" + sin + ",M22=" + cos + ",SizingMethod='auto expand')");
            //     }
            // });
          }
        });

        $li.appendTo($queue);
      }

      // 负责view的销毁
      function removeFile(file) {
        var $li = $("#" + file.id);

        delete percentages[file.id];
        updateTotalProgress();
        $li
          .off()
          .find(".file-panel")
          .off()
          .end()
          .remove();
      }

      function updateTotalProgress() {
        var loaded = 0,
          total = 0,
          spans = $progress.children(),
          percent;

        $.each(percentages, function(k, v) {
          total += v[0];
          loaded += v[0] * v[1];
        });

        percent = total ? loaded / total : 0;

        spans.eq(0).text(Math.round(percent * 100) + "%");
        spans.eq(1).css("width", Math.round(percent * 100) + "%");
        updateStatus();
      }

      function updateStatus() {
        var text = "",
          stats;

        if (state === "ready") {
          text =
            "选中" +
            fileCount +
            "个素材，共" +
            webUploader.formatSize(fileSize) +
            "。";
        } else if (state === "confirm") {
          stats = uploader.getStats();
          if (stats.uploadFailNum) {
            text =
              "已成功上传" +
              stats.successNum +
              "个素材，" +
              stats.uploadFailNum +
              '个素材上传失败，<a class="retry" href="#">重新上传</a>失败素材或<a class="ignore" href="#">忽略</a>';
          }
        } else {
          stats = uploader.getStats();
          text =
            "共" +
            fileCount +
            "个（" +
            webUploader.formatSize(fileSize) +
            "），已上传" +
            stats.successNum +
            "个";

          if (stats.uploadFailNum) {
            text += "，失败" + stats.uploadFailNum + "个";
          }
        }

        $info.html(text);
      }

      function setState(val) {
        var file, stats;

        if (val === state) {
          return;
        }

        $upload.removeClass("state-" + state);
        $upload.addClass("state-" + val);
        state = val;

        switch (state) {
          case "pedding":
            $placeHolder.removeClass("element-invisible");
            $queue.hide();
            $statusBar.addClass("element-invisible");
            uploader.refresh();
            break;

          case "ready":
            $placeHolder.addClass("element-invisible");
            $("#filePicker2").removeClass("element-invisible");
            $queue.show();
            $statusBar.removeClass("element-invisible");
            uploader.refresh();
            break;

          case "uploading":
            $("#filePicker2").addClass("element-invisible");
            $progress.show();
            $upload.text("暂停上传");
            break;

          case "paused":
            $progress.show();
            $upload.text("继续上传");
            break;

          case "confirm":
            $progress.hide();
            $("#filePicker2").removeClass("element-invisible");
            // $upload.text("");
            $upload.hide();
            $(".uploadBtn333").show();

            stats = uploader.getStats();
            if (stats.successNum && !stats.uploadFailNum) {
              setState("finish");
              return;
            }
            break;
          case "finish":
            stats = uploader.getStats();
            //    selsf.stupfile=uploader.getFiles('complete');

            if (stats.successNum) {
              // alert( '上传成功' );
            } else {
              // 没有成功的图片，重设
              state = "done";
              location.reload();
            }
            break;
        }

        updateStatus();
      }

      uploader.onUploadProgress = function(file, percentage) {
        var $li = $("#" + file.id),
          $percent = $li.find(".progress span");

        $percent.css("width", percentage * 100 + "%");
        percentages[file.id][1] = percentage;
        updateTotalProgress();
      };

      uploader.onFileQueued = function(file) {
        fileCount++;
        fileSize += file.size;

        if (fileCount === 1) {
          $placeHolder.addClass("element-invisible");
          $statusBar.show();
        }

        addFile(file);
        setState("ready");
        updateTotalProgress();
      };

      uploader.onFileDequeued = function(file) {
        fileCount--;
        fileSize -= file.size;

        if (!fileCount) {
          setState("pedding");
        }

        removeFile(file);
        updateTotalProgress();
      };

      uploader.on("all", function(type) {
        var stats;
        switch (type) {
          case "uploadFinished":
            setState("confirm");
            break;

          case "startUpload":
            setState("uploading");
            break;

          case "stopUpload":
            setState("paused");
            break;
        }
      });

      uploader.onError = function(code) {
        alert("Eroor: " + code);
      };

      $upload.on("click", function() {
        if (!selsf.materialGroupId) {
          selsf.$message({ type: "error", message: "请先选择一个素材分组" });
          return;
        }

        if ($(this).hasClass("disabled")) {
          return false;
        }

        if (state === "ready") {
          uploader.upload();
        } else if (state === "paused") {
          uploader.upload();
        } else if (state === "uploading") {
          uploader.stop();
        }
      });

      $info.on("click", ".retry", function() {
        uploader.retry();
      });

      $info.on("click", ".ignore", function() {
        alert("todo");
      });

      $upload.addClass("state-" + state);
      updateTotalProgress();

      uploader.on("uploadSuccess", function(file, res) {
        // console.log(res.data.url)
        if (res.data) {
          file.urldataurl = res.data.url;
          file.rename  = res.data.name;
          file.datas = res.data;
          // console.log(file)
          // selsf.stupfile.push(file)
          selsf.getinfo(file);

        }
      });
    }
  },
  watch: {
    // stupfile(val,oldval){
    // val.forEach((item, index) => {
    //     if (index+1>=oldval.length) {
    //     }
    // });
    // }
  },
  mounted() {
    this.upload();
  }
};
</script>

<style scoped lang="scss">
@import url("./image-upload/style.css");
</style>
