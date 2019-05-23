<template>
  <div class="con-box">
    <!-- 交易明细 -->
    <div class="con-win-title">
      支付时间：<el-date-picker class="con-maright" prefix-icon="el-icon-date" style="width:186px;"
            type="datetime" size="small" v-model="data.stime" value-format="yyyy-MM-dd HH:mm:00"
            placeholder="选择日期时间">
            </el-date-picker>到
            <el-date-picker class="con-maright" prefix-icon="el-icon-date" style="width:186px;"
            type="datetime" size="small" v-model="data.etime" value-format="yyyy-MM-dd HH:mm:00"
            placeholder="选择日期时间">
            </el-date-picker>
            订单号：
            <el-input type="text" v-model="data.orderId" class="con-maright" placeholder="请输入" size="small" style="width:186px;"></el-input>
            出账类型：
            <Select v-model="data.inType" style="width:112px">
              <Option v-for="item in opeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <el-button size="small" class="win-search" type="primary" icon="el-icon-search" @click="getdata">搜索</el-button>
    </div>

    <div class="con-win-tab">
      <!-- 数据表格 -->
      <el-table ref="multipleTable" v-loading="loading" id="transaction-table" show-summary :summary-method="set_get_param.getSummaries" :data="tableData.list" tooltip-effect="dark" style="width: 100%" size="small">
          <el-table-column  prop="createTime" min-width="120" label="支付时间" :formatter="set_get_param.TimeMatter">
          </el-table-column>
          <el-table-column min-width="180" label="订单号">
            <template slot-scope="scope">
               <router-link :to="{ path:'Orderdetail',query: { orderId:scope.row.orderId }}" class="seColor">{{ scope.row.orderId}}</router-link>
            </template>
          </el-table-column>
          <el-table-column prop="orderPrice" :formatter="set_get_param.overFormat" min-width="100" label="订单金额(元)" align="right">
          </el-table-column>
          <el-table-column prop="settlementMoney" :formatter="set_get_param.overFormat" min-width="100" label="实际到账金额(元)" align="right">
          </el-table-column>
          <el-table-column  min-width="40" label=""></el-table-column>
          <el-table-column label="进出账类型" min-width="100">
             <template slot-scope="scope">
               <span v-if="scope.row.inType == 0">进账</span>
               <span v-else>出账</span>
             </template>
          </el-table-column>
          <el-table-column  min-width="80" label="结算状态">
            <template slot-scope="scope">
              <span v-if="scope.row.status == 0">  <Icon type="ios-checkmark icon-con-true"></Icon>待结算</span>
              <span v-else><i class="icon iconfont icon-haoshixin icon-con-doubt"></i>已结算</span>
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
import {finddeal} from './../../api/AdvertisingPisition';
import { mapGetters} from 'vuex';

  export default {
    data(){
      return {
          data:{
            userId:'',
            orderId:'',
            payType:'',
            inType:'',
            stime:'',
            etime:'',
            pageNum:0,
            pageSize:''
          },
          seColorShow:0,
          opeList: [
            { value:0, label: '进账' },
            { value:1, label: '出账'},
            { value:'', label: '全部'}
          ],
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
        finddeal(this.data).then((data) => {
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


</style>



