<template>
  <div class="con-box">

    <!-- 我的评价 -->
    <div class="con-win-title">广告机：
        <Select v-model="data.deviceId" style="width:284px;" class="con-maright">
            <Option v-for="item in device.list" :value="item.id" :key="item.id">{{ item.position+item.deviceName }}</Option>
        </Select>
      评价时间：
            <el-date-picker prefix-icon="el-icon-date" style="width:186px;"
            type="datetime" size="small" v-model="data.stime" value-format="yyyy-MM-dd HH:mm:00" class="con-maright"
            placeholder="选择日期时间">
            </el-date-picker>到
            <el-date-picker prefix-icon="el-icon-date" style="width:186px;"
            type="datetime" size="small" v-model="data.etime" value-format="yyyy-MM-dd HH:mm:00" class="con-maright"
            placeholder="选择日期时间">
            </el-date-picker>
      <el-button size="small" type="primary" icon="el-icon-search" @click="getdata">搜索</el-button>
    </div>


    <div class="con-win-tab" v-loading="loading">
        <!-- 评价 -->
        <div class="myrating">
             <div class="myrating-box pointer" v-for="item in tableData.list" @click="toMyRatingDetail(item)">
                <div class="myrating-item">
                    <div class="rating-item">
                        <p>评价总数</p>
                        <a href="javascript:;">{{item.good*1+item.centre*1+item.poor*1}}</a>
                    </div>
                    <div class="rating-item">
                        <p>好评</p>
                        <a href="javascript:;">{{item.good}}</a>
                    </div>
                    <div class="rating-item">
                        <p>中评</p>
                        <a href="javascript:;">{{item.centre}}</a>
                    </div>
                    <div class="rating-item">
                        <p>差评</p>
                        <a href="javascript:;">{{item.poor}}</a>
                    </div>
                    <div class="rating-end">
                        {{item.position+item.deviceName}}
                    </div>
                </div>
                <div class="myeatingBlod"></div>
            </div>
        </div>
        <div class="clisclose win-gray" v-if="!tableData.list.length" style='border-top:1px solid #ddd;border-bottom:1px solid #ddd;'>
            暂无评价
         </div>


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
import {findmydevice} from './../../api/AdvertisingPisition';
import { mapGetters} from 'vuex';

  export default {
    data(){
      return {
          data:{
              userId:'',
              deviceId:'',
              serialNumber:'',
              stime:'',
              etime:'',
              pageNum:'',
              pageSize:''
          },
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
          dateTime:'',
          setEditShow:true,
          loading:false
      }
    },
    computed: {...mapGetters(['device','userInfo','setPageSize'])},
    methods: {
      hanldPage(val){
         if (val==0) {return;}
         this.getdata(val);
      },
      toMyRatingDetail(item){
        if (item.poor*1+item.good*1+item.centre*1) {
          this.storage.set('lidata',item,true);
          this.$router.push('MyRatingDetail');
        }else{
          this.$message({
            type:'warning',
            message:'暂无可查看的评价信息!'
          });
        };
      },
       getdata(val=1){
        this.set_get_param.set_param(this ,'page',val);
        this.loading=true;
        this.data.userId = this.userInfo.id;
        this.data.pageNum = typeof this.$route.query.page === 'number'?this.$route.query.page:1;

        this.data.pageSize = this.setPageSize.block;
        findmydevice(this.data).then((data) => {
          if (data.success) {
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

<style lang="scss" scoped>
.myrating {
    width: calc(100% + 26px);
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    margin-left:-13px;
    -ms-flex-wrap: wrap;
        flex-wrap: wrap;
    .myrating-box {
      width: calc(100% / 3 - 26px);
      height: 172px;
      margin: 0 13px 14px 13px;
      .myrating-item{
        width: 100%;
        border: 1px solid #ddd;
        height: 148px;
        padding: 32px;
        border-radius: 4px;
        .rating-item{
          float: left;
          width: 25%;
          text-align: center;
          a{
            color: #ff7c4c;
            margin:16px 0;
            display: inline-block;
          }
        }
        .rating-end{
          clear: both;
          text-align: center;
        }
      }
      .myeatingBlod {
        height: 10px;
        margin: 14px 0;
        background: #dddddd;
        border-radius: 14px;
      }

    }

  }

</style>
