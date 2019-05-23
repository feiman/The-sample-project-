<template>
  <div class="con-box">
    <!-- 查看日志 -->
    <div class="con-win-title">
      播放时间：<el-date-picker class="con-maright" prefix-icon="el-icon-date" style="width:186px;"
            type="datetime" size="small" v-model="data.stime" value-format="yyyy-MM-dd HH:mm:00"
            placeholder="选择日期时间">
            </el-date-picker>到
            <el-date-picker class="con-maright" prefix-icon="el-icon-date" style="width:186px;"
            type="datetime" size="small" v-model="data.etime" value-format="yyyy-MM-dd HH:mm:00"
            placeholder="选择日期时间">
            </el-date-picker>
      <el-button size="small" class="win-search" type="primary" icon="el-icon-search" @click="getdata">搜索</el-button>
    </div>

    <div class="con-win-tab">
      <div class="con_title title-heig"> 广告机：<span class="win-gray">{{itemdata.position+itemdata.deviceName}}</span> </div>
      <!-- 数据表格 -->
      <el-table v-loading="loading" ref="multipleTable" :data="tableData.list" tooltip-effect="dark" style="width: 100%" size="small">
          <el-table-column label="播放时间" prop="playTime" :formatter="set_get_param.TimeMatter">
          </el-table-column>
          <el-table-column label="素材名称" width="200">
            <template slot-scope="scope">
              {{scope.row.materialName}}
            </template>
          </el-table-column>
          <el-table-column label="播放时长" width="100">
            <template slot-scope="scope">
              {{scope.row.playLength}}"
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <div class="con-win-page">
          <div class="win-page-left">本页共{{tableData.size?tableData.size:0}}条 共{{tableData.pages?tableData.pages:0}}页</div>
          <el-pagination class="win-page" background layout="prev, pager, next" @current-change="hanldPage" :total="tableData.total" :current-page="pageNum" :page-size="setPageSize.liner">
          </el-pagination>
        </div>
    </div>
  </div>
</template>

<script>
import {findplayerlog} from './../../api/StatementofAccount';
import { mapGetters} from 'vuex';

  export default {
    data(){
      return {
          data:{
              userId:'',
              criusSN:'',
              showName:'',
              stime:'',
              etime:'',
              pageNum:0,
              pageSize:''
          },
          dateTime:'',
          model1: '0',
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
          loading:false,
          itemdata:{}
      }
    },
    computed: {...mapGetters(['device','userInfo','setPageSize'])},
    methods: {
      hanldPage(val){
         if (val==0) {return;}
         this.getdata(val)
      },
       getdata(val=1){
        this.set_get_param.set_param(this ,'page',val);
        this.loading=true;
        this.data.userId = this.userInfo.id;
        this.data.pageNum = typeof this.$route.query.page === 'number'?this.$route.query.page:1;
        this.data.pageSize = this.setPageSize.liner;

        findplayerlog(this.data).then(data=>{
          if (data.success) {
            this.tableData = data.data;
            // console.log(this.tableData)
          }else{
            this.tableData.list=[];
            this.tableData.total=0;
          };
          this.loading=false
        }).catch(err=>{this.loading=false})
      }
    },
    mounted () {
      this.pageNum=Number(this.$route.query.page>0?this.$route.query.page:1);
      this.tableData.total = this.pageNum*2;

      var itemdata=this.storage.get('itemdata',null,true);
      this.itemdata=itemdata;
      this.criusSN=itemdata.deviceSN;
      this.showName=itemdata.showName;

      this.getdata();
    }
  }
</script>

<style lang="scss" scoped>
.title-heig{
  border-top: 1px solid #ddd;
  height: 40px;
  line-height: 40px;
}
</style>
