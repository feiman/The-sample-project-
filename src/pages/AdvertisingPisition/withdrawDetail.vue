<template>
  <div class="con-box">
    <!-- 提现明细 -->
    <div class="con-win-title">
      申请时间：<el-date-picker class="con-maright" prefix-icon="el-icon-date" style="width:186px;"
            type="datetime" size="small" v-model="data.stime" value-format="yyyy-MM-dd HH:mm:00"
            placeholder="选择日期时间">
            </el-date-picker>
            到
            <el-date-picker class="con-maright" prefix-icon="el-icon-date" style="width:186px;"
            type="datetime" size="small" v-model="data.etime" value-format="yyyy-MM-dd HH:mm:00"
            placeholder="选择日期时间">
            </el-date-picker>
            提现方式：
            <Select v-model="data.type" class="con-maright" style="width:112px">
              <Option v-for="item in opeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            账户姓名：
            <el-input type="text" v-model="data.accountName" placeholder="请输入" size="small" style="width:186px;"></el-input>

            <el-button size="small" class="win-search" type="primary" icon="el-icon-search" @click="getdata">搜索</el-button>
    </div>

    <div class="con-win-tab">
      <!-- 数据表格 -->
      <el-table ref="multipleTable" id="transaction-table" show-summary :summary-method="set_get_param.getSummaries" :data="tableData.list" tooltip-effect="dark" style="width: 100%" v-loading="loading" size="small">
          <el-table-column  prop="date" min-width="140" label="提现时间">
             <template slot-scope="scope">{{scope.row.createTime|datetimeFommater}}</template>
          </el-table-column>
          <el-table-column min-width="220" label="账单号">
            <template slot-scope="scope">{{scope.row.orderNo}}</template>
          </el-table-column>
          <el-table-column prop="money" width="100%" label="金额（元）" :formatter="set_get_param.overFormat" align="right">
          </el-table-column>
          <el-table-column min-width="100" label="提现方式" align="center">
            <template slot-scope="scope">
             {{scope.row.type|payTypeFormat}}
            </template>
          </el-table-column>
          <el-table-column min-width="100" label="提现账号">
             <template slot-scope="scope">{{scope.row.account}}</template>
          </el-table-column>
          <el-table-column min-width="80"label="账户姓名">
            <template slot-scope="scope">{{scope.row.accountName}}</template>
          </el-table-column>
          <el-table-column label="银行开户行" min-width="160">
            <template slot-scope="scope">{{scope.row.bankName}}</template>
          </el-table-column>
          <el-table-column  label="处理状态" min-width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.status==1">  <Icon type="ios-checkmark icon-con-true"></Icon>成功</span>
              <span v-else><i class="icon iconfont icon-haoshixin icon-con-doubt"></i>转账失败</span>
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
import {findwithdrawal} from './../../api/AdvertisingPisition';
import { mapGetters} from 'vuex';

  export default {
    data(){
      return {
          data:{
            userId:'',
            accountName:'',
            type:'',
            stime:'',
            etime:'',
            pageNum:0,
            pageSize:''
          },
          seColorShow:0,
          opeList: [
            { value:1, label: '微信支付' },
            { value:2, label: '支付宝支付'},
            { value:3, label: '银联支付'}
          ],
              // （1：微信 2支付宝 3银联）
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

        this.data.pageSize = this.setPageSize.liner;
        findwithdrawal(this.data).then((data) => {
          if(data.success){
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
        this.getdata();
    }
  }
</script>

<style lang="scss" scoped>

  #transaction-table .el-table__footer{
    .cell {
      color: #ff6933 !important;
    }
    .el-table_1_column_1 .cell {
      color: #333 !important;
    }
  }


</style>
