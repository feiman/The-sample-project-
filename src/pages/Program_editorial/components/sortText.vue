<template>
    <div>
      <div class="pro_text_mini">
             <el-input type="textarea" v-model="fontCom.text" :rows="4" resize="none" placeholder="文本" size="mini"
             :style="{lineHeight:fontCom.lineHeight+'px'}"
             ></el-input>

            <el-form label-width="74px" :inline="true" id="sortModaText" label-position="left">
                <el-form-item label="滚动效果：">
                    <Select style="width:200px" v-model="fontCom.scrollingEffect" placeholder="">
                        <Option v-for="item in scrollingEffectOptions" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </el-form-item>
                <el-form-item label="滚动方向：">
                    <Select style="width:200px" v-model="fontCom.rollingDirection" placeholder="">
                        <Option v-for="item in rollingDirectionOptions" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </el-form-item><br/>
                <el-form-item label="大小：">
                   <Select v-model="fontCom.fontSize" style="width:200px">
                        <Option v-for="item in fontSizeOptions" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </el-form-item>
                <el-form-item label="行高：">
                   <Select v-model="fontCom.lineHeight" style="width:200px">
                        <Option v-for="item in fontSizeOptions" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </el-form-item><br/>
                <el-form-item label="字体：">
                   <Select v-model="fontCom.fontFamily" style="width:200px">
                        <Option v-for="item in fontFamilyOptions" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </el-form-item><br/>
                <el-form-item label="字体颜色：">
                    <el-color-picker color-format="hex" v-model="fontCom.fontColor" popper-class="sort_ModaText_picker"></el-color-picker>
                    <el-input type="text" v-model="fontCom.fontColor" size="small" style="width: 161px;" :style="{color:fontCom.fontColor}"></el-input>
                </el-form-item><br/>
                 <el-form-item label="对齐：">
                    <div class="pro_min_align">
                        <el-radio-group v-model="fontCom.align" size="mini">
                            <el-radio-button label="left" title="左对齐"> <i class="icon icon-editor icon-editor-zuoduiqi"></i></el-radio-button>
                            <el-radio-button label="center" title="居中对齐"><i class="icon icon-editor icon-editor-shuipingjuzhongduiqi"></i></el-radio-button>
                            <el-radio-button label="right" title="右对齐"><i class="icon icon-editor icon-editor-youduiqi"></i></el-radio-button>
                        </el-radio-group>&nbsp;&nbsp;
                        <el-radio-group v-model="fontCom.valign" size="mini">
                            <el-radio-button label="top" title="顶对齐"> <i class="icon icon-editor icon-editor-shangduiqi"></i> </el-radio-button>
                            <el-radio-button label="middle" title="垂直居中"><i class="icon icon-editor icon-editor-chuizhijuzhongduiqi"></i></el-radio-button>
                            <el-radio-button label="bottom" title="底对齐"><i class="icon icon-editor icon-editor-xiaduiqi"></i></el-radio-button>
                        </el-radio-group>
                    </div>
                </el-form-item>
            </el-form>
      </div>
    </div>
</template>

<script>
// import './../../../static/editorfonts/iconfont.css'; // 引入icon
import './../Program_editorial.scss'; // 引入样式
import fontFamilyOptions from './fontFamilyOptions'; //字体列表
import fontColorOptions from './fontColorOptions'; // 颜色列表
import fontSizeOptions from './fontSizeOptions'; // 字体大小列表
import rollingDirectionOptions from './rollingDirectionOptions'; // 滚动方向
import scrollingEffectOptions from './scrollingEffectOptions'; // 滚动效果


export default {
  name:"sortText",
  props:{
      fontData:{
          default:{},
          type:Object
      },
      moxText:{
          default:false
      }
  },
  data () {
    return {
        fontCom:{
            scrollingEffect:0,
            rollingDirection:0,
            fontSize:'14',
            fontColor:"#000000",
            fontFamily:0,
            text:"文本",
            align:"left",
            valign:"top",
            lineHeight:"20"
        },
        fontFamilyOptions:fontFamilyOptions,
        fontColorOptions:fontColorOptions,
        fontSizeOptions:fontSizeOptions,
        rollingDirectionOptions:rollingDirectionOptions,
        scrollingEffectOptions:scrollingEffectOptions,
    }
  },
  watch: {
    'fontCom.fontColor'(val){// 文本颜色
      $('.pro_text_mini textarea').css('color','#'+val);
    },
    'fontCom.fontFamily'(val){// 文本字体
      fontFamilyOptions.forEach((item,index)=>{
        if (index == val) {
           $('.pro_text_mini textarea').css('font-family',item.label);
        };
      });
    },
    moxText(val){
       if (val) {this.fontCom = this.fontData;};
    }
  },
  methods:{
      subTextfontCom(cb){
          cb(this.fontCom)
      }
  },
  mounted () {
    
  }
}
</script>

<style lang="scss">
#sortModaText{
    margin-top: 10px;
    padding-left: 80px;
    .ivu-select-dropdown{
        z-index: 20001;
    }
    .el-form-item{
        margin-bottom: 10px;
    }
    .el-color-picker__trigger{
        vertical-align: -14px;
        width: 35px;
        height: 35px;
    }
}
.sort_ModaText_picker{
    z-index: 20014 !important;
}
</style>
