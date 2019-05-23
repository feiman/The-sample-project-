
<style lang="scss" scoped>
    .rating-tabs{
        margin-top:22px;
    }

    .norTableHover-title{
        padding-left:4px;
        font-weight: bold;
        color: #333;
    }

    @media screen and (max-width:1366px){
      .con-win-title-right{
        margin-top: 20px;
      }
    }
</style>
<style>
#norTableHover .el-table__body tr:hover>td{
    background:none !important;
};
</style>


<template>
  <div class="con-box ratingdetail">
    <!-- 广告位列表 -->
   
    <div class="con-win-title">
        广告机：
        <Select v-model="data.deviceId" class="con-maright" style="width:274px">
            <Option v-for="item in device.list" :value="item.id" :key="item.id">{{ item.position+item.deviceName}}</Option>
        </Select>
        发布时间：<el-date-picker class="con-maright" prefix-icon="el-icon-date" style="width:186px;"
            type="datetime" size="small" v-model="data.stime" value-format="yyyy-MM-dd HH:mm:00"
            placeholder="选择日期时间">
            </el-date-picker>到
            <el-date-picker class="con-maright" prefix-icon="el-icon-date" style="width:186px;"
            type="datetime" size="small" v-model="data.etime" value-format="yyyy-MM-dd HH:mm:00"
            placeholder="选择日期时间">
            </el-date-picker>
            状态：
            <Select v-model="data.status" style="width:112px">
              <Option v-for="item in statusList.pstatus" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <el-button size="small" class="win-search" type="primary" icon="el-icon-search" @click="getData">搜索</el-button>

         <div class="con-win-title-right" style="padding-right:0px;">
            <el-button size="small" type="primary" @click="toReleaseAdvertising">发布广告位</el-button>
            <!-- <el-button size="small" type="primary">删除</el-button> -->
        </div>
        <i class='re_warning'></i>
    </div>

    <div class="con-win-tab" style="padding:0;">
        <el-table id="vertop" class="rating-table" ref="multipleTable" header-align="left" :data="tableData.list"  tooltip-effect="dark" style="width: 100%" size="small" v-loading="loading">
          <!-- <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="定时价（30次/6S/周）">
                      <span>{{ props.row.timePrice|overFormat}}</span>
                    </el-form-item>
                    <el-form-item label="循环价（30次/6S/时）">
                      <span>{{ props.row.timePrice|overFormat}}</span>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column> -->
         
          <!-- <el-table-column type="selection" width="28">
          </el-table-column>
          <el-table-column  label="全选" width="60">
          </el-table-column> -->
          <el-table-column label="缩略图" min-width="80">
                <template slot-scope="scope"> 
                   <div class="advertising-table-item"> <img :src="scope.row.imgsUrl[0]"></div>
                </template>
          </el-table-column>
          <el-table-column label="广告机" min-width="180">
              <template slot-scope="scope">
                  <div style="max-width:250px;">
                        <a href="javascript:;" @click="advertisingDetail(scope.row)" class="seColor">{{scope.row.position+scope.row.deviceName}}</a>
                  </div>
              </template>
          </el-table-column>
          <el-table-column prop="timePrice" label="定时价（30次/6S/时）" width="150" :formatter="set_get_param.overFormat">
          </el-table-column>
          <el-table-column prop="cyclePrice"label="循环价（30次/6S/周）" width="150" :formatter="set_get_param.overFormat">
          </el-table-column>
          <el-table-column width="20">
          </el-table-column>
          <el-table-column label="出租时间" min-width="88">
            <template slot-scope="scope">
                <span>
                  {{scope.row.startTime}}-{{scope.row.endTime}}<br/>
                    {{scope.row.startDate}}到{{scope.row.endDate}}
                </span>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="操作时间" width="140" :formatter="set_get_param.TimeMatter">
          </el-table-column>
          <el-table-column label="状态" min-width="100">
            <template slot-scope="scope">
              <!-- 0待审核 1审核通过 2审核驳回 3上架 4下架)	 -->
                <span v-if="scope.row.status==1"><i class="resizeicon el-icon-circle-check resCoGreen"></i>审核通过</span>
                <span v-else-if="scope.row.status==3"><i class="icon-con icon-con-yishagnjia"></i>已上架</span>
                <span v-else-if="scope.row.status==2"><i class="icon-con icon-con-bohui"></i>审核驳回</span>
                <span v-else-if="scope.row.status==4"><i class="icon-con icon-con-bohui"></i>已下架</span>
                <span v-else-if="scope.row.status==0"><i class="icon-con icon-con-daizhixin"></i>等待审核</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <!-- <a href="javascript:;" class="seColor" v-if="scope.row.status==1||scope.row.status==3">上架</a> -->
              <a href="javascript:;" class="seColor" v-if="scope.row.status==3" @click="updatemyAdReleaseData(scope.row,2)">下架&nbsp;</a>
              <a href="javascript:;" class="seColor" v-else-if="scope.row.status==4 || scope.row.status==0 ||scope.row.status==2" @click="edit_advertising(scope.row)">修改&nbsp;</a>
              <a href="javascript:;" class="seColor" @click="advertisingDetail(scope.row)">详情&nbsp;</a>
              <a href="javascript:;" class="seColor" v-if="scope.row.status==3" @click="updatemyAdReleaseData(scope.row,'del')">删除</a>
            </template>
          </el-table-column>
        </el-table>
    </div>
    <!-- 分页 -->
    <div class="con-win-page">
      <div class="win-page-left">本页共{{tableData.size?tableData.size:0}}条 共{{tableData.pages?tableData.pages:0}}页</div>
      <el-pagination class="win-page" background layout="prev, pager, next" @current-change="hanldPage" :total="tableData.total" :current-page="pageNum" :page-size="setPageSize.liner">
      </el-pagination>
    </div>

  </div>
</template>

<script>
import {findmyAdRelease,updatemyAdRelease,delmyAdRelease} from './../../api/AdvertisingPisition';
import { mapGetters,mapState} from 'vuex';

  export default {
    data(){
      return {
            data:{
              deviceId:'',
              stime:'',
              etime:'',
              status:'',
              pageNum:0,
            },
            checked:false,
            titledata:[{}],
            itemsisActive: 0,
            activeName: 'second',
            setEditShow:true,
            tableData:{
              pages:0,
              size:0,
              total:100,
              list:[]
            },
            loading:false,
            pageNum:0
      }
    },
    computed: {
      ...mapState(["device",'userInfo',"setPageSize",'statusList'])
    },
    methods: {
      hanldPage(val){
        if (val==0) {return;}
        this.getData(val)
      },
      toReleaseAdvertising(){
        //   广告位发布
        if(this.userInfo.realStatus!=2){
           this.$confirm('抱歉！您还没有进行认证，认证成功后才可以发布广告位。', '温馨提示', {
            confirmButtonText: '立即认证',
            cancelButtonText: '稍后认证',
            type:"warning",
            customClass:"re_warning"
          }).then(() => {
            this.$router.push('/win/ToAuthentication');
          }).catch(() => {});
          return;
        }
        this.$router.push('/win/releaseAdvertising')
      },
      getData(val=1) {
        this.set_get_param.set_param(this ,'page',val);
        this.loading=true;
        this.data.userId = this.userInfo.id;
        this.data.pageNum = typeof this.$route.query.page === 'number'?this.$route.query.page:1;
        this.data.pageSize = this.setPageSize.liner;

        findmyAdRelease(this.data).then(data=>{
          if (data.success) {
            data.data.list.forEach((item, index) => {
              item.imgsUrl =item.showImage.split(',');
            });
            this.tableData = data.data
          }else {
            this.tableData=[];
            this.tableData.total=0;
          }
          this.loading=false;
        }).catch(err=>this.loading=false)
      },
      advertisingDetail(row){
         this.storage.set("rowdata",row,true);
         this.$router.push('advertisingDetail')
      },
      updatemyAdReleaseData(row,type){
         	// 删除状态 0 删除 1 上架 2 下架
        if (type=='del') {
          var str="删除"
          var setparems = {id:row.id,status:0} // 删除
        }else {
          var str="下架"
          var setparems = {id:row.id,status:type} // 下架
        };
        this.$confirm(`是否要${str}这条广告位信息?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            delmyAdRelease(setparems).then(data=>{
            if (data.success) {
              this.$message({type:'success',message:data.msg});
              this.getData()
            }else{
              this.$message({type:'error',message:data.msg});
            }
            this.loading=false
          }).catch(err=>this.loading=false)
        })
       
      },
      edit_advertising(row){
        this.storage.set('rowdata',row,true);
        this.$router.push('releaseAdvertising_edit');
      }
    },
    mounted () {
      this.pageNum=Number(this.$route.query.page>0?this.$route.query.page:1);
      this.tableData.total = this.pageNum*2;
      this.getData();
    }
  }

</script>

