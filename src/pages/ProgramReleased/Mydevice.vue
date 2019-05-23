<template>
  <div class="con-box">
    <!-- 头部 标签 -->
    <div class="con-win-title">位置：
      <Select v-model="data.deviceId" style="width:262px" class="con-maleft">
        <Option v-for="item in device.list" :value="item.id" :key="item.id">{{ item.position+item.deviceName}}</Option>
      </Select>
      开机状态：
      <Select v-model="data.onlineStatus" style="width:75px" class="con-maleft" placeholder="全部">
        <Option v-for="item in onlineStatusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <el-button size="small" type="primary" icon="el-icon-search" @click="getData()">搜索</el-button>
        <el-popover
          ref="popover2"
          placement="bottom" 
          width="386"
          trigger="click">
          <on-popover>实时控制</on-popover>
        </el-popover>

      <div class="con-win-title-right">
        <el-button size="small" type="primary" @click="toAddDrive">捆绑</el-button>
        <el-button size="small" type="primary">修改</el-button>
        <!-- <el-button size="small" type="primary">删除</el-button> -->
        <el-button size="small" type="primary"  v-popover:popover2>实时控制</el-button>
      </div>
    </div>

    <div class="con-win-tab" v-loading="loading">
      <!-- 数据表格 -->
      <el-table ref="multipleTable" :data="tableData.list" tooltip-effect="dark" style="width: 100%" size="small">
          <!-- <el-table-column type="selection" width="30">
          </el-table-column> -->
          <!-- <el-table-column label="全选" min-width="40"></el-table-column> -->
          <el-table-column prop="serialNumber" label="设备编号" min-width="100">
          </el-table-column>
          <el-table-column prop="deviceName" label="名称" min-width="100">
          </el-table-column>
          <el-table-column prop="position" label="位置" min-width="180">
          </el-table-column>
          <el-table-column  prop="name" label="分辨率" min-width="74">
          </el-table-column>
          <el-table-column  label="开关机状态" min-width="80">
            <template slot-scope="scope">
              <i class="icon-ON" v-if="scope.row.switchStatus =='ON' "></i><i v-else class="icon-OFF"></i>
            </template>
          </el-table-column>
          <el-table-column  prop="space" min-width="70" label="剩余空间">
          </el-table-column>
          <el-table-column  prop="version" min-width="76" label="版本号">
          </el-table-column>
          <el-table-column prop="updateTime" label="操作时间" :formatter="set_get_param.TimeMatter" min-width="80">
          </el-table-column>
          <el-table-column  prop="banben" width="100" label="在线状态">
            <template slot-scope="scope">
              <i class="icon-off-on" v-if="scope.row.onlineStatus == 1"></i>
              <i class="icon-off-on icon-off-on-off" v-else></i>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <!-- <a href="javascript:;" class="con-win-edit">断开</a> -->
              <!-- <a href="javascript:;" class="con-win-edit">连接</a>&nbsp;&nbsp;&nbsp; -->
              <a href="javascript:;" class="con-win-edit" @click="deldelAdmachine(scope.row.id)">删除</a>
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
import onPopover from './../../components/indexchiled/OnPopover.vue';
import {findAdmachine,delAdmachine} from "./../../api/ProgramReleased"
import {mapGetters} from 'vuex';

  export default {
    data(){
      return {
        data:{
          onlineStatus:'',
          deviceId:'',
          userId:"",
          pageNum:0
        },
          onlineStatusList:[
              {value: '',label: '全部'},
              {value: '1',label: '在线'},
              {value: '0',label: '不在线'}
          ],
          tableData: {
              pages:0,
              size:0,
              total:100,
              list:[]
            },
          loading:false,
          pageNum:0
      }
    },
    components:{onPopover},
    computed:{
      ...mapGetters(['sidebar','device','currentMenus','setPageSize','userInfo'])
    },
    methods: {
      hanldPage(val){
        if (val==0) {return;}
        this.getData(val)
      },
      toAddDrive(){
        // 添加广告机
        this.$router.push('Mydevice_add')
      },
      getData(val=1){
    
        this.set_get_param.set_param(this ,'page',val)
        this.loading=true;
        this.data.userId = this.userInfo.id;
        this.data.pageNum = typeof this.$route.query.page === 'number'?this.$route.query.page:1;
        this.data.pageSize = this.setPageSize.liner;
        findAdmachine(this.data).then(data=>{
          if (data.success) {
            this.tableData = data.data;
          }else{
            this.tableData=[];
            this.tableData.total=0;
          }
          this.loading=false;
        }).catch(err=>this.loading=false)
      },
      deldelAdmachine(id){
        this.$confirm('是否确定要删除此广告机?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delAdmachine({id}).then(data=>{
            if (data.success) {
              this.$message({type:'success',message:data.msg});
              this.getData(this.$route.query.page);
            }else{
              this.$message({type:'error',message:data.msg});
            };
          })
        })
      }
    },
    mounted () {
        this.pageNum=Number(this.$route.query.page>0?this.$route.query.page:1);
        this.tableData.total = this.pageNum*2;
        this.getData();

            // 查询广告机
        this.$store.dispatch('syncloaddevice');
    }
  }
</script>

<style lang="css">
div.el-popover{
  left:calc(100% - 430px)!important;
}
div.popper__arrow{
  left:150px !important;
}
</style>

