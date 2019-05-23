<template>
  <div class="con-box ratingdetail">
    <!--  -->
    <div class="ratingdetail-title">
      设备名称：{{deviceU.position + deviceU.deviceName}}
      <div class="ratingdetail-right">
        <el-button type="primary" size="small" @click="$router.push('MyRating')">查看其它设备</el-button>
      </div>
    </div>
    <div class="rating-tabs">
      <a href="javascript:;" class="tabs-items" 
       @click="selActive('1','0px')">好评({{deviceU.good}})</a> 
      <a href="javascript:;" class="tabs-items"
      @click="selActive('2','92px')">中评({{deviceU.centre}})</a>
      <a href="javascript:;" class="tabs-items"
       @click="selActive('3','180px')">差评({{deviceU.poor}})</a>
      <i class="itemsisActive" :style="{left:itemsisActive}"></i>
    </div>
    <div class="rating-items" v-loading="loading">
        <el-table class="rating-table" ref="multipleTable" :data="tableData.list"  tooltip-effect="dark" style="width: 100%" size="small">
          <el-table-column prop="index" label="序号" width="100%">
              <template slot-scope="scope">{{ scope.$index + 1 <10? '0' + (scope.$index + 1):scope.$index + 1}}</template>
          </el-table-column>
          <el-table-column label="评价时间" width="240%" prop="createTime" :formatter="set_get_param.TimeMatter">
          </el-table-column>
          <el-table-column  prop="loginName" width="220%" label="评价账号" >
          </el-table-column>
          <el-table-column  prop="IPaddress" label="评价内容" show-overflow-tooltip>
            <template slot-scope="scope">
              <div class="rating-detail">
                <p>{{scope.row.content}}</p>
                <p> <a href="javascript:;" v-for="item in scope.row.imagearr"><img :src="item" class="rating-detail-img"></a> </p>
              </div>
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
import {findmydevicebyid} from './../../api/AdvertisingPisition';
import { mapGetters} from 'vuex';

  export default {
    data(){
      return {
          data:{
            deviceId:'',
            level:'1', // 1:好评2:中评3:差评
            pageNum:'',
            pageSize:''
          },
          deviceU:{},
          itemsisActive: 0,
          activeName: 'second',
          model1: '',
          Switch:'',
          total:100,
          pageNum:3,
          pageSize:12,
          dateTime:'',
          setEditShow:true,
          tableData:{
            pages:0,
            size:0,
            total:100,
            list:[]
          },
          loading:false
      }
    },
    computed: {...mapGetters(['setPageSize'])},
    methods: {
      hanldPage(val){
        if (val==0) {return;}
         this.getdata(val)
      },
      selActive(state,npx){
        this.itemsisActive = npx;
        this.set_get_param.set_param(this,'state',state);
        this.getdata();
      },
      getdata(val=1){
        this.set_get_param.set_param(this ,'page',val);
        this.loading=true;
        this.data.level = this.$route.query.state?this.$route.query.state:1;
        this.data.pageNum = typeof this.$route.query.page === 'number'?this.$route.query.page:1;

        this.data.pageSize = this.setPageSize.block;
        findmydevicebyid(this.data).then((data) => {
          if (data.success) {
              data.data.list.forEach(item => {
               item.imagearr= item.image.split(',')
              });
              this.tableData = data.data;
          }else{
              this.tableData.list = [];
              this.tableData.total = 0;
          };
          this.loading=false;
        }).catch(error=>this.loading=false);
      }
    },
    mounted () {
        var lidata = this.storage.get('lidata',1000*60*10*1000,true);
        this.data.deviceId = lidata.id;
        this.deviceU = lidata;
        this.pageNum=Number(this.$route.query.page>0?this.$route.query.page:1);
        this.tableData.total = this.pageNum*2;
        this.getdata();
    }
  }

</script>

<style lang="scss" scoped>


</style>
