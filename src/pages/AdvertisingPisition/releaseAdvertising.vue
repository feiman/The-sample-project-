<template>
  <div class="con-box peakfire">
      <!-- 发布广告位 -->
    <el-form :model="ruleForm" size="small" :inline="true" :rules="rules" :show-message="false" ref="ruleForm" label-width="146px" class="demo-ruleForm">
      <div class="peakfire-main">
            <div>
                <!--     border-color: #f56c6c; -->
                <el-form-item label="广告机：" prop="deviceId">
                    <Select style="width:290px" v-model="ruleForm.deviceId" placeholder="" >
                        <Option v-for="item in device.list" :value="item.id" :key="item.id">{{ item.position+item.deviceName}}</Option>
                    </Select>
                </el-form-item>
                <el-form-item label="设备位于生活区类型：" prop="liveId">
                    <Select style="width:290px" placeholder="" v-model="ruleForm.liveId">
                        <Option v-for="item in LiveList" :value="item.liveId" :key="item.liveId">{{ item.name }}</Option>
                    </Select>
                </el-form-item><br/>
                <el-form-item label="搜索关键词：" prop="keywordId">
                    <Select style="width:290px" v-model="keywordId" placeholder="" multiple multiple-limit="5" id="select_keyid">
                        <Option v-for="item in wordList" :value="item.name" :key="item.name">{{ item.name }}</Option>
                    </Select>
                </el-form-item><br/>
                <el-form-item label="循环播价位：" prop="cyclePrice">
                    <div class="wid290px">
                        <el-input type="number" v-model="cyclePrice" @blur="cyclePrice = set_get_param.overFormat(null,null,cyclePrice*100);" auto-complete="off" class="peakfire-input"></el-input>
                        <span class="seec0404">&nbsp;元&nbsp;</span>&nbsp;
                        <span class="seco888">30次/6S/周</span>
                    </div>
                    <!-- <div class="peakfire_titp">
                        提醒：实际收益将在定价上扣除5%，为佣金和手续费
                    </div> -->
                </el-form-item>
                <el-form-item label="定时播价位：" prop="timePrice">
                    <div class="wid290px">
                        <el-input type="number" v-model="timePrice" @blur="timePrice = set_get_param.overFormat(null,null,timePrice*100);" auto-complete="off" class="peakfire-input"></el-input>
                        <span class="seec0404">&nbsp;元&nbsp;</span>&nbsp;
                        <span class="seco888">30次/6S/时</span>
                    </div>
                </el-form-item><br/>
                <el-form-item label="日期：" prop="startDate">
                    <div>
                        <!-- <el-date-picker style="width:290px"
                            type="daterange" size="small" v-model="startDate"
                            range-separator="-" auto-complete="off" value-format="yyyy-MM-dd"
                            start-placeholder="开始日期" :picker-options="pickerOptions"
                            end-placeholder="结束日期">
                        </el-date-picker> -->
                        <el-date-picker style="width:130px"
                            v-model="ruleForm.startDate" value-format="yyyy-MM-dd"
                            type="date"
                            placeholder="开始日期"
                            :picker-options="pickerOptions">
                        </el-date-picker>
                        &nbsp;到&nbsp;
                        <el-date-picker style="width:130px"
                            v-model="ruleForm.endDate" value-format="yyyy-MM-dd"
                            type="date"
                            placeholder="结束日期"
                            :picker-options="pickerOptions">
                        </el-date-picker>
                    </div>
                </el-form-item>
                <el-form-item label="出租时间段：" prop="startTime">
                    <div>
                        <el-time-picker is-range style="width:290px" id="seltime"
                             size="small" format="HH:00" v-model="startTime"
                            auto-complete="off" popper-class="resettime" value-format="HH:00"
                            start-placeholder="开始时间"
                            end-placeholder="结束时间" step="01:00"
                            placeholder="选择时间范围">
                        </el-time-picker>
                    </div>
                </el-form-item></br/>
                <el-form-item label="展示图：" prop="showImage">
                    <div style="overflow:hidden">
                      <ul class="fileShowList">
                        <li @mouseenter="showDioLog($event)" @mouseleave="hideDioLog($event)" v-for="(item,index) in filelist" v-dragging="{ item: item, list: filelist, group: 'color'}" :key=index>
                          <img :src="item.url" alt="">
                          <div class="dialogMake">
                            <span @click="removeFile($event)" :style="toDelete"></span>
                            <span @click="toRightRotateChange($event)" :style="toRightRotate"></span>
                            <span @click="toLeftRotateChange($event)" :style="toLeftRotate"></span>
                          </div>
                        </li>
                      </ul>
                       <el-upload id="showImageUpload"
                            action="/criussell/sell/show/upfile"
                            list-type="picture-card" :limit="5" :loading="true"
                            :on-success="handleSuccess" :file-list="filelist"
                            :accept="accept"
                            :on-preview="handlePictureCardPreview"
                            :before-upload="checkFileSize"
                            :show-file-list="false"
                            :on-remove="handleRemove">
                            <i class="el-icon-plus"></i>
                            </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl">
                        </el-dialog>
                    </div>
                    <div class="peakfire_titp">
                        提醒：最多上传展示图5张，格式jpg/png,单个图片大小不得超过1M,分辨率最小为600×600px
                    </div>
                </el-form-item></br/>
                <el-form-item label="简介：" prop="describes">
                    <div>
                        <el-input type="textarea" resize="none" :maxlength="100"
                        :rows="3" class="text_wid"  v-model="ruleForm.describes"
                        placeholder="请输入内容">
                        </el-input>
                    </div>
                    <div class="peakfire_titp" style="width:27.5%;">
                        提醒：此简介最多限定100字以内
                    </div>
                </el-form-item><br/>
                <el-form-item label="内容详情：" style="height:460px;" prop="introduce">
                        <!-- 加载编辑器的容器 -->
                            <script id="containerse" name="content" type="text/plain" style="min-height:406px;"></script> 
                </el-form-item><br/>
                <el-form-item label=" ">
                    <el-button type="primary" class="resizebtn" @click="submitForm('ruleForm')" :loading="loading">确 定</el-button>
                    <el-button size="medium" class="resizebtn" @click="$router.push('advertising')">取 消</el-button>
                </el-form-item>
            </div>
      </div>
    </el-form>
    
   </div>
</template>

<script>
import {
  addmyAdRelease,
  findLiveList,
  findKeywordList
} from "./../../api/AdvertisingPisition";
import { mapGetters } from "vuex";
import moment from "moment";

export default {
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() <= Date.now();
        }
      },
      dialogImageUrl: "",
      dialogVisible: false,
      keywordId: [],
      ruleForm: {
        deviceId: "",
        liveId: "",
        keywordId: "",
        cyclePrice: 0,
        timePrice: 0,
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
        showImage: "",
        describes: "",
        introduce: "",
        number: "",
        userId: ""
      },
      rules: {
        deviceId: [{ required: true, message: "请选择广告机" }],
        liveId: [{ required: true, message: "请选择生活区类型" }],
        keywordId: [{ required: true, message: "请选择关键字类型" }],
        cyclePrice: [{ required: true, message: "请输入循环播价位" }],
        timePrice: [{ required: true, message: "请输入定时播价位" }],
        startDate: [{ required: true, message: "请选择日期" }],
        startTime: [{ required: true, message: "请选择时间" }],
        showImage: [{ required: true, message: "请选择展示图" }],
        introduce: [{ required: true, message: "请输入内容详情" }],
        describes: [{ required: true, message: "请输入描述" }]
      },
      cyclePrice: 0,
      timePrice: 0,
      showImage: [],
      startDate: [],
      startTime: "",
      resArr: [],
      dirveList: [
        { value: "1", label: "商店门口" },
        { value: "2", label: "步行街" },
        { value: "3", label: "商业街" },
        { value: "4", label: "电梯口" }
      ],
      content: "请输入",
      defaultvalue: "00:00 - 23:59",
      LiveList: [],
      wordList: [],
      filelist: [] /**{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'} */,
      accept:"image/jpeg,image/png",
      loading: false,
      toLeftRotate:{
        background:'url('+require('../../../static/img/toLeft.png')+')',
        backgroundSize:"100% 100%"
      },
      toRightRotate:{
        background:'url('+require('../../../static/img/toRight.png')+')',
        backgroundSize:"100% 100%"
        
      },
      toDelete:{
        background:'url('+require('../../../static/img/toDelete.png')+')',
        backgroundSize:"100% 100%"
      }
    };
  },
  computed: {
    ...mapGetters(["device", "userInfo"])
  },
  watch: {
     filelist(val){
       console.log(val.length)
      //  图片张数 为5张时，隐藏加号框
       if (val.length > 4) {
         $("#showImageUpload").find('.el-upload--picture-card').hide();
       }else{
         $("#showImageUpload").find('.el-upload--picture-card').show();
       }
     }
  },
  mounted() {

    // console.log(this.userInfo.realStatus)
    if (this.userInfo.realStatus!=2) {
      this.$message({type:"warning",message:"温馨提示，请先商家认证后再进行广告位发布操作！"});
    }

    var peakfire_main_W = document.querySelector(".peakfire-main").offsetWidth;
    this.initdata();
    // console.log(peakfire_main_W);
    document.querySelector("#containerse").style.width = `${peakfire_main_W -
      200}px`;
    document.querySelector(".text_wid").style.width = `${peakfire_main_W -
      200}px`;
    var um = UM.getEditor("containerse");
  },
  methods: {
    showDioLog(e){
      $(e.currentTarget).find(".dialogMake").slideDown();
    },
    hideDioLog(e){
      $(e.currentTarget).find(".dialogMake").stop(true,true).slideUp();
    },
    removeFile(e){
      let removeIdx = $(e.currentTarget).parents("li").index();
      console.log(removeIdx);
      this.filelist.splice(removeIdx,1);
    },
    toRightRotateChange(e){
      let changeIdx = $(e.currentTarget).parents("li").index();
      let rotate = this.filelist[changeIdx].url.split("?imageMogr2/rotate/")[1] == undefined ? 0 : Number(this.filelist[changeIdx].url.split("?imageMogr2/rotate/")[1]);
      rotate += 90;
      this.filelist[changeIdx].url = this.filelist[changeIdx].url.split("?imageMogr2/rotate/")[0] + '?imageMogr2/rotate/' + rotate;
    },
    toLeftRotateChange(e){
      let changeIdx = $(e.currentTarget).parents("li").index();
      let rotate = this.filelist[changeIdx].url.split("?imageMogr2/rotate/")[1] == undefined ? 0 : Number(this.filelist[changeIdx].url.split("?imageMogr2/rotate/")[1]);
      rotate -= 90;
      this.filelist[changeIdx].url = this.filelist[changeIdx].url.split("?imageMogr2/rotate/")[0] + '?imageMogr2/rotate/' + rotate;
    },
    submitForm(formName) {

      if (this.userInfo.realStatus!=2) {
        this.$message({type:"warning",message:"温馨提示，请先商家认证后再进行广告位发布操作！"});
        return;
      }

      // console.log(UM.getEditor("containerse").getContent());
      var filelist = [];
      this.filelist.forEach((item, index) => {
        filelist.push(item.url);
      });
     
      // if (this.startDate) {
      //   this.ruleForm.startDate = this.startDate[0];
      //   this.ruleForm.endDate = this.startDate[1];
      // }

      if (this.startTime) {
        this.ruleForm.startTime = this.startTime[0];
        this.ruleForm.endTime = this.startTime[1];
      }

      this.ruleForm.showImage = String(filelist);
      this.ruleForm.introduce = UM.getEditor("containerse").getContent();

      this.ruleForm.timePrice = this.timePrice * 100;
      this.ruleForm.cyclePrice = this.cyclePrice * 100;

      this.ruleForm.keywordId = String(this.keywordId);
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.addadvertising();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleSuccess(response, file, fileList) {
      /* 上传成功后 */
      //   console.log(response, file, fileList)
      this.filelist.push({ name: response.data.name, url: response.data.url });
    },
    checkFileSize(file){
      const isLt1M = (file.size / 1024 / 1024 )<= 1;
      if(!isLt1M){
        this.$message({
          type: "error",
          message: "所选展示图最大为1M"
        });
      };
      const isSize = new Promise(function(resolve, reject) {
          let width = 600;
          let height = 600;
          let _URL = window.URL || window.webkitURL;
          let img = new Image();
          img.onload = function() {
              let valid = img.width >= width && img.height >= height;
              valid ? resolve() : reject();
          }
          img.src = _URL.createObjectURL(file);
      }).then(() => {
          return file;
      }, () => {
          this.$message.error('所选展示图最小分辨率为600×600px!');
          return Promise.reject();
      });
      return isLt1M && isSize
    },
    handleRemove(file, fileList) {
      alert(1);
      this.filelist = fileList
      if (fileList.length<5) {
         $("#showImageUpload").find('.el-upload--picture-card').show();
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    addadvertising() {
      this.loading = true;

      this.ruleForm.userId = this.userInfo.id;
      addmyAdRelease(this.ruleForm)
        .then(data => {
          if (data.success) {
            this.$message({
              type: "success",
              message: "提交成功，1秒后将返回广告位列表"
            });
            setTimeout(() => {
              this.$router.push("advertising");
            }, 1000);
          } else {
            this.$message({
              type: "error",
              message: data.msg
            });
          }
          this.loading = false;
        })
        .catch(err => (this.loading = false));
    },
    initdata() {
      /* 查询 生活区类型 */
      findLiveList().then(data => {
        if (data.success) {
          this.LiveList = data.data;
        }
      });

      /* 查询关键字 */
      findKeywordList().then(data => {
        if (data.success) {
          this.wordList = data.data;
        }
      });
    }
  },
  activated(){
    this.ruleForm = {
        deviceId: "",
        liveId: "",
        keywordId: "",
        cyclePrice: 0,
        timePrice: 0,
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
        showImage: "",
        describes: "",
        introduce: "",
        number: "",
        userId: ""
      };
      this.filelist=[];
      this.keywordId=[];
      this.cyclePrice=0;
      this.timePrice=0;
      this.startTime="";
      UM.getEditor("containerse").setContent("");
  }
};
</script>
<style lang="scss">
/* // 编辑器 */
.el-upload--picture-card {
    width: 120px;
    height: 120px;
    line-height: 120px;
}
.edui-container {
  box-shadow: none;
  #containerse {
    height: 406px !important;
    overflow-y: auto;
  }
  .edui-toolbar {
    box-shadow: none;
  }
}
.edui-editor-body{
  height: 406px !important;
}
.resettime {
  .el-time-spinner div:last-child {
    display: none !important;
  }
  .el-time-spinner div:nth-last-child(2) {
    display: none !important;
  }
}

#select_keyid .ivu-select-placeholder{
  display: block !important;
}
.el-upload-list--picture-card .el-upload-list__item {
    width: 120px;
    height: 120px;
}
.el-upload-list--picture-card li:nth-of-type(1)::before{
    content:"此图为主图";
    display: block;
    width: 100%;
    text-align: center;
    background: rgba(0,0,0,0.5);
    color: #fff;
    font-size: 12px;
}
</style>

<style lang="scss" scoped>
.peakfire_titp {
  margin-top: 20px;
  font-size: 12px;
  background: #f5f5f5;
  color: #888;
  padding: 0 20px;
  height: 26px;
  line-height: 26px;
  border-radius: 4px;
}

.peakfire {
  padding: 22px 22px;
  overflow: hidden;
}

.peakfire-main-title {
  height: 40px;
  line-height: 40px;
  background: #f5f5f5;
  padding-left: 24px;
  margin: 16px 0px;
}

.peakfire-input {
  width: 98px;
}

.peakfire-block {
  display: block;
}
.peakfire-upload {
  width: 118px;
  height: 148px;
  border: 1px solid #ddd;
  color: #ddd;
  text-align: center;
  display: inline-block;
  .editIccon {
    line-height: 148px;
    font-size: 30px;
  }
}

.wid290px {
  width: 290px;
}

.fileShowList{
  padding:0;
  margin:0;
  overflow: hidden;
  float: left;
  li{
    list-style:none;
    cursor: all-scroll;
    float: left;
    margin: 0 8px 8px 0;
    background-color: #fff;
    border: 1px solid #c0ccda;
    border-radius: 6px;
    width: 120px;
    height: 120px;
    overflow: hidden;
    position: relative;
    &:nth-of-type(1)::before{
      position: absolute;
      content:"此图为主图";
      display: block;
      width: 100%;
      text-align: center;
      background: rgba(0,0,0,0.5);
      color: #fff;
      font-size: 12px;
      bottom:0;
      line-height: 22px;
    }
    img{
      width:100%;
      height:100%;
    }
    .dialogMake{
      width:100%;
      height:30px;
      background:rgba(0,0,0,0.5);
      position: absolute;
      top:0;
      display:none;
      span{
        float: right;
        margin: 5px 0 5px 5px;
        display: block;
        color: #fff;
        width: 15px;
        height: 15px;
        margin-top: 7.5px;
        cursor: pointer;
        &:nth-of-type(1){
          margin-right:5px;
        }
      }
    }
  }
}
</style>
