<template>
    <div id="playerid" :style="{width:editdataemy.width,height:editdataemy.height,backgroundColor:editdataemy.backColor}">
            <div v-for="(item,index) in makeShow" :style="{width:item.width+'px',height:item.height+'px',left:item.x+'px',top:item.y+'px',zIndex:item.zIndex}" style="overflow: hidden;position:absolute;">
                <div style="position:relative;">
                    <!-- 文本视频 -->
                    <template v-if="item.vdType==0">
                        <template v-for="ite in item.materData">
                            <div v-if="ite.materialType==1" :class="{[ite.classNameIn]:ite.player_hiden,[ite.classNameOut]:!ite.player_hiden}" class="animated"
                            :style="{width:item.width+'px',height:item.height+'px'}" style="position:absolute;left:0;top:0;">
                                <video-player ref="videoPlayer" v-if="ite.player_hiden" :options="ite.playerOptions" :playsinline="true" >
                                </video-player>
                            </div>
                            <div v-else-if="ite.materialType==0" :class="{[ite.classNameIn]:ite.player_hiden,[ite.classNameOut]:!ite.player_hiden}" class="animated"
                            :style="{width:item.width+'px',height:item.height+'px'}" style="position:absolute;left:0;top:0;">
                                <img :src="ite.urlPath" :style="{width:item.width+'px',height:item.height+'px'}">
                            </div>
                        </template>
                     </template>
                    <!-- 文本 -->
                     <template v-else-if="item.vdType==1">
                        <pro-text :text="item.TextCom.text" :align="item.TextCom.align" :valign="item.TextCom.valign" :fontSize="item.TextCom.fontSize"
                    :fontFamily="item.TextCom.fontFamily" :fontColor="item.TextCom.fontColor" :lineHeight="item.TextCom.lineHeight"></pro-text>
                    </template>
                    
                    <!-- 时钟 -->
                    <template v-else-if="item.vdType==2">
                        <clock-com :width="item.clockCom.width"
                            :fontSize="item.clockCom.fontSize" :fontFamily="item.clockCom.fontFamily" :fontColor="item.clockCom.fontColor"
                            :timeZone="item.clockCom.timeZone"></clock-com>
                    </template>

                    <!-- 天气 -->
                    <template v-else-if="item.vdType==3">
                        <weather-com :fontFamily="item.weatherCom.fontFamily" :fontColor="item.weatherCom.fontColor"
                            :fontSize="item.weatherCom.fontSize" :city="item.weatherCom.city"></weather-com>
                    </template>
                </div>

            </div>
    </div>
</template>

<script>
import 'video.js/dist/video-js.css';
import { videoPlayer } from 'vue-video-player';
import proText from './components/proText.vue';
import animates from './components/animates';
import weatherCom from './components/weather.vue';
import clockCom from './components/clock.vue';

    export default {
        props:['previewVisible'],
        data() {
            return {
                bocl:{},
                Visible:false,
                editdataemy:{},
                makeShow:[],
                playerOptions:{
                    muted: true,
                    languages: 'zh',
                    width:'224',
                    height:'756',
                    sources: [{
                        type: "application/x-mpegURL",
                        src:'http://oz6haf75u.bkt.clouddn.com/1526537575593QQ%E5%9B%BE%E7%89%8720180312134326.jpg?imageMogr2/rotate/0'
                    }],
                    techOrder: ['html5','flash'],
                    autoplay: true,
                    controls: false,
                    poster:'',
                }
            }
        },
        watch:{
            previewVisible(val){
                this.Visible=this.previewVisible
                if (this.Visible) {
                    this.initplayer();
                }
            }
        },
        components: {  videoPlayer,proText,weatherCom,clockCom},
        methods:{
         clearshow(index,{sliderTime},itex){
             setTimeout(() => {
                // console.log("********************************************")
                let time=0;
                time = sliderTime*1000;  // 当前单位的时间  }
                var oldtime=0;
                if (itex>0) {
                    for (var i = 0; i < itex; i++) {
                        oldtime+=this.makeShow[index].materData[i].sliderTime*1000;
                    }
                }
                // console.log(oldtime)
                // console.log(oldtime+time)
                // console.log("********************************************")
                setTimeout(() => {
                    // console.log(sliderTime);
                    // console.log(index,itex)
                    // console.log(sliderTime*(itex+1)*1000)
                     this.makeShow[index].materData[itex].player_hiden=false;
                    if ( this.makeShow[index].materData[itex+1]) {
                     this.makeShow[index].materData[itex+1].player_hiden=true;
                    }else{
                        if (this.Visible) {
                          this.replayer(index);
                        };
                    };
                    // console.log(this.makeShow[index].materData[itex].player_hiden)
                },oldtime+time);
             }, 10);
         },
         replayer(index){
             this.makeShow[index].materData[0].player_hiden=true;
             this.makeShow[index].materData.forEach((item,itex)=>{
                 this.clearshow(index,JSON.parse(JSON.stringify(item)),itex)
             });
         },
         initplayer(){
            var editdataemy= this.storage.get('editdataemy',1000*1000*1000*1000,true);
            if (editdataemy) {
                this.editdataemy=editdataemy;
                // console.log(editdataemy)
                var makeShow = JSON.parse(editdataemy.makeShow);
                // console.log(makeShow)
                var windowList= JSON.parse(JSON.stringify(makeShow.windowList));
                this.bocl=makeShow;

                windowList.forEach((item,index)=>{
                    item.materData.forEach((ite,itex) => {
                        if (itex===0) {// 是否隐藏
                            ite.player_hiden=true;
                            // console.log(1231)
                        }else{  
                            // console.log(12313)
                            ite.player_hiden=false; 
                        };
                        if (ite.materialType == 1) { // 0图片 1视频 
                                // if (ite.width*1 >parseInt(this.editdataemy.width)) {
                                //     ite.width=String(parseInt(this.editdataemy.width));
                                //     ite.height=String(parseInt(this.editdataemy.height));
                                // }
                            ite.playerOptions={
                                languages: 'zh',
                                width:item.width,
                                height:item.height,
                                auto:true,
                                sources: [{
                                    type: "application/x-mpegURL",
                                    src:ite.urlPath + '?avvod/m3u8/vb/1000k'
                                }],
                                techOrder: ['html5'],
                                autoplay: true,//自动播放
                                controls:false,
                                poster:ite.imagePath,
                            };
                        }else if(ite.materialType==0){
                            if (ite.width >parseInt(this.editdataemy.width)) {
                                ite.width=String(parseInt(this.editdataemy.width));
                                ite.height='auto';
                            };
                        };
                        let className="";
                        animates.forEach(aim=>{
                            if(aim.value==ite.sliderType){className=aim.className};
                        });
                        ite.classNameIn=className.in;
                        ite.classNameOut=className.out;
                        this.clearshow(index,JSON.parse(JSON.stringify(ite)),itex)
                    });
                });
                // console.log(windowList)
                this.makeShow=windowList;
           };
         },
         editpreviewVisible(){
             this.Visible=false;
         }
        },
        mounted () {
            // console.log(this.previewVisible);
            this.Visible=this.previewVisible
            if (this.Visible) {
                 this.initplayer();
            };
        }
    }
</script>

<style lang="scss">
    
    #playerid{
        overflow: hidden;
        position:relative;
        border:1px solid #ddd;
        >div{
            position: absolute;
            -webkit-animate-duration: 4s;
            -webkit-animate-delay: 4s;
        }
    }
    
    .player_hiden{
        display:none !important;
    }

      ::-webkit-scrollbar {
            width: 0px;
            height: 0px;
            background-color: #ddd;
            -webkit-border-radius: 4px;
            -moz-border-radius: 4px;
            border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb {
            background-color: #ff7c4c;
            -webkit-border-radius: 4px;
            -moz-border-radius: 4px;
            border-radius: 4px;
       
        }

        .prevepsm{
            position: absolute;
        }
</style>