<template>
  <div class="con-box platlistDetail">
      <!-- 播放清单详情 -->
      <div class="playBox">
          <div class="playD">
            <player-com :previewVisible="setEditShow"/>
          </div>
      </div>
      <div class="playDetail">
          <p>节目名称：<span class="win-gray">{{data.showName}}</span></p>
          <p>广告机名称：<span class="win-gray">{{data.position+data.deviceName}}</span></p>
          <p>分辨率：<span class="win-gray">{{data.resolution}}px</span></p>
          <p>播放时长：<span class="win-gray">{{data.playLength|secondsFilter}}</span></p>
          <p>创建时间：<span class="win-gray">{{data.createTime|datetimeFommater}}</span></p>
          <p>生成时间：<span class="win-gray">{{data.showtime|datetimeFommater}}</span></p>
          <p>播放时间：<br/><span class="win-gray" v-for="item in data.ordertime">
            {{item.startDate}}到{{item.endDate}} （{{item.startTime}}-{{item.endTime}}）<br/>
            </span>
          </p>
          <p>设置背景色：<span style="color:#ff7c4c;">{{data.backColor}}</span></p>
      </div>
  </div>
</template>

<script>
import playerCom from './../Program_editorial/player.vue';

  export default {
    data(){
      return {
        data:{},
        setEditShow:true
      }
    },
    components: {
      playerCom
    },
    methods: {

    },
    mounted () {
       this.data=this.storage.get("Deatil",null,true);
    }
  }
</script>

<style lang="scss" scoped>
.platlistDetail{
  padding: 20px;
  overflow: hidden;

  .playBox{
    // width: 435px;
    // height: 780px;
    // background: #eee;
    float: left;
    border-right:8px solid #eee; 
    border-left:8px solid #eee;
    border-top:12px solid #eee; 
    border-bottom:12px solid #eee;
  }


  .playDetail{
    float: left;
    min-width: 450px;
    padding-left: 50px;
    p{
      line-height: 28px;
      color: #000;
    }
  }
}

</style>