<template>
  <div class="con-bar">
      <div class="con-title">
            <div>此系统可以用于管理自己的屏体，也可将空闲时间发布出去，额外的赚取广告费</div>
            <p><a href="javascript:;" class="seColor">发布流程 <i class="icon-doubt"></i></a>
                <a href="javascript:;" class="seColor">发布广告位流程<i class="icon-doubt"></i></a></p>
      </div>
      <!-- <transition name="el-zoom-in-top">
        <div class="con-content" v-show="isSlider">
           <template v-for="item in btnlist">
            <a class="con-btn">{{item.name}}</a>
            <i class="con-right" v-show="item.isshow"></i>
           </template>
        </div>>
      </transition> -->
    </div>
</template>

<script>
export default{
    name:"process",
    props: {
      
    },
    data(){
        return {
            btnlist:[
                {name:'添加设备',url:'',isshow:1},
                {name:'商家认证',url:'',isshow:1},
                {name:'发布素材',url:'',isshow:1},
                {name:'创建节目',url:'',isshow:1},
                {name:'编辑节目',url:'',isshow:1},
                {name:'选择时间',url:'',isshow:1},
                {name:'发布',url:'',isshow:1},
                {name:'播放',url:'',isshow:0}
            ],
            isSlider:false
        }   
    }
  }
</script>
<style lang="scss" scoped>
$orgin:#ff7c4c;

.con-bar{
  background: #fff;
  line-height: 40px;
  overflow: hidden;
  margin: 20px 0;
  border-left: 2px solid $orgin;
  .con-title{
      padding-left: 18px;
      position: relative;
      >p{
        position: absolute;
        right:0;
        top:0;
      }
      
  }


  .con-content{
    height: 112px;
    padding-left: 18px;
    border-top: 1px solid #f5f5f5;
    .con-btn{
        width: 91px;
        height: 42px;
        border:1px solid #ccc;
        cursor: pointer;
        display: inline-block;
        text-align: center;
        border-radius: 4px;
        margin-top:28px; 
    }
  }
}


.icon-doubt{
    display: inline-block;
    width: 20px;
    height: 20px;
    background: url('./../../../static/img/content_icons.png') no-repeat -2px -170px;
    vertical-align: middle;
    margin: 0 10px;
}

.con-right{
    display: inline-block;
    width:14px;
    height:24px;
    background: url('./../../../static/img/content_icons.png') no-repeat 0px -43px;
    vertical-align: middle;
    margin: 0 10px;
}
</style>


