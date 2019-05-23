<template>
  <div class="con-box">
    <!-- 头部 标签 -->
     <div class="con-win-title">分类：
      <Select v-model="groupname" style="width:128px" class="con-maleft" placeholder="分组名称">
        <Option v-for="item in groupList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
    </div>

    <div class="con-win-tab" style="overflow:hidden;">
      <div class="uploading">
          <div>
              <div class="uploadImg">
                <img src="static/img/sucai-default.png">
                <div class="uploadShoews">
                  <i class="icon iconfont icon-ic_rotate_left uploadicon"></i>
                  <i class="icon iconfont icon-ic_rotate_right uploadicon"></i>
                  <i class="el-icon-delete uploadicon" style="font-size:14px;"></i>
                </div>
              </div>
          </div>
          <div>
            选中2张图片，共3.12M
            <div class="uploadright">
              <el-button>继续添加</el-button>
              <el-button type="primary">开始上传</el-button>
            </div>
          </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    data(){
      return {
          groupList:[],
          groupname:'',
          dialogFormVisible:false
      }
    },
    methods: {
      onexceed(files, fileList){
        // console.log(files)
      },
      fileChange(file, fileList){
        console.log(file,fileList)
      },
      newGroup(){
        this.dialogFormVisible = true;
      }
    },
    mounted () {
      
    }
  }
</script>

<style lang="scss" scoped>

</style>