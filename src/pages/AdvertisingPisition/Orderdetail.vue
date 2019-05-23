<template>
  <div class="con-box orderdetail">
    <!-- 订单详情 -->
    <!--  <!-- （0：未支付1：已支付未上传素材 2：待审核3：审核成功4：审核驳回5：执行中6：已完成未评价7：已评价8：已关闭）' -->
    <div class="orderState">
 <!-- <span v-if="scope.row.status==0"><i class="icon-con icon-con-daizhifu"></i>待支付</span>
                 <span v-else-if="scope.row.status==1"><i class="icon-con icon-con-daishangchuan"></i>待上传素材</span>
                 <span v-else-if="scope.row.status==2"><i class="icon-con icon-con-daidaishenhe"></i>待审核</span>
                 <span v-else-if="scope.row.status==3"><i class="icon-con icon-con-daizhixin"></i>待执行</span>
                 <span v-else-if="scope.row.status==5"><i class="icon-con icon-con-zhixingzhon"></i>执行中</span>
                 <span v-else-if="scope.row.status==6"><i class="resizeicon el-icon-circle-check resCoGreen"></i>已完成</span>
                 <span v-else-if="scope.row.status==8"><i class="resizeicon el-icon-circle-close"></i>已关闭</span>
                 <span v-else-if="scope.row.status==7"><i class="icon-con icon-con-yipingjia"></i>已评价</span>
                 <span v-else-if="scope.row.status==12"><i class="icon-con icon-con-daizhixin"></i>已加入投放</span> -->


        <h3>当前订单状态：
          <template v-if="data.status==0">
            <i class="icon-con icon-con-daizhifu"></i>
            待支付
             <el-button type="primary" size="small" class="orderState-but" @click="adorder(0)">提醒支付</el-button>
          </template>
          <template v-else-if="data.status==1">
            <i class="icon-con icon-con-daishangchuan"></i>
            待上传素材
             <el-button type="primary" size="small" class="orderState-but" @click="adorder(1)">提醒上传素材</el-button>
          </template>
          <template v-else-if="data.status==2">
            <i class="icon-con icon-con-daidaishenhe"></i>
            待审核
             <el-button type="primary" size="small" class="orderState-but" @click="checkPending">审核</el-button>
          </template>
          <template v-else-if="data.status==3">
            <i class="icon-con icon-con-daizhixin"></i>
            待执行
          </template>
          <template v-else-if="data.status==5">
            <i class="icon-con icon-con-zhixingzhon"></i>
            执行中
             <el-button type="primary" size="small" class="orderState-but" @click="NewList">查看</el-button>
          </template>
          <template v-else-if="data.status==6">
            <i class="resizeicon el-icon-circle-check resCoGreen"></i>
            已完成
          </template>
          <template v-else-if="data.status==7">
            <i class="icon-con icon-con-yipingjia"></i>
            已评价
             <el-button type="primary" size="small" class="orderState-but" @click="MyRatingDetail">查看评价</el-button>
          </template>
          <template v-else-if="data.status==8">
            <i class="resizeicon el-icon-circle-close"></i>
            已关闭
             <el-button type="primary" size="small" class="orderState-but" @click="showCloseDetarl('del')">查看原因</el-button>
          </template>
          <template v-else-if="data.status==9">
            <i class="resizeicon el-icon-circle-close"></i>
            已退款
            <el-button type="primary" size="small" class="orderState-but" @click="showCloseDetarl('aa')">查看原因</el-button>
          </template>
          <template v-else-if="data.status==12">
            <i class="icon-con icon-con-daizhixin"></i>
            已加入投放
          </template>
        </h3>
    </div>
    <div class="orderstate-items">
        <h3 class="order-title">买家信息</h3>
        <div class="order-column">
            <div>购买人：<span class="editTitp" v-if="data.realname">{{data.realname}}</span><span v-else class="editTitp">----</span></div>
            <div>支付方式：<span class="editTitp">{{data.payType|payTypeFormat}}</span></div>
            <div>所在地区：<span class="editTitp" v-if="data.place">{{data.place}}</span><span v-else class="editTitp">----</span></div>
            <div>联系电话：<span class="editTitp" v-if="data.mobile">{{data.mobile}}</span><span v-else class="editTitp">----</span></div>
        </div>
    </div>

    <div class="orderstate-items">
        <h3 class="order-title">订单信息</h3>
        <div class="order-column">
            <div>订单号：<span class="editTitp">{{data.orderId}}</span></div>
            <div>下单时间：<span class="editTitp">{{data.createTime|datetimeFommater}}</span></div>
            <div>支付时间：<span class="editTitp" v-if="data.paytime">{{data.paytime|datetimeFommater}}</span><span v-else class="editTitp">----</span></div>
            <div>订单金额：<span class="editTitp">￥{{data.price|overFormat}}</span></div>
        </div>
        <div class="order-content">
            <div><img :src="data.orimg">
                <p class="ordertitle">{{data.position+data.deviceName}}</p>
            </div>
            <div>
              <template v-if="data.playStatus == 1">
                <p>循环播</p>
                <p class="editTitp" v-for="item in data.ordertime">{{item.startTime }}- {{item.endTime}} （{{item.startDate}}到{{item.endDate}}）</p>
              </template>
              <template v-else>
                <p>定时播</p>
                <p class="editTitp" v-for="item in data.ordertime">{{item.startTime }}- {{item.endTime}} （{{item.startDate}}）</p>
              </template>
            </div>
            <div>
                 <p>{{data.material}}个素材</p>
                 <p>{{data.once}}个*30次/每个素材</p>
                 <p>总播放时长：{{sumTime}}分钟</p>
            </div>
        </div>
    </div>

    <div class="con-footer">
      <div class="con-right-back">
        <el-button type="primary" size="small" @click="back"
        >返回</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {findmyorder,adwarning} from "./../../api/AdvertisingPisition"
import {mapGetters} from 'vuex';

  export default {
    data(){
      return {
        data:{}
      }
    },
    computed:{
      ...mapGetters(['userInfo']),
      sumTime(){
          // 定时播：（图片张数*6秒+视频时长）*购买次数*30*几小时
          // 循环播：（图片张数*6秒+视频时长）*购买次数*30
       if (this.data.ordertime) {
          var dayTime=( this.data.imgNumber*6+this.data.playLength)* this.data.once * 30;
          // console.log(this.data.ordertime)
          if (this.data.playStatus==1) { // 1循环播  2定时播
              return dayTime/60;
          }else{
              return this.data.ordertime.length * dayTime/60;
          }
       }else{
         return 0;
       }
       
      }
    },
    methods: {
      back(){
          this.$router.go(-1);
      },
      getdata(){
          let findata = {
            userId:String(this.userInfo.id),
            orderId:this.$route.query.orderId,
            status:'',
            stime:'',
            etime:'',
            pageNum:'',
            pageSize:''
          };
         findmyorder(findata).then(data=>{
           if (data.success) {
              var orimgArr=data.data.list[0].showImage.split(',');
              data.data.list[0].orimg=orimgArr[0];
              this.data = data.data.list[0]
           }
         })
      },
      adorder(state){
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
              adwarning({status:state==1?1:0,userId:this.userInfo.id,orderId:this.data.orderId}).then(data=>{
                  if (data.success) {
                    this.$message({type:'success',message:data.msg})
                  }else{
                    this.$message({type:'error',message:data.msg})
                  }
              })
          })
      },
      showCloseDetarl(type){
        if(type=='del'){
          this.$alert(this.data.reasonOfCancellation, '订单关闭原因', {
            confirmButtonText: '确定',
            callback: action => {
            
            }
          });
        }else{
          this.$alert(this.data.remark, '订单退款原因', {
            confirmButtonText: '确定',
            callback: action => {
            
            }
          });
        }
        
      },
      MyRatingDetail(){
        this.$router.push('MyRating')
      },
      checkPending(){// 查看评价
        this.$router.push('checkPending')
      },
      NewList(){ // 查看播放清单
        this.$router.push('NewList')
      }
    },
    mounted () {
      this.getdata();
    }
  }

</script>

<style lang="scss" scoped>

.orderdetail {
  padding: 0 22px;
  .orderState {
    // height: 100px;
    border: 1px solid #ff7c4c;
    margin-top: 20px;
    background: #fcf8f1;
    padding: 16px 22px;
    h3{
      font-size: 14px;
    }
    .orderState-but {
      margin: 0px 0 0 28px;
    }
  }
  .orderstate-items {
    margin-top:24px; 
    .order-title{
      font-size: 14px;
    }
    .order-column {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      padding-left: 30px;
      line-height: 60px;
      height: 60px;
      >div{
        min-width:188px; 
        padding-right:56px;
      }
    }
    .order-content{
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      padding-left: 30px;
      >div{
        width: 250px;
        height: 146px;
        overflow: hidden;
        p {
          margin-top:10px;
        }
      }
      >div:nth-child(1){
        width: 326px;
        overflow: hidden;
        >img{
          width: 120px;
        }
        .ordertitle {
          line-height: 42px;
          margin-top:0; 
        }
      }
    }
  }
}


</style>
