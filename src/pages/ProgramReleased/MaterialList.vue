<template>
  <div class="con-box">
    <!-- 头部 标签 -->
    <div class="con-win-title">
      分组名称：
      <Select v-model="data.groupName" style="width:100px" class="con-maleft" placeholder="全部">
        <Option v-for="item in groupList" :value="item.groupName" :key="item.groupName">{{ item.groupName }}</Option>
      </Select>
      上传时间：
            <el-date-picker prefix-icon="el-icon-date" style="width:186px;" :default-time="'00:00:00'"
            type="datetime" size="small" v-model="data.stime" value-format="yyyy-MM-dd HH:mm:00"
            placeholder="选择日期时间" class="con-maright">
            </el-date-picker>到
            <el-date-picker prefix-icon="el-icon-date" class="con-maright" style="width:186px;" default-time="00:00:00"
            type="datetime" size="small" v-model="data.etime" value-format="yyyy-MM-dd HH:mm:00"
            placeholder="选择日期时间">
            </el-date-picker>
      <el-button size="small" type="primary" icon="el-icon-search" @click="getdata">搜索</el-button>

      <div class="con-win-title-right">
        <el-button size="small" type="primary" @click="toMaterialList_uploading">上传素材</el-button>
        <el-button size="small" type="primary" @click="delmaterial">删除</el-button>
      </div>
      
    </div>

    <div class="con-win-tab">
      <!-- 面板 -->
      <div class="panel-tab" v-loading="loading">
        <div class="win-panel">
          <div class="win-panel-box" v-for="(item,index) in tableData.list" :class="{resetBorder:item.isShowClass}">
              <div class="win-panel-box-img" @click="handlePictureCardPreview(item)">
                <img :src="item.playImg" v-if="item.materialType==1">
                <img :src="item.imagePath" v-else-if="item.materialType==0">
                <span v-if="item.materialType==1" :style="isVideo"></span>  
              </div>

              <div class="win-panel-box-describe" @click.stop="seClass(item.isShowClass,index)">
                  <p v-if="!item.isEditShow" @click.stop><span class="win-panel-boxtext" :title="item.editname">{{item.editname}}</span><i class="icon iconfont icon-pencil cursorpointer" @click.stop="item.isEditShow=true"></i></p>
                  <p v-else @click.stop class="con-input">
                    <input type="text" class="con-input-mini" v-model="item.name" @keyup.enter="editgroupName(item,index)">
                    <i class="el-icon-close resetColor con-input-slose" style='cursor:pointer;' @click.stop="item.isEditShow=false"></i>
                    <i class="el-icon-check resetColor" style='cursor:pointer;' @click.stop="editgroupName(item,index)"></i>
                  </p>
                  <p v-if="!item.editgroupshow" @click.stop><span class="win-panel-boxtext" :title="item.groupName">分组名称：{{item.groupName}}</span><i class="icon iconfont icon-pencil cursorpointer" @click.stop="item.editgroupshow=true"></i></p>
                  <p v-else @click.stop >分组名称：
                    <Select v-model="item.materialGroupId" size="small" style="width:50%;" placeholder="分组名称">
                      <Option v-for="list in groupList" :value="list.materialGroupId" :key="list.materialGroupId">{{ list.groupName }}</Option>
                    </Select>
                    <i class="el-icon-check resetColor" @click.stop="editmaterialGroupId(item,index)"></i>
                  </p>
                  <p>分辨率：<span class="win-gray">{{item.resolution|resolutionFe}}</span></p>
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
                      <img :src="imgdloagdata.imagePath">
                  </div>
              </div>
          </div>
        </div>
        <div slot="msgright">
          <div class="al-msg-right">
            <p>{{imgdloagdata.name}}</p>
            <p>分辨率:{{imgdloagdata.resolution|resolutionFe}}</p>
            <p>大小：{{imgdloagdata.size/1024*100|overFormat}}K</p>
            <p>上传时间：</p>
            <p>{{imgdloagdata.createTime|datetimeFommater}}</p>
            <!-- <el-button type="danger" class="el-icon-download al-msg-right-btn" size="small" @click="download(imgdloagdata)">
             下载到本地</el-button> -->
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
            <p>{{videodlogdata.name}}</p>
            <p>分辨率:{{videodlogdata.resolution|resolutionFe}}</p>
            <p>大小：{{videodlogdata.size/1024*100|overFormat}}K</p>
            <!-- |overFormat -->
            <p>上传时间：</p>
            <p>{{videodlogdata.createTime|datetimeFommater}}</p>
            <!-- <el-button type="danger" class="el-icon-download al-msg-right-btn" size="small" @click="download(videodlogdata)">下载到本地</el-button> -->
          </div>
        </div>
    </msg-box2>

  </div>
</template>

<script>
import {findmymaterial,findmaterialgroup,delmymaterial,updatemymaterial} from './../../api/ProgramReleased';
import {mapGetters} from 'vuex';
import 'video.js/dist/video-js.css';
import { videoPlayer } from 'vue-video-player';

  export default {
    data(){
      return {
        setEditShowOne:false,
        setEditShowTwo:false,
        imgdloagdata:{},
        playerOptions: {},
        videodlogdata:{},
          data:{
            pageNum:0,
            pageSize:'',
            userId:'',
            groupName:'',
            stime:'',
            etime:''
          },
          model1: '',
          groupList:[],
          group:0,
          Switch:'',
          tableData:{
            pages:0,
            size:0,
            total:10,
            list:[]
          },
          pageNum:0,
          dateTime:'',
          setEditShow:true,
          loading:false,
          isVideo:{
            background:'url('+require('../../../static/img/isVideo.png')+')'
          }
      }
    },
    components: { videoPlayer },
    computed: {
      ...mapGetters(['setPageSize','userInfo']),
      player() {
        return this.$refs.videoPlayer.player
      }
    },
    methods: {
      handlePictureCardPreview(item) {
        if (item.materialType==0) {
          this.imgdloagdata = item;
           this.setEditShowTwo = true;
        }else if (item.materialType==1) {
           this.videodlogdata=item;
           this.playerOptions={
            muted: false,
            languages: 'zh-cn',
            width:'800px',
            height:'500px',
            sources: [{
              type: "application/x-mpegURL",
              src:item.imagePath.split("?")[0] + '?avvod/m3u8/vb/1000k'
            }],
            techOrder: ['html5'],
            autoplay: false,
            controls: true,
            poster:item.playImg,
          }
          this.setEditShowOne=true;
        }
       
      },
      pauseVideo(){
        this.player.pause();
      },
      getfindmaterialgroup(){
        findmaterialgroup({userId:this.userInfo.id,groupName:'',pageNum:1,pageSize:1000}).then(data=>{
          if (data.success) {
            this.groupList=data.data.list;
          }
        });
      },
      hanldPage(val){
        if (val==0) {return;}
         this.getdata(val);
      },
      clear(event){
        console.log(event)
        console.log(123)
      },
      getdata(val=1){
          this.set_get_param.set_param(this ,'page',val)
          this.loading=true;
          this.data.pageNum = typeof this.$route.query.page === 'number'?this.$route.query.page:1;
          this.data.pageSize = this.setPageSize.block;
          this.data.userId = this.userInfo.id;
        if (this.data.groupName=='全部') {
          this.data.groupName="";
        }
        findmymaterial(this.data).then(data=>{
          if (data.success) {
            data.data.list.forEach((item, index) => {
              item.isEditShow=false;
              item.isShowClass=false;
              item.isShow=false;
              item.active = false;
              item.editgroupshow=false;
              item.editname=item.name;
              item.editmaterialGroupId = item.materialGroupId
            });
            this.tableData = data.data;
            
          }else{
            this.tableData.list = [];
            this.tableData.total=0;
          }
          this.loading=false
        }).catch((err) => this.loading=false)
      },
      toMaterialList_uploading(){
        // 上传素材
        this.$router.push('MaterialList_uploading');
      },
      seClass(isClass,index){
        this.tableData.list.forEach(item=>{item.isShowClass=false});
        this.tableData.list[index].isShowClass=!isClass;
      },
      delmaterial(){
          var arr=[];
          this.tableData.list.forEach(item=>{
            if (item.isShowClass){arr.push(item.materialId); };
          });
          if(!arr.length){
               if (this.tableData.list) {
                 this.$message({type:"warning",message:"抱歉，请先选择素材再进行删除操作！"});
               }else{
                 this.$message({type:"warning",message:"抱歉，没有可删除的数据！"});
               }
              // 抱歉，请先选择素材再进行删除操作！
              // 抱歉，没有可删除的数据!
          }else{
            this.$confirm('是否要继续删除选择的素材文件?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              delmymaterial({materialId:String(arr)}).then((data) => {
                  if (data.success) {
                      this.$message({type:'success',message:data.msg});
                      this.getdata();
                  }else{
                      this.$message({type:'error',message:data.msg});
                  };
              })
            }).catch(err=>{});
          }

      },
      editgroupName(item,index){
         this.tableData.list[index].isEditShow=false;
         this.updamaterial(item)
      },
      editmaterialGroupId(item,index){
          this.tableData.list[index].editgroupshow=false;
          this.updamaterial(item)
      },
      updamaterial({materialId,name,materialGroupId}){
        updatemymaterial({materialId,name,materialGroupId}).then(data=>{
          if (data.success) {
            this.getdata(this.$route.query.page);
          }
        });
      }
    },
    mounted () {
       this.pageNum=Number(this.$route.query.page>0?this.$route.query.page:1);
       this.tableData.total = this.pageNum*100;
       this.getdata();
       this.getfindmaterialgroup()
    }
  }
</script>

<style lang="scss" scoped>

.panel-tab{
  border-top: 1px solid #ddd;
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
      &:hover{
        border:1px solid #ff7c4c;
      }
      >div{
        height: 100%;
        display: inline-block;
        vertical-align: text-top;
      }
      p{
        width: 100%;
        line-height:18px;
        margin-bottom:8px;
      }
      .win-panel-box-img{
        width: 40%;
        overflow: hidden;
        text-align: center;
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
        width: 58%;
        .con-input-mini{
          padding-right:28px;
        }

        @media (max-width:1366px) {
          width: 55%;
          padding-left:0px;
          p{
              width: 106%;
              line-height: 22px;
              margin-bottom: 0px;
              padding-left:10px; 
          }
        }
      }
    }
  }
  
</style>