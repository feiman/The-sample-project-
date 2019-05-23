
<style lang="scss" scoped>
    .rating-tabs{
        margin-top:22px;
    }
</style>


<template>
  <div class="con-box ratingdetail">
    <!-- /* 0：未支付（1：已支付未上传素材 2：待审核3：审核成功4：审核驳回5：执行中）（已支付 1,2,3,4,5）6：已完成未评价7：已评价8：已关闭） */  -->
    <div class="rating-tabs">
      <a href="javascript:;" class="tabs-items" :class="{seColor:itemsisActive==0}"
       @click="handelTab('',0)">所有订单</a>
      <a href="javascript:;" class="tabs-items" :class="{seColor:itemsisActive==92}"
      @click="handelTab(0,92)">待支付</a>
      <a href="javascript:;" class="tabs-items" :class="{seColor:itemsisActive==190}"
       @click="handelTab(1,190)">已支付</a>
       <a href="javascript:;" class="tabs-items" :class="{seColor:itemsisActive==286}"
       @click="handelTab(6,286)">已完成</a>
       <a href="javascript:;" class="tabs-items" :class="{seColor:itemsisActive==382}"
       @click="handelTab(7,382)">已评价</a>
       <a href="javascript:;" class="tabs-items" :class="{seColor:itemsisActive==480}"
       @click="handelTab(8,480)">已关闭</a>
       <a href="javascript:;" class="tabs-items" :class="{seColor:itemsisActive==564}"
       @click="handelTab(9,564)">已退单</a>
      <i class="itemsisActive" :style="{left:itemsisActive+'px'}"></i>
    </div>

    <div class="con-win-title" style="padding-left:20px;">
      支付时间：<el-date-picker class="con-maright" prefix-icon="el-icon-date" style="width:186px;"
            type="datetime" size="small" v-model="data.stime" value-format="yyyy-MM-dd HH:mm:00"
            placeholder="选择日期时间">
            </el-date-picker>到
            <el-date-picker class="con-maright" prefix-icon="el-icon-date" style="width:186px;"
            type="datetime" size="small" v-model="data.etime" value-format="yyyy-MM-dd HH:mm:00"
            placeholder="选择日期时间">
            </el-date-picker>
            订单号：
            <el-input type="text" class="con-maright" placeholder="请输入订单号" size="small" style="width:186px;" v-model="data.orderId"></el-input>
            支付方式：
            <Select style="width:112px" v-model="data.payType">
              <Option v-for="item in opeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <el-button size="small" class="win-search" type="primary" icon="el-icon-search" @click="getdata">搜索</el-button>
    </div>

    <div class="con-win-tab" style="padding:0;">
        <el-table class="rating-table" ref="multipleTable" :data="tableData.list" v-loading="loading" tooltip-effect="dark" style="width: 100%" size="small">
          <!-- <el-table-column type="selection" width="30">
          </el-table-column>
          <el-table-column label="全选" width="50%"></el-table-column> -->
          <el-table-column  prop="realname" label="购买人" min-width="80">
          </el-table-column>
          <el-table-column prop="orderId" label="订单号" min-width="228">
             <template slot-scope="scope">
              <router-link :to="{ path: 'Orderdetail', query: { orderId:scope.row.orderId }}" class="seColor">{{ scope.row.orderId}}</router-link>
              </template>
          </el-table-column>
          <el-table-column label="订单金额（元）" align="right" min-width="100">
              <template slot-scope="scope">{{scope.row.price|overFormat}}</template>
          </el-table-column>
          <el-table-column label=" " min-width="20"></el-table-column>
          <el-table-column label="下单时间" min-width="140">
            <template slot-scope="scope">{{ scope.row.createTime|datetimeFommater}}</template>
          </el-table-column>
          <el-table-column  prop="IPaddress"label="支付方式" min-width="80">
            <template slot-scope="scope">
              <div class="rating-detail">
               {{ scope.row.payType|payTypeFormat}}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="支付时间" min-width="140">
            <template slot-scope="scope">
              <span v-if="scope.row.paytime"> {{ scope.row.paytime |datetimeFommater}}</span>
              <span v-else>----</span>
            </template>
          </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
                 <span v-if="scope.row.status==0"><i class="icon-con icon-con-daizhifu"></i>待支付</span>
                 <span v-else-if="scope.row.status==1"><i class="icon-con icon-con-daishangchuan"></i>待上传素材</span>
                 <span v-else-if="scope.row.status==2"><i class="icon-con icon-con-daidaishenhe"></i>待审核</span>
                 <span v-else-if="scope.row.status==3"><i class="icon-con icon-con-daizhixin"></i>待执行</span>
                 <span v-else-if="scope.row.status==5"><i class="icon-con icon-con-zhixingzhon"></i>执行中</span>
                 <span v-else-if="scope.row.status==6"><i class="resizeicon el-icon-circle-check resCoGreen"></i>已完成</span>
                 <span v-else-if="scope.row.status==8"><i class="resizeicon el-icon-circle-close"></i>已关闭</span>
                 <span v-else-if="scope.row.status==7"><i class="icon-con icon-con-yipingjia"></i>已评价</span>
                  <span v-else-if="scope.row.status==9"><i class="resizeicon el-icon-circle-close"></i>已退款</span>
                 <span v-else-if="scope.row.status==12"><i class="icon-con icon-con-daizhixin"></i>已加入投放</span>
                 <!-- （0：未支付1：已支付未上传素材 2：待审核3：审核成功4：审核驳回5：执行中6：已完成未评价7：已评价8：已关闭）' -->
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <a href="javascript:;" v-if="scope.row.status==0" class="seColor" @click="adorder(scope.row,0)">提醒支付</a>
              <a href="javascript:;" v-else-if="scope.row.status==1" class="seColor" @click="adorder(scope.row,1)">提醒上传素材</a>
              <router-link to="checkPending" v-else-if="scope.row.status==2" class="seColor">审核</router-link>
               <span v-else-if="scope.row.status==3">-----</span>
              <router-link to="NewList" v-else-if="scope.row.status==5" class="seColor">查看</router-link>
              <span v-else-if="scope.row.status==6">-----</span>
              <a href="javascript:;" v-else-if="scope.row.status==8" class="seColor" @click="showCloseDetarl">查看原因</a>
              <router-link to="MyRating" v-else-if="scope.row.status==7" class="seColor">查看评价</router-link>
              <span v-else-if="scope.row.status==12">-----</span>
              <span v-else-if="scope.row.status==9">-----</span>
            </template>
          </el-table-column>
        </el-table>
    </div>
     <!-- 分页 -->
    <div class="con-win-page">
      <div class="win-page-left">本页共{{tableData.size?tableData.size:0}}条 共{{tableData.pages?tableData.pages:0}}页</div>
      <el-pagination class="win-page" background layout="prev, pager, next" @current-change="hanldPage" :total="tableData.total" :current-page="pageNum" :page-size="setPageSize.liner">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {findmyorder,adwarning} from "./../../api/AdvertisingPisition"
import { mapGetters} from 'vuex';

  export default {
    data(){
      return {
            data:{
                orderId:'',
                status:'',
                stime:"",
                etime:'',
                pageNum:'',
                pageSize:'',
                payType:''
            },
            itemsisActive: 0,
            activeName: 'second',
            opeList: [
              { value: '', label: '全部' },
              { value: '1', label: '微信支付' },
              { value: '2', label: '支付宝支付' },
              { value: '3', label: '银联支付' }
            ],
            Switch:'',
            pageNum:0,
            setEditShow:true,
            tableData:{
              pages:0,
              size:0,
              total:100,
              list:[]
            },
            loading:false
      }
    },
    computed: {...mapGetters(['userInfo','setPageSize'])},
    methods: {
      hanldPage(val){
         if (val==0) {return;}
         this.getdata(val)
      },
      showCloseDetarl(row){
        this.$alert(row.remark, '订单关闭原因', {
          confirmButtonText: '确定',
          callback: action => {
           
          }
        });
      },
      handelTab(val='',tabnum){
          this.itemsisActive = tabnum;
          this.set_get_param.set_param(this ,'status',val);
          this.getdata();
      },
      getdata(val=1){
        this.set_get_param.set_param(this ,'page',val);
        this.loading=true;
        this.data.userId = this.userInfo.id;
        this.data.pageNum = typeof this.$route.query.page === 'number'?this.$route.query.page:1;
        this.data.status = this.$route.query.status==0||this.$route.query.status?this.$route.query.status:'';
        
        this.data.pageSize = this.setPageSize.liner;
        findmyorder(this.data).then((data) => {
          if (data.success) {
              this.tableData = data.data
          }else{
              this.tableData.list = [];
              this.tableData.total = 0
          }
          this.loading=false
        }).catch(error=>this.loading=false)
      },
      adorder(row,state){
          let str = '提醒买家上传素材？';
          if (state == 0) {
            str = '提醒买家支付？';
          }
          this.$confirm(str, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            // 0 待支付 1 待上传素材
              adwarning({status:state==1?1:0,userId:this.userInfo.id,orderId:row.orderId}).then(data=>{
                  if (data.success) {
                    this.$message({type:'success',message:data.msg})
                  }else{
                    this.$message({type:'error',message:data.msg})
                  }
              })
          })
      }
    },
    mounted () {
        this.pageNum=Number(this.$route.query.page>0?this.$route.query.page:1);
        this.tableData.total = this.pageNum*2;
        this.getdata();
    }
  }

</script>

