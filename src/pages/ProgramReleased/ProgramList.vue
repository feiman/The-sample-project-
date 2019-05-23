<template>
  <div class="con-box">
    <!-- 客户节目 -->
    <div class="con-win-title">节目名称：
      <Select v-model="data.showName" style="width:320px" class="con-maleft" placeholder="全部">
        <Option v-for="item in groupList" :value="item.showName" :key="item.showName">{{ item.showName }}</Option>
      </Select>
      <el-button size="small" type="primary" icon="el-icon-search" @click="getdata">搜索</el-button>

      <div class="con-win-title-right">
        <el-button size="small" type="primary" @click="$router.push('Program_new')">新建节目</el-button>
        <el-button size="small" type="primary" @click="seldelmyshow">删除</el-button>
      </div>
    </div>

    <div class="con-win-tab">
      <!-- 面板 -->
      <div class="matelistbox" v-loading="loading">
        <div class="win-panel">
                <div class="win-panel-box" v-for="item in tableData.list">
                    <div class="win-panel-top" style="cursor: pointer;" :class="{resetBorder:item.isShowClass}">
                        <div class="win-panel-box-img">
                            <div class="win-panel-box-img-border" v-if="!item.materiallist[0]"><img src="static/img/defalt_bg.png" class="win-panel-box-img-falut"></div>
                            <template v-else>
                              <img :src="item.materiallist[0].imagePath">
                             <i class="icon iconfont icon-play replay"></i>
                            </template>
                        </div>
                        <div class="win-panel-box-describe" @click="item.isShowClass=!item.isShowClass">
                            <p>{{item.showName}}</p>
                            <p>分辨率：<span class="win-gray">{{item.resolution|resolutionFe}}</span></p>
                            <p>图片：<span class="win-gray">{{item.image}}</span>
                                视频：<span class="win-gray">{{item.play}}</span>
                                 文本：<span class="win-gray">{{item.word}}</span>
                            </p>
                            <p>播放时长：<span class="win-gray">{{item.playLength|secondsFilter}}</span></p>
                            <p>生成时间：<span class="win-gray">{{item.createTime|datetimeFommater}}</span></p>
                        </div>
                     </div>

                     <div class="win-panel-bottom">
                        <span class="seColor pointer" @click="editprogrand(item)"><i class="resizeoutline el-icon-edit-outline"></i> 编辑内容</span>
                        <span class="pointer" :class="{seColor:item.playLength}" @click="playershow(item)"><i class="resizeoutline el-icon-view"></i> 预览</span>

                        <span class="win-panel-box-right">
                            <a href="javascript:;" :class="{seColor:item.playLength}" @click="toProgram_Released(item)"
                            ><Icon type="ios-paperplane-outline" class="resizepaperplane"></Icon>发布</a>
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
            <p>图片：{{setEditShowData.image}}</p>
            <p>视频：{{setEditShowData.play}}</p>
            <p>文本：{{setEditShowData.word}}</p>
            <p>播放时长：{{setEditShowData.playLength|secondsFilter}}</p>
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
import {findmyshow,findmyallshow,delmyshow} from './../../api/ProgramReleased'
import {mapGetters,mapMutations} from 'vuex';
import playerCom from './../Program_editorial/player.vue';

  export default {
    data(){
      return {
         setEditShowData:{},
          data:{
              userId:'',
              showName:'',
              pageNum:'',
              pageSize:''
          },
          setEditShow:false,
          groupList: [],
          SwitchList:[
              {value: '',label: '全部'},
              {value: '0',label: '待执行'},
              {value: '1',label: '执行中'},
              {value: '2',label: '已完成'}
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
    computed: {...mapGetters(['userInfo','setPageSize'])},
    components: {
      playerCom
    },
    methods: {
      hanldPage(val){
         if (val==0) {return;}
         this.getdata(val);
      },
      getdata(val=1){
        this.set_get_param.set_param(this ,'page',val);
        this.loading=true;
        this.data.userId = this.userInfo.id;
        this.data.pageNum = typeof this.$route.query.page === 'number'?this.$route.query.page:1;

        this.data.pageSize = this.setPageSize.liner;
        findmyshow(this.data).then((data) => {
          if (data.success) {
              data.data.list.forEach(item=>{
                item.isShowClass = false;
              });
              this.tableData = data.data
          }else{
              this.tableData.list = [];
              this.tableData.total = 0
          }
          this.loading=false
        }).catch(error=>this.loading=false)
      },
      editprogrand(item){
        this.storage.set('edituserdata.editdata',item,true);
        this.$router.push('Program_editorial');
      },
      toProgram_Released(item){
        if (!item.playLength) {return;}
        this.storage.set('edituserdata.editdata',item,true);
        this.$router.push('Program_Released');
      },
      getmyallshow(){
        findmyallshow({userId:this.userInfo.id}).then(data=>{
          if (data.success){
            this.groupList=data.data;
          }
        })
      },
      seldelmyshow(){
        // 抱歉，没有可删除的数据。
          var arr = [];
          this.tableData.list.forEach(item=>{
              if (item.isShowClass) {arr.push(item.id);}
          });
          if (!arr.length) {
              if (this.tableData.list) {
                 this.$message({type:"warning",message:"抱歉，请先选择节目再进行删除操作！"});
               }else{
                 this.$message({type:"warning",message:"抱歉，没有可删除的数据！"});
               }
              // this.$confirm('抱歉，没有可删除的数据。', '提示', {
              //   showCancelButton:false,
              //   showConfirmButton:false,
              //   type: 'warning'
              // }).then(() => {}).catch(()=>{})

          }else{
              this.$confirm('是否删除选中的节目?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                delmyshow({id:String(arr)}).then(data=>{
                  if (data.success) {
                    this.$message({type:'success',message:data.msg});
                    this.getdata(this.$route.query.page)
                  }else{
                    this.$message({type:'error',message:data.msg});
                  }
                })
              })
          }
      },
      playershow(row){
         if (!row.playLength) {return;};
        this.setEditShowData=row;
        this.setEditShow=true;
        var resolution= row.resolution.split('*')
        row.width =Number(resolution[0]*1)+'px';
        row.height =Number(resolution[1]*1)+'px';
        this.storage.set('editdataemy',row,true);
        
      }
    },
    mounted () {
      this.getmyallshow();
      this.pageNum=Number(this.$route.query.page>0?this.$route.query.page:1);
      this.tableData.total = this.pageNum*2;
      this.getdata();
    }
  }
</script>

<style lang="scss" scoped>
.al-msg-right{
  padding:35px 14px 0 14px;
  p{
    line-height: 30px;
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
      width:calc(100% / 4 - 20px);
      min-height:148px;
      margin:20px 10px 0 10px;
      padding-right:0px; 
      @media (max-width:1366px){
        width:calc(100% / 3 - 20px);
        margin:20px 10px 0 10px;
      }
      .win-panel-top{
        border: 1px solid #dddddd;
        border-radius: 3px;
        padding: 14px;
        min-height: 130px;
      }

      
      .win-panel-top>div{
        // height: 100%;
        display: inline-block;
        // vertical-align: text-top;
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
          width: 42%;
          height: 105px;
          text-align: center;
          display: table-cell;
          overflow: hidden;
          @media screen and (max-width:1366px){
              width: 125px;
              height:105px;
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
            max-width: 100%;
            min-height: 100%;
            // width: 100%;
            height: 100%;
            @media screen and (max-width:1366px){
                min-height:105px;
                height: 100%;
            }
        }
      }
      .win-panel-box-describe{
        padding-left:16px; 
        width: 56%;
        overflow: hidden;
        @media (max-width:1366px) {
          width: 58%;
          padding-left:0px;
          p{
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
</style>