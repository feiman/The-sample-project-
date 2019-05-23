<template>
    <div class="cal_cen">
        <div id='calendar'></div>

        <div class="calendar_cen">
            <template v-for="(item,index) in lister">
                <div class="calendar_item" @mousedown="page_x = index">
                    <div style="width:100%;height:100%;" @click.stop.prevent="addDrag">
                         <!-- 已出租 -->
                        <div v-for="ite in item.orderlist" class="calendar_item_have_released" :class="'_leased_out'+index" :id="'leased_out'+ite.top" :style="{top:ite.top+'px',height:ite.height+'px',lineHeight:ite.height+'px'}">
                              已出售({{ite.startTime}}-{{ite.endTime}})
                        </div>
                        <!-- 已发布 -->
                        <div v-for="ite in item.showlist" class="calendar_item_leased_out" :class="'have_released'+index" :id="'released'+index" :style="{top:ite.top+'px',height:ite.height+'px',lineHeight:ite.height+'px'}">
                            已发布 ({{ite.startTime}}-{{ite.endTime}})
                        </div>
                        <!-- 拖拽层 -->
                    </div>
                    <div>
                        <template v-for="ite in item.dreage">
                            <div class="dreage" :class="'dreage'+index" :style="{height:ite.xheight-ite.xtop+'px'}">
                                <vue-draggable-resizable :id="'dreage_'+index" @dragging="onDrag" :marginTop="ite.xtop" @resizing="onResize" :y="ite.y-ite.xtop" :x="0" :minh="1"
                                class="_released" axis="y" :handles="['bm','tm']" :h='ite.h' :parent="true">
                                    <p class="drag" :id="'dreage_'+index">发布(<span :id="'dreage_'+index" :class="'drag'+index"></span>)</p>
                                </vue-draggable-resizable>
                            </div>
                        </template>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
// import jquery from 'jquery'
import Fullcalendar from 'Fullcalendar';
import 'Fullcalendar/dist/fullcalendar.css';
import moment from 'moment';
import VueDraggableResizable from './../../../components/vue-draggable-resizable.vue'
import {mapGetters,mapMutations} from 'vuex';
import types from './../../../store/mutation-types.js'

export default {
    name:'programWeek',
    data(){
        return {
            lister:[],
            page_x:"" // 点击第几列
        }
    },
    components:{VueDraggableResizable},
    computed:{
        ...mapGetters(['devicetime']),
        seldevicetimer() {
            return this.$store.state.devicetime.timers;
        }
    },
    watch: {
        seldevicetimer(val){
            //   lister:[{// 按天  第一天
            //     startDate:"2018-05-19",
            //     endDate:"2018-05-19",
            //     orderlist:[ // 已出售占用  可能多个时间
            //         {startTime:"08:00",endTime:"09:00"},
            //         {startTime:"08:00",endTime:"09:00"}
            //     ],
            //     showlist:[ // 已发布占用  可能多个时间
            //         {startTime:"08:00",endTime:"09:00",showName:'节目名称'},
            //         {startTime:"08:00",endTime:"09:00",showName:'节目名称'}
            //     ]
            // },{//  第二天
            //     startDate:"2018-05-20",
            //     endDate:"2018-05-20",
            //     orderlist:[// 已出售占用  可能多个时间
            //         {startTime:"08:00",endTime:"09:00"},
            //         {startTime:"08:00",endTime:"09:00"}
            //     ],
            //     showlist:[// 已发布占用  可能多个时间
            //         {startTime:"08:00",endTime:"09:00",showName:'节目名称'},
            //         {startTime:"08:00",endTime:"09:00",showName:'节目名称'}
            //     ]
            // },{//  第三天
            //     startDate:"2018-05-21",
            //     endDate:"2018-05-21",
            //     orderlist:[],// 已出售占用  可能没有  [] | null
            //     showlist:[] // 已发布占用  可能没有  
            // }]
            var lister=[];
            val.orderlist.forEach((item,index)=>{
                var orderlist=[];
                item.timelist.forEach(list=>{
                    let tier=this.computer_time(`${item.startDate} ${list.startTime}`,`${item.startDate} ${list.endTime}`,`${item.startDate} 00:00:00`);
                    orderlist.push({top:tier.top,height:tier.height,startTime:list.startTime,endTime:list.endTime});
                });
                var showlist=[];
                var itemshowlist=val.showlist[index];
                val.showlist[index].timelist.forEach(list=>{
                    let tier=this.computer_time(`${itemshowlist.startDate} ${list.startTime}`,`${itemshowlist.startDate} ${list.endTime}`,`${itemshowlist.startDate} 00:00:00`);
                    showlist.push({top:tier.top,height:tier.height,startTime:list.startTime,endTime:list.endTime,showName:list.showName})
                });
                lister.push({orderlist,showlist,dreage:[],startDate:item.startDate,endDate:item.endDate})
            });
            this.lister=lister;
        }
    },
    methods: {
        ...mapMutations({
            edit_weektime:types.edit_weektime // 修改 state weektime
        }),
        // 添加拖拽层 获取 鼠标点击的位置
        addDrag(e){

            if (!this.devicetime.driveId) {
                this.$message({type:"warning",message:"请先选择一个广告机！",title:"温馨提示"});
                return;
            };
            // console.log(e.layerY)
            // console.log(this.page_x);
             // 实现思路   获取  已发布 和已出租的 所有坐标  排序   去中间值 做比较 求出 所谓的拖拽层的 父级元素的 坐标和 高度
            const leased_outarr = document.querySelectorAll(`._leased_out${this.page_x}`);// 已出售
            const have_releasedarr = document.querySelectorAll(`.have_released${this.page_x}`);// 已出租
            const _program_content = document.querySelector('.calendar_item'); 
            const _program_content_h = _program_content.offsetHeight; // 获取 总层体的高度

            var new_out_arr = []; 
            leased_outarr.forEach((item, index) => {
                new_out_arr.push(item.offsetTop);
                new_out_arr.push(item.offsetTop+item.offsetHeight);
            });
            have_releasedarr.forEach((item,index)=>{
                new_out_arr.push(item.offsetTop);
                new_out_arr.push(item.offsetTop+item.offsetHeight);
            });

            var result_arr = new_out_arr.sort((x,y)=>{  
                return x-y;
            });

            result_arr.push(_program_content_h);

            result_arr= result_arr.slice();
            result_arr.unshift(0);

            this.lister[this.page_x].dreage.splice(0,1) // 删除原本元素

            for (let i = 0;  i< result_arr.length-1; i=i+2) {
                // console.log(result_arr[i],result_arr[i+1])
                if (e.layerY > result_arr[i] && e.layerY < result_arr[i+1]) {
                    // this.disable_stati = result_arr[i];
                    // this.disable_height = result_arr[i+1];
                    var liset=JSON.parse(JSON.stringify(this.lister));
                    this.liset=liset
                    setTimeout(() => {
                        this.lister[this.page_x].dreage.push({xtop:result_arr[i],xheight:result_arr[i+1], y:e.layerY,h:30});
                    }, 100);
                }
            }

            var weekarr=[];
            this.lister.forEach((item,index)=>{
                if (item.dreage.length!=0) {
                    let startTime=this.computer_topH(item.dreage[0].y);
                    let endTime=this.computer_topH(item.dreage[0].y+item.dreage[0].h);
                    weekarr.push({startTime,endTime,startDate:item.startDate,endDate:item.endDate});
                };
            });
            this.edit_weektime(weekarr);
        },
        // 点击图层获取 到点击的时间
        getClikMon(date){
            // console.log(date)
            // console.log(date.format('YYYY-MM-DD HH:mm:ss'))
        }
        ,
        // 计算时间  top 和height  多次调用
        computer_time(start_time,end_time,cur_date){
            var startDay = moment(start_time);
            var endDay = moment(end_time);
            var top = moment.duration(startDay - moment(cur_date)).asMinutes();
            var height = moment.duration(endDay- startDay).asMinutes();
            return {top,height}
        },

        // 拖拽层动作
        onResize(x, y, width, height) {
           var drageDom =  document.querySelector(`.drag${this.page_x}`);
           var startTimet = this.computer_topH(y+this.lister[this.page_x].dreage[0].xtop)
           var endTimet = this.computer_topH(y+this.lister[this.page_x].dreage[0].xtop+height)
           drageDom.innerHTML = `${startTimet}-${endTimet}`;

            this.lister[this.page_x].dreage[0].x=x;
            this.lister[this.page_x].dreage[0].y=y;
            this.lister[this.page_x].dreage[0].h=height;
            // this.lister[this.page_x].dreage[0].xtop=height-y;

           var weekarr=[];
           this.lister.forEach((item,index)=>{
              if (item.dreage.length!=0) {
                let startTime=this.computer_topH(item.dreage[0].y+item.dreage[0].xtop);
                let endTime=this.computer_topH(item.dreage[0].y+item.dreage[0].h+item.dreage[0].xtop);
                weekarr.push({startTime,endTime,startDate:item.startDate,endDate:item.endDate});
              };
           });
           this.edit_weektime(weekarr);
        },
        onDrag(x, y,dreage_id) {
            console.log(dreage_id)
            if (dreage_id) {
                var indexid=dreage_id.split('_')[1];
                var drageDom =  document.querySelector(`.drag${indexid}`);
                var startTimet = this.computer_topH(y+this.lister[this.page_x].dreage[0].xtop)
                var endTimet = this.computer_topH(y+this.lister[this.page_x].dreage[0].xtop+this.lister[this.page_x].dreage[0].h)
                drageDom.innerHTML = `${startTimet}-${endTimet}`;

                this.lister[this.page_x].dreage[0].x=x;
                this.lister[this.page_x].dreage[0].y=y;
            };
            var weekarr=[];
            this.lister.forEach((item,index)=>{
                if (item.dreage.length!=0) {
                    let startTime=this.computer_topH(item.dreage[0].y);
                    let endTime=this.computer_topH(item.dreage[0].y+item.dreage[0].h);
                    weekarr.push({startTime,endTime,startDate:item.startDate,endDate:item.endDate});
                };
            });
            // console.log(weekarr)
            this.edit_weektime(weekarr);
        },
            // 通过坐标转时间
        computer_topH(y){
            var day = moment().format('YYYY-MM-DD 00:00');
            var time = moment(day).minutes(y).format('HH:mm');
            return time;
            // console.log('++'+moment(day).minutes(90).format('YYYY-MM-DD HH:mm:ss'))
        },
        // 周视图初始化
        initWeek(){
            var self = this;
            $('#calendar').fullCalendar({
                locale: 'zh-cn',
                titleFormat:' ',
                defaultView:'agendaWeek',
                header: {
                    left: ' ',
                    center: ' ',
                    right: ' '
                },
                views: {
                    agenda:{
                        titleFormat:'YYYY, MM, DD'
                    }
                },
                events: [
                    {
                        start: '2018-04-13 10:00:00',
                        end: '2018-04-13 10:30:00',
                        rendering: 'background',
                        title:'不能使用'
                    }
                ],
                firstDay:moment().weekday(),
                columnHeaderFormat:'ddd （M-D）',
                slotLabelFormat:'HH:mm',
                eventBackgroundColor:'#ddd',
                eventTextColor:'#000',
                eventBorderColor:'#ddd',
                displayEventEnd:true,
                eventStartEditable:true,
                eventResourceEditable:true,
                snapDuration:1,
                eventDurationEditable:true,
                eventOverlap:false,
                dayClick: function(date, jsEvent, view) {
                    // console.log(date);
                    self.getClikMon(date)
                    // var eve={};  
                    //     eve.title="";  
                    //     eve.id=date.format('YYYY-MM-DD HH:mm:ss');  
                    //     eve.start=date.format('YYYY-MM-DD HH:mm:ss');  
                    //     eve.end=moment(date).minute(30).format('YYYY-MM-DD HH:mm:ss'),
                    // $('#calendar').fullCalendar('renderEvent', eve);   
                    //添加新的事件,些方法适合更改事件动作  
                    // change the day's background color just for fun
                    // $(this).css('background-color', 'red');
                },
                eventRender(event,element){
                    // alert(event,element);
                },
                eventClick: function(event, element) {
                    event.title = "CLICKED!";
                    
                },
                eventDragStart:function(calEvent, jsEvent, ui, view) {  //日程事件被拖动之前触发  

                },  
                eventDragStop:function(calEvent, jsEvent, ui, view) {   //日程事件被拖动之后触发  

                }
            });
        }
    },
    mounted () {
        this.initWeek();
    },
    filters:{
        computed_times(y){
            var day = moment().format('YYYY-MM-DD 00:00:00')
            var time = moment(day).minutes(y).format('HH:mm:ss')
            return time;
        }
    }
}
</script>

<style lang="scss">
 .fc-unthemed td.fc-today{
        background: none !important;
    }
    // .dreage{
    //     position: relative;
    // }
.cal_cen{
    position: relative;
    .calendar_cen{
        position:absolute;
        width: calc(100% - 40px);
        height: 1440px;
        top:69px;
        right:0px;
        z-index: 100;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        .calendar_item{
            width: calc(100% / 7);
            height:100%;
            position: relative;
            z-index:-1;
            .calendar_item_leased_out{
                z-index: 102;
                position: absolute;
                width: 100%;
                left: 0px;
                background: rgb(216, 216, 216);
            }
            .calendar_item_have_released{
                z-index: 102;
                position: absolute;
                width: calc(100% - 1px);
                left: 0;
                background: #fdd9cc;
                text-align: center;
            }
        }
        .drag{
            border: 1px solid #ddd;
            width: 100%;
            height: 100%;
            background: #f5f5f5;
            position: relative;
            z-index: 100000;
        }
    }

}
._released {
    width: 100% !important;
    z-index: 1000 !important;
}

#calendar{
    margin-top: -40px;
    .fc-agenda-view .fc-day-grid{
        display: none;
    }
    .fc-agenda-view .fc-day-grid +hr{
        display: none;
    }
    .fc-slats tr{
        height: 30px;
    }

    .fc-time.fc-widget-content{
        span{
            position: absolute;
            top:-4px;
            z-index:10;
            left: 0;
        }
    } 

    th,tr,td,thead,tbody{
        border: none;
        position: relative;
        border-color: #fff;
    }

    .fc-body .fc-minor .fc-time+td{
        border-left: 1px solid #ddd;
        border-top:1px dashed #ddd;
    }

    .fc-body tr .fc-time+td{
        border-top: 1px solid #ddd;
        border-left: 1px solid #ddd;
        // border-bottom:1px dashed #ddd;
    }
    .fc-body .fc-widget-content tr:last-child .fc-time+td::before{
        content: '';
        display: block;
        width: 100%;
        height: 1px;
        background: #ddd;
        position: absolute;
        bottom: 0px;
    }

    .fc-head table{
        th span{
            width: 100%;
            height: 40px;
            display: inline-block;
            border-bottom: 1px solid #ddd;
            box-sizing: border-box;
            // display: inline-block;
        }
    }
    .fc-head{
        margin-bottom:30px; 
        thead::after{
            content: '';
            display: block;
            background: #fff;
            width: 1px;
            height: 40px;
            position: absolute;
            right: -1px;
            top:0;
        }
    }
    .fc-scroller{
        overflow: auto !important;
        height: auto !important;
    }
    .fc-content-skeleton{
        border-right: 1px solid #ddd;
        td{
            height: 1440px;
            border: 1px solid #ddd;
        }
    } 
}
</style>
