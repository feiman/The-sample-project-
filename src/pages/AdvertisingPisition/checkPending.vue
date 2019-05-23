<template>
  <div class="con-box ratingdetail">
    <!-- 待审核 -->
    <div class="con-win-title">广告机：
        <Select v-model="data.deviceId" style="width:284px;" class="con-maright">
            <Option v-for="item in device.list" :value="item.id" :key="item.id">{{ item.position+item.deviceName }}</Option>
        </Select>
        关联订单号：
        <el-input type="text" class="con-maright" v-model="data.orderId" placeholder="请输入" size="small" style="width:186px;"></el-input>
        上传时间：<el-date-picker class="con-maright" prefix-icon="el-icon-date" style="width:186px;"
            type="datetime" size="small" v-model="data.stime" value-format="yyyy-MM-dd HH:mm:00"
            placeholder="选择日期时间">
            </el-date-picker>到
            <el-date-picker class="con-maright el-icon-date-dow" prefix-icon="el-icon-date" style="width:186px;"
            type="datetime" size="small" v-model="data.etime" value-format="yyyy-MM-dd HH:mm:00"
            placeholder="选择日期时间">
            </el-date-picker>
            <el-button size="small" class="win-search" type="primary" icon="el-icon-search" @click="getdata">搜索</el-button>
    </div>

    <template v-for="(item,index) in tableData.list">
        
        <div class="ratingdetail-title">
            广告机：<span class="editTitp text-overhidden" style="margin-right:36px;"
            :title="item.deviceName">{{item.deviceName}}</span>
            清单名称：<span class="editTitp text-overhidden" style="width:112px;margin-right:36px;"
            :title="item.showName">{{item.showName}}</span>
            关联订单：<span class="editTitp text-overhidden" style="width:112px;margin-right:36px;"
            :title="item.orderId">{{item.orderId}}</span>
            上传者：<span class="editTitp text-overhidden" style="width:112px;margin-right:36px;"
           :title="item.realname">{{item.realname}}</span>
            <div class="ratingdetail-right" style="color:#e01222;">
                备注：还有{{item.playtime|playtimenum}}天即将播放，请您尽快审核
            </div>
        </div>
        <div class="checkPending-box" v-loading="loading">
          <!--  msgbox-isSuccses -->
            <div class="checkPending-img" v-for="(list,listi) in item.materiallist"
              :class="{'msgbox-isSuccses':list.checkStatus==1,'msgbox-isError':list.checkStatus==2}"
              @click="checksetEditShow(item)" style="background:#ddd" >
              <!-- <b>{{listi+1}}</b> -->
              <img v-if="list.materialType==0" :src="list.imagePath">
               <img v-else-if="list.materialType==1" :src="list.playImg">
             </div>
        </div>
    </template>
         <div class="clisclose win-gray" v-if="!tableData.list.length" style="border-top: 1px solid #ddd;border-bottom: 1px solid #ddd;">
          暂无素材审核
        </div>
    
    <!-- 分页 -->
    <div class="con-win-page">
      <div class="win-page-left">本页共{{tableData.size?tableData.size:0}}条 共{{tableData.pages?tableData.pages:0}}页</div>
      <el-pagination class="win-page" background layout="prev, pager, next" @current-change="hanldPage" :total="tableData.total" :current-page="pageNum" :page-size="setPageSize.liner">
      </el-pagination>
    </div>

    <msg-box :visible.sync="setEditShow" typeShow="2" :dataarr="dataarr" @submit="submitItem" :mbloading="mbloading"></msg-box>
  </div>
</template>

<script>
import {findmaterial,updatematerial} from './../../api/AdvertisingPisition';
import { mapGetters} from 'vuex';
import moment from 'moment';

  export default {
    data(){
      return {
        data:{
            userId:'',
            deviceId:'',
            status:0,
            orderId:'',
            stime:'',
            etime:'',
            pageNum:'',
            pageSize:''
        },
        itemsisActive: 0,
        activeName: 'second',
        Switch:'',
        total:100,
        pageNum:3,
        pageSize:12,
        dateTime:'',
        setEditShow:false,
        dataarr:{},
        tableData:{
          pages:0,
          size:0,
          total:100,
          list:[]
        },
        loading:false,
        mbloading:false
      }
    },
    computed: {...mapGetters(['device','userInfo','setPageSize'])},
    methods: {
       hanldPage(val){
         if (val==0) {return;}
         this.getdata(val)
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      submitItem(dataarr){// 提交 审核状态
        this.mbloading=true;
        var subdata = {
            orderId:dataarr.orderId,
            material:[]
          }
        dataarr.materiallist.forEach(item=>{
          subdata.material.push({"remark":item.remark,"id":item.id,"checkStatus":item.checkStatus})
        });
        updatematerial(subdata).then(data=>{
          if (data.success) {
            this.$message({
              type:'success',
              message:data.msg
            });
            this.setEditShow=false;
            this.getdata();
          }else{
            this.$message({
              type:'error',
              message:data.msg
            })
          }
          this.mbloading=false;
        }).catch((err) => {this.mbloading=false})
      },
      getdata(val=1){
        this.set_get_param.set_param(this ,'page',val);
        this.loading=true;
        this.data.userId = this.userInfo.id;
        this.data.pageNum = typeof this.$route.query.page === 'number'?this.$route.query.page:1;

        this.data.pageSize = this.setPageSize.liner;
        findmaterial(this.data).then((data) => {
          if (data.success) {
              this.tableData = data.data
          }else{
              this.tableData.list = [];
              this.tableData.total = 0
          };
          this.loading=false
        }).catch(error=>this.loading=false)
      },
      checksetEditShow(item){
        item.materiallist.forEach((item,index) => {
            console.log(item.imagePath + '?avvod/m3u8/vb/1000k');
           item.err_area=false;
           item.remark = '';
           item.chStatus=item.checkStatus;
           item.playerOptions={
            muted: false,
            languages: 'zh',
            width:'600px',
            height:'446px',
            sources: [{
              type:"application/x-mpegURL",
              src:item.imagePath.split("?")[0] + '?avvod/m3u8/vb/1000k'
            }],
            techOrder: ['html5'],
            autoplay: false,
            controls: true,
            poster:item.playImg
          }
        });
        this.dataarr= JSON.parse(JSON.stringify(item));
        this.setEditShow = true;
      }
    },
    mounted () {
        this.pageNum=Number(this.$route.query.page>0?this.$route.query.page:1);
        this.tableData.total = this.pageNum*2;
        this.getdata();
    },
    filters:{
      playtimenum(val){
        if (val) {
          var asDay = moment.duration(new Date(val) - new Date()).asDays();
          return parseInt(asDay);
        }else{
          return '';
        };
      }
    }
  }

</script>

<style lang="scss" scoped>


</style>
