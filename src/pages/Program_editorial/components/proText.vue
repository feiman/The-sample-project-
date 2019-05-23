<template>
  <div class="pro_text" :style="{textAlign:align,color:fontColor,fontFamily:fontFamily,fontSize:fontSize+'px',lineHeight:lineHeight+'px'}">
    <span :style="{verticalAlign:valign}">{{text}}</span>
  </div>
</template>

<script>

export default {
  name:"proText",
  props:{
    text:{
      type:String,
      default:'文本'
    },
    align:{
      type:String,
      default:'left'  // left  center right
    },
    valign:{
      type:String,
      default:'top'  // top  middle bottom
    },
    fontColor:{
      type:String,
      default:"#333"
    },
    fontFamily:{
      type:Number,
      default:0
    },
    fontSize:{
      type:String,
      default:"12"
    },
    lineHeight:{
      type:String,
      default: "20"
    }
  },
  data(){
    return {

    }
  }
}
</script>

<style lang="scss" scoped>

.pro_text{
  color:#333;
  position: absolute;
  width: 100%;
  height:100%;
  display: table; 
  white-space: pre-wrap;
  word-break:break-all;
  word-wrap:break-word;
  overflow: hidden;
  >span{
    display: table-cell;
  }
}

</style>
