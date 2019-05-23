<template>
  <div class="con-box Program_editorial">
  <!-- 在线编辑器 Program_editorial --> 
      <!-- 工具栏 -->
      <div class="editor-toolbar">
          <!--  @click="addWindowList" @click="moxadd" -->
          <div class="editor-toolbar-item">
              <i class="icon icon-editor icon-editor-weibiaoti--2" @click="addWindowList"></i>
              <p>图片/视频</p>
          </div>
          <div class="editor-toolbar-item">
              <i class="icon icon-editor icon-editor-weibiaoti-_huaban" @click="addClockCom"></i>
              <p>时钟</p>
          </div>
          <div class="editor-toolbar-item">
              <i class="icon icon-editor icon-editor-weibiaoti-_huabanfuben" @click="addWeatherCom"></i>
              <p>天气</p>
          </div>
          <!-- <div class="editor-toolbar-item">
              <i class="icon icon-editor icon-editor-weibiaoti--1"></i>
              <p>网页</p>
          </div> -->
          <div class="editor-toolbar-item" @click="addTextList">
              <i class="icon icon-editor icon-editor-weibiaoti--"></i>
              <p>文本</p>
          </div>
      </div>

      <!-- 可视区域 -->
      <div class="editor-view">
          <div class="editor-canvas" :style="{backgroundColor:bgcolor,width:data.canva.width,height:data.canva.height}">
               <!-- 窗口 -->
               <template v-for="(winItem,index) in data.windowList">
                   <!-- 图片和视频 -->
                    <template v-if='winItem.vdType==0'>
                        <vue-draggable-resizable :parent="true" :active.sunc="winItem.isClass" :resizable="true" :minw="50" :minh="50" :grid="[1,1]" :w="winItem.width" :h="winItem.height"
                        :drag-handle="'.drag'+index" :x="winItem.x" :y="winItem.y" :selNameIndex="index" @activated="dragactivated" @dragging="onDrag" @resizing="onResize">
                            <div class="editor-default-photo drag" :class="'drag'+index" :id="'window_'+index" @dblclick="moxModal()"
                            :style="{backgroundImage:'url('+winItem.imagePath+')'}" style="background-repeat: no-repeat;background-size: 100% 100%;overflow: hidden;">
                                <h4 v-if="!winItem.imagePath" :id="'window_'+index" style="position: absolute;left:50%;top:50%;margin:-9px 0 0 -70px;">
                                    (窗口)双击添加素材{{winItem.width}}X{{winItem.height}}
                                </h4>
                            </div>
                        </vue-draggable-resizable>
                    </template>

                    <!-- 文本 -->
                    <template v-if='winItem.vdType==1'>
                        <vue-draggable-resizable :parent="true" :active.sunc="winItem.isClass" :resizable="true" :minw="50" :minh="50" :grid="[1,1]" :w="winItem.width" :h="winItem.height"
                        :drag-handle="'.drag'+index" :x="winItem.x" :y="winItem.y" :selNameIndex="index" @activated="dragactivated" @dragging="onDrag" @resizing="onResize">
                            <div class="drag" :class="'drag'+index" :id="'window_'+index" @dblclick="TextModal(index)"
                            :style="{backgroundImage:'url('+winItem.imagePath+')'}" style="background-repeat: no-repeat;background-size: 100% 100%;overflow: hidden;">
                                <pro-text v-if="winItem.TextCom.align" :text="winItem.TextCom.text" :align="winItem.TextCom.align"
                                :fontFamily="winItem.TextCom.fontFamily" :fontSize="winItem.TextCom.fontSize" 
                                :valign="winItem.TextCom.valign" :fontColor="winItem.TextCom.fontColor" :lineHeight="winItem.TextCom.lineHeight"></pro-text>
                            </div>
                        </vue-draggable-resizable>
                    </template>

                    <!-- 时钟 -->
                    <template v-if='winItem.vdType==2'>
                        <vue-draggable-resizable :parent="true" :resizable="true" :minw="50" :minh="50" :grid="[1,1]" :w="winItem.width" :h="winItem.height"
                        :x="winItem.x" :drag-handle="'.drag'+index" :y="winItem.y" :z="winItem.z" :selNameIndex="index" @activated="dragactivated"
                         @dragging="onDrag" @resizing="onResize" @dblclick.native="ClockModal(index)">
                            <div class='default_clock drag' :class="'drag'+index" :id="'window_'+index" v-if='winItem.clockCom.defaType==0'>(时钟)双击修改样式</div>
                            <clock-com class='drag' :class="'drag'+index" :id="'window_'+index" v-else :width="winItem.clockCom.width"
                            :fontSize="winItem.clockCom.fontSize" :fontFamily="winItem.clockCom.fontFamily" :fontColor="winItem.clockCom.fontColor"
                            :timeZone="winItem.clockCom.timeZone"></clock-com>
                        </vue-draggable-resizable>
                    </template>
                    
                    <!-- 天气 -->
                     <template v-if='winItem.vdType==3'>
                        <vue-draggable-resizable :parent="true" :minw="50" :minh="50" :grid="[1,1]" :w="winItem.width" :h="winItem.height"
                            :x="winItem.x" :y="winItem.y" :z="winItem.z" @dblclick.native="WeatherModal(index)"
                             :selNameIndex="index" @activated="dragactivated" @dragging="onDrag" @resizing="onResize">
                            <div v-if='winItem.weatherCom.defaType==0' class='default_clock drag' :class="'drag'+index" :id="'window_'+index">(天气)双击修改样式</div>
                            <weather-com class='drag' :class="'drag'+index" v-else :fontFamily="winItem.weatherCom.fontFamily" :fontColor="winItem.weatherCom.fontColor"
                            :fontSize="winItem.weatherCom.fontSize" :city="winItem.weatherCom.city"></weather-com>
                        </vue-draggable-resizable>
                    </template>

               </template>
          </div>
      </div>

      <!-- 详情描述 -->
      <div class="editor-describe">
            <p>节目名称：<span class="win-gray">{{edituserdata.editdata.showName}}</span></p>
            <p>显示分辨率：<span class="win-gray">{{edituserdata.editdata.resolution}}</span></p>
            <p>播放时长：<span class="win-gray">{{playLength|secondsFilter}}</span></p>
            <p>创建时间：<span class="win-gray">{{edituserdata.editdata.createTime|datetimeFommater}}</span></p>
            <p>设置背景色：</p>
            <div class="editor-describe-color-selections">
                    <span>{{data.default.bgcolor}}</span>
                    <i class="icon icon-editor icon-editor-yanse editoryanse"></i>
                    <el-color-picker @active-change="SelColor" color-format="hex" class="color-picker" v-model="data.default.bgcolor"></el-color-picker>
            </div>
            <div class="editor-describe-group">
                <div @click="perview()" class="editor-describe-group-item" :class="{'editor-describe-group-item-bg':playLength}">
                    <i class="icon icon-editor icon-editor-yulan"></i>
                    <p>预览</p>
                </div>
                <div @click="save()" class="editor-describe-group-item" :class="{'editor-describe-group-item-bg':playLength}" v-loading="saveloading">
                    <i class="icon icon-editor icon-editor-baocun"></i>
                    <p>保存</p>
                </div>
                <div @click="toProgram_Released()" class="editor-describe-group-item" :class="{'editor-describe-group-item-bg':playLength}">
                    <i class="icon icon-editor icon-editor-fabu"></i>
                    <p>发布</p>
                </div>
            </div>
      </div>

      <!-- 素材图层区域 -->
      <div class="editor-coverage">
          <div class="color-list">
                <div class="editor-coverage list"> 
                    <!--  v-dragging="{ item: item, list: data.windowList, group: 'item' }"  -->
                    <div class="editor_boxc list-item" :class="{winSel:item.isClass}" v-for="(item,index) in data.windowList" @click="selwinItem(item,index)">
                        <div v-if="item.imagePath" :class="'imagePathClass'+index" :style="{backgroundImage:'url('+item.imagePath+')'}" style="background-repeat: no-repeat;background-size: 100%;"></div>
                        <div v-else>
                            <span v-if='item.vdType==0'>窗口</span>
                            <span v-else-if="item.vdType==1">文本</span>
                            <span v-else-if="item.vdType==2">时钟</span>
                            <span v-else-if="item.vdType==3">天气</span>
                        </div>
                        <i class="el-icon-delete" @click="delWindow(item,index)"></i>
                    </div>
                </div>
            </div>
      </div>
    
        <!-- 弹出选择 文件 -->
      <Modal title="素材序列"
        v-model="moxModalShow" class-name="center-modal"
        :mask-closable="false">
        <mox-modal @addMaterial="addMaterialShow" :data="data.windowList[data.defaultId]"></mox-modal>
        <div slot="footer">
            <!-- <el-button size="small" @click="moxModalShow = false">取消</el-button> -->
            <el-button type="primary" @click="moxModalShowSel">确定</el-button>
        </div>
     </Modal>

      <!-- 弹出选择 文件 -->
      <Modal title="请选择节目素材"
        v-model="moxSel" class-name="center-modal"
        :mask-closable="false">
        <sort-modalitem @selSmaterMel="selSmaterMel" ref="selMater" :moxSel="moxSel"></sort-modalitem>
        <div slot="footer">
            <el-button size="small" @click="moxSel = false">取消</el-button>
            <el-button type="primary" size="small" @click="addMater()">确定</el-button>
        </div>
     </Modal>

    <!-- 弹出添加时钟 -->
    <Modal title="设置时钟"
        v-model="moxClock" class-name="center-clock"
        :mask-closable="false">
         <sort-modaclock ref='modalclock' :moxClock="moxClock" :clockData="clockData"></sort-modaclock>
        <div slot="footer">
            <el-button size="small" @click="moxClock = false">取消</el-button>
            <el-button type="primary" size="small" @click="setclock">确定</el-button>
        </div>
    </Modal>

    <!-- 弹出添加天气 -->
    <Modal title="设置天气"
        v-model="moxWeather" class-name="center-weather"
        :mask-closable="false">
         <sort-modaweather ref="modalweather" :moxWeather="moxWeather" :weatherCom="weatherCom"></sort-modaweather>
        <div slot="footer">
            <el-button size="small" @click="moxWeather = false">取消</el-button>
            <el-button type="primary" size="small" @click="setWeather">确定</el-button>
        </div>
    </Modal>

    <!-- 弹出 文本属性设置 -->
    <Modal title="文本设置"
        v-model="moxText" class-name="center-text"
        :mask-closable="false">
         <sort-text ref="TextfontCom" :fontData="fontData" :moxText="moxText"></sort-text>
        <div slot="footer">
            <el-button size="small" @click="moxText = false">取消</el-button>
            <el-button type="primary" size="small" @click="addTextCom">确定</el-button>
        </div>
    </Modal>

    <!-- <el-dialog title="预览" @close="beforeclose" custom-class="dialogpreview" :width="previewVisiblewidth" :visible.sync="previewVisible">
        <div>
            <player-show v-if="previewVisible" ref="beforeclo" :previewVisible="previewVisible"/>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button size="small" @click="beforeclose">关闭</el-button>
        </div>
    </el-dialog> -->

    <msg-box2 @close="beforeclose" custom-class="dialogpreview" :width="previewVisiblewidth" :visible.sync="previewVisible">
        <div slot="msgleft">
            <div>
             <player-show v-if="previewVisible" ref="beforeclo" :previewVisible="previewVisible" style="margin:30px auto;"></player-show>
            </div>
        </div>
        <div slot="msgright">
            <div class="al-msg-right">
                <p>节目名称：<span class="win-gray">{{edituserdata.editdata.showName}}</span></p>
                <p>显示分辨率：<span class="win-gray">{{edituserdata.editdata.resolution}}</span></p>
                <p>播放时长：<span class="win-gray">{{playLength|secondsFilter}}</span></p>
                <p>创建时间：<span class="win-gray">{{edituserdata.editdata.createTime|datetimeFommater}}</span></p>
            </div>
        </div>
    </msg-box2>
  </div>
</template>

<script>
import './../../../static/editorfonts/iconfont.css'; // 引入icon
import './Program_editorial.scss'; // 引入样式
import VueDraggableResizable from './../../components/vue-draggable-resizable.vue'
import sortModalitem from './components/sortModalitem.vue';
import moxModal from './components/moxModal.vue';
import proText from './components/proText.vue';
import {mapGetters,mapMutations} from 'vuex';
import types from './../../store/mutation-types';
import {updatemyshow} from './../../api/ProgramReleased'; // 修改接口地址
import playerShow from './player.vue'

import fontFamilyOptions from './components/fontFamilyOptions';
import clockCom from './components/clock.vue'; // 时钟
import weatherCom from './components/weather.vue';  // 天气
import sortModaclock from './components/sortModaclock.vue'; //  时钟属性弹出
import sortModaweather from './components/sortModaWeather.vue'; // 天气属性弹出
import sortText from './components/sortText.vue'; //  文本属性弹出

  export default {
    data() {
      return {
        setEditShow:false,
        fontFamilyOptions:fontFamilyOptions,
        moxModalShow:false,
        previewVisible:false,
        moxClock:false,
        moxWeather:false,
        moxText:false,
        previewVisiblewidth:'',
        playLength:0,  // 总播放时长
        bgcolor: '#F5F5F5',
        data:{
            windowList:[],// {materData:[]}
            clock:{},// width:200,// height:200, // x:0, // y:0
            weather:{},
            default:{
                photo:false,
                bgcolor:'#F5F5F5'
            },
            canva:{width:'',height:''},
            materData:[],
            defaultId:0,
            defaultindex:'',
            dblIndex:0 // 双击后的索引
        },
        moxSel:false,
        maLists:new Set(),
        width: 0,
        height: 0,
        x: 0,
        y: 0,
        zIndex:10,
        midalDataer:{},
        saveloading:false,
        fontData:{},  // 设置文本 内 object
        clockData:{},  // 时钟内 内的data
        weatherCom:{}  // 天气内的 data
      };
    },
    computed:{...mapGetters(['edituserdata','userInfo'])},
    components: {
        VueDraggableResizable,sortModalitem,playerShow,moxModal,proText,weatherCom,clockCom,
        sortModaclock,sortModaweather,sortText
    },
    watch: {
        moxModalShow(val){
            // 每次关闭的时候 都去计算一下 自身最长的播放时间
            if (!val) {
                var playLeng=[];
                this.data.windowList.forEach(item=>{
                    var sliderTime=0;
                    item.materData.forEach(ite=>{
                        sliderTime+=ite.sliderTime*1;
                    });
                    playLeng.push(sliderTime);
                });
                this.playLength=Math.max.apply(null,playLeng);
            }
        }
    },
    methods: {
        ...mapMutations({
          EDIT_USERDATA:types.EDIT_USERDATA
        }),
        onResize(x, y, width, height,id,index) {//拖拽改变大小
            try{
                // console.log(this.data.defaultId);
                if(this.data.defaultId>=0){
                    // var windowList= JSON.parse(JSON.stringify( this.data.windowList))
                    this.data.windowList[index].x=x;
                    this.data.windowList[index].y=y;
                    this.data.windowList[index].width=width;
                    this.data.windowList[index].height=height;
                }
                
            }catch(err){
                console.log(err)
            }
        },
        onDrag(x, y,id,index) {//拖拽改变位置
              try{
                    // var windowList= JSON.parse(JSON.stringify( this.data.windowList));
                    this.data.windowList[index].x=x;
                    this.data.windowList[index].y=y;
              }catch(err){
                console.log(err)
              }
        },
        dragactivated(elid){//拖拽点击后获取 index 标记
            // 如果 选中文本层
                this.data.defaultId=Number(elid);
                this.data.windowList.forEach(item=>{
                    item.isClass=false;
                });
                this.data.windowList[Number(elid)].isClass=true;
        },
        // 改变背景颜色
        SelColor(val){
          this.bgcolor = val;
        },
        // 添加 窗口
        addWindowList(){
            var typeOne = [];
            typeOne=this.data.windowList.filter(item=>{
                if(item.vdType==0){return item;};
            });
            if (typeOne.length<3) {
                // vdType  0 视频图片....  1 文本域
                this.data.windowList.push({
                    isClass:false,
                    vdType:"0",
                    height:200,
                    width:200,
                    zIndex:this.zIndex++,
                    x:0,
                    y:0,
                    materData:[],
                    TextCom:{},
                    weatherCom:{},
                    clockCom:{}
                });  
                
            }else{
                this.$message({
                    type:"warning",
                    message:"图片视频最多添加3个！"
                })
            }
        },
        // 删除 窗口
        delWindow(item,index){
            this.$confirm('是否确认要删除选定的窗口?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                customClass:"centerMsgBox"
            }).then(() => {
              this.data.windowList.splice(index,1);
            });
        },
        // 点击 弹出选择 素材的序列
        moxModal(){
            this.moxModalShow=true;
        },
        // 弹出 选择图片 视频的 面板
        moxadd(){
            this.moxSel = true;
        },
        // 得到添加素材  是否显示
        addMaterialShow(state){
            this.moxSel=state;
        },
        // 选择素材后返回资源的 信息
        selSmaterMel(row){
            // console.log(row);
            this.midalDataer=row;
        },
        // 添加 素材
        addMater(){
            this.$refs.selMater.addSelSmaterMel((Mater)=>{
                if (!Mater.length) {
                  this.$message('请选择素材！')
                    return;
                };
                console.log(Mater)
                var self =this;
                self.zIndex++;
                this.midalDataer.zIndex = this.zIndex;
                var materData=JSON.parse(JSON.stringify(this.data.windowList[this.data.defaultId].materData));
                Mater.forEach(item=>{  materData.push(item);})
                this.data.windowList[this.data.defaultId].materData=materData
                this.data.windowList[this.data.defaultId].imagePath=materData[0].imagePath;
                
                
                // drag
                this.midalDataer={};
                this.moxSel = false;

               var dragBg=document.querySelector(`.drag${this.data.defaultId}`);
                dragBg.style.backgroundImage='url("'+materData[0].imagePath+'")';
                var imagePathClassBg= document.querySelector(`.imagePathClass${this.data.defaultId}`);
                imagePathClassBg.style.backgroundImage='url("'+materData[0].imagePath+'")';
            });
        },
        moxModalShowSel(){
                this.moxModalShow=false;
                // // 修改 窗口和 内容 窗口的图片显示
                var materData = this.data.windowList[this.data.defaultId].materData;
                var dragBg=document.querySelector(`.drag${this.data.defaultId}`);
                dragBg.style.backgroundImage='url("'+materData[0].imagePath+'")';
                var imagePathClassBg= document.querySelector(`.imagePathClass${this.data.defaultId}`);
                imagePathClassBg.style.backgroundImage='url("'+materData[0].imagePath+'")';
        },
        // 预览
        perview(){
            // console.log(this.data.clock);
            if(!this.playLength){
                return;
            }
             var materialIdarr=[]
            this.data.windowList.forEach(item=>{
                item.materData.forEach(ite=>{
                    materialIdarr.push(ite.materialId)
                });
            });
            var makeShow={
                windowList:this.data.windowList,
                clock:this.data.clock,
                weather:this.data.weather
            };

            var savadata={
                id:this.edituserdata.editdata.id,
                deviceId:'',
                playLength:this.playLength,
                showProportion:'',
                backColor:this.data.default.bgcolor,
                materialId:String(materialIdarr),
                times:'',
                startDate:'',
                endDate:'',
                startTime:'',
                endTime:'',
                makeShow:JSON.stringify(makeShow),
                width:this.data.canva.width,
                height:this.data.canva.height
            };
            this.storage.set('editdataemy',savadata,true);

            this.previewVisiblewidth= parseInt(this.data.canva.width)+40+'px';
            this.previewVisible=true;
        } ,
        // 关闭预览
        beforeclose(){
            // console.log(12)
            // console.log( this.$refs.beforeclo)
            this.$refs.beforeclo.editpreviewVisible()
            this.previewVisible=false;
        },
        //   保存
        save(){
            if(!this.playLength){
                return;
            }
            this.editdatemyshow();
        },
        toProgram_Released(){
            this.editdatemyshow(); //保存
            this.$router.push('Program_Released');
        },
        // 保存接口
        editdatemyshow(){
            var materialIdarr=[]
            var image=0,play=0,word=0;

            this.data.windowList.forEach(item=>{
                item.materData.forEach(ite=>{
                    materialIdarr.push(ite.materialId);
                    if (ite.materialType==0) {
                       image+=1; 
                    }else if(ite.materialType==1){
                        play+=1;
                    }
                });
                if (item.TextCom.align) {
                  word+=1;
                }
            });
            var makeShow={
                windowList:this.data.windowList
            }
            var savadata={
                id:this.edituserdata.editdata.id,
                deviceId:'',
                playLength:this.playLength,
                showProportion:'',
                backColor:this.data.default.bgcolor,
                materialId:String(materialIdarr),
                times:'',
                makeShow:JSON.stringify(makeShow),
                image,
                play,
                word,
            };

            var edituserdata =JSON.parse(JSON.stringify(this.edituserdata.editdata));

            edituserdata.playLength=this.playLength;
            edituserdata.makeShow=JSON.stringify(makeShow);

            this.storage.set('editdataemy',savadata,true);
            this.storage.set('edituserdata.editdata',edituserdata,true);

            this.saveloading=true;
            updatemyshow(savadata).then((data) => {
                if (data.success) {
                    this.$message({type:'success',message:data.msg});
                }else{
                    this.$message({type:'success',message:data.msg});
                };
                this.saveloading=false;
            }).catch((err) => {
               this.saveloading=false;
               this.$message({type:'warning',message:'保存失败，请重新保存!'}) 
            })
        },
        // 添加文本
        addTextList(){
            var typeOne = [];
            typeOne=this.data.windowList.filter(item=>{
                if(item.vdType==1){return item;};
            });
            if (typeOne.length>2) {
                this.$message({type:"warning",message:"文本最多只能添加3个！"});
                return;
            };
            // vdType  0 视频图片....  1 文本域   2 时钟  3 天气
            this.data.windowList.push({
                isClass:false,
                vdType:"1",
                height:100,
                width:100,
                zIndex:10000,
                x:0,
                y:0,
                materData:[],
                clockCom:{},
                weatherCom:{},
                TextCom:{
                    scrollingEffect:0,
                    rollingDirection:0,
                    fontSize:'14',
                    fontColor:"#000000",
                    fontFamily:0,
                    text:"文本",
                    align:"left",
                    valign:"top",
                    lineHeight:"20"
                }
            });
        },
        // 文本弹框 显示
        TextModal(index){
            this.fontData = this.data.windowList[index].TextCom;
            this.data.dblIndex = index;
            this.moxText = true;
        },
        //文本弹框 确定
        addTextCom(){
            this.$refs['TextfontCom'].subTextfontCom(data=>{
                this.data.windowList[this.data.dblIndex].TextCom = data;
                this.moxText = false;
            });
        },
        // 删除文本 
        delFontCom(){
           if (this.data.defaultId==0||this.data.defaultId) {
              this.data.windowList[this.data.defaultId].TextCom={};
           }else{
             this.$message({type:'error',message:"请选中一个窗口"});
           } 
        },
        // 添加时钟
        addClockCom(){
            var typeOne = [];
            typeOne=this.data.windowList.filter(item=>{
                if(item.vdType==2){return item;};
            });
            if (typeOne.length>0) {
                this.$message({type:"warning",message:"时钟最多只能添加1个！"});
                return;
            };
            this.data.windowList.push({
                isClass:false,
                vdType:"2",
                height:100,
                width:100,
                zIndex:10000,
                x:0,
                y:0,
                materData:[],
                TextCom:{},
                weatherCom:{},
                clockCom:{
                    timeZone:0,
                    styleType:1,
                    fontFamily:0,
                    defaType:0,
                    width:150,
                    height:64,
                    fontSize:"20",
                    fontColor:"#000000",
                    x:0,
                    y:0,
                    z:1000,
                    time:''
                }
            });
        },
        // 时钟弹出框显示
        ClockModal(index){
            this.clockData = this.data.windowList[index].clockCom;
            this.data.dblIndex = index;
            this.moxClock=true;
        },
        // 时钟 弹出确定
        setclock(){
            this.$refs['modalclock'].ModalClock(data=>{
                this.data.windowList[this.data.dblIndex].clockCom.timeZone=data.timeZone;
                this.data.windowList[this.data.dblIndex].clockCom.styleType=data.styleType;
                this.data.windowList[this.data.dblIndex].clockCom.fontFamily=data.fontFamily;
                this.data.windowList[this.data.dblIndex].clockCom.fontColor=data.fontColor;
                this.data.windowList[this.data.dblIndex].clockCom.fontSize=data.fontSize;
                this.data.windowList[this.data.dblIndex].clockCom.defaType=1;
                this.moxClock=false;
            });
        },
        // 添加天气组件
        addWeatherCom(){
            // 0 图片视频  1 文本  2 时钟  3天气
            var typeOne = [];
            typeOne=this.data.windowList.filter(item=>{
                if(item.vdType==3){return item;};
            });
            if (typeOne.length>0) {
                this.$message({type:"warning",message:"天气最多只能添加1个！"});
                return;
            };
            this.data.windowList.push({
                isClass:false,
                vdType:"3",
                height:100,
                width:100,
                zIndex:10000,
                x:0,
                y:0,
                materData:[],
                TextCom:{},
                clockCom:{},
                weatherCom:{
                    styleType:1,
                    fontFamily:0,
                    defaType:0,
                    width:150,
                    height:64,
                    fontSize:"20",
                    fontColor:"#000000",
                    x:0,
                    y:0,
                    z:1000,
                    time:'',
                    city:"",
                    province:"",
                    countries:"中国"
                }
            });
        },
        // 天气弹框 显示
        WeatherModal(index){
            this.data.windowList[index].weatherCom.width = this.data.windowList[index].width;
            this.data.windowList[index].weatherCom.height = this.data.windowList[index].width;
            this.weatherCom = this.data.windowList[index].weatherCom;
            this.data.dblIndex = index;
            this.moxWeather=true;
        },
        // 天气弹框确定
        setWeather(){
            this.$refs["modalweather"].weatherCb(data=>{
                this.data.windowList[this.data.dblIndex].weatherCom.styleType=data.styleType;
                this.data.windowList[this.data.dblIndex].weatherCom.fontFamily=data.fontFamily;
                this.data.windowList[this.data.dblIndex].weatherCom.fontColor=data.fontColor;
                this.data.windowList[this.data.dblIndex].weatherCom.fontSize=data.fontSize;
                this.data.windowList[this.data.dblIndex].weatherCom.width=data.width;
                this.data.windowList[this.data.dblIndex].weatherCom.height=data.height;
                this.data.windowList[this.data.dblIndex].width = data.width*1;
                this.data.windowList[this.data.dblIndex].height = data.height*1;
                this.data.windowList[this.data.dblIndex].weatherCom.city=data.city;
                this.data.windowList[this.data.dblIndex].weatherCom.province=data.province;
                this.data.windowList[this.data.dblIndex].weatherCom.countries=data.countries;
                this.data.windowList[this.data.dblIndex].weatherCom.defaType=1;
                var windowList = JSON.parse(JSON.stringify(this.data.windowList));
                this.data.windowList = windowList;
                this.moxWeather=false;
            });
        },
        //选中 待删除的窗口
        selwinItem(item,index){
            //  this.delWindow(item,index)
            // consol e.log(this.data.windowList);
            this.data.windowList.forEach(item=>{item.isClass=false;});
            this.data.windowList[index].isClass=true;

            setTimeout(()=>{
                var selClass='.selNameIndex'+index;
                // console.log(selClass)
                if(this.data.defaultId>=-3){
                    // console.log(this.data.defaultId)
                    document.querySelectorAll('.draggable').forEach(item=>{  item.style.zIndex=10;  });
                    document.querySelector([selClass]).style.zIndex=20;
                };
            },20)
            
        }
    },
    mounted () {
        // 使用 delete 删除窗口
        window.addEventListener('keyup',(e)=>{
            if (e.keyCode==46) {
                this.data.windowList.forEach((item,index)=>{
                    if (item.isClass) {
                        this.delWindow(item,index)
                    };
                });
            };
        })
        // 获取 本地 储存的 进行 vuex 储存
        this.EDIT_USERDATA(this.storage.get('edituserdata.editdata',1000*1000*1000*1000,true));
        this.playLength = this.edituserdata.editdata.playLength;

        setTimeout(() => {
                this.data.canva.width = this.edituserdata.editdata.resolution.split("*")[0]+'px !important'; // 8像素的边框
                this.data.canva.height = this.edituserdata.editdata.resolution.split("*")[1]+'px !important'; // 8像素边框
                if (this.edituserdata.editdata.makeShow) {
                    var makeShow=JSON.parse(this.edituserdata.editdata.makeShow);
                    this.data.windowList = makeShow.windowList;
                }
        }, 20);
      
    }
  }
</script>

<style lang="scss" scoped>


::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    background-color: #ddd;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
}

::-webkit-scrollbar-thumb {
    background-color: #777;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
}

</style>


