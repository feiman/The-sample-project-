<template>
<div>
    <div class="_program_content" id="_program_content">
        <div @click="addDrag" style="padding:0 0 20px 0;overflow:hidden;">
            <div class="_program_item" v-for="(item,index) in dateList" 
            :id="item.day_d">
                <div class="_program_item_left">{{item.time}}</div>
                <div class="_program_item_right"></div>
                <div class="_program_item_right2"></div>
            </div>
        </div>
        
        <!-- 已出租 -->
        <template v-for="item in leased_out_list">
            <div class="_leased_out" :id="'leased_out'+item.top" :style="{top:item.top+'px',height:item.height+'px',lineHeight:item.height+'px',fontSize:item.height/item.height+'em'}">
               该时段已出售
            </div>
        </template>
        
        <!-- 已发布 -->
        <template v-for="item in have_released_list">
             <div class="_have_released" :style="{top:item.top+'px',height:item.height+'px',lineHeight:item.height+'px'}">{{item.showName}} （{{item.stime}} - {{item.etime}}）</div>
        </template>
        
        <template v-for="item in dragArr">
            <div id="drage" :style="{height:item.xheight-item.xtop+'px'}">
                <vue-draggable-resizable @dragging="onDrag" :marginTop="item.xtop" @resizing="onResize" :y="item.y-item.xtop" :x="61" :minh="1"
                class="_released redrage" @activated="activated" axis="y" @activedState="activedState" :handles="['bm','tm']" :h='item.h' :parent="true">
                    <p class="drag" :style="{lineHeight:item.h+'px'}">{{computed_start_time}}-{{computed_end_time}}发布</p>
                    <!-- <input type="text" id="keyinput" @keyup.37="key37" @keyup.39="key39" @keyup.38="key38" @keyup.40="key40"style="position:absolute;left:0;top:0;z-inex:-100;opacity:0;outline:none;"> -->
                </vue-draggable-resizable>
            </div>
        </template>
        
    </div>
</div>
</template>

<script>
import VueDraggableResizable from "./../../../components/vue-draggable-resizable.vue";
import moment from "moment";
// 2018-04-11 02:00:00   2018-04-11 03:00:00  初始值
import { mapGetters,mapMutations} from "vuex";
import types from './../../../store/mutation-types';

export default {
  name: "programDay",
  data() {
    return {
      initTime: {
        start: "2018-04-11 02:00:00",
        end: "2018-04-11 03:00:00"
      }, // 初始时间
      dateList: [],
      have_released_list: [], // 已发布{ top: 600, height: 30 ,showName:'冬季服装展',stime:'',etime:''}
      leased_out_list: [], //已出租
      addShow: false,
      dragArr: [],
      seltime: "",
      computed_start_time: "",
      computed_end_time: "",
      disable_stati: "",
      disable_height: ""
    };
  },
  components: { VueDraggableResizable },
  computed: {
    ...mapGetters(["devicetime"]),
    seldevicetimer() {
      return this.$store.state.devicetime.timers;
    }
  },
  methods: {
    ...mapMutations({
      edit_daytime:types.edit_daytime
    }),
    // 添加 拖拽层
    addDrag(e) {
      if (!this.devicetime.driveId) {
        this.$message({type:"warning",message:"请先选择一个广告机！",title:"温馨提示"});
        return;
      };
      this.dragArr.splice(0, 1);
      // 实现思路   获取  已发布 和已出租的 所有坐标  排序   去中间值 做比较 求出 所谓的拖拽层的 父级元素的 坐标和 高度
      const leased_outarr = document.querySelectorAll("._leased_out"); // 已出售
      const have_releasedarr = document.querySelectorAll("._have_released"); // 已出租

      const _program_content = document.querySelector("#_program_content");
      const _program_content_h = _program_content.offsetHeight - 40;

      const drage = document.querySelector("#drage");

      var new_out_arr = [];
      leased_outarr.forEach((item, index) => {
        // console.log(item.offsetTop , item.offsetHeight);
        new_out_arr.push(item.offsetTop);
        new_out_arr.push(item.offsetTop + item.offsetHeight);
      });
      have_releasedarr.forEach((item, index) => {
        new_out_arr.push(item.offsetTop);
        new_out_arr.push(item.offsetTop + item.offsetHeight);
      });

      var result_arr = new_out_arr.sort(function(x, y) {
        return x - y;
      });

      result_arr.push(_program_content_h);

      result_arr = result_arr.slice();
      result_arr.unshift(0);

      for (let i = 0; i < result_arr.length - 1; i = i + 2) {
        // console.log(result_arr[i],result_arr[i+1])
        if (e.layerY > result_arr[i] && e.layerY < result_arr[i + 1]) {
          this.disable_stati = result_arr[i];
          this.disable_height = result_arr[i + 1];

          setTimeout(() => {
            this.dragArr.push({
              xtop: result_arr[i],
              xheight: result_arr[i + 1],
              y: e.layerY,
              h: 30
            });
          }, 100);
        }
      }
      // console.log(leased_outarr.offsetTop , leased_outarr.offsetHeight);
      // setTimeout(() => {
      //    this.dragArr.push({y:e.layerY,h:30});
      // }, 200);
    },
    // 鼠标移上 移除 拖拽 事件
    deldrag(e) {},
    //  设置时间 格
    dateList_new() {
      let time = 8;
      for (let index = 0; index < 24; index++) {
        this.dateList.push({ time: `${index<10?'0'+index:index}:00`, day_d: "day_d" + index });
      }
    },

    // 计算时间  top 和height  多次调用
    computer_time(start_time,end_time,currentday) {
      var startDay = moment(start_time);
      var endDay = moment(end_time);
      // console.log(startDay)
      var initH = moment.duration(startDay - moment(currentday)).asMinutes();

      var S = moment.duration(endDay - startDay).asMinutes();
      // console.log(S, initH);

      return { S, initH };
      // this.leased_out_list.push({top:initH,height:S});
    },
    // 通过坐标转时间
    computer_topH(y) {
      var day = moment().format("YYYY-MM-DD 00:00");
      var time = moment(day)
        .minutes(y)
        .format("HH:mm");
      return time;
      // console.log('++'+moment(day).minutes(90).format('YYYY-MM-DD HH:mm:ss'))
    },

    // 拖拽层动作
    onResize(x, y, width, height) {
      this.computed_start_time = this.computer_topH(y + this.disable_stati); // 计算拖拽开始时间
      this.computed_end_time = this.computer_topH(
        y + height + this.disable_stati
      ); // 计算拖拽结束时间
      this.edit_daytime({sDate:this.computed_start_time,eDate:this.computed_end_time});
      this.dragArr[0].h=height;
    },
    onDrag(x, y) {
      // console.log(x,y)
      var height = parseInt(document.querySelector("._released").style.height);
      this.computed_start_time = this.computer_topH(y + this.disable_stati); // 计算拖拽开始时间
      this.computed_end_time = this.computer_topH(
        y + height + this.disable_stati
      ); // 计算拖拽结束时间
       this.edit_daytime({sDate:this.computed_start_time,eDate:this.computed_end_time});
    },
    key39(){// 右
      this.dragArr[0].h+=1;
      var h = this.dragArr[0].h;
      
      $(".redrage").height(`${h}px`);
      $(".redrage drag").height(`${h}px`);
      // 重新计算时间
      this.computed_start_time = this.computer_topH(this.dragArr[0].y + this.disable_stati); // 计算拖拽开始时间
      this.computed_end_time = this.computer_topH(
        this.dragArr[0].y + this.dragArr[0].h + this.disable_stati
      );
         this.edit_daytime({sDate:this.computed_start_time,eDate:this.computed_end_time});
    },
    key37(){// 左
      this.dragArr[0].h-=1;

      var h = this.dragArr[0].h;
      $(".redrage").height(`${h}px`);
      $(".redrage drag").height(`${h}px`);

      // 重新计算时间
      this.computed_start_time = this.computer_topH(this.dragArr[0].y + this.disable_stati); // 计算拖拽开始时间
      this.computed_end_time = this.computer_topH(
        this.dragArr[0].y + this.dragArr[0].h + this.disable_stati
      );
         this.edit_daytime({sDate:this.computed_start_time,eDate:this.computed_end_time});
    },
    key38(){// 上
      this.dragArr[0].y-=1;
      
      var y = this.dragArr[0].y;
      $(".redrage").css("top",`${y}px`);
      $(".redrage drag").css("top",`${y}px`);
    // this.onDrag(60, this.dragArr[0].y)

      // 重新计算时间
      this.computed_start_time = this.computer_topH(this.dragArr[0].y + this.disable_stati); // 计算拖拽开始时间
      this.computed_end_time = this.computer_topH(
        this.dragArr[0].y + this.dragArr[0].h + this.disable_stati
      );
         this.edit_daytime({sDate:this.computed_start_time,eDate:this.computed_end_time});
    },
    key40(){// 下
      this.dragArr[0].y+=1;

      var y = this.dragArr[0].y;
      $(".redrage").css("top",`${y}px`);
      $(".redrage drag").css("top",`${y}px`);

      // 重新计算时间
      this.computed_start_time = this.computer_topH(this.dragArr[0].y + this.disable_stati); // 计算拖拽开始时间
      this.computed_end_time = this.computer_topH(
        this.dragArr[0].y + this.dragArr[0].h + this.disable_stati
      );
         this.edit_daytime({sDate:this.computed_start_time,eDate:this.computed_end_time});
    },
    activedState(state){
      console.log(state);
      // if (true) {
      //    setTimeout(()=>{
      //       $("._released").find("input").focus()
      //    },10)
      // }
    },
    activated(){
      // this.computed_start_time = this.computer_topH(this.dragArr[0].y); // 计算拖拽开始时间
      // this.computed_end_time = this.computer_topH(
      //   this.dragArr[0].y + this.dragArr[0].h
      // );
      //    this.edit_daytime({sDate:this.computed_start_time,eDate:this.computed_end_time});
    },

    // 设置最后 一行不显示
    edit_lastitem() {
      setTimeout(() => {
        var _program_items = document.querySelectorAll("._program_item");
        //  _program_items[_program_items.length-1].querySelector('._program_item_right')
        //  .className="_program_item_right _program_item_right_top";

        //  _program_items[_program_items.length-1].querySelector('._program_item_right2')
        //  .className="_program_item_right2 _program_item_right_none";
        _program_items[_program_items.length - 1].querySelector(
          "._program_item_right2"
        ).style.borderBottom =
          "1px solid #ddd";
      }, 200);
    },

    // 得到元素总高度 和 有多少 元素
    _program_content_h() {
      setTimeout(() => {
        const _program_content = document.querySelector("#_program_content");
        const _program_content_h = _program_content.offsetHeight;
        return {
          _program_content_h: _program_content_h,
          _program_content_sum: _program_content_h / 30
        };
      }, 200);
    }
  },
  mounted() {
    this.dateList_new(); //  设置时间 格

    this.edit_lastitem(); //设置最后 一行不显示
    // .devicetime.timers have_released_list

    window.addEventListener("keyup",(e)=>{
      if (e.keyCode == 39) {
        this.key39();
        return false;
      }
      if (e.keyCode == 37) {
        this.key37();
        return false;
      }
      if (e.keyCode == 38) {
        this.key38();
        return false;
      }
      if (e.keyCode == 40) {
        this.key40();
        return false;
      }
    })
  },
  watch: {
    seldevicetimer(val) {
      this.leased_out_list=[];
      this.have_released_list=[];

      val.orderlist.forEach(item => {
        item.timelist.forEach(list=>{
          let stime = item.startDate+" " + list.startTime;
          let etime = item.startDate+" " + list.endTime;
          let ter = this.computer_time(stime, etime,item.startDate+" 00:00:00");
          this.leased_out_list.push({ 
              top: ter.initH, 
              height: ter.S ,
              showName:'',
              stime:list.startTime,
              etime:list.endTime
          });
        });
      });
       
     val.showlist.forEach(item=>{
        item.timelist.forEach(list=>{
          let stime = item.startDate+" " + list.startTime;
          let etime = item.startDate+" " + list.endTime;
          let ter = this.computer_time(stime, etime,item.startDate+" 00:00:00");
          this.have_released_list.push({ 
              top: ter.initH, 
              height: ter.S ,
              showName:list.showName,
              stime:list.startTime,
              etime:list.endTime
          });
        });
     })
    }
  },
  filters: {
    computed_times(y) {
      var day = moment().format("YYYY-MM-DD 00:00:00");
      var time = moment(day).minutes(y).format("HH:mm:ss");
      return time;
    }
  }
};
</script>

<style lang="scss" scoped>
._program_content {
  width: 100%;
  min-height: 500px;
  max-height: 1480px;
  position: relative;
  // overflow: hidden;
  ._program_item {
    width: 100%;
    clear: both;
    ._program_item_left {
      width: 60px;
      font-size: 10px;
      color: #888;
      text-align: center;
      position: relative;
      top: -4px;
      float: left;
    }
    ._program_item_right {
      float: right;
      width: calc(100% - 60px);
      height: 30px;
      border: 1px solid #ddd;
      border-bottom: 1px dashed #ddd;
    }
    ._program_item_right2 {
      width: calc(100% - 60px);
      height: 30px;
      border: 1px solid #ddd;
      border-top-color: #fff;
      border-bottom-color: #fff;
      float: right;
    }

    &:last-child {
      ._program_item_right2 {
        border-bottom: 1px solid #ddd !important;
      }
    }
  }

  ._program_item_right_none {
    height: 0px !important;
    border: none !important;
  }

  ._program_item_right_top {
    height: 0px !important;
    border-right: none !important;
    border-bottom: none !important;
    border-left: none !important;
  }

  // 已出租覆盖物
  ._leased_out {
    width: calc(100% - 62px);
    background: #fdd9cc;
    min-height: 30px;
    position: absolute;
    right: 1px;
    text-align: center;
    color: #ffa17f;
    font-size:1em;
  }

  // 已发布 覆盖物
  ._have_released {
    width: calc(100% - 62px);
    background: #F5F5F5;
    min-height: 30px;
    position: absolute;
    bottom: 200px;
    right: 1px;
    padding: 0 12px;
  }

  // 发布覆盖物
  ._released {
    width: calc(100% - 62px) !important;
    background: #f5f5f5;
    right: 1px;
    color:#888888;
    text-align: center;
    font-size: 12px;
  }
}

#drage {
  overflow: hidden;
}

._resize_box {
  width: 100%;
  height: 100%;
}
</style>
