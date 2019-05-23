<template>

<div class="ProgramReleased-right-time">

    <div class="_time">
        <!-- <div class="_time-text">{{curren_time}}</div>
        <div class="_time_selcet">
            <span class="__time_selcet_left" @click="prev"><i class="el-icon-minus"></i></span>
            <span class="__time_selcet_content">{{day_sum}}</span>
            <span class="__time_selcet_right" @click="next"><i class="el-icon-plus"></i></span>
        </div> -->
        <!-- <div class="_time-text">{{curren_time}}</div> -->
        <div class="_time_selcet">
            <span class="__time_selcet_left" @click="prev"><i class="el-icon-minus"></i></span>
            <span class="__time_selcet_content">{{curren_time}}</span>
            <span class="__time_selcet_right" @click="next"><i class="el-icon-plus"></i></span>
        </div>
        <el-date-picker class="_time-in"
        v-model="value" :picker-options="disabledDate"
        type="date" :clearable="false"
        placeholder="选择日期">
        </el-date-picker>
    </div>            

</div>
  
</template>

<script>
import moment from "moment";
import { mapGetters, mapMutations } from "vuex";
import types from "./../../../store/mutation-types";

export default {
  name: "time_select",
  data() {
    // 格式时间
    return {
      curren_time: "",
      value: "",
      disabledDate: {
        disabledDate(time) {
          return time.getTime() + 86400000 <= Date.now();
        }
      }
    };
  },
  mounted() {
    this.value = new Date();
  },
  computed: {
    day_sum() {
      var day = moment.duration(this.value - new Date()).asDays();
      if (day < 0) {
        return "今天";
      }
      return `${parseInt(day) + 1}天后`;
    }
  },
  methods: {
    ...mapMutations({
      setSelTime: types.setSelTime
    }),
    //  上一天
    prev() {
      //   不允许 到今天之前的 日期
      if (
        !(
          moment(this.value).format("YYYY-MM-DD") ==
          moment().format("YYYY-MM-DD")
        )
      ) {
        this.value = moment(this.value).subtract(1, "d"); // 减一天
      }
    },

    // 下一天
    next() {
      this.value = moment(this.value).add(1, "d"); // 加一天
    },

    curren_timefun(value) {
      var weekday = "1";
      var weekT = ["一", "二", "三", "四", "五", "六", "日"];
      for (var i = 1; i < 8; i++) {
        if (moment(value).weekday() == i) weekday = weekT[i - 1];
      }
      return moment(value).format("YYYY-MM-DD 星期") + weekday;
    }
  },
  watch: {
    value(val) {
      this.curren_time = this.curren_timefun(val);
      let dater = moment(val).format("YYYY-MM-DD");
      this.setSelTime({ sDate: dater, eDate: dater });
    }
  }
};
</script>

<style lang="scss">
._time-in {
  input {
    position: relative;
    left: -60px !important;
    top: -20px;
  }
  .el-input__prefix {
    font-size: 60px;
    left: -30px;
    top: 0px;
  }
}
</style>

<style lang="scss" scoped>
._time-in {
  position: absolute;
  top: 0px;
  right: 40px;
  width: 60px !important;
  height: 22px !important;
  opacity: 0;
  overflow: hidden;
  z-index: 10;
}

.ProgramReleased-right-time {
  float: right;
  position: relative;
  line-height: 22px;
  top: -24px;
  vertical-align: middle;
  position: relative;
  ._time {
    height: 22px;
    ._time-text {
      float: left;
    }

    ._time_selcet {
      display: inline-block;
      width: 170px;
      > span {
        float: left;
        display: block;
      }
      .__time_selcet_left {
        width: 23px;
        border: 1px solid #ddd;
        margin-right: -1px;
      }
      .__time_selcet_content {
        border: 1px solid #ddd;
        width: 126px;
      }
      .__time_selcet_right {
        border: 1px solid #ddd;
        margin-left: -1px;
        width: 22px;
      }
    }
  }
}
</style>

