<template>
  <div class="con-box">
    <!-- 头部 标签 -->
    <div class="con-win-title">分组名称：
      <el-input size="small" class="con-maright" v-model="data.groupName" placeholder="请输入" style="width: 180px"></el-input>
      <el-button size="small" type="primary" icon="el-icon-search" @click="getData">搜索</el-button>

      <div class="con-win-title-right">
        <el-button size="small" type="primary" @click="newGroup()">新建分组</el-button>
        <!-- <el-button size="small" type="primary">删除</el-button> -->
      </div>
    </div>

    <div class="con-win-tab">
      <!-- 数据表格 -->
      <el-table ref="multipleTable" :data="tableData.list" tooltip-effect="dark" style="width: 100%" size="small" v-loading="loading">
          <!-- <el-table-column type="selection" width="30">
          </el-table-column> -->
          <!-- <el-table-column label="全选" width="50%"></el-table-column> -->
          <el-table-column prop="index" label="序号" width="120">
            <template slot-scope="scope">{{scope.$index+1}}</template>
          </el-table-column>
          <el-table-column prop="groupName" label="名称" min-width="120">
          </el-table-column>
          <el-table-column label="操作时间" width="140%" prop="updateTime" :formatter="set_get_param.TimeMatter">
          </el-table-column>
          <el-table-column label="操作" width="100%">
            <template slot-scope="scope">
              <a href="javascript:;" class="con-win-edit" @click="editshow(scope.row)">编辑</a>
              <a href="javascript:;" class="con-win-edit" @click="deldata(scope.row)">删除</a>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <div class="con-win-page">
          <div class="win-page-left">本页共{{tableData.size?tableData.size:0}}条 共{{tableData.pages?tableData.pages:0}}页</div>
          <el-pagination class="win-page" background layout="prev, pager, next" @current-change="hanldPage" :total="tableData.total" :current-page="pageNum" :page-size="setPageSize.liner">
          </el-pagination>
        </div>

        <!-- 弹出层 -->
        <Modal title="新建分组" v-model="dialogFormVisible" class-name="vertical-center-modal" :mask-closable="false">
          <div class="win-Modal-center">
            分组名称： <el-input size="small" v-model="groupName" placeholder="请输入" style="width: 300px"></el-input>
          </div>
          <div slot="footer">
            <el-button size="small" @click="dialogFormVisible=false">取消</el-button>
            <el-button size="small" :loading="modal_loading" @click="adddata" type="primary">确认</el-button>
          </div>
        </Modal>


       <!-- 弹出层 -->
        <Modal title="修改分组" v-model="dialogFormVisibleEidt" class-name="vertical-center-modal" :mask-closable="false">
          <div class="win-Modal-center">
            分组名称： <el-input size="small" v-model="groupName" @keyup.enter.native="editdata" placeholder="请输入" style="width: 300px"></el-input>
          </div>
          <div slot="footer">
            <el-button size="small" @click="dialogFormVisibleEidt=false">取消</el-button>
            <el-button size="small" :loading="modal_loading_edit" @click="editdata" type="primary">确认</el-button>
          </div>
        </Modal>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {findmaterialgroup,addmaterialgroup,updatematerialgroup,delmaterialgroup} from './../../api/ProgramReleased'

  export default {
    data(){
      return {
          data:{
            userId:'',
            groupName:'',
            pageNum:'',
            pageSize:''
          },
          groupName: '',
          Switch:'',
          tableData: {
            pages:0,
            size:0,
            total:100,
            list:[]
          },
          pageNum:0,
          dialogFormVisible :false,
          modal_loading:false,
          loading:false,
          dialogFormVisibleEidt:false,
          materialGroupId:'',
          modal_loading_edit:false
      }
    },
    computed:{...mapGetters(['setPageSize','userInfo'])},
    methods: {
      hanldPage(val){
         if (val==0) {return;}
        this.getData(val)
      },
      newGroup(){
        this.dialogFormVisible = true;
      },
      getData(val=1){
        this.set_get_param.set_param(this ,'page',val)
        this.loading=true;
        this.data.userId = this.userInfo.id;
        this.data.pageNum = typeof this.$route.query.page === 'number'?this.$route.query.page:1;
        this.data.pageSize = this.setPageSize.liner;
        
        findmaterialgroup(this.data).then((data) => {
          if (data.success) {
            this.tableData = data.data;
          }else{
            this.tableData.list=[]
            this.tableData.total=0;
          }
          this.loading=false
        }).catch(err=>{this.loading=false})
      },
      adddata(){
        var addparms={userId:this.userInfo.id,groupName:this.groupName}
        this.modal_loading=true;
        addmaterialgroup(addparms).then(data=>{
          if (data.success) {
              this.$message({
                message: data.msg,
                type: 'success'
              });
              this.dialogFormVisible=false;
              this.getData();
          }else{
            this.$message({
              message: data.msg,
              type: 'error'
            });
          }
          this.modal_loading=false
        }).catch((err) => this.modal_loading=false)
      },
      editshow(row){
          this.dialogFormVisibleEidt= true;
          this.materialGroupId = row.materialGroupId;
          this.groupName=row.groupName;
      },
      editdata(){
        this.modal_loading_edit=true;
        var parems = {materialGroupId:this.materialGroupId,groupName:this.groupName,remark:' '}
        updatematerialgroup(parems).then(data=>{
            if (data.success) {
              this.$message({
                message: data.msg,
                type: 'success'
              });
              this.dialogFormVisibleEidt=false;
              this.getData(this.pageNum)
          }else{
            this.$message({
              message: data.msg,
              type: 'error'
            });
          }
          this.modal_loading_edit=false
        }).catch((err) => this.modal_loading_edit=false)
      },
      deldata(row){
          this.$confirm('是否要确定删除分组?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            delmaterialgroup({materialGroupId:String(row.materialGroupId)}).then(data=>{
              if (data.success) {
                 this.$message({
                   type:'success',
                   message:data.msg
                 });
                  this.getData(this.pageNum)
              }else{
                this.$message({
                   type:'error',
                   message:data.msg
                 })
              }
            });
          }).catch(err=>{});
      }
    },
    mounted () {
       this.pageNum=Number(this.$route.query.page>0?this.$route.query.page:1);
       this.tableData.total = this.pageNum*2;
       this.getData();
    }
  }
</script>

<style lang="scss" scoped>
.searchicon{
  vertical-align:-2px;
  margin-right: 8px;
}

</style>
