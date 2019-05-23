<template>
  <div class="con-box" id="play_List">
    <!-- 客户节目 -->
    <div class="con-win-title">
       清单名称：
      <el-input type="text" class="con-maright" placeholder="请输入" size="small" style="width:140px;"></el-input>
      广告机：
         <Select v-model="data.deviceId" style="width:284px;" class="con-maright">
            <Option v-for="item in device.list" :value="item.id" :key="item.id">{{ item.position+item.deviceName }}</Option>
        </Select>
      播放日期：
            <el-date-picker prefix-icon="el-icon-date" style="width:186px;"
            type="datetime" size="small" v-model="data.stime" value-format="yyyy-MM-dd HH:mm:00" class="con-maright"
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
                        <div class="win-panel-box-img">
                            <div v-if="item.materiallist.length==0" class="win-panel-box-img-border"><img src="static/img/defalt_bg.png" class="win-panel-box-img-falut"></div>
                           <template v-else>
                               <img :src="item.materiallist[0].imagePath" @click="setEditShowPreview(item)">
                               <i class="icon iconfont icon-play replay" @click="setEditShowPreview(item)"></i>
                           </template>
                        </div>
                        <div class="win-panel-box-describe" @click="toDetail(item)">
                            <p class="seColor text-over" :title="item.showName">{{item.showName}}</p>
                            <p class="text-over" :title="item.position+item.deviceName">{{item.position+item.deviceName}}</p>
                            <p>图片：<span class="win-gray">{{item.image}}</span>
                                视频：<span class="win-gray">{{item.play}}</span>
                                 文本：<span class="win-gray">{{item.word}}</span>
                            </p>
                            <p>播放时长：<span class="win-gray">{{item.playLength|secondsFilter}}</span></p>
                            <p class="text-over">播放日期：<span class="win-gray" v-if="item.ordertime.length" :title="item.ordertime[0].startDate+'到'+item.ordertime[item.ordertime.length-1].endDate">{{item.ordertime[0].startDate}}到{{item.ordertime[item.ordertime.length-1].endDate}}</span></p>
                        </div>
                     </div>

                     <div class="win-panel-bottom">
                       <!-- 1待执行 2执行中 3已完成 -->
                        <span v-if="item.status==1"><i class="icon-con icon-con-daizhixin resCoGreen"></i> 待执行</span>
                        <span v-else-if="item.status==2"><i class="icon-con icon-con-zhixingzhon resCoGreen"></i> 执行中</span>
                        <span v-else-if="item.status==3"><i class="resizeicon el-icon-circle-check resCoGreen"></i> 已完成</span>

                        <span class="win-panel-box-right">
                          <a href="javascript:;" :class="{seColor:item.status==3}" @click="setEditShowTwoShow(item)">查看播放画面</a>
                          <a href="javascript:;" :class="{seColor:item.status==3}" @click="ViewLog(item)">查看日志</a>
                        </span>
                     </div>
                </div>
        </div>
        <div class="clisclose win-gray" v-if="!tableData.list.length">
           暂无节目清单
         </div>
    </div>
        <!-- 分页 -->
        <div class="con-win-page">
          <div class="win-page-left">本页共{{tableData.size?tableData.size:0}}条 共{{tableData.pages?tableData.pages:0}}页</div>
          <el-pagination class="win-page" background layout="prev, pager, next" @current-change="hanldPage" :total="tableData.total" :current-page="pageNum" :page-size="setPageSize.liner">
          </el-pagination>
        </div>
    </div>

    <msg-box2 :visible.sync="setEditShowTwo">
        <div slot="msgleft">
          <div>
              <i class="el-icon-arrow-left msgboxImgs-left" @click="currentdel"></i>
              <i class="el-icon-arrow-right msgboxImgs-right" @click="currentadd()"></i>
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

    <msg-box2 :visible.sync="setEditShow">
        <div slot="msgleft">
            <div v-if="setEditShowData.makeShow">
             <player-com :previewVisible="setEditShow" style="margin:30px auto;"></player-com>
            </div>
            <div v-else class="msg-play"> </div>
        </div>
        <div slot="msgright">
          <div class="al-msg-right">
            <p>{{setEditShowData.showName}}</p>
            <p>{{setEditShowData.position+setEditShowData.deviceName}}</p>
            <p>图片：{{setEditShowData.image}}</p>
            <p>视频：{{setEditShowData.play}}</p>
            <p>文本：{{setEditShowData.word}}</p>
            <p>播放时长：{{setEditShowData.playLength|secondsFilter}} </p>
            <p>分辨率： </p>
            <p>{{setEditShowData.resolution|resolutionFe}}</p>
            <!-- <p>播放日期：</p>
            <template v-for="item in setEditShowData.ordertime">
            <p>{{item.startDate}}到 </p>
            <p>{{item.endDate}}</p>
            <p>（{{item.startTime}}-{{item.endTime}}）</p>
            </template> -->
            <p>创建时间：</p>
            <p>{{setEditShowData.createTime|datetimeFommater}}</p>
          </div>
        </div>
    </msg-box2>

  </div>
</template>

<script>
import {findmyplay} from './../../api/ProgramReleased';
import { mapGetters} from 'vuex';
import playerCom from './../Program_editorial/player.vue';

  export default {
    data(){
      return {
          setEditShowData:{},
          data:{
            userId:'',
            showName:'',
            pageNum:'',
            pageSize:'',
            deviceId:'',
            status:'',
            stime:'',
            etime:''
          },
          dataarr:[ ],
          current:0,
          setEditShow:false,
          setEditShowTwo:false,
          model1: '',
          SwitchList:[ // 节目状态 1待执行 2执行中 3已完成',
              {value: '',label: '全部'},
              {value: '1',label: '待执行'},
              {value: '2',label: '执行中'},
              {value: '3',label: '已完成'}
          ],
          Switch:'',
          tableData:{
            pages:0,
            size:0,
            total:100,
            list:[]
          },
          total:100,
          pageNum:3,
          pageSize:12,
          dateTime:'',
          loading:false
      }
    },
    computed: {...mapGetters(['device','userInfo','setPageSize'])},
    components: {
      playerCom
    },
    methods: {
      currentadd(){
            if (this.current == this.dataarr.length-1) {
                this.$message('已经是最后一张了');
                return;
            };
            this.current++;
       },
      currentdel(){
            if (this.current == 0) {
                this.$message('已经是第一张了');
                return;
            };
            this.current--;
      },
      hanldPage(val){
         if (val==0) {return;}
         this.getdata(val)
      },
      toShowInformation(){
        // 节目详情
        this.$router.push('/win/ShowInformation');
      },
      ViewLog(item){
        if (item.status==3) {
           this.storage.set('itemdata',item,true)
           this.$router.push({path:'PlayList_log',query:{page:1,deviceSN:item.deviceSN}});
        };
      },
      toDetail(row){
        var resolution= row.resolution.split('*')
        row.width =Number(resolution[0]*1)+'px';
        row.height =Number(resolution[1]*1)+'px';
        this.storage.set('editdataemy',row,true);
        this.storage.set("Deatil",row,true);
        this.$router.push('/win/PlayList_detail');
      },
      getdata(val=1){
        this.set_get_param.set_param(this ,'page',val);
        this.loading=true;
        this.data.userId = this.userInfo.id;
        this.data.pageNum = typeof this.$route.query.page === 'number'?this.$route.query.page:1;
        this.data.pageSize = this.setPageSize.liner;

        findmyplay(this.data).then(data=>{
          if (data.success) {
            this.tableData = data.data;
            // console.log(this.tableData)
          }else{
            this.tableData.list=[];
            this.tableData.total=0;
          };
          this.loading=false
        }).catch(err=>{this.loading=false})
      },
      // 查看播放画面
      setEditShowTwoShow(row){
        if (row.status==3) {
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
        this.setEditShowData=row;
        this.setEditShow=true;
        var resolution= row.resolution.split('*')
        row.width =Number(resolution[0]*1)+'px';
        row.height =Number(resolution[1]*1)+'px';
        this.storage.set('editdataemy',row,true);
        
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

@media screen and (max-width:1366px){
  #play_List{
    .con-win-title{
      line-height: normal;
      margin-bottom: 20px;
      .con-maright{
        margin: 20px 10px;
      }
    }
  }
}



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
          height: 105px;
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
            height: 100%;
            @media screen and (max-width:1366px){
                min-height:105px;
            }
        }
      }
      .win-panel-box-describe{
        padding-left:4px; 
        width: 58%;
        height: 105px;
        
        @media (max-width:1366px) {
          width: 58%;
          padding-left:0px;
          p{
              line-height: 22px;
              margin-bottom: 0px;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
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
</style>