<template>
  <div id="playerid" class='vplayer' :style="{width:row.w+'px',height:row.h+'px'}">
        <template v-for="item in materiallist">
              <!-- 视频 -->
              <div v-if="item.materialType==1" :class="{fadeIn:item.player_hiden,fadeOut:!item.player_hiden}" class="animated">
                  <video-player ref="videoPlayer" v-if="item.player_hiden" :options="item.playerOptions" :playsinline="true" >
                  </video-player>
              </div>
              <!-- 图片 -->
              <div v-else-if="item.materialType==0" :class="{fadeIn:item.player_hiden,fadeOut:!item.player_hiden}" class="animated">
                  <img :src="item.imagePath" style="max-width:100%;width:auto;height:100%;">
              </div>
        </template>
    </div>
</template>

<script>
import 'video.js/dist/video-js.css';
import { videoPlayer } from 'vue-video-player';

  export default {
    props: ["row","previewVisible","isPauseVideo"],
    data () {
      return {
        materiallist:[],
      }
    },
    computed:{
      player() {
        return this.$refs
      }
    },
    components: { videoPlayer},
    methods: {
      init(){
        console.log(123)
        var materiallist =JSON.parse(JSON.stringify(this.row.materiallist));
        materiallist.forEach((item,index) => {
          if (index==0) {
            item.player_hiden=true;
          }
          this.clearshow(index,item);
        });
        
        this.materiallist=JSON.parse(JSON.stringify(materiallist));
      },
      clearshow(index,{showTime}){
             setTimeout(() => {
                // console.log("********************************************")
                let time=0;
                time = showTime*1000;  // 当前单位的时间  }
                var oldtime=0;
                if (index>0) {
                    for (var i = 0; i < index; i++) {
                        oldtime+=this.materiallist[i].showTime*1000;
                    }
                };
                // console.log(oldtime)
                // console.log(oldtime+time)
                // console.log(index)
                // console.log("********************************************")
                setTimeout(() => {
                     this.materiallist[index].player_hiden=false;
                    if ( this.materiallist[index+1]) {
                        this.materiallist[index+1].player_hiden=true;
                        console.log(this.materiallist[index+1].player_hiden)
                    }else{
                        if (this.previewVisible) {
                          this.replayer(0);
                        };
                    };
                },oldtime+time);
             }, 10);
         },
         replayer(index){
             this.materiallist[index].player_hiden=true;
             this.materiallist.forEach((item,itex)=>{
                 this.clearshow(itex,JSON.parse(JSON.stringify(item)))
             });
         }
    },
    watch: {
      previewVisible(val){
        if (val) {
           this.init();
        }else{
          $.each(this.$refs.videoPlayer,function(idx,val){
            val.player.pause();
          })
        }
      },

    }
  }
</script>

<style lang="scss" scoped>
  .vplayer{
    padding: 20px;
    overflow: hidden;
    text-align: center;
    margin: 0 auto;
    position: relative;
    >div{
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
  }
</style>
