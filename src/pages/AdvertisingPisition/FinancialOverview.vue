<template>
  <div class="con-box financial">
    <!-- 财务总览 -->
    <div class="financial-title">
      <div class="financial-left">
        <div>
          <h3>可提现金额</h3>
          <p>￥{{data.withdrawal|overFormat}}</p>
        </div>
        <div>
          <div class="resetbtn" @click="toRequestWithdrawal"><i class="icon-con-moneys"></i> 申请提现</div>
        </div>
      </div>
      <div class="financial-right">
        <div>
          <h3>收入总金额</h3>
          <p>￥{{data.income|overFormat}}</p>
        </div>
        <div>
          <h3>待结算金额</h3>
          <p>￥{{data.notsettlement|overFormat}}</p>
        </div>
        <div>
          <h3>已支取金额</h3>
          <p>￥{{data.commission|overFormat}}</p>
        </div>
      </div>
    </div>
    <div class="financeal-content">
        <h3>备注：</h3>
        <p>
          关于交易费率、资金提现，请注意：<br/>
          按照银行规定，每笔交易手续费率为1，交易费率由系统自动扣除；<br/>
          结算时间：当天收款金额2天后可申请提现；<br/>
          提现时间：工作日成功申请提现，2小时内到账；非工作日、节假日的提现和结算可能出现延迟；<br/>
          提现金额：满100元方可提现；<br/>
          提现失败：若发生提现失败，则金额会自动回到账户余额中，可再次申请提现<br/>
        </p>
    </div>
  </div>
</template>

<script>
import {findmymoney} from './../../api/AdvertisingPisition';
import {mapGetters} from 'vuex';

  export default {
    data(){
      return {
          data:{}
      }
    },
    computed:{...mapGetters(['userInfo'])},
    methods: {
      toRequestWithdrawal(){
        // 去申请提现
        if (this.data.withdrawal<=0) {
          this.$message.info({
            type:'warning',
            message:'无可提现金额！'
          })
          return;
        }
        this.$router.push('/win/requestWithdrawal');
      },
      getdata(){
        findmymoney({userId:this.userInfo.id}).then(data=>{
          if (data.success) {
            this.data = data.data;
          }
        })
      }
    },
    mounted () {
      this.getdata();
    }
  }
</script>

<style lang="scss" scoped>

  .financial{
    padding:0 24px;
    .financial-title{
      height: 123px;
      vertical-align: middle;
      border-bottom:1px solid #ddd;
      >div{
        float: left;
        margin-top:40px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        font-size: 12px;
        line-height:26px;
      }
        h3{
          margin-top:-4px;
          color: #888;
        }
        p{
          color: #000;
          font-weight: bold;
        }
        .financial-left > div {
          &:first-child{
            padding-left:22px; 
          }
          &:last-child{
            border-right:1px solid #ddd;
            height: 42px;
            overflow: hidden;
          }
          padding-right: 34px;
        }
        .resetbtn{
          color: #ff7c4c;
        }
        .resetbtn{
          border:1px solid #ff7c4c;
          padding:6px 12px;
          border-radius: 4px;
          cursor: pointer;
          &:hover{
            background: #ffece5;
          }
        }
        .resetbtn::before{
            content:'';
            width:22px;
            height:22px;
            display:inline-block;
            background: url('./../../../static/img/content_icons.png') no-repeat -58px -72px;
            vertical-align: -6px;
            margin-right:6px; 
        }
      .financial-right>div{
        margin-left:36px; 
      }
    }
    .financeal-content{
      color: #888;
      line-height: 30px;
      padding:12px 24px; 
      h3{
        font-size: 12px;
        font-weight: normal;
      }
      p{
        padding-left:24px; 
      }
    }
  }
</style>


