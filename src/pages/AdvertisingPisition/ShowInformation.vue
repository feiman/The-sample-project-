
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
                    width: 100%;
                }
            }
        }
    }
    .ShowInformation-title {
        display: inline-block;
        width: 110px;
        text-align: right;
        margin-right: 4px;
    }
}
</style>

<template>
  <div class="con-box ShowInformation">
 <!-- 节目详情 -->
    <div class="ShowInformation-box">
        <div class="ShowInformation-items">
           <div><span class="ShowInformation-title">节目单号：</span><span class="win-gray">LWSSS123242344</span></div>
           <div><span class="ShowInformation-title">客户账号：</span><span class="win-gray">15899856523</span></div>
           <div><span class="ShowInformation-title">客户姓名：</span><span class="win-gray">王大鹏</span></div>
        </div>
        <div class="ShowInformation-items">
           <div><span class="ShowInformation-title">设备名称：</span><span class="win-gray">西安高新区广场LED显示屏广告</span></div>
           <div><span class="ShowInformation-title">关联订单号：</span><span class="win-gray">QS2342424234</span></div>
           <div></div>
        </div>
         <div class="ShowInformation-items">
           <div><span class="ShowInformation-title">节目生成时间：</span><span class="win-gray">2018-01-21 21:12:34</span></div>
           <div><span class="ShowInformation-title">节目播放开始时间：</span><span class="win-gray">2018-01-21 21:12:34</span></div>
           <div><span class="ShowInformation-title">节目播放结束时间：</span><span class="win-gray">2018-01-21 21:12:34</span></div>
        </div>
        <div class="ShowInformation-li">
          <div><span class="ShowInformation-title">节目素材：</span>
                <div><img src="static/img/sucai-default.png"></div>
                <div><img src="static/img/sucai-default.png"></div>
                <div><img src="static/img/sucai-default.png"></div>
          </div>
        </div>
        <div class="ShowInformation-items">
           <div><span class="ShowInformation-title">状态：</span><span class="win-gray">执行中</span></div>
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
  export default {
    data(){
      return {
      }
    },
    methods: {
      back(){
          this.$router.go(-1);
      }
    },
    mounted () {
       
    }
  }

</script>

