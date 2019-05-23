<template>
  <div class="con-box">
    <!-- 头部 标签 -->
     <div class="con-win-title">分组：
      <Select v-model="materialGroupId" style="width:128px" class="con-maleft" placeholder="分组名称">
        <Option v-for="item in groupList" :value="item.materialGroupId" :key="item.materialGroupId">{{ item.groupName }}</Option>
      </Select>
      <!-- <el-button type="primary" size="small" @click="newGroup">新建分组</el-button> -->
    </div>
    <div class="con-win-tab group-tab">
      <img-upload :materialGroupId="materialGroupId"></img-upload>
    </div>
  </div>
</template>

<script>
import imgUpload from './../../components/imgUpload.vue';
import {findmaterialgroup} from './../../api/ProgramReleased';
import {mapGetters} from 'vuex'

  export default {
    data(){
      return {
          groupList:[],
          groupname:'',
          dialogFormVisible:false,
          modal_loading:false,
          materialGroupId:''
      }
    },
    computed: {...mapGetters(['userInfo']) },
    components:{imgUpload},
    methods: {
       getfindmaterialgroup(){
        findmaterialgroup({userId:this.userInfo.id,groupName:'',pageNum:1,pageSize:1000}).then(data=>{
          if (data.success) {
            this.groupList=data.data.list;
          }
        });
      }
    },
    mounted () {
      this.getfindmaterialgroup();
    }
  }
</script>

<style lang="scss" scoped>

.groupreicon{
  font-size: 54px;
  color: #d1d1d1;
  margin-left:3px;
  display: inline-block;
  margin-top:40px;
}
.group-tab{
   overflow: hidden;
}
</style>