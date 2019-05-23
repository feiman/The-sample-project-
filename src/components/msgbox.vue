<template>
  <transition name="dialog-fade">
      <template v-if="typeShow==1">
        <div class="el-dialog__wrapper" v-show="visible">
            <div id="con-msgbox" >
            <div class="con-msgbox-content">
                <div>
                        <!-- 轮播切换图 -->
                        <i class="el-icon-arrow-left msgboxImgs-left" @click="currentdel"></i>
                        <i class="el-icon-arrow-right msgboxImgs-right" @click="currentadd()"></i>
                        <div class="msgboxImgs">
                            <div class="itemImg" v-for="(item,index) in dataarr.list" v-show="index==current">
                                <img v-if="item.materialType==0" :src="item.imagePath">
                                <div v-else-if="item.materialType==1">
                                   <video-player class="video-player" height="490"
                                                ref="videoPlayer"
                                                :options="item.playerOptions"
                                                :playsinline="true" >
                                   </video-player>
                                 </div>
                            </div>
                            
                        </div>

                        <div class="msgbox-bottom" v-if="stateSDD">
                            <!-- 驳回原因 -->
                           {{this.dataarr.list[this.current].remark}}
                        </div>
                </div>
                <div>
                    <!-- 简介 -->
                    <i class="el-icon-close msgbox-close" @click="handleClose"></i>
                    <p class="msgbox-p">
                        {{dataarr.deviceName}}
                    </p>
                    <div class="msgbox-imgs">
                          <!-- 缩略图 -->
                           <!-- msgbox-isError msgbox-isSuccses-->
                        <div v-for="(item,index) in dataarr.list">
                            <i class="msgboxisActiveSan" v-if="index==current"></i>
                            <div @click="selec(index)" :class="{msgboxisActive:index==current,'msgbox-isSuccses':item.checkStatus==1,'msgbox-isError':item.checkStatus==2}">
                                <img v-if="item.materialType==0" :src="item.imagePath" width="100%">
                                <img v-else-if="item.materialType==1" :src="item.playImg" width="100%">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </template>
      <template v-else-if="typeShow==2">
        <div class="el-dialog__wrapper" v-show="visible">
            <div id="con-msgbox">
            <div class="con-msgbox-content">
                <div>
                        <!-- 轮播切换图 -->
                        <i class="el-icon-arrow-left msgboxImgs-left" @click="currentdel"></i>
                        <i class="el-icon-arrow-right msgboxImgs-right" @click="currentadd()"></i>
                        <div class="msgboxImgs" v-for="(item,index) in dataarr.materiallist">
                            <div v-show="index==current">
                                 <div v-if="item.materialType==0" class="itemImg">
                                      <img :src="item.imagePath">
                                 </div>
                                 <div v-else-if="item.materialType==1" class="itemImg">
                                   <video-player class="video-player" height="490"
                                                ref="videoPlayer"
                                                :options="item.playerOptions"
                                                :playsinline="true" >
                                   </video-player>
                                 </div>
                                 
                                
                              <div class="msgbox-button" v-if="item.chStatus==0">
                                <el-button type="primary" size="small" @click="editcheckStatussu(item,index)">通过</el-button>
                                <el-button type="primary" size="small" @click="editcheckStatus(item,index)">驳回</el-button>
                                <el-button type="primary" class="msg-right" v-show="sbumitShow" :loading="mbloading" size="small" @click="submit">提交</el-button>
                              </div>

                              <!-- 驳回原因 -->
                              <el-input v-show="item.err_area" v-model="item.remark" class="msgbox-textarea" type="textarea" :rows="4" resize="none" placeholder="请填写驳回原因"></el-input>
                            </div>
                        </div>
                </div>
                <div>
                    <!-- 简介 -->
                    <i class="el-icon-close msgbox-close" @click="handleClose"></i>
                    <p class="msgbox-p">
                    {{dataarr.deviceName}}
                    </p>
                    <div class="msgbox-imgs">
                          <!-- 缩略图 -->
                        <div v-for="(item,index) in dataarr.materiallist">
                            <i class="msgboxisActiveSan" v-if="index==current"></i>
                            <!-- msgbox-isError msgbox-isSuccses-->
                           <div @click="selec(index)" :class="{msgboxisActive:index==current,'msgbox-isSuccses':item.checkStatus==1,'msgbox-isError':item.checkStatus==2}">
                                <img v-if="item.materialType==0" :src="item.imagePath" width="100%">
                                <img v-else-if="item.materialType==1" :src="item.playImg" width="100%">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </template>
  </transition>
</template>

<script>
// import Popup from 'element-ui/src/utils/popup';
import Popup from 'element-ui/src/utils/popup';
import Migrating from 'element-ui/src/mixins/migrating';
import emitter from 'element-ui/src/mixins/emitter';
import 'video.js/dist/video-js.css';
import { videoPlayer } from 'vue-video-player';

  export default {
    name: 'MyDialog',
    mixins: [Popup,emitter, Migrating],
    props: {
      mbloading:{
        type:Boolean,
        default:false
      },
      typeShow:{
        default:1
      },
      title: {
        type: String,
        default: ''
      },
      dataarr:{
          default:''
      },
      modal: {
        type: Boolean,
        default: true
      },

      modalAppendToBody: {
        type: Boolean,
        default: true
      },

      appendToBody: {
        type: Boolean,
        default: false
      },

      lockScroll: {
        type: Boolean,
        default: true
      },

      closeOnClickModal: {
        type: Boolean,
        default: true
      },

      closeOnPressEscape: {
        type: Boolean,
        default: true
      },

      showClose: {
        type: Boolean,
        default: true
      },

      width: String,

      fullscreen: Boolean,

      customClass: {
        type: String,
        default: ''
      },
      top: {
        type: String,
        default: '15vh'
      },
      beforeClose: Function,
      center: {
        type: Boolean,
        default: false
      },
      currentNum:{
        default:0
      }
    },

    data() {
      return {
        closed: false,
        value1: 1,
        current:this.currentNum,
        err_area:false
      };
    },

    watch: {
      visible(val) {
        if (val) {
          this.closed = false;
          this.$emit('open');
          this.$el.addEventListener('scroll', this.updatePopper);
        //   this.$nextTick(() => {
        //     this.$refs.dialog.scrollTop = 0;
        //   });
          if (this.appendToBody) {
            document.body.appendChild(this.$el);
          }
        } else {
          this.$el.removeEventListener('scroll', this.updatePopper);
          if (!this.closed) this.$emit('close');
        }
      }
    },
    components: { videoPlayer },
    computed: {
      sbumitShow(){
        var ste = 0;
        this.dataarr.materiallist.forEach((item,index) => {
            if (item.checkStatus !=0) {
              ste += 1; 
            };
        });
        if (ste == this.dataarr.materiallist.length) {
          return true;
        }else {
          return false;
        };
      },
      stateSDD(){
        if (typeof this.current === 'number') {
            if (this.dataarr.list) {
              if (this.dataarr.list[this.current]) {
                return this.dataarr.list[this.current].checkStatus == 2;
              }else{
                return true;
              }
              
            }else{
              return false
            };
        }
       
      },
      style() {
        let style = {};
        if (this.width) {
          style.width = this.width;
        }
        if (!this.fullscreen) {
          style.marginTop = this.top;
        }
        return style;
      }
    },

    methods: {
        selec(index){
          this.current = index
        },
        currentadd(){
            if (this.current == this.dataarr.materiallist.length-1) {
                this.$message({message:'已经是最后一张了',customClass:"msg-box-message"});
                return;
            };
            this.current++;
        },
        currentdel(){
            if (this.current == 0) {
                this.$message('已经是第一张了');
                return;
            };
            this.current--;
        },
      getMigratingConfig() {
        return {
          props: {
            'size': 'size is removed.'
          }
        };
      },
      handleClose() {
        if (typeof this.beforeClose === 'function') {
          this.beforeClose(this.hide);
        } else {
          this.hide();
        }
      },
      hide(cancel) {
        if (cancel !== false) {
          this.$emit('update:visible', false);
          this.$emit('close');
          this.closed = true;
        }
      },
      updatePopper() {
        this.broadcast('ElSelectDropdown', 'updatePopper');
        this.broadcast('ElDropdownMenu', 'updatePopper');
      }
      //提交
      ,submit(){
        this.$emit('submit',this.dataarr);
      },
      // 修改状态
      editcheckStatus(item,index){
          this.dataarr.materiallist[index].checkStatus = 2;
          this.dataarr.materiallist[index].err_area = !this.dataarr.materiallist[index].err_area;
      },
      editcheckStatussu(item,index){
          this.dataarr.materiallist[index].checkStatus = 1;
          this.dataarr.materiallist[index].err_area = false;
      }
    },

    mounted() {
      if (this.visible) {
        this.rendered = true;
        this.open();
        if (this.appendToBody) {
          document.body.appendChild(this.$el);
        }
      }
    },

    destroyed() {
      // if appendToBody is true, remove DOM node after destroy
      if (this.appendToBody && this.$el && this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el);
      }
    }
  };
</script>
