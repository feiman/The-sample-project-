<template>
  <div class="weather-wrapper">
    <span :style="{color:fontColor,fontSize:fontSize+'px'}">
        <img src="././../../../../static/img/weather.png" :style="{width:fontSize*2.5+'px'}" style='vertical-align:-6px;'>
        {{city}} ，26 °C
    </span>
</div>
</template>

<script>
// http://mobile.weather.com.cn/data/sk/101010100.html?_=1381891661455
  export default {
    props:{
      fontFamily:{
        default:0,
        type:Number
      },
      fontColor:{
        default:"#ff7c4c",
        type:String
      },
      fontSize:{
        default:"24",
        type:String
      },
      width:{
        default:100,
        type:Number
      },
      height:{
        default:100,
        type:Number
      },
      city:{
        default:"",
        type:String
      },
      province:{
        default:"",
        type:String
      }
    },
    data(){
      return {
        data:{}
      }
    },
    methods:{
      init(){
        
      }
    },
    mounted () {
      this.init();
    }
  }
</script>

<style lang="scss" scoped>
.weather-wrapper{
  text-align: center;
}
.weather-img{
  vertical-align: top;
}

// .weather-du{
//   font-size: 24px;
// }

// .weather-reml{
//   font-size: 14px;
// }

</style>

