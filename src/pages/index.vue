<template>
  <div>
    <div class="con-he" v-loading="loading" style="overflow:hidden;">
        <div class="box-card">
        <div><img src="static/img/user-i.png"></div>
        <div>
          <p class="">{{userInfo.loginName}}</p>
          <p class="useorgin">
            <router-link to="/win/information">编辑信息</router-link>
            <router-link to="win/ToAuthentication">
              <i class="i-weirenz"></i> 
              <span v-if="realStatus==0">未认证</span> 
              <span v-if="realStatus==1">认证中</span> 
              <span v-if="realStatus==2">已认证</span>
              <span v-if="realStatus==3">认证失败</span> 
            </router-link>
          </p>
        </div>
      </div>
      <div class="box-card">
        <div><img src="static/img/money-i.png"></div>
        <div>
            <p class="">可提现金额 <span class="box_money">￥{{realdata.settlementMoney|overFormat}}</span></p>
            <p class="">收入总金额 <span class="box_money">￥{{realdata.sumMoney|overFormat}}</span>
             <router-link to="/win/FinancialOverview" class="con-win-edit"> <button> 提现</button></router-link>
            </p>
        </div>
      </div>
      <div class="box-card">
        <div><img src="static/img/chart-i.png"></div>
        <div>
          <div class="box_num">总客流量（人）<p>{{realdata.sumPerson}}</p></div>
          <div class="box_num">近一个月客流量 <p>{{realdata.monthPerson}}</p> </div>
        </div>
      </div>
      <div class="box-card">
        <div><img src="static/img/text-i.png"></div>
        <div>
          <p class="box-shenhe">待审核订单数</p>
          <router-link to="/win/checkPending"><span class="box-size"> {{realdata.material}}</span></router-link>
        </div>
      </div>
    </div>
    <div class="clear"></div>
    <process></process>
    <con-chart></con-chart>
  </div>
</template>

<script>
import process from './../components/indexchiled/process.vue';
import conChart from './../components/indexchiled/chart.vue';
import {finduser,findhomepage} from '././../api/user';
import {mapGetters} from 'vuex';

  export default {
    data(){
      return {
        realStatus:'',
        loading:false,
        realdata:{}
      }
    },
    computed:{...mapGetters(['userInfo'])},
    components:{
      process,
      conChart
    },
    methods: {
        getfinduser(){// 查询用户信息
         this.loading=true;
          finduser({userId:this.userInfo.id}).then(data=>{
            if (data.success) {
             this.realStatus =  data.data.realStatus;
            };
          })
        },
        getfindhomepage(){
            findhomepage({userId:this.userInfo.id,type:0}).then(data=>{
                if (data.success) {
                  this.realdata=data.data;
                };
                this.loading=false
            }).catch(error=>{this.loading=false});
        }
    },
    mounted () {
      this.getfinduser();
      this.getfindhomepage();
    }
  }
</script>

<style lang="scss" scoped>
$radius:6px;
$orgin:#ff7c4c;
$meda1320:1320px;
$meda1366:1366px;
$meda1100:1100px;


    .box-card{
        width: 23.5%;
        height:114px;
        border-radius: $radius;
        background: #fff;
        float: left;
        margin-left:2%; 
        font-size: 12px;
        @media (max-width:$meda1366){
          height:90px;
        }
        @media (max-width:1670px){
              height:90px;
        }
        
        @media (max-width:$meda1320){
          width:49%;
          height:130px;
          margin-bottom:20px;
          &:nth-last-child(2){
            margin-left:0; 
          }
        }
        @media (max-width:$meda1100){
            height:110px;
        }
        @media (max-width:780px){
          //  width:300px;
        }

        &:first-child{
            margin: 0;
        }
        >div{
          height: 100%;
          float: left;
          &:nth-child(1){
            width:30%;
            text-align: center;
            line-height: 114px;
            @media (max-width:$meda1366){
              line-height:90px;
            }
            @media (max-width:1670px){
              line-height:90px;
              height:90px;
            }
            @media (max-width:$meda1320){
              line-height:130px;
              height:130px;
            }
            @media (max-width:$meda1100){
                height:110px;
                line-height:110px;
            }
            img{
              width:60%;
              vertical-align: middle;
              @media (max-width:$meda1320){
                width:50%;
              }
            }
          }
          &:nth-child(2){
            width:70%;
            padding-top:6%; 
            line-height: 30px;
            .useorgin > a{
              color: $orgin;
            }
            .useorgin::before{
              content: "";
              display:inline-block;
              width:20px;
              height: 20px;
              vertical-align: middle;
              background: url('./../../static/img/content_icons.png') no-repeat;
              background-position:0px -24px; 
            }
            .i-weirenz{
              display:inline-block;
              width:20px;
              height: 20px;
              vertical-align: middle;
              background: url('./../../static/img/content_icons.png') no-repeat;
              background-position:-16px -24px; 
              margin-left:5px;
            }
            p{
              >.box_money{
                width:60px;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
                display: inline-block;
                vertical-align: middle;
                margin-top: -4px;
                @media screen and (max-width:$meda1366){
                  // margin-left:20px; 
                }
              }
            }
            button{
              background:none;
              border: 1px solid $orgin;
              color: $orgin;
              position: relative;
              top: -16px;
              right:-26px;
              width: 30%;
              height: 32px;
              border-radius: 3px;
              outline: none;
              @media (max-width:$meda1366){
                width:44px;
                left: 0;
                height: 26px;
                line-height: 24px;
              }
              @media (max-width:1670px){
                width:44px;
                right:-10px;
                height: 26px;
              }
              @media (max-width:$meda1320){
                 width:86px;
                 height: 34px;
                 left:40px;
              }
              @media (max-width:$meda1100){
                  width:60px;
                   left:20px;
              }
              @media (max-width:924px){
                    width:44px;
                    left:20px;
                    height: 26px;
              }
            }
            div.box_num{
              
              display: inline-block;
              margin-right:8%; 
             
              @media (max-width:1530px){
                 margin-right:2%; 
              }
              @media (max-width:1366px){
                display:block;
                >p{
                  overflow: hidden;
                  text-overflow:ellipsis;
                  white-space: nowrap;
                  display: inline;
                  margin-left:20px; 
                }
              }
            }
            .box-size{
              color: $orgin;
              font-size: 40px;
             @media (max-width:1670px){
                  font-size:30px;
              }
              @media (max-width:$meda1366){
                  font-size:36px;
              }
            }
            p.box-shenhe{
              line-height:40px;
              margin-top: -10px;
            }
          }
        }
    }
.clear{
  clear: both;
}
  
    
</style>

