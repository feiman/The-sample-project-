<template>
  <div class="con-box">
    <!-- 查看日志 -->
    <div class="con-win-title">广告机：
        <Select v-model="data.deviceId" style="width:284px;" class="con-maright">
            <Option v-for="item in device.list" :value="item.id" :key="item.id">{{ item.position+item.deviceName }}</Option>
        </Select>
      审核时间：
      <el-date-picker class="con-maright" prefix-icon="el-icon-date" style="width:186px;"
            type="datetime" size="small" v-model="data.stime" value-format="yyyy-MM-dd HH:mm:00"
            placeholder="选择日期时间">
            </el-date-picker>到
            <el-date-picker class="con-maright" prefix-icon="el-icon-date" style="width:186px;"
            type="datetime" size="small" v-model="data.etime" value-format="yyyy-MM-dd HH:mm:00"
            placeholder="选择日期时间">
            </el-date-picker>
      <el-button size="small" class="win-search" type="primary" icon="el-icon-search" @click="getdata">搜索</el-button>
    </div>

    <div class="con-win-tab">
      <!-- 数据表格 -->
      <el-table ref="multipleTable" :data="tableData.list" tooltip-effect="dark" style="width: 100%" size="small" v-loading="loading">
          <el-table-column label="审核时间" width="200" prop="checkTime" :formatter="set_get_param.TimeMatter">
          </el-table-column>
          <el-table-column label="关联订单号" width="200">
              <template slot-scope="scope">
                 <router-link :to="{ path: 'Orderdetail', query: { orderId:scope.row.orderId }}" class="seColor">{{ scope.row.orderId}}</router-link>
              </template>
          </el-table-column>
          <el-table-column min-width="200" prop="address" label="广告机" >
            <template slot-scope="scope">{{scope.row.deviceName}}</template>
          </el-table-column>
          <el-table-column width="140" label="审核通过个数">
              <template slot-scope="scope">
                  <a href="javascript:;" v-if="scope.row.steOne==0" class="seColor">{{scope.row.steOne}}</a>
                  <a href="javascript:;" v-else @click="setEditShowArr(scope.row,1)" class="seColor">{{scope.row.steOne}}</a>
              </template>
          </el-table-column>
          <el-table-column width="140" label="审核未通过个数">
              <template slot-scope="scope">
                  <a href="javascript:;" v-if="scope.row.steTwo == 0" class="seColor">{{scope.row.steTwo}}</a>
                  <a href="javascript:;" v-else @click="setEditShowArr(scope.row,2)" class="seColor">{{scope.row.steTwo}}</a>
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

    <msg-box :visible.sync="setEditShow" :dataarr="dataarr" :currentNum="currentNum"></msg-box>
    
  </div>
</template>

<script>
import {findmaterial} from './../../api/AdvertisingPisition';
import {mapGetters} from 'vuex';

  export default {
    data(){
      return {
         currentNum:0,
          data:{
              userId:'',
              deviceId:'',
              status:1,
              orderId:'',
              stime:'',
              etime:'',
              pageNum:'',
              pageSize:''
          },
          dialogVisible:false,
          dateTime:'',
          model1: '',
          Switch:'',
          tableData:{
            pages:0,
            size:0,
            total:100,
            list:[]
          },
          total:100,
          pageNum:3,
          pageSize:12,
          setEditShow:false,
          dataarr:[],
          loading:false
      }
    },
    computed: {...mapGetters(['device','userInfo','setPageSize'])},
    methods: {
      hanldPage(val){
         if (val==0) {return;}
         this.getdata(val)
      },
      setEditShowArr(item,type){
          if (type==1) {item.list = item.stateOne; } else if(type==2){ item.list = item.stateTwo; };
          item.list.forEach(list=>{
            list.playerOptions={
              muted: false,
              languages: 'zh',
              width:'600px',
              height:'460px',
              sources: [{
                type: list.materialFormat,
                src:list.imagePath
              }],
              techOrder: ['flash','html5'],
              autoplay: false,
              controls: true,
              poster:list.playImg,
            };
          });
          this.currentNum=0;
          this.dataarr = item;
          this.setEditShow = true;
      },
      getdata(val=1){
        this.set_get_param.set_param(this ,'page',val);
        this.loading=true;
        this.data.userId = this.userInfo.id;
        this.data.pageNum = typeof this.$route.query.page === 'number'?this.$route.query.page:1;

        this.data.pageSize = this.setPageSize.liner;
        findmaterial(this.data).then((data) => {
          if (data.success) {
              data.data.list.forEach(item=>{
                item.steOne = 0;
                item.steTwo = 0;
                item.stateOne=[];
                item.stateTwo=[];
                item.materiallist.forEach(list=>{
                  if (list.checkStatus==1) {
                    item.steOne+=1;
                    item.stateOne.push(list);
                  }else if(list.checkStatus==2){
                     item.steTwo+=1;
                     item.stateTwo.push(list);
                  }
                });
              })
              this.tableData = data.data
          }else{
              this.tableData.list = [];
              this.tableData.total = 0
          }
          this.loading=false
        }).catch(error=>this.loading=false)
      }
    },
    mounted () {
      this.pageNum=Number(this.$route.query.page>0?this.$route.query.page:1);
      this.tableData.total = this.pageNum*2;
      this.getdata();
    }
  }
</script>
