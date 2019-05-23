
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
                    // width: 100%;
                    // max-width: 100%;
                    height: 100%;
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
    >span{
        display: inline-block;
        word-wrap:inherit;
        word-wrap: inherit;
        width: 175px;
        vertical-align: top;
    }
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
           <div><span class="ShowInformation-title">审核状态：</span>
                <span class="win-gray">
                    <span v-if="data.status==1"><i class="resizeicon el-icon-circle-check resCoGreen"></i>审核通过</span>
                    <span v-else-if="data.status==3"><i class="icon-con icon-con-yishagnjia"></i>已上架</span>
                    <span v-else-if="data.status==2"><i class="icon-con icon-con-bohui"></i>审核驳回</span>
                    <span v-else-if="data.status==4"><i class="icon-con icon-con-bohui"></i>已下架</span>
                    <span v-else-if="data.status==0"><i class="icon-con icon-con-daizhixin"></i>等待审核</span>
                </span>
               </div>
           <div><span class="ShowInformation-title">审核时间：</span><span class="win-gray">{{data.auditTime|datetimeFommater}}</span></div>
        </div>
        <div class="ShowInformation-items">
           <div><span class="ShowInformation-title">设备位于生活区类型：</span><span class="win-gray">{{data.liveName}}</span></div>
           <div class="w200"><span class="ShowInformation-title">搜索关键词：</span><span class="win-gray">{{data.keyName}}</span></div>
           <!-- <div class="w200"><span class="ShowInformation-title">搜索关键词：</span><span class="win-gray">电梯口</span></div> -->
        </div>
        <div class="ShowInformation-items">
           <div class="vertop" style="width:100%;display: inherit;">
               <span class="ShowInformation-title">广告机：</span>
                    <span class="win-gray wpd400">{{data.position+data.deviceName}}
                </span>
            </div>
        </div>
         <div class="ShowInformation-items">
           <div class="vertop" style="width:100%;display: inherit;">
               <span class="ShowInformation-title">描述：</span>
                    <span class="win-gray wpd400">{{data.describes}}
                </span>
            </div>
        </div>
        <div class="ShowInformation-items">
           <div><span class="ShowInformation-title">出租时间段：</span><span class="win-gray">{{data.startDate}}到{{data.endDate}} {{data.startTime}}-{{data.endTime}}</span></div>
           <div class="w200"><span class="ShowInformation-title">定时播价格：</span><span class="win-gray">￥{{data.timePrice|overFormat}}</span></div>
           <div class="w200"><span class="ShowInformation-title">循环播价格：</span><span class="win-gray">￥{{data.cyclePrice|overFormat}}</span></div>
        </div>
         <div class="ShowInformation-items">
           <div style="width:600px;"><span class="ShowInformation-title">发布时间：</span>
           <span class="win-gray" style="width:400px;">{{data.createTime|datetimeFommater}}</span></div>
        </div>
        <div class="ShowInformation-li">
          <div><span class="ShowInformation-title">展示图：</span>
                <div v-for="item in data.imgsUrl"><img :src="item"></div>
          </div>
        </div>
        <div class="ShowInformation-items">
           <div class="vertop" style="width:100%;display: inherit;">
               <span class="ShowInformation-title">简介：</span>
               <span class="win-gray wpd400" v-html="data.introduce"></span>
            </div>
        </div>
        <!-- <div class="ShowInformation-items">
           <div class="vertop" style="width:100%;display: inherit;">
               <span class="ShowInformation-title">备注：</span>
               <span class="win-gray wpd400">{{data.remark}}</span>
            </div>
        </div> -->
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
       this.data = this.storage.get("rowdata",null,true);
    }
  }

</script>

