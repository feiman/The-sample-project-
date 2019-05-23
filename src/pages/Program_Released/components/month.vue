<template>
    <div>
        <div id='calendarer'></div>
    </div>
</template>

<script>
import Fullcalendar from 'Fullcalendar';
import 'Fullcalendar/dist/fullcalendar.css';
import moment from 'moment';
import {mapGetters,mapMutations} from 'vuex';
import types from './../../../store/mutation-types';

export default {
    name:'programMonth',
    data(){
        return {
            dateLliste:[]
        }
    },
    computed:{
        ...mapGetters(['devicetime']),
        seldevicetimer() {
            return this.$store.state.devicetime.timers;
        }
    },
    methods: {
        ...mapMutations({
            edit_monthtime:types.edit_monthtime
        }),
        initMonth(dataDays){ // 初始化月视图
                const self  = this;
                    $('#calendarer').fullCalendar({
                        locale: 'zh-cn',
                        titleFormat:' ',
                        defaultView: 'month',
                        header: {
                            left: ' ',
                            center: ' ',
                            right: ' '
                        },
                        views: {
                            agenda:{
                                titleFormat:' '
                            }
                        },
                        events: function(start, end, timezone, callback) {
                            var newDatass = dataDays;
                            var events = [];
                            $.each(newDatass, function(idx, val) {
                                events.push({
                                        title: '不可用',
                                        start: val.start, // will be parsed
                                        end:val.end,
                                        textColor: '#888888',
                                        backgroundColor: '#f5f5f5',
                                        borderColor: '#ddd',
                                        className: 'seleAll'
                                });
                            });
                            callback(events);
                        },
                        // firstDay:moment().weekday(),
                        slotLabelFormat:'HH：mm',
                        eventBackgroundColor:'#ddd',
                        eventTextColor:'#000',
                        eventBorderColor:'#ddd',
                        displayEventEnd:false,
                        eventStartEditable:false,
                        eventResourceEditable:false,
                        snapDuration:1,
                        eventDurationEditable:true,
                        eventOverlap:true,
                        selectable: false, //是否允许选择
                        selectHelper:true,
                        showNonCurrentDates:false,
                        selectOverlap:false,
                        unselectCancel:'.my-form',
                        dayClick: function(date, jsEvent, view) {
                            if (!self.devicetime.driveId) {
                                self.$message({type:"warning",message:"请先选择一个广告机！",title:"温馨提示"});
                                return;
                            };
                            var eve={};  
                            eve.title=" 已选择";  
                            eve.id=date.format('YYYY-MM-DD');  
                            eve.start=date.format('YYYY-MM-DD');  
                            eve.end=date.format('YYYY-MM-DD'),
                            eve.className = 'selentSall'
                            $('#calendarer').fullCalendar('renderEvent', eve);   
                            self.dateLliste.push(eve)
                        },
                        eventClick: function(event, element) {
                            if (event.className[0] != 'seleAll') {
                                 self.dateLliste.forEach((item, index) => {
                                     if(event.id == item.id){
                                         self.dateLliste.splice(index,1)
                                     }
                                 });
                                 $('#calendarer').fullCalendar('removeEvents',event._id)
                            }
                        }
                    });
        }
    },
    mounted () {
        // var self = this;
        // var dayCurr = moment().add(1, 'd')
        // var dataDays = [{
        //     "name":`已过期（${moment(new Date()+1).format('YYYY-MM-DD')}前）`,
        //     "start": "start: '2010-04-01",
        //     "end":moment(dayCurr).format('YYYY-MM-DD'),
        //     "sy": 0
        // }];
        // this.initMonth(dataDays)
        $('.fc-bgevent').click(function(event) {
            event.preventDefault(); 
        });
        
    },
    watch:{
        seldevicetimer(val){
            var dayCurr = moment().add(1, 'd')
            var lister=[{
                "name":`已过期（${moment(new Date()+1).format('YYYY-MM-DD')}前）`,
                "start": "start: '2010-04-01",
                "end":moment(dayCurr).format('YYYY-MM-DD'),
                "sy": 0
            }];
            val.orderlist.forEach((item,index)=>{
                // item.timelist.forEach((list,inx)=>{
                //     if (inx==0) {
                //          lister.push({
                //             "name":`已发布(${item.startDate} ${list.startTime} - ${item.endDate} ${list.endTime})`,
                //             "start": item.startDate,
                //             "end":item.endDate,
                //             "sy": item.startDate
                //         });
                //     };
                // });
                var itemshowlist=val.showlist[index];
                val.showlist[index].timelist.forEach((list,inx)=>{
                    if (inx==0) {
                         lister.push({
                            "name":`已发布(${item.startDate} ${itemshowlist.startTime} - ${item.endDate} ${itemshowlist.endTime})`,
                            "start": item.startDate,
                            "end":item.endDate,
                            "sy": item.startDate
                        }) 
                    };
                });
            });
            this.initMonth( lister)
        },
        dateLliste(val){
            // console.log(val)
            // var getEventSources=$('#calendarer').fullCalendar('getEventSources');
            // console.log(getEventSources)
            setTimeout(() => {
                    this.edit_monthtime(val)
            }, 500);
        }
    },
}
</script>

<style lang="scss">

#calendarer{
    margin-top: -42px;
    .fc-scroller{
        overflow: hidden !important;
        padding-bottom:20px;
        height: auto !important;
    }

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

    .fc-widget-content{
        height: 116px !important;
        .fc-bg{
            table{
                border: 1px solid #ddd;
            }
            td{
                border: 1px solid #ddd;
            }
        }
    } 


    .fc-widget-header{
        margin-bottom:16px;
    }
    
    .fc-day-number{
        float: left !important;
        margin: 8px;
        &::after{
            content: '日';
        }
    }

        tr:first-child>td>.fc-day-grid-event {
			border-radius: 0;
            border: none;
            margin-top: -36px;
            height: 114px;
            margin-left: 0px;
        }
        tr:nth-child(2)>td>.fc-day-grid-event {
			border-radius: 0;
            border: none;
            margin-top: -90px;
            height: 40px;
            margin-left: 0px;
		}

  

    .fc-content-skeleton .fc-day-top{
        background: none !important;
    }
    


    .seleAll{
        background: rgba($color: #ddd, $alpha: 0.5) !important;
    }

    .selentSall{
        background: rgba($color: #ddd, $alpha: 0.5) !important;
        width: 100%;
        margin-left: -2px !important;
    }
}

  .fc-unthemed td.fc-today{
        background: none !important;
    }
		#calendarer .fc-nonbusiness {
			color: #ccc;
			cursor: not-allowed;
		}

		#calendarer .fc-bgevent {
			opacity: 0.5;
		}

		#calendarer .fc-day-grid-event .fc-content {
			height: 100%;
			line-height: 100px;
			text-align: center;
		}

		#calendarer .fc-content-skeleton {
			padding-bottom: 0px;
		}

		#calendarer .fc-highlight {
			background: rgb(20, 18, 18);
		}
</style>
