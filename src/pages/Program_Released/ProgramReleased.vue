<template>
  <div class="con-box ProgramReleased">
      <!-- 节目发布 -->
      <div class="con-win-title">
        节目：<span class="win-gray program-maright">{{programdata.showName}}</span>

        播放时长：<span class="win-gray program-maright">{{programdata.playLength}}"</span>

        选择广告机：
        <Select v-model="driveId" style="width:300px" class="con-maleft" placeholder="全部">
            <Option v-for="item in device.list" :value="item.id" :key="item.id">{{ item.position+item.deviceName }}</Option>
        </Select>
      <el-button size="small" style="float:right;margin:20px;" type="primary" @click="release()"> 发布 </el-button>
    </div>

    <div class="ProgramReleased-container">
        <div class="ProgramReleased-tabs">
            <div class="_tabs">
                <div class="_tabs-center" :class="{_is_tabs_active:is_tabs_active==0}" @click="selis_tabs_active(0)">日</div>
                <div class="_tabs-center" :class="{_is_tabs_active:is_tabs_active==1}" @click="selis_tabs_active(1)">周</div>
                <div class="_tabs-center" :class="{_is_tabs_active:is_tabs_active==2}" @click="selis_tabs_active(2)">月</div>
            </div>
        </div>

        <time-selet v-if="is_tabs_active==0"></time-selet>

        <week-selet v-else-if="is_tabs_active==1"></week-selet>

        <month-selet v-else></month-selet>
    </div>

    <div class="_sel_date">
        <program-day v-if="is_tabs_active == 0"></program-day>

        <program-week v-else-if="is_tabs_active == 1"></program-week>

        <program-month v-else></program-month>
    </div>

    <!-- 节目发布确定提示 -->
      <Modal title="节目发布确定提示"
        v-model="moxSel" class-name="vertical-center-modal"
        :mask-closable="false">
        <div class="subrelease">
          <p>您确定发布以下节目在对应的设备上和时间吗？</p>
          <div>
            <span class="subrelease_left">节目：</span>
            <span class="subrelease_right">{{programdata.showName}}</span></div>
          <div>
             <span class="subrelease_left">设备：</span>
            <span class="subrelease_right">{{deviceName}}</span></div>
          <div>
            <span class="subrelease_left">发布时间：</span>
            <span class="subrelease_right">
              <div class="subrelease_right_posti">
                <div class="subrelease_right_div" v-for="item in times">
                  {{item.startDate}}到{{item.endDate}}&nbsp;&nbsp; {{item.startTime}}-{{item.endTime}}
                </div>
              </div>
              </span>
            </div>
        </div>
        <div slot="footer">
            <el-button size="small" @click="moxSel = false">取消</el-button>
            <el-button type="primary" size="small" :loading="saveloading" @click="submit()">确定</el-button>
        </div>
     </Modal>
   </div>
</template>

<script>
import "./ProgramReleased.scss";
import programDay from "./components/day.vue";
import timeSelet from "./components/time_selet.vue";
import weekSelet from "./components/week_selet.vue";
import monthSelet from "./components/month_selet.vue";
import programWeek from "./components/week.vue";
import programMonth from "./components/month.vue";
import { mapState, mapMutations, mapActions } from "vuex";
import types from "../../store/mutation-types";
import {updatemyshow} from './../../api/ProgramReleased'; // 修改接口地址
import moment from 'moment';

export default {
  data() {
    return {
      moxSel:false,
      driveId: "",
      is_tabs_active: 0,
      programdata:{},
      saveloading:false,
      times:[]
    };
  },
  computed: { ...mapState(["userInfo", "edituserdata", "device",'devicetime']),
    deviceName(){
         var deviceName=''; 
         this.device.list.filter(item => {
            if (this.driveId==item.id) {
              deviceName=item.position+item.deviceName
            };
          });
        return deviceName
    }
  },
  components: {
    programMonth,
    programWeek,
    programDay,
    timeSelet,
    weekSelet,
    monthSelet
  },
  methods: {
    ...mapMutations({
      seSeldeviceid: types.seSeldeviceid,
      setSelTime:types.setSelTime
    }),
    selis_tabs_active(type){
      this.is_tabs_active=type;
      if (type==0) {
        var sDate=this.set_get_param.TimeMatter(null, null, new Date(), "date");
        var eDate=this.set_get_param.TimeMatter(null, null, new Date(), "date");
      }else if(type==1){
        var sDate=this.set_get_param.TimeMatter(null, null, new Date(), "date");
        var eDate= moment(new Date().getTime()+86400000*6).format("YYYY-MM-DD");
      }else{
        var sDate=moment(new Date()).format("YYYY-MM-01");
        var eDate=moment(new Date()).format("YYYY-MM-")+moment(new Date()).daysInMonth();
      }
      this.setSelTime({sDate, eDate});
    },
    release(){
      if (!this.driveId) {
        this.$message({
          type: "warning",
          message: "请选择一个广告机，再进行操作!"
        });
        return;
      }
      if (!this.devicetime.startDate) {
        this.$message({
          type: "warning",
          message: "请选择一个是时间段在进行操作!"
        });
        return;
      };
      this.times=[];
      if (this.is_tabs_active==0) {//天
         this.times=[{startDate:this.devicetime.startDate,
         endDate:this.devicetime.startDate,
         startTime:this.devicetime.day.computed_start_time,
         endTime:this.devicetime.day.computed_end_time}]
      }else if(this.is_tabs_active==1){
        // console.log(this.devicetime.week);
        this.times=this.devicetime.week;
        // console.log(this.devicetime.week)
      }else{
        this.devicetime.month.forEach((item, index) => {
          this.times.push({
            startDate:item.start,
            endDate:item.end,
            startTime:"00:00",
            endTime:"24:00"
          })
        });
      }
      this.moxSel=true;
    },
    submit() {
      // "times":[{"startDate":"2018-04-25","endDate":"2018-04-26","startTime":"08:00","endTime":"09:00"}]
        var savadata={
            id:this.programdata.id,
            deviceId:this.driveId,
            playLength:'',
            showProportion:'',
            backColor:'',
            materialId:'',
            times:this.times,
            makeShow:''
        };
        this.saveloading=true;
        updatemyshow(savadata).then((data) => {
            if (data.success) {
                this.$message({type:'success',message:data.msg});
                setTimeout(() => {
                  this.$router.push('PlayList');
                }, 1000);
            }else{
                this.$message({type:'warning',message:data.msg});
            };
            this.saveloading=false;
        }).catch((err) => {
            this.saveloading=false;
            this.$message({type:'warning',message:'保存失败，请重新保存!'}) 
        })
    }
  },
  watch: {
    driveId(val) {
      this.seSeldeviceid(val);
    }
  },
  mounted() {
    this.$store.dispatch("getfinddevicetime");
    var edituserdata= this.storage.get('edituserdata.editdata',edituserdata,1000*1000*1000*1000,true);
    // console.log(edituserdata)
    this.programdata=edituserdata;
  }
};
</script>
