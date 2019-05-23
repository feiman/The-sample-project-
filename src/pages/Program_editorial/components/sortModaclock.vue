<template>
  <div class="sortModaclock">
    <div class="sortDateTime" style="text-align:left;text-align:center;">
      <span :style="{fontSize:datas.fontSize+'px',fontFamily:fonts.fontFamily,color:fonts.fontColor}">
         {{dateTime}}
      </span><br/>
      <span :style="{fontSize:datas.fontSize+'px',fontFamily:fonts.fontFamily,color:fonts.fontColor}">{{date}}</span>
    </div>
    <el-form label-width="74px" :inline="true" id="sortModaclock">
      <el-form-item label="时区：">
        <Select style="width:200px" v-model="datas.timeZone" class="con-maleft" placeholder="">
           <Option v-for="item in timeZoneList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </el-form-item>
      <el-form-item label="样式：">
        <Select style="width:200px" v-model="datas.styleType" class="con-maleft" placeholder="">
           <Option v-for="item in styleList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </el-form-item>
      <el-form-item label="字体：">
        <Select style="width:200px" v-model="datas.fontFamily" class="con-maleft" placeholder="">
           <Option v-for="item in fontFamilyleList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </el-form-item>
      <el-form-item label="字号：">
        <Select style="width:200px" v-model="datas.fontSize" class="con-maleft" placeholder="">
           <Option v-for="item in sizeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </el-form-item>
      <el-form-item label="颜色：">
        <el-color-picker color-format="hex" v-model="datas.fontColor" class="pro_text_mini_picker" popper-class="pro_text_mini_picker"></el-color-picker>
        <el-input type="text" v-model="datas.fontColor" size="small" style="width: 166px;" :style="{color:datas.fontColor}"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import sizeList from './fontSizeOptions';
import moment from 'moment';
import fontColorOptions from './fontColorOptions';
import fontFamilyOptions from './fontFamilyOptions';
import timeZoneOptions from './timeZoneOptions';

export default {
  name:"sortModaclock",
  props:['moxClock','clockData'],
  data () {
    return {
      datas:{
        timeZone:0,
        styleType:1,
        fontFamily:0,
        fontColor:"#000000",
        fontSize:"20"
      },
      fonts:{
        fontFamily:"微软雅黑",
        fontColor:"#000"
      },
      timeZoneList:timeZoneOptions,
      styleList:[
        {label:'YYYY年MM月DD日',value:1}
      ],
      fontFamilyleList:fontFamilyOptions,
      sizeList:sizeList,
      colorList:fontColorOptions,
      dateTime:"",
      date:"",
    }
  },
  watch:{
    'datas.fontFamily'(val){
      this.fontFamilyleList.forEach((item,index) => {
        if (val == index) {
          this.fonts.fontFamily=item.label;
        };
      });
    },
    'datas.fontColor'(val){
      this.fonts.fontColor=val;
    },
    'datas.timeZone'(val){
       this.dateTime=moment(new Date().getTime()+3600000 * val).format('HH:mm');
    },
    'moxClock'(val){
      if (val) {
        this.datas =this.clockData; 
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
    ModalClock(cb){
      cb(this.datas);
    }
  },
  mounted () {
    this.initdateSel();
  }
}
</script>

<style lang="scss" scoped>
.sortDateTime{
  text-align: center;
  margin: 20px 0;
  padding-bottom: 20px;
  border-bottom: 1px solid #ddd;
}

</style>
<style lang="scss">
.pro_text_mini_picker{
  z-index:20000 !important;
  .el-color-picker__trigger{
    width: 35px;
    height: 35px;
    vertical-align: -15px;
  }
}
// 弹出 时钟 列表
#sortModaclock{
  .el-form-item__content{
    vertical-align:-2px !important;
  }
  .el-form-item{
      margin-bottom: 10px;
  }
}
</style>
