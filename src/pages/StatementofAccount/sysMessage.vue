<template>
  <div class="con-box">
    <!-- 头部 标签 -->
    <div class="con-win-title">
      <div class="con-win-title-right">
        <el-button size="small" type="primary" @click="edit('edit')">标记为已读</el-button>
        <el-button size="small" type="primary" @click="edit('del')">删除</el-button>
      </div>
    </div>

    <div class="con-win-tab">
      <!-- 数据表格 -->
      <el-table ref="multipleTable" :data="tableData.list" tooltip-effect="dark" style="width: 100%" size="small">
          <el-table-column type="selection" width="30">
          </el-table-column>
          <el-table-column label="全选" width="100%"></el-table-column>
          <el-table-column label="消息标题">
                <template slot-scope="scope">
                  <!-- class="{seColor:!scope.row.status == 0}" -->
                    <span class="seColor pointer" @click="GetRowClick(scope.row)">{{scope.row.title}}</span>
                    <i class="icon-news" v-show="scope.row.status == 0"></i>
                    <!-- v-show="scope.row.isNew"  -->
                </template>
          </el-table-column>
          <el-table-column label="发布时间" width="140%" prop="createTime" :formatter="set_get_param.TimeMatter">
          </el-table-column>
          <el-table-column label="操作" width="120%">
            <template slot-scope="scope">
                <span v-if="scope.row.status">已读消息</span>
              <el-button v-else size="mini" @click="editupdatenews(scope.row.id,1,0)">标记为已读</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <div class="con-win-page">
          <div class="win-page-left">本页共{{tableData.size?tableData.size:0}}条 共{{tableData.pages?tableData.pages:0}}页</div>
          <el-pagination class="win-page" background layout="prev, pager, next" @current-change="hanldPage" :total="tableData.total" :current-page="pageNum" :page-size="setPageSize.liner">
          </el-pagination>
        </div>

    </div>
  </div>
</template>

<script>
import {findnews,updatenews} from '././../../api/StatementofAccount';
import { mapGetters} from 'vuex';

  export default {
    data(){
      return {
        data:{
          userId:'',
          pageNum:0,
          pageSize:0,
          type:'2'
        },
        tableData:{
          pages:0,
          size:0,
          total:100,
          list:[]
        },
        pageNum:0,
        pageSize:12,
        loading:false
      }
    },
    computed: {...mapGetters(['device','userInfo','setPageSize'])},
    methods: {
       hanldPage(val){
         if (val==0) {return;}
         this.getdata(val)
      },
      GetRowClick(row){
          this.$router.push({path:'/win/sysMessage/sysMessageDetails',query:{id:row.id}});
      },
      getdata(val=1){
        this.set_get_param.set_param(this ,'page',val);
        this.loading=true;
        this.data.userId = this.userInfo.id;
        this.data.pageNum = typeof this.$route.query.page === 'number'?this.$route.query.page:1;

        this.data.pageSize = this.setPageSize.liner;
        findnews(this.data).then((data) => {
          if (data.success) {
            data.data.list.forEach(item => {
              item.isNew = false;
              if (new Date(item.createTime) == new Date) {
                item.isNew = true;
              };
            });
              this.tableData = data.data
          }else{
              this.tableData.list = [];
              this.tableData.total = 0
          }
          this.loading=false
        }).catch(error=>this.loading=false)
      },
      editupdatenews(id,status,delFlag){
        let subdata ={id:id,status:status,delFlag:delFlag}
        this.loading=true;
        updatenews(subdata).then(data=>{
          if (data.success) {
            this.$message({type:'success',message:data.msg});
            this.getdata(this.$route.query.page)
          }else{
          this.$message({type:'error',message:data.msg}); };
          this.loading=false;
        }).catch(error=>this.loading=false);
      },
      edit(type){
        // console.log(this.$refs.multipleTable.selection);
        var arr=[];
        this.$refs.multipleTable.selection.forEach(item=>{
          arr.push(item.id);
        });
        // status	消息状态 （0未读 1已读）',
        // delFlag	删除标记（0正常 1删除 ）'
        if (!arr.length) {
              if (this.tableData.list) {
                 this.$message({type:"warning",message:"抱歉，请先选择消息再进行操作！"});
              }else{
                this.$message({type:"warning",message:"抱歉，没有可操作的数据！"});
              }
        }else{
            if (type=='del') {
              this.$confirm('是否要删除该消息?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  this.editupdatenews(String(arr),1,1);
                })
            }else{
              this.editupdatenews(String(arr),1,0);
            }
        }
      }
    },
    mounted () {
        this.pageNum=Number(this.$route.query.page>0?this.$route.query.page:1);
        this.tableData.total = this.pageNum*2;
        this.getdata();
    }
  }
</script>

<style lang="scss" scoped>

</style>
