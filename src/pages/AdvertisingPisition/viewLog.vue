<template>
  <div class="con-box">
    <!-- 头部 标签 -->
    <div class="con-win-title">
        <!--广告机：
     <Select v-model="data.criusSN" style="width:280px" class="con-maleft">
        <Option v-for="item in device.list" :value="item.serialNumber" :key="item.serialNumber">{{ item.position +item.deviceName }}</Option>
      </Select> -->
      播放时间：<el-date-picker class="con-maright date-pocker-width" prefix-icon="el-icon-date"
            type="datetime" size="small" v-model="data.stime" value-format="yyyy-MM-dd HH:mm:00"
            placeholder="选择日期时间">
            </el-date-picker>到
            <el-date-picker class="con-maright date-pocker-width" prefix-icon="el-icon-date"
            type="datetime" size="small" v-model="data.etime" value-format="yyyy-MM-dd HH:mm:00"
            placeholder="选择日期时间">
            </el-date-picker>
        <el-button size="small" class="win-search" type="primary" icon="el-icon-search" @click="getdata">搜索</el-button>
    </div>

    <div class="con-win-tab">
      <div class="con_title"> 广告机：<span class="win-gray">{{position}}</span></div>
      <!-- 数据表格 -->
      <el-table ref="multipleTable" v-loading="loading" :data="tableData.list" tooltip-effect="dark" style="width: 100%" size="small">
          <el-table-column  prop="showName" min-width="200" label="节目名称">
          </el-table-column>
          <el-table-column prop="userName" min-width="200" label="素材名称">
            <template slot-scope="scope">
              {{scope.row.materialName}}
            </template>
          </el-table-column>
          <el-table-column prop="playTime" :formatter="set_get_param.TimeMatter" label="播放时间" min-width="200">
          </el-table-column>
          <el-table-column min-width="200" label="播放时长">
            <template slot-scope="scope">
              {{scope.row.playLength|secondsFilter}}"
            </template>
          </el-table-column>
          <el-table-column  prop="loginName" min-width="100" label="买家账号">
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
import {findplayerlog} from '././../../api/StatementofAccount';
import { mapGetters } from 'vuex';

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
          model1: '',
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
          position:'',
          loading:false
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
        this.data.showName = this.$route.query.showName;
        this.data.criusSN = this.$route.query.criusSN;

        this.data.pageSize = this.setPageSize.liner;
        findplayerlog(this.data).then((data) => {
          if (data.success) {
              this.position = data.data.list[0].position+ data.data.list[0].deviceName;
              this.tableData = data.data
          }else{
              this.tableData.list = [];
              this.tableData.total = 0
          }
          this.loading=false
        }).catch(error=>this.loading=false)
      }
    },
    mounted () {
      this.pageNum=Number(this.$route.query.page>0?this.$route.query.page:1);
      this.tableData.total = this.pageNum*2;
      this.position= this.$route.query.positon;
    }
  }
</script>


<style lang="scss" scoped>
@media screen and (max-width:1366px){

  .con-box{
    .win-search{
      float: right;
      margin: 0 20px 10px 0;
    } 

    .con_title{
        line-height: 34px;
    }
  }
  
}

</style>

