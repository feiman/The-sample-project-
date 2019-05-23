<template>
  <div class="con-box">
    <!-- 客户节目 -->
    <div class="con-win-title">
       节目名称：
      <el-input type="text" v-model="data.showName" class="con-maright" placeholder="请输入" size="small" style="width:140px;"></el-input>
      广告机：
        <Select v-model="data.deviceId" style="width:284px;" class="con-maright">
            <Option v-for="item in device.list" :value="item.id" :key="item.id">{{ item.position+item.deviceName }}</Option>
        </Select>
      播放日期：
            <el-date-picker prefix-icon="el-icon-date" style="width:186px;"
            type="datetime" size="small"v-model="data.stime" value-format="yyyy-MM-dd HH:mm:00" class="con-maright"
            placeholder="选择日期时间">
            </el-date-picker>到
            <el-date-picker prefix-icon="el-icon-date" style="width:186px;"
            type="datetime" size="small" v-model="data.etime" value-format="yyyy-MM-dd HH:mm:00" class="con-maright"
            placeholder="选择日期时间">
            </el-date-picker>
        状态：
        <Select v-model="data.status" style="width:90px" class="con-maleft" placeholder="全部">
            <Option v-for="item in SwitchList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      <el-button size="small" type="primary" icon="el-icon-search" @click="getdata">搜索</el-button>

    </div>

    <div class="con-win-tab" v-loading="loading">
      <!-- 面板 -->
      <div class="matelistbox">
        <div class="win-panel">
                <div class="win-panel-box" v-for="item in tableData.list">
                    <div class="win-panel-top" style="cursor: pointer;">
                        <div class="win-panel-box-img" @click="setEditShowPreview(item)">
                            <!-- <div class="win-panel-box-img-border" v-if="item.type == 0"><img src="static/img/defalt_bg.png" class="win-panel-box-img-falut"></div> -->
                            <template v-if="item.showimgsrc">
                              <img :src="item.showimgsrc">
                               <i class="icon iconfont icon-play replay"></i>
                            </template>
                        </div>
                        <div class="win-panel-box-describe" @click="toDetail(item)">
                            <p class="seColor">{{item.showName}}</p>
                            <p class="text-over" :title="item.position+item.deviceName">{{item.position+item.deviceName}}</p>
                            <p>图片：<span class="win-gray">{{item.image}}</span>
                                视频：<span class="win-gray">{{item.play}}</span>
                                 文本：<span class="win-gray">{{item.word}}</span>
                            </p>
                            <p>播放时长：<span class="win-gray">{{item.timelength}}'</span></p>
                            <p>播放日期：<span class="win-gray" v-if="item.ordertime.length">{{item.ordertime[0].startDate}}到{{item.ordertime[item.ordertime.length-1].endDate}}</span></p>
                        </div>
                     </div>
                     <div class="win-panel-bottom">
                        <span v-if="item.status==3"><i class="icon-con icon-con-daizhixin resCoGreen"></i> 待执行</span>
                        <span v-else-if="item.status==5"><i class="icon-con icon-con-zhixingzhon resCoGreen"></i> 执行中</span>
                        <span v-else-if="item.status==6||item.status==7"><i class="resizeicon el-icon-circle-check resCoGreen"></i> 已完成</span>
                        <!-- 3  待执行  5 执行中  6已完成 7已完成 -->

                        <span class="win-panel-box-right">
                          <a href="javascript:;" :class="{seColor:item.status==6||item.status==7}" @click="periviewTwo(item)">查看播放画面</a>
                          <a href="javascript:;" @click="ViewLog(item)" :class="{seColor:item.status==6||item.status==7}">查看日志</a>
                        </span>
                     </div>
                </div>
          
        </div>
         <div class="clisclose win-gray" v-if="tableData.list.length==0">
            暂无节目
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
              <i class="el-icon-arrow-left msgboxImgs-left" @click="currentadd('del')"></i>
              <i class="el-icon-arrow-right msgboxImgs-right" @click="currentadd('add')"></i>
              <div class="msgboxImgs">
                  <!-- <div class="itemImgplay" v-for="(item,index) in dataarr" v-show="index==current">
                      <img :src="item.imgurl">
                  </div> -->
                  <div class="msg-play itemImgplay" v-for="(item,index) in dataarr" v-show="index==current">
                      <img :src="item.imgurl">
                  </div>
              </div>
          </div>
        </div>
        <div slot="msgright">
          <div class="al-msg-right">
            <p>截图{{current+1}}</p>
            <p>图片 {{current+1}}/{{dataarr.length}}</p>
            <p>截图时间：</p>
            <p v-if="dataarr.length"> {{dataarr[0].screenshotTime|datetimeFommater}}</p>
            <el-button type="danger" class="el-icon-download al-msg-right-btn" size="small" @click="download(current)">下载到本地</el-button>
          </div>
        </div>
    </msg-box2>

    <msg-box2 :visible.sync="setEditShow" @toPauseVideo="toPauseVideo">
        <div slot="msgleft">
           <div>
              <vPlayer :row="rowdata" :previewVisible="setEditShow"/>
           </div>
        </div>
        <div slot="msgright">
          <div class="al-msg-right">
            <p>{{rowdata.showName}}</p>
            <p>{{rowdata.position}}</p>
            <p>图片：{{rowdata.image}}</p>
            <p>视频：{{rowdata.play}}</p>
            <p>文本：{{rowdata.word}}</p>
            <p>播放时长：{{rowdata.timelength}}'</p>
            <p>播放日期：</p>
            <template v-if="rowdata.ordertime">
              <p v-if="rowdata.ordertime.length">{{rowdata.ordertime[0].startDate}}到</p>
              <p v-if="rowdata.ordertime.length">{{rowdata.ordertime[rowdata.ordertime.length-1].endDate}}</p>
            </template>
            <p>创建时间：</p>
            <p>{{rowdata.createTime|datetimeFommater}}</p>
          </div>
        </div>
    </msg-box2>

  </div>
</template>

<script>
import {findcustomershow} from "../../api/AdvertisingPisition"
import {mapGetters} from 'vuex';
import 'video.js/dist/video-js.css';
import { videoPlayer } from 'vue-video-player';
import vPlayer from './vplayer.vue';

  export default {
    data(){
      return {
          rowdata:[],
          dataarr:[],
          currentIndex:0,
          data:{
            deviceId:"",
            status:3,
            userId:'',
            showName:'',
            stime:'',
            etime:'',
            pageNum:0,
            pageSize:'',
          },
          current:0,
          setEditShow:false,
          setEditShowTwo:false,
          SwitchList:[
              {value:3,label: '全部'},
              {value:0,label: '待执行'},
              {value:1,label: '执行中'},
              {value:2,label: '已完成'}
          ],
          Switch:'',
          tableData: {
            pages:0,
            size:0,
            total:10,
            list:[]
          },
          total:100,
          pageNum:3,
          pageSize:12,
          dateTime:'',
          loading:false,
      }
    },
    components: { videoPlayer,vPlayer },
    computed: {...mapGetters(['device','setPageSize','userInfo'])},
    methods: {
      hanldPage(val){
        if (val==0) {return;}
        this.getdata(val)
      },
      toPauseVideo(){
        this.setEditShow = false;
      },
      ViewLog(row){
        this.$router.push({path:'viewLog',query:{page:1,criusSN:row.criusSN,showName:row.showName,positon:row.position+row.deviceName}});
      },
      toDetail(row){
        this.storage.set('Deatil',row,true);
        this.$router.push('NewList_detail');
      },
      getdata(val=1){
          this.set_get_param.set_param(this ,'page',val);
          this.loading=true;
          this.data.pageNum = typeof this.$route.query.page === 'number'?this.$route.query.page:1;
          this.data.pageSize = this.setPageSize.block;
          this.data.userId = this.userInfo.id;

        findcustomershow(this.data).then(data=>{
          if (data.success) {
            data.data.list.forEach(item=>{
              item.showimgsrc=item.showImage.split(',')[0]
            })
            this.tableData = data.data;
          }else{
            this.tableData.list=[];
            this.tableData.total=0;
          }
          this.loading=false;
        }).catch(err=>this.loading=false)
      },
      periviewTwo(row){
        if (row.status==6||row.status==7) {
          try {
            var imglist=row.screenshotPath.split(",");
            imglist.forEach((item,index) => {
                this.dataarr.push({type:index,imgurl:item,screenshotTime:row.screenshotTime})
            });
            this.setEditShowTwo=true;
          } catch (e) {
            this.$message({type:"warning",message:"暂无本节目播放截图"});
          };
        };
      },
      download(index){
        var imgurl= this.dataarr[index].imgurl;
        var name = this.tableData.list[index].position+this.tableData.list[index].deviceName+"截图"+index+1;
        window.open(`${imgurl}?attname=${name}.jpg`)
      },
      setEditShowPreview(row){
          var [w,h]=row.resolutionName.split("*");
          var winList=[];
          row.materiallist.forEach(item=>{
            // 0 图片  1视频
            item.player_hiden=false;
            if (item.materialType == 0) {
              item.showTime=6;
              winList.push(item);
            }else{
              item.playerOptions={
                muted: false,
                languages: 'zh',
                width:`${w}px`,
                height:`${h}px`,
                sources: [{
                  type:"application/x-mpegURL",
                  src:item.imagePath.split("?")[0] + '?avvod/m3u8/vb/1000k'
                }],
                techOrder: ['html5'],
                autoplay: true,
                controls: true,
                poster:item.playImg
              };
              winList.push(item);
            }
          });
          row.w=w;
          // row.h=h;
          row.h = 496;
          row.materiallist = winList;

          this.rowdata=row;
          console.log(row);
          this.setEditShow=true;
        return;

        row.materiallist.forEach(item=>{
          item.playerOptions={
            muted: false,
            languages: 'zh',
            width:'600px',
            height:'450px',
            sources: [{
              type:"application/x-mpegURL",
              src:item.imagePath.split("?")[0] + '?avvod/m3u8/vb/1000k'
            }],
            techOrder: ['html5'],
            autoplay: false,
            // controls: true,
            poster:item.playImg,
          }
        });
        console.log(row);
        this.rowdata=row;
        this.setEditShow=true;
      }
    },
    mounted () {
       this.pageNum=Number(this.$route.query.page>0?this.$route.query.page:1);
       this.tableData.total = this.pageNum*2;
       this.getdata();
    }
  }
</script>

<style lang="scss">
.NewListvideo-player{
  >div{
    margin:0 auto;
  }
}
</style>

<style lang="scss" scoped>

.resizeoutline{
    font-size:16px;
    vertical-align: -2px;
    margin-left: 8px;
}
.resizepaperplane{
    font-size:24px;
    vertical-align: -4px;
    margin-right: 2px;
}

.con-win-tab .matelistbox{
    border-top:1px solid #ddd;
    border-bottom:1px solid #ddd;
}

.win-panel{
    width: calc(100% + 20px);
    padding-bottom:1.2%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    position: relative;
    left: -10px;
    -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        color: #333;
    .win-panel-box {
      width:calc(100% / 4 - 10px);
      min-height:148px;
      margin:20px 5px 0 5px;
      padding-right:0px; 

      .win-panel-top{
        border: 1px solid #dddddd;
        border-radius: 3px;
        padding: 14px;
        min-height: 130px;
      }

      @media (max-width:1366px){
        width:calc(100% / 3 - 10px);
      }
      .win-panel-top>div{
        // height: 100%;
        display: inline-block;
        vertical-align: text-top;
        // @media (max-width:1366px){
        //    height:auto;
        // }
      }
      p{
        width: 100%;
        line-height:22px;
        @media screen and (max-width:1366px){
            font-size: 10px;
        }
      }
      .win-panel-box-img{
          width: 40%;
          min-height: 105px;
          text-align: center;
          display: table-cell;
          overflow: hidden;
          @media screen and (max-width:1366px){
              width: 125px;
              min-height:105px;
              padding: 0;
          }
          .win-panel-box-img-border{
              border: 1px solid #ddd;
              width: 100%;
              min-height: 105px;
          }
        .win-panel-box-img-falut{
            width:67px;
            height: 60px;
            margin-top:20px;
            @media screen and (max-width:1366px){
              min-height:60px;
            }
        }
        img{
            margin: 0;
            width: 100%;
            height: 100%;
            @media screen and (max-width:1366px){
                min-height:105px;
            }
        }
      }
      .win-panel-box-describe{
        padding-left:4px; 
        width: 58%;
        overflow: hidden;
        @media (max-width:1366px) {
          width: 58%;
          padding-left:0px;
          p{
              width:111%;
              line-height: 22px;
              margin-bottom: 0px;
          }
        }
      }
    }
  }

.win-panel-bottom{
    height: 33px;
    border: 1px solid #ddd;
    line-height: 33px;
    border-radius:3px;
    margin-top:8px;
    padding-left: 14px;
    .win-panel-box-right{
        float: right;
        a{
            margin-right:16px; 
        }
    }
}

@media (max-width:1366px) {
  .con-win-title{
    line-height:32px;
   >div:first-child{
     margin-top:20px;
     margin-bottom:20px;
   }
    >button:last-child{
     margin-bottom:20px;
   }
  }
}
</style>