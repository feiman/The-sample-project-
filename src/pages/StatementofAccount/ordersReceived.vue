<template>
  <div class="con-box">
    <!-- 头部 标签 -->
    <div class="con-win-title">
      统计时间：<el-date-picker class="con-maright" prefix-icon="el-icon-date" style="width:186px;"
            type="datetime" size="small" v-model="data.stime" value-format="yyyy-MM-dd HH:mm:00"
            placeholder="选择日期时间">
            </el-date-picker>到
            <el-date-picker class="con-maright" prefix-icon="el-icon-date" style="width:186px;"
            type="datetime" size="small" v-model="data.etime" value-format="yyyy-MM-dd HH:mm:00"
            placeholder="选择日期时间">
            </el-date-picker>
      <el-button size="small" class="win-search" type="primary" icon="el-icon-search" @click="getdata">搜索</el-button>

      <div class="con-win-title-right">
        <a href="javascript:;" class="con-win-title-right-text" :class="{seColor:seColorShow==0}" @click="getdata(0)">最近一周</a>
        <a href="javascript:;" class="con-win-title-right-text" :class="{seColor:seColorShow==1}" @click="getdata(1)">最近一月</a>
        <a href="javascript:;" class="con-win-title-right-text" :class="{seColor:seColorShow==2}" @click="getdata(2)">最近三月</a>
      </div>
    </div>

    <div class="con-win-tab" style="padding-bottom:22px;">
      <!-- 数据表格 -->
      <el-table ref="multipleTable" v-loading="loading" show-summary :data="tableData" tooltip-effect="dark" style="width: 100%" size="small">
          <el-table-column label="广告机">
           <template slot-scope="scope"> {{scope.row.position + scope.row.deviceName}} </template>
          </el-table-column>
          <el-table-column  prop="allorder" width="100%" label="总订单数">
          </el-table-column>
          <el-table-column  prop="payorder" width="100%" label="已支付订单">
          </el-table-column>
          <el-table-column  prop="notpayorder" width="100%" label="待支付订单">
          </el-table-column>
          <el-table-column  prop="complateorder" width="100%" label="已完成订单">
          </el-table-column>
          <el-table-column  prop="evaluationorder" width="100%" label="已评价订单">
          </el-table-column>
          <el-table-column  prop="closeorder" width="100%" label="已关闭订单">
          </el-table-column>
          <el-table-column  prop="refundorder" width="100%" label="已退款订单">
          </el-table-column>
        </el-table>
    </div>
  </div>
</template>

<script>
import {findallorder} from './../../api/StatementofAccount';
import { mapGetters } from 'vuex';

  export default {
    data(){
      return {
          data:{
            userId:'',
            stime:'',
            etime:'',
            type:0
          },
          seColorShow:0,
          dateTime:'',
          model1: '',
          Switch:'',
          tableData: [],
          total:100,
          pageNum:3,
          pageSize:12,
          loading:false
      }
    },
    computed: {...mapGetters(['userInfo']) },
    methods: {
      getdata(type){
          this.data.type = type;
          this.seColorShow = type;
          this.data.userId = this.userInfo.id;
          this.loading=true;
          findallorder(this.data).then(data=>{
            if (data.success) {
              this.tableData = data.data;
            }else{
              this.tableData=[];
            };
             this.loading=false;
          }).catch((err) => this.loading=false)
      }
    },
    mounted () {
      this.getdata(0)
    }
  }
</script>
