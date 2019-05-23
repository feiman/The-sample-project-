<template>
      <div class="editor-modal-de">
            <div class="editor-modal_tab">
                <a href="javascript:;" class="tabs-items" :class="{reVcolor:itemsisActive=='0px'}" 
                @click="itemsisActive='0px'">我的素材</a>
                <a href="javascript:;" class="tabs-items" :class="{reVcolor:itemsisActive=='92px'}" 
                @click="itemsisActive='92px'">在线素材</a>
                <i class="itemsisActive" :style="{left:itemsisActive}"></i>
            </div>

            <!-- 素材列表 -->
            <div class="editor-modal-materlist">
                <!-- 我的素材 -->
                <el-form :inline="true" size="mini" v-show="itemsisActive!='92px'">
                    <el-form-item label="分组名称：">
                        <Select v-model="subdata.groupName" style="width:100px" class="con-maleft" placeholder="全部">
                            <Option v-for="item in groupList" :value="item.groupName" :key="item.groupName">{{ item.groupName }}</Option>
                        </Select>
                    </el-form-item>
                    <el-form-item label="名称：">
                        <el-input size="small" v-model="subdata.name" style="width:140px;" class="modal_input_ri"></el-input>
                    </el-form-item>
                    <el-form-item>
                       <el-button size="small" type="primary" icon="el-icon-search" @click="getmymaterial">搜索</el-button>
                    </el-form-item>
                </el-form>
                    <div class="_marter_list" v-show="itemsisActive!='92px'" v-loading='loadinger'>
                        <van-list v-model="loading" class="_marter_list" :finished="finished" @load="onLoad">
                            <div class="_mater_list_box" v-for="(item,index) in materList.list"
                                :class="{is_active_mater_box:item.isClass}" @click="selSmater(item,index,1)">
                                <div class="_mater-img">
                                    <template v-if="item.materialType">
                                        <img :src="item.playImg">
                                        <i class="icon iconfont icon-play _mater-img-replay"></i>
                                    </template>
                                    <template v-else><img :src="item.imagePath">  </template>
                                </div>

                                <div class="_mater_content">
                                    <p class="win-panel-boxtext" :title="item.name">{{item.name}}</p>
                                    <p class="win-panel-boxtext" :title="item.groupName">分组名称：<span class="win-gray">{{item.groupName}}</span></p>
                                    <p class="win-panel-boxtext">分辨率：<span class="win-gray">{{item.resolution}}</span></p>
                                    <p class="win-panel-boxtext">大小：<span class="win-gray">{{item.size|filterfilesize}}</span></p>
                                    <!-- <p>上传时间：<span class="win-gray">{{item.createTime|datetimeFommater}}</span></p> -->
                                </div>
                            </div>
                        </van-list>
                        <div class="_kon" v-if="!materList.list.length">暂无素材</div>
                    </div>
                <!-- 我的素材 -->

                <!-- 在线素材库 -->
                <div class="_marter_list" v-show="itemsisActive=='92px'" v-loading="loadinger">
                    <van-list v-model="loading" class="_marter_list" :finished="finished" @load="onLoad">
                    <div class="_mater_list_box" v-for="(item,index) in materListTemplate.list"
                         :class="{is_active_mater_box:item.isClass}" @click="selSmater(item,index,2)">
                        <div class="_mater-img">
                            <template v-if="item.materialType">
                                <img :src="item.playImg">
                                  <i class="icon iconfont icon-play _mater-img-replay"></i>
                            </template>
                            <template v-else><img :src="item.imagePath">  </template>
                        </div>

                        <div class="_mater_content">
                            <p class="win-panel-boxtext" :title="item.name">{{item.name}}</p>
                            <p class="win-panel-boxtext">分辨率：<span class="win-gray">{{item.resolution}}</span></p>
                            <p class="win-panel-boxtext">大小：<span class="win-gray">{{item.size|filterfilesize}}</span></p>
                            <p>上传时间：<span class="win-gray">{{item.createTime|datetimeFommater}}</span></p>
                        </div>
                    </div>
                    </van-list>
                    <div class="_kon" v-if="!materListTemplate.list.length">暂无素材</div>
                </div>
                <!-- 在线素材库 -->
            </div>
            <!-- 高度 宽度 时间 效果 -->
            <el-form :inline="true" size="mini" label-width="80px" class="form_de" id="form_de" style="text-align:center;margin-top: 20px;">
                <!-- <el-form-item label="X坐标：">
                    <el-input size="small" type="number" v-model="x" class="modal_input_ri"></el-input><span class="resize10">Px</span>
                </el-form-item>
                <el-form-item label="Y坐标：">
                    <el-input size="small" type="number" v-model="y" class="modal_input_ri"></el-input><span class="resize10">Px</span>
                </el-form-item>
                <el-form-item label="宽度：">
                    <el-input size="small" type="number" v-model="width" class="modal_input_ri"></el-input><span class="resize10">Px</span>
                </el-form-item>
                <el-form-item label="高度：">
                    <el-input size="small" type="number" v-model="height" class="modal_input_ri"></el-input><span class="resize10">Px</span>
                </el-form-item> -->
                <el-form-item label="切换时间：">
                    <el-input size="small" type="number" v-model="sliderTime" class="modal_input_ri"></el-input><span class="resize10">秒</span>
                </el-form-item>
                <el-form-item label="切换效果：">
                    <Select v-model="sliderType" class="modal_input_ri" placeholder="切换效果" style="width:150px;text-align:left;">
                        <Option v-for="item in sliderList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
              </el-form-item>
            </el-form>
        </div>
</template>

<script>
import {findmymaterial,findmaterialgroup,findonlinematerial} from './../../../api/ProgramReleased';
import {mapGetters,mapMutations} from 'vuex';
import adimaters from './animates';

export default {
    name:'sortModalitem',
    props:["moxSel"],
    data(){
        return {
            x:0,
            y:0,
            width:"",
            height:"",
            sliderTime:6,
            sliderType:1,
            itemsisActive:'0px',
            sliderList:adimaters,
            materList:{
                list:[]
            },
            materListTemplate:{list:[]},
            loading:false,
            maLists:{},
            groupList:[],
            subdata:{
                pageNum:'',
                pageSize:'10',
                userId:'',
                groupName:'',
                stime:'',
                etime:'',
                name:''
            },
            finished: false,
            loadinger:false,
            ipage:1,
            rpage:1
        }
    },
    computed:{...mapGetters(['userInfo'])},
    methods:{
        // 查询我的素材
        getmymaterial(){
            this.subdata.userId = this.userInfo.id;
            this.loadinger=true;
            var subdata = JSON.parse(JSON.stringify(this.subdata));
            if (subdata.groupName=="全部") {
                subdata.groupName="";
            }
            findmymaterial(subdata).then(data=>{
                if (data.success) {
                    data.data.list.forEach((item, index) => {
                        item.isClass=false;
                    });
                    this.materList=data.data;
                }else{
                    this.materList.list=[];
                }
                this.loadinger=false;
            }).catch((err) => { this.loadinger=false;});
        },
        addSelSmaterMel(cb){
              // 如果是视频 1视频  0图片
            var midalData=[];

            this.materList.list.forEach(item=>{
                if (item.isClass) {
                    var defaultData={ // modal 中的数据
                        x:0,
                        y:0,
                        width:'',
                        height:'',
                        sliderTime:'6', // 播放时长  默认为6
                        sliderType:"fadeIn fadeOut", // 切换效果 默认为淡入淡出 classname
                        materialType:0,  // 资源类型 0图片 1视频
                        materialId:'',// 素材原本的id 
                        urlPath:'',
                        rateDeg:'',
                        imagePath:'',
                        materialFormat:'',
                        name:'',
                        isClass:false
                    }; 
                    defaultData.materialType=item.materialType;
                    defaultData.name=item.name;
                    defaultData.sliderType=this.sliderType;
                    if (item.materialType==1) {
                        defaultData.sliderTime=item.showTime;
                        defaultData.urlPath = item.imagePath;
                        defaultData.imagePath = item.playImg;
                    }else{
                        defaultData.sliderTime=this.sliderTime;
                        defaultData.urlPath = item.imagePath;
                        defaultData.imagePath = item.imagePath;
                    };
                    defaultData.materialFormat=item.materialFormat;
                    defaultData.materialId =item.materialId;
                    let resolution = item.resolution.split('*');
                    defaultData.width=resolution[0];
                    defaultData.height=resolution[1];

                    midalData.push(defaultData);
                }
            });
            this.materListTemplate.list.forEach(item=>{
                if (item.isClass) {
                    var defaultData={ // modal 中的数据
                        x:0,
                        y:0,
                        width:'',
                        height:'',
                        sliderTime:'6', // 播放时长  默认为6
                        sliderType:"fadeIn fadeOut", // 切换效果 默认为淡入淡出 classname
                        materialType:0,  // 资源类型 0图片 1视频
                        materialId:'',// 素材原本的id 
                        urlPath:'',
                        rateDeg:'',
                        imagePath:'',
                        materialFormat:'',
                        name:'',
                        isClass:false
                    }; 
                    defaultData.materialType=item.materialType;
                    defaultData.name=item.name;
                    defaultData.sliderType=this.sliderType;
                    if (item.materialType==1) {
                        defaultData.sliderTime=item.showTime;
                        defaultData.urlPath = item.imagePath;
                        defaultData.imagePath = item.playImg;
                    }else{
                        defaultData.sliderTime=this.sliderTime;
                        defaultData.urlPath = item.imagePath;
                        defaultData.imagePath = item.imagePath;
                    };
                    defaultData.materialFormat=item.materialFormat;
                    defaultData.materialId =item.materialId;
                    let resolution = item.resolution.split('*');
                    defaultData.width=resolution[0];
                    defaultData.height=resolution[1];

                    midalData.push(defaultData);
                }
            });
          
            cb(midalData)
        },
         // 选择 素材 
        selSmater(item,index,type){
            // 如果 选中 合理的做成单选
            if(type==1){
                 this.materList.list[index].isClass = !this.materList.list[index].isClass;
            }else{
                this.materListTemplate.list[index].isClass =  !this.materListTemplate.list[index].isClass;
            }
        },
         //  查询素材分组
        getfindmaterialgroup(){
            findmaterialgroup({userId:this.userInfo.id,groupName:'',pageNum:1,pageSize:1000}).then(data=>{
                if (data.success) {
                    data.data.list.push({"groupName":"全部","createTime":'',"materialGroupId":'',"updateTime":'',"remark":" ","delFlag":'',"userId":''})
                    this.groupList=data.data.list;
                }
            });
        },
        // 查询在线素材库
        getMaterialTemplate(){
            this.loadinger=true;
            findonlinematerial({ pageNum:1, pageSize:'',}).then((data) => {
                if (data.success) {
                      data.data.list.forEach((item, index) => {
                        item.isClass=false;
                        item.materialType = item.resourceType;
                        item.materialFormat=item.resourceFormat;
                        item.name=item.resourceName;
                        item.playImg=item.thumbnail;
                        item.imagePath = item.resourceUrl;
                        item.materialId = item.id;
                    });
                    this.materListTemplate=data.data;
                }else{
                    this.materListTemplate.list = [];
                }
                this.loadinger=false;
            }).catch((err) =>this.loadinger=false);
        },
        // 底部加载
        onLoad(){
            // 当前页 与 总页 同等时  不加载
            if (this.materList.pages == this.materList.pageNum) {
                this.finished = true;
                this.loading=false;
                return;
            };
            this.subdata.pageNum = this.materList.pageNum+1;
            if(this.itemsisActive=='0px'){
                findmymaterial(this.subdata).then(data=>{
                    if (data.success) {
                        data.data.list.forEach((item, index) => {
                            item.isClass=false;
                            this.materList.list.push(item)
                        });
                    }
                    this.finished = true;
                    this.loading=false;
                }).catch((err) => { this.loading=false;});
            }else{
                this.loading=true;
                findonlinematerial({ pageNum:1, pageSize:'',}).then((data) => {
                    if (data.success) {
                        data.data.list.forEach((item, index) => {
                            item.isClass=false;
                            item.materialType = item.resourceType;
                            item.materialFormat=item.resourceFormat;
                            item.name=item.resourceName;
                            item.playImg=item.thumbnail;
                            item.imagePath = item.resourceUrl;
                            item.materialId = item.id;
                            this.materListTemplate.list.push(item)
                        });
                        this.finished = true;
                    }
                    this.loading=false;
                }).catch((err) =>this.loading=false);
            };
        }
    },
    mounted () {
        this.$dragging.$on('dragged', ({ value }) => {
           this.materList.list=[];
            setTimeout(() => {
                  this.materList.list=value.list;
            }, 20);
        })
        this.getmymaterial();
        this.getfindmaterialgroup();
    },
    watch:{
        moxSel(val){
            if (!val) {
                this.midalData=new Set();
                this.materList.list.forEach(item=>item.isClass=false);
            };
        },
        itemsisActive(val){
            if(val==="0px"){
                this.getmymaterial();
            }else{
                this.getMaterialTemplate();
            }
        }
    }
}
</script>


<style lang="scss">

#form_de .el-input.is-disabled .el-input__inner{
    color:#666 !important;
}

</style>
