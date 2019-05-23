
<style lang="scss" scoped>
    
.ShowInformation {
    padding: 0 22px;
    .ShowInformation-items {
        margin-top: 28px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        &:last-child{
          margin-bottom:28px; 
        }
        >div {
            width: 430px;
        }
    }
    .ShowInformation-li {
        >div {
            margin-top: 30px;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            vertical-align: top;
            >div {
                display: inline-block;
                width: 150px;
                height: 112px;
                overflow: hidden;
                margin-right: 18px;
                >img {
                    // min-width: 100%;
                    max-height: 112px;
                }
            }
        }
    }
    .ShowInformation-title {
        display: inline-block;
        width: 120px;
        text-align: right;
        margin-right: 4px;
    }
}

.w200{
    width: 300px !important;
}
.wpd400{
width:600px;display:inline-block;
}
</style>

<template>
  <div class="con-box ShowInformation">
 <!-- 广告位详情 -->
    <div class="ShowInformation-box">
        <div class="ShowInformation-items">
           <div><span class="ShowInformation-title">节目单号：</span><span class="win-gray">{{data.showOrderId}}</span></div>
           <div class="w200"><span class="ShowInformation-title">客户账号：</span><span class="win-gray">{{data.loginName}}</span></div>
           <div class="w200"><span class="ShowInformation-title">客户姓名：</span><span class="win-gray">{{data.realname|nameFiler}}</span></div>
        </div>
        <div class="ShowInformation-items">
           <div><span class="ShowInformation-title">广告机：</span><span class="win-gray">{{data.position+data.deviceName}}</span></div>
           <div class="w200"><span class="ShowInformation-title">关联订单号：</span><span class="win-gray" style="width: 176px;display:inline-block;word-wrap: break-word;vertical-align: top;">{{data.orderId}}</span></div>
           <div class="w200"><span class="ShowInformation-title">状态：</span>
                <span class="win-gray" v-if="data.status==3">待执行</span>
                <span class="win-gray" v-if="data.status==5">执行中</span>
                <span class="win-gray" v-if="data.status==6||data.status==6">已完成</span>
           </div>
           <!-- 3  待执行  5 执行中  6已完成 7已完成 -->
        </div>
         <div class="ShowInformation-items">
           <div><span class="ShowInformation-title">创建时间：</span><span class="win-gray">{{data.createTime|datetimeFommater}}</span></div>
           <div class="w200"><span class="ShowInformation-title">播放时间：</span><span class="win-gray" v-if="data.ordertime">{{data.ordertime[0].startDate}}到{{data.ordertime[data.ordertime.length-1].endDate}}</span><span v-else>----</span></div>
        </div>
        <div class="ShowInformation-li">
          <div><span class="ShowInformation-title">展示图：</span>
                <div v-for="item in data.materiallist">
                    <img v-if="item.materialType==0" :src="item.imagePath">
                    <img v-if="item.materialType==1" :src="item.playImg">
                </div>
          </div>
        </div>
       <br/>
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
  export default {
    data(){
      return {
          data:{}
      }
    },
    methods: {
      back(){
          this.$router.go(-1);
      }
    },
    mounted () {
       this.data=this.storage.get('Deatil',null,true);
       console.log(this.data)

    }
  }

</script>

