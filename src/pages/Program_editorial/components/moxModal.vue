<template>
<div class="editor-modal-de">
    <!-- 素材列表 -->
    <div class="editor-modal-materlist">
        <el-form :inline="true" size="mini">
            <el-form-item>
                <el-button size="small" type="primary" icon="el-icon-plus" @click="addMaterial">添加</el-button>
            </el-form-item>
            <el-form-item>
                <el-button size="small" type="primary" icon="el-icon-delete" @click="delSmater">删除</el-button>
            </el-form-item>
        </el-form>
        <div class="_marter_list list color-list" v-if="materDataShow">
            <div class="_mater_list_box list-item" v-for="(item,index) in data.materData" v-dragging="{ item: item, list: data.materData, group: 'item' }" :class="{is_active_mater_box:item.isClass}" @click="selSmater(item,index)" :key="item.imagePath">
                <div class="_mater-img">
                    <template v-if="item.materialType">
                                <img :src="item.imagePath"> <i class="icon iconfont icon-play _mater-img-replay"></i>
                    </template>
                    <template v-else>
                        <img :src="item.imagePath">
                    </template>
                 </div>
                        <div class="_mater_content">
                            <p class='text-over'>{{item.name}}</p>
                            <p>宽：<span class="win-gray">{{item.width}}</span></p>
                            <p>高：<span class="win-gray">{{item.height}}</span></p>
                            <p>时长：<span class="win-gray">{{item.sliderTime}}"</span></p>
							              <p>切换效果：<span class="win-gray">{{item.sliderType|sliderName}}</span></p>
                        </div>
                    </div>
                </div>
                <div class="_kon" style="height:300px;line-height:300px;" v-else>请先点击添加按钮，从素材列表中挑选素材哦！</div>
                    </div>
                    </el-form>
                </div>
</template>

<script>
import {
  findmymaterial
} from "./../../../api/ProgramReleased";

import { mapGetters, mapMutations } from "vuex";

export default {
  name: "moxModal",
  props: ['data'],
  data() {
    return {
      loading: false
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
    materDataShow(){
      if (this.data) {
          try{
              if(this.data.materData.length){ return true;};
          }catch(err){
              return false
          }
      }
    }
  },
  methods: {
    // 添加
    addMaterial() {
      this.$emit("addMaterial", true);
    },
    // 选中
    selSmater(item, index) {
      this.data.materData[index].isClass = !this.data.materData[index].isClass;
    },
    //删除
    delSmater() {
      var materData = [];
      this.data.materData.forEach((item, index) => {
        if (!item.isClass) {
          materData.push(item);
        }
      });
      this.data.materData = materData;
    }
  },
  mounted() {}
};
</script>


<style lang="scss" scoped>
.center-modal {
  .center-modal {
    z-index: 101000;
  }
}
</style>
