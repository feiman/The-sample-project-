<template>
  <div class="con-box">
    <!-- 头部 标签 -->
    <div class="con-win-tab" style="min-height:300px;"  v-loading="loading">
      <!-- 面板 -->
      <div class="panel-tab">
        <div class="win-panel">
          <div class="win-panel-box" v-for="item in tableData.list">
              <div class="win-panel-box-img" @click="imgdlogshow(item)" v-if="item.resourceType == 0"><img :src="item.resourceUrl"></div>
              <div class="win-panel-box-img" @click="videodlogshow(item)" v-else><img :src="item.thumbnail"><span :style="isVideo"></span> </div>
              <!-- <i class="icon iconfont icon-play replay"></i>  -->
              <div class="win-panel-box-describe">
                  <p class="text-over">{{item.resourceName}}</p>
                  <p>分辨率：<span class="win-gray">{{item.resolution|resolutionFe}}</span></p>
                  <p>大小：<span class="win-gray">{{item.size|filterfilesize}}</span></p>
                  <p>上传时间：<span class="win-gray">{{item.createTime|datetimeFommater}}</span></p>
              </div>
          </div>
        </div>
         <div class="clisclose win-gray" v-if="!tableData.list.length">
            暂无素材
          </div>
      </div>
        <!-- 分页 -->
        <div class="con-win-page">
          <div class="win-page-left">本页共{{tableData.size?tableData.size:0}}条 共{{tableData.pages?tableData.pages:0}}页</div>
          <el-pagination class="win-page" background layout="prev, pager, next" @current-change="hanldPage" :total="tableData.total" :current-page="pageNum" :page-size="setPageSize.block">
          </el-pagination>
        </div>
    </div>


    <msg-box2 :visible.sync="setEditShowTwo">
        <div slot="msgleft">
          <div>
              <div class="msgboxImgs">
                  <div class="msg-play itemImgplay">
                      <img :src="imgdloagdata.resourceUrl" style='width: auto;'>
                  </div>
              </div>
          </div>
        </div>
        <div slot="msgright">
          <div class="al-msg-right">
            <p>{{imgdloagdata.resourceName}}</p>
            <p>分辨率:{{imgdloagdata.resolution|resolutionFe}}</p>
            <p>大小：{{imgdloagdata.size|filterfilesize}}</p>
            <p>上传时间：</p>
            <p>{{imgdloagdata.createTime|datetimeFommater}}</p>
            <el-button type="danger" class="el-icon-download al-msg-right-btn" size="small" @click="download(imgdloagdata)">
             下载到本地</el-button>
          </div>
        </div>
    </msg-box2>

    <msg-box2 :visible.sync="setEditShowOne" @toPauseVideo="pauseVideo">
        <div slot="msgleft">
          <div>
              <div class="msgboxImgs">
                  <div class="itemImgplay" style="margin:15px auto;">
                      <video-player  class="video-player" :style="{width:playerOptions.width}"
                                    ref="videoPlayer"
                                    :options="playerOptions"
                                    :playsinline="true"
                                    >
                      </video-player>
                  </div>
              </div>
          </div>
        </div>
        <div slot="msgright">
          <div class="al-msg-right">
            <p>{{videodlogdata.resourceName}}</p>
            <p>分辨率:{{videodlogdata.resolution|resolutionFe}}</p>
            <p>大小：{{videodlogdata.size|filterfilesize}}</p>
            <p>上传时间：</p>
            <p>{{videodlogdata.createTime|datetimeFommater}}</p>
            <el-button type="danger" class="el-icon-download al-msg-right-btn" size="small" @click="download(videodlogdata)">下载到本地</el-button>
          </div>
        </div>
    </msg-box2>
  </div>
</template>

<script>
import {findonlinematerial} from './../../api/ProgramReleased';
import {mapGetters} from 'vuex';
import 'video.js/dist/video-js.css';
import { videoPlayer } from 'vue-video-player';
import {getfile} from './../../api/getinfo';

  export default {
    data(){
      return {
          dialogVisible: false,
          data:{
            pageNum:'',
            pageSize:'',
          },
          tableData:{
            pages:0,
            size:0,
            total:100,
            list:[]
          },
          pageNum:0,
          loading:false,
          setEditShowTwo:false,
          imgdloagdata:{},
          setEditShowOne:false,
          videodlogdata:{},
          playerOptions: {
            muted: false,
            languages: 'zh',
            width:'',
            height:'',
            sources: [{
              type: "application/x-mpegURL",
              src:''
            }],
            techOrder: ['html5'],
            autoplay: false,
            controls: true,
            poster:'',
          },
          isVideo:{
            background:'url('+require('../../../static/img/isVideo.png')+')'
          }
      }
    },
    components: { videoPlayer },
    computed: {...mapGetters(['setPageSize']),
      player() {
        return this.$refs.videoPlayer.player
      }
    },
    methods: {
      hanldPage(val){
         if (val==0) {return;}
         this.getdata(val);
      },
      pauseVideo(){
        this.player.pause();
      },
      getdata(val=1){
          this.set_get_param.set_param(this ,'page',val)
          this.loading=true;
          this.data.pageNum = val;
          this.data.pageSize = this.setPageSize.block;
         findonlinematerial(this.data).then((data) => {
           if (data.success) {
              this.tableData = data.data;
           }else{
             this.tableData.list = [];
             this.tableData.total=0;
           }
           this.loading=false;
         }).catch((err) =>this.loading=false);
      },
      imgdlogshow(item){
          this.imgdloagdata = item;
          this.setEditShowTwo = true;
      },
      videodlogshow(item){
          var resolution= item.resolution.split('*')
          this.playerOptions.width =Number(resolution[0]*1)+'px';
          this.playerOptions.height =Number(resolution[1]*1-200)+'px';
          this.playerOptions.poster = item.thumbnail
          this.playerOptions.sources[0].src = item.resourceUrl.split("?")[0] + '?avvod/m3u8/vb/1000k'

          this.videodlogdata = item;
          this.setEditShowOne = true;
      },
      download(data){
        var regImg = /\?imageMogr2\/rotate\/[\d][\d]*[\d]*[\d]*/;
        data.resourceUrl = data.resourceUrl.replace(regImg,'');
        var reg=/.jpg|.png|.mp4|.bmp|.jpeg|.gif|.tiff|.avi|.mp5|.mov|.3gp|.NAVI|.f4v|.MPEG|.MPG|.DAT/ig;
        if (reg.test(data.resourceName)) {
           if (data.resourceType == 0) {
            window.open(`${data.resourceUrl}?attname=${data.resourceName}`)
          }else{
            window.open(`${data.thumbnail}?attname=${data.resourceName}`)
          };
        }else{
          if (data.resourceType == 0) {
            window.open(`${data.resourceUrl}?attname=${data.resourceName}.${data.resourceFormat.split('/')[1]}`)
          }else{
            window.open(`${data.thumbnail}?attname=${data.resourceName}.${data.resourceFormat.split('/')[1]}`)
          };
        };
      }
    },
    mounted () {
        this.pageNum=Number(this.$route.query.page>0?this.$route.query.page:1);
        this.tableData.total = this.pageNum*2;
        this.getdata();
    }
  }
</script>

<style lang="scss" scoped>


.panel-tab{
  border-bottom: 1px solid #ddd;
}

.win-panel{
    width: calc(100% + 20px);
    padding-bottom:20px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    position: relative;
    left: -10px;
    -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        color: #333;

    .win-panel-box {
      width:calc(100% / 4 - 20px);
      height: 134px;
      border: 1px solid #dddddd;
      border-radius: 3px;
      margin:20px 10px 0 10px;
      padding: 14px;
      padding-right:0px; 

      @media (max-width:1366px){
        width:calc(100% / 3 - 20px);
        margin:20px 10px 0 10px;
      }
      >div{
        height: 100%;
        display: inline-block;
        vertical-align: text-top;
      }
      p{
        width: 100%;
        line-height:18px;
        margin-bottom:10px;
      }
      .win-panel-box-img{
        width: 140px;
        text-align: center;
        overflow:hidden;
        img{
          height:100%;
        }
        span{
          display: block;
          position: absolute;
          width: 32px;
          height: 32px;
          top: 50%;
          left: 50%;
          margin-top: -16px;
          margin-left: -16px;
          cursor: pointer;
        }
      }
      .win-panel-box-describe{
        padding-left:16px; 
        width: calc(100% - 16px - 140px);
        overflow: hidden;
        @media (max-width:1366px) {
          width: calc(100% - 140px - 16px);
          padding-left:0px;
          p{
              line-height: 22px;
              margin-bottom: 0px;
              padding-left:10px; 
          }
        }
      }
    }
  }
  
</style>