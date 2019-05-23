<template>
  <div class="con-box">
    <div class="con-win-tab con-tab-one">
      <!-- 数据表格 -->
      <el-table ref="multipleTable" v-loading="loading" show-summary :summary-method="set_get_param.getSummaries" :data="tableData" tooltip-effect="dark" style="width: 100%" size="small">
          <el-table-column  prop="address" label="广告机" min-width="200">
            <template slot-scope="scope"> {{scope.row.position + scope.row.deviceName}} </template>
          </el-table-column>
          <el-table-column  prop="allsum" :formatter="set_get_param.overFormat" width="180" label="总收益(元)" align="right">
          </el-table-column>
          <el-table-column  prop="weeksum" :formatter="set_get_param.overFormat" width="180" label="最近一周(元)" align="right">
          </el-table-column>
          <el-table-column  prop="monthsum" :formatter="set_get_param.overFormat" width="180" label="最近一月(元)" align="right">
          </el-table-column>
          <el-table-column  prop="threemonthsum" :formatter="set_get_param.overFormat" width="180" label="最近三月(元)" align="right">
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
          tableData: [],
          loading:false
      }
    },
    computed: {...mapGetters(['userInfo']) },
    methods: {
      getdata(){
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
     this.getdata()
    }
  }
  
</script>
