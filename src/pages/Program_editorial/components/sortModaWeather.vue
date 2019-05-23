<template>
  <div class="sortWeather">
    <div class="sortDateTime" style="text-align:center;">
     <span :style="{color:datas.fontColor,fontSize:datas.fontSize+'px'}">
        <img src="./../../../../static/img/weather.png" :style="{width:datas.fontSize*2.5+'px'}" style='vertical-align:-6px;'>
        {{city}} ，26 °C
     </span>
    </div>
    <el-form label-width="50px" :inline="true" id="formWeather" label-position="left">
      <el-form-item label="国籍：" label-width="70px">
        <Select style="width:136px;display:inline-block;" v-model="datas.countries" placeholder="" >
           <Option v-for="item in countriesList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </el-form-item>
      <el-form-item label="省份：">
        <al-selector searchable id="province" data-type="name" :auto="true" level="0" v-model="place" :placeholder="['请选择省']" style="width:136px;"/>
      </el-form-item>
      <el-form-item label="城市：">
        <!-- <Select style="width:136px" v-model="datas.timeZone" placeholder="" id="city">
           <Option v-for="item in countriesList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select> -->
        <al-selector id="city" searchable  data-type="name" :auto="true" level="1" v-model="place" :placeholder="['请选择省','请选择市']" style="width:136px;"/>
      </el-form-item>
      <br/>
      <el-form-item label="刷新时间：" label-width="70px">
        <Select style="width:136px" v-model="datas.styleType" placeholder="">
           <Option v-for="item in refreshList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </el-form-item>
       <el-form-item label="大小：">
        <Select style="width:136px" v-model="datas.fontSize" placeholder="">
           <Option v-for="item in sizeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </el-form-item>
      <el-form-item label="颜色：">
         <el-color-picker color-format="hex" v-model="datas.fontColor" class="pro_text_mini_picker" popper-class="pro_text_mini_picker"></el-color-picker>
        <el-input type="text" v-model="datas.fontColor" size="small" style="width: 100px;" :style="{color:datas.fontColor}"></el-input>
      </el-form-item>
      <el-form-item label="宽度：" label-width="70px">
        <el-input placeholder="" type="number" size="small" v-model="datas.width" style="width:136px"></el-input>
      </el-form-item>
      <el-form-item label="高度：">
        <el-input placeholder="" type="number" size="small" v-model="datas.height" style="width:136px"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import sizeList from './fontSizeOptions';
import {requesAddress} from './../../../api/user.js';
import moment from 'moment';

export default {
  name:"sortModaclock",
  props:['moxWeather','weatherCom'],
  data () {
    return {
      datas:{
        styleType:1,
        fontFamily:0,
        fontColor:"#ff7c4c",
        fontSize:"24",
        width:100,
        height:100,
        city:"",
        province:"",
        countries:"中国"
      },
      countriesList:[
        {label:"中国",value:'中国'},
      ],
      refreshList:[
        {label:'1小时',value:1},
        {label:'2小时',value:2},
        {label:'3小时',value:3},
        {label:'4小时',value:4},
        {label:'5小时',value:5},
        {label:'6小时',value:6},
        {label:'7小时',value:7},
        {label:'7小时',value:8},
        {label:'9小时',value:9},
        {label:'10小时',value:10},
        {label:'11小时',value:11},
        {label:'12小时',value:12}
      ],
      sizeList:sizeList,
      dateTime:"",
      date:"",
      place:[],
      city:""
    }
  },
  watch:{
    'place'(val){
       if (val.length == 2) {
         this.datas.province = val[0];
         this.datas.city = val[1];
         this.city=val[1];
       }
    },
    'moxWeather'(val){
      if (val) {
       this.datas = this.weatherCom;
       this.place = [this.weatherCom.province,this.weatherCom.city];
      }
    }
  },
  methods:{
    initdateSel(){
      this.dateTime  = moment().format('HH:mm');
      var DayArr = ['一','二','三','四','五','六','日'],Day="",DayN=moment().format('E');
      DayArr.forEach((item,index)=>{
        if (DayN == index+1) { Day = item; }
      });
      this.date = moment().format('YYYY年MM月DD日 星期')+Day;
    },
    weatherCb(cb){
      cb(this.datas)
    }
  },
  mounted () {
    this.initdateSel();
    // console.log(returnCitySN)
    requesAddress(returnCitySN['cip']).then(data=>{
      // console.log(data)
      if (data.status==0) {
        this.city = data.content.address_detail.city
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.sortDateTime{
  text-align: center;
  margin: 20px 0;
}
</style>

<style lang="scss">
#formWeather{
  .el-form-item__label{
    padding:0px !important;
  }
  .el-form-item__content{
      vertical-align:-2px !important;
  }
  .el-form-item{
      margin-bottom: 10px;
  }
}
#province{
    vertical-align: -13px;
    display: inline-block;
}

#city{
    vertical-align: -13px;
    display: inline-block;
   .ivu-select-dropdown{
      z-index: 20001;
   }
  .ivu-col:first-child{
    display: none;
  }
  .ivu-col:last-child{
    width:100%;
  }
}


</style>
