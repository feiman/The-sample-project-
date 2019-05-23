<template>
    <div class="con-chart" style="overflow:hidden;">
        <div class="con-right con-box" v-loading="newsloading">
            <div class="con-card">
                <div class="vertical"></div>
                平台快报
            </div>
            <div class="con-news">
                <p v-for="(item,index) in newslist" @click="tosysmessage(item)">
                    {{index+1}}、&nbsp;{{item.title}}
                    <i class="icon-news news-re" v-show="item.status == 0"></i>
                </p>
            </div>
        </div>
        <div class="con-left" v-loading="loading">
            <div class="con-left-top con-box">
                <div class="con-totp">
                    <div class="con-card">
                        <div class="vertical"></div>
                        订单统计表 
                        <div class="con-card-right">
                            <a href="javascript:;" :class="{isCard:isCard==0}" @click="selisCard(0)">最近一天</a>
                            <a href="javascript:;" :class="{isCard:isCard==1}" @click="selisCard(1)">最近一周</a>
                            <a href="javascript:;" :class="{isCard:isCard==2}" @click="selisCard(2)">最近一月</a>
                            <!-- <a href="javascript:;">更多</a> -->
                            <router-link to="win/ordersReceived">更多</router-link>
                        </div>
                    </div>
                    <div class="com-card-item">
                        <p>总订单数</p>
                        <span>{{realdata.allOrder}}</span>
                    </div>
                    <div class="com-card-item">
                        <p>已支付订单数</p>
                        <span>{{realdata.payOrder}}</span>
                    </div>
                    <div class="com-card-item">
                        <p>待支付订单数</p>
                        <span>{{realdata.nopayOrder}}</span>
                    </div>
                    <div class="com-card-item">
                        <p>已完成订单数</p>
                        <span>{{realdata.completeOrder}}</span>
                    </div>
                    <div class="com-card-item">
                        <p>已评价订单数</p>
                        <span>{{realdata.evaluationOrder}}</span>
                    </div>
                    <div class="com-card-item">
                        <p>已关闭订单数</p>
                        <span>{{realdata.closeOrder}}</span>
                    </div>
                    <div class="com-card-item">
                        <p>已退单订单数</p>
                        <span>{{realdata.refundOrder}}</span>
                    </div>
                </div>
                <div class="con-tipe">
                    
                </div>
            </div>
            <div class="con-left-boff con-box" v-loading="mloading" style="overflow:hidden;">
                <div class="con-card">
                    <div class="vertical"></div>
                    客流量统计表
                     <div class="con-card-right">
                        <a href="javascript:;" :class="{isCard:isCardU==0}" @click="UisCard(0)">最近一天</a>
                        <a href="javascript:;" :class="{isCard:isCardU==1}" @click="UisCard(1)">最近一周</a>
                        <a href="javascript:;" :class="{isCard:isCardU==2}" @click="UisCard(2)">最近一月</a>
                        <router-link to="win/PassengersFlowStatistical">更多</router-link>
                    </div>
                </div>
                <div class="con-card-bottom">
                    <div class="containe-left">
                        <div id="containeone"></div>
                        <div style="padding-left:43%;">
                            最近<template v-if="isCardU==0">一天</template>
                            <template v-if="isCardU==1">一周</template>
                            <template v-if="isCardU==2">一月</template>男女客流量分布情况
                        </div>
                    </div>
                    <div class="containe-right">
                        <div id="containertwo" class="contaicart"></div>
                        <div class="containertwo_title">
                            最近<template v-if="isCardU==0">一天</template>
                            <template v-if="isCardU==1">一周</template>
                            <template v-if="isCardU==2">一月</template>不同年龄段的客流量分布情况
                        </div>
                        <div id="containerthr" class="contaicart"></div>
                        <div class="containerthr_title">
                            最近<template v-if="isCardU==0">一天</template>
                            <template v-if="isCardU==1">一周</template>
                            <template v-if="isCardU==2">一月</template>男女客流量分布情况
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {findhomepage} from './../../api/user';
import {findtraffic,findnews} from './../../api/StatementofAccount';
import {mapGetters} from 'vuex';


export default{
    name:"conchart",
    props: {
      
    },
    data(){
        return {
            isCardU:0,
            isCard:0,
            realdata:{},
            newslist:[
                {id:null,newsname:'加购收藏人群快速转化，用客户运营平台！',isnew:true},
                {id:null,newsname:'律师来了！遇到三无产品投诉如何应对？',isnew:false},
                {id:null,newsname:'年货节把客户带回家！',isnew:false},
                {id:null,newsname:'官方企业服务市场，营销创意设计一站解决。',isnew:false},
                {id:null,newsname:'无人前台上新啦，速来免费领一台，1月31日结束。',isnew:false},
                {id:null,newsname:'详情短视频玩法升级，助力成交转化。',isnew:false},
                {id:null,newsname:'律师来了！消保法及售后纠纷的法律风险你了解吗？',isnew:false},
                {id:null,newsname:'问问小二｜营销规则“最低价”解读！',isnew:false},
                {id:null,newsname:'发布平台完善信息、市场行业竞品自动分析，猛戳速学！',isnew:false}
            ],
            xdata:["1点","2点","3点","4点","5点","6点", "7点", "8点","9点",
                "10点","11点","12点","13点","14点", "15点","16点","17点","18点","19点","20点",
                "21点","22点","23点","24点"],
            sdata:[],
            loading:true,
            mloading:false,
            newsloading:false
        }   
    },
    computed:{...mapGetters(['userInfo'])},
    mounted () {
        this.sdata = this.sdataAll();
        this.mons();
        this.Thr();
        this.Twos();
    },
    methods: {
        selisCard(type){
             this.loading=true;
            this.isCard=type;
            this.getfindhomepage(type);
        },
        UisCard(type){
            this.mloading=true;
            this.isCardU=type;
            this.getfindtraffic(type);
        },
        getfindhomepage(type=0){
          
            findhomepage({userId:this.userInfo.id,type:type}).then(data=>{
                if (data.success) {
                  this.realdata=data.data;
                };
                this.loading=false
            }).catch(error=>{this.loading=false});
        },
        getfindtraffic(type=0){
            findtraffic({ userId:this.userInfo.id,
            serialNumber:'',
            type:type}
            ).then(data=>{
                if (data.success) {
                      this.mons(data.data.todaylist,type);
                      this.Twos(data.data.agemap);
                      this.Thr(data.data.sexmap);
                }
                this.mloading=false;
            }).catch(error=>{this.mloading=false;})
        },
        sdataAll(){
            var marker = {
            // radius:6
            }
            var setColor='#ff7c4c';
            var n = 24;
            var arr = []
            for (let index = 0; index < n; index++) {
            arr.push({marker:marker,color:setColor,y:index*12})
            }
            return arr;
        },
        mons(todaylist,type=0){
            if (type) {
                 todaylist =  todaylist.reverse();
            }
              var xdata=[];
              var ydata=[];
            if (this.isCardU==0) {
                todaylist.forEach(item=>{
                    xdata.push(item.endtime+'点');
                    ydata.push({marker:{},color:'#ff7c4c',y:item.count})
                });
            }else{
                todaylist.forEach(item=>{
                    xdata.push(item.endtime.slice(-5));
                    ydata.push({marker:{},color:'#ff7c4c',y:item.count})
                });
            }

            if (type==2) {
                 var maxlength = xdata.length-2;
            }else{
                 var maxlength = xdata.length-1;
            }

            var self = this;
            var options = {
                    title:{
                        text:'',
                    },
                    "subtitle": {
                        "text": "",
                    },
                    "xAxis": [
                        {
                        "type": "category",
                        "categories": xdata,
                        "allowDecimals": false,
                        "endOnTick": true,
                        "max": maxlength,
                        "min": 0,
                        "minRange": 0,
                        "showLastLabel": true,
                        "offset": 0,
                        "index": 0,
                        "isX": true,
                        "tickLength": 0,
                        "tickAmount": 23,
                        "showEmpty": true
                        }
                    ],
                    "series": [
                        {
                          "name": "",
                          "data": ydata,
                          "animation": true,
                          "connectEnds": true,
                          "enableMouseTracking": false,
                          "_colorIndex": 0,
                          "_symbolIndex": 0,
                          color:'#89c997',
                          dataLabels:{
                              style:{fontSize: "8px"}
                          }
                        }
                    ],
                    "yAxis": [
                        {
                        "title": {
                            "text": ""
                        },
                        "labels": {
                            "format": ""
                        },
                         softMin:100,
                         tickPixelInterval:60,
                        "index": 0,
                        "minRange":600,
                         "allowDecimals":false,
                         lineWidth:1
                        }
                    ],
                    "chart": {
                        "style": {
                        "fontFamily": "\"微软雅黑\", Arial, Helvetica, sans-serif",
                        "color": "#333",
                        "fontSize": "8px",
                        "fontWeight": "normal",
                        "fontStyle": "normal"
                        },
                        "borderWidth": 0,
                        "borderColor": "",
                        "height": null,
                        "type": "line"
                    },
                    "plotOptions": {
                        "line": {
                        "animation": false,
                        "allowPointSelect": false
                        },
                        "series": {
                        "dataLabels": {
                            "enabled": true
                        },
                        "animation": false
                        }
                    },
                    "exporting": {
                        "enabled": false,
                        "sourceWidth": 10,
                        "fallbackToExportServer": true
                    },
                    "legend": {
                        "enabled": false
                    },
                    "credits": {
                        "enabled": false
                    },
                    "colors": [
                        "#ff7c4c",
                        "#ffecb3",
                        "#90ed7d",
                        "#ffeb3b",
                        "#8085e9",
                        "#f15c80",
                        "#e4d354",
                        "#2b908f",
                        "#f45b5b",
                        "#91e8e1"
                    ],
                    "labels": {
                        "style": {
                        "position": "absolute",
                        "color": "#424242"
                        }
                    }
            }

            Highcharts.chart("containeone",options)
        },
        Twos(agemap){
          var dom = document.getElementById("containertwo");
          var myChart = echarts.init(dom);
          var app = {};
          var option = null;
          app.title = '';

            //  var keyarr=['学龄前（6岁以下）','小学生（6-11岁）','中学生（12-17岁）'
            // ,'青年期（18-25岁）','壮年期（26-35岁）','盛年期（36-45岁）','中年期（46-60岁）','老年期（60岁以上）']
            var keyarr=['（6岁以下）','（6-11岁）','（12-17岁）','（18-25岁）','（26-35岁）','（36-45岁）','（46-60岁）','（60岁以上）']
            var oparr=[];
           oparr.push({value:agemap.six,name:keyarr[0]});
           oparr.push({value:agemap.SixToEleven,name:keyarr[1]});
           oparr.push({value:agemap.TwelveToSeventeen,name:keyarr[2]});
           oparr.push({value:agemap.EighteenToTwentyfive,name:keyarr[3]});
           oparr.push({value:agemap.TwentysixToThirtyfive,name:keyarr[4]});
           oparr.push({value:agemap.ThirtysixToFortyfive,name:keyarr[5]});
           oparr.push({value:agemap.FortysixToSixty,name:keyarr[6]});
           oparr.push({value:agemap.sixty,name:keyarr[7]});
          option = {
              tooltip: {
                  trigger: 'item',
                  formatter: "{b}: ({d}%)",
                  style:{
                     fontSize:'6px'
                  }
              },
              legend: {
                  orient: 'vertical',
                  x: 'right',
                //   data:keyarr,
                  align:'left',
                  itemWidth:16
              },
              series: [
                  {
                      name:'',
                      type:'pie',
                      radius: ['0%', '80%'],
                      avoidLabelOverlap: false,
                      label: {
                          normal: {
                              show: true,
                              position: 'outside',
                              fontFamily:"Arial",
                            //   align:'center',
                              formatter: '{d}%',
                              fontSize:10
                          }
                      },
                      labelLine: {
                          normal: {
                              show: true,
                              length:2,
                              length2:14,
                              emphasis:{
                                  show:true
                              }
                          }
                      },
                      data:oparr,
                      itemStyle: {
                          normal: {
                            //   borderWidth:2,
                            //   borderType:'solid',
                            //   borderColor:'#fff'
                          }
                      }
                  }
              ],
              color:['#00aff0','#1ad1d5','#53b03b','#d916b4','#f15a22','#1d953f','#00a6ac','#f39c12','#6950a1']
          };
          myChart.setOption(option, true);

        },
        Thr(sexmap){
          var dom = document.getElementById("containerthr");
          var myChart = echarts.init(dom);
          var app = {};
          var option = null;
          app.title = '';

          var keyarr=['男','女'];
          var dataarr=[{value:sexmap.sumboy, name:keyarr[0]},{value:sexmap.sumgirl, name:keyarr[1]}]
          option = {
              // color:[],
              tooltip: {
                  trigger: 'item',
                  formatter: "{b}: ({d}%)"
              },
              legend: {
                  orient: 'vertical',
                  x: 'left',
                //   data:keyarr,
                  align:'left',
                  itemWidth:16
              },
              series: [
                  {
                      name:'',
                      type:'pie',
                      radius: ['0%', '80%'],
                      avoidLabelOverlap: false,
                      label: {
                          normal: {
                              show: true,
                              position: 'outside',
                            //   align:'center',
                              formatter: '{b}\n{d}%',
                              fontSize:10
                          }
                      },
                      labelLine: {
                          normal: {
                              show: true,
                              length:2,
                              emphasis:{
                                  show:true
                              }
                          }
                      },
                      data:dataarr,
                      itemStyle: {
                          normal: {
                            //   borderWidth:2,
                            //   borderType:'solid',
                            //   borderColor:'#fff'
                          }
                      }
                  }
              ],
              color:['#00aff0','#f39c12']
          };
          myChart.setOption(option, true);
        },
        getfindnews(){
            this.newsloading=true
            findnews({
                userId:this.userInfo.id,
                pageNum:1,
                pageSize:15,
                type:1
            }).then(data=>{
                if (data.success) {
                    this.newslist = data.data.list;
                }else{this.newslist=[]}
                this.newsloading=false
            }).catch(err=>this.newsloading=false)
        },
        tosysmessage(iem){
            this.$router.push({path:'/win/sysMessage/sysMessageDetails',query:{id:iem.id}});
        }
    },
    mounted () {
        this.getfindhomepage();
        this.getfindtraffic();
        this.getfindnews();
    }
  }
</script>
<style lang="scss" scoped>
    .con-right{
        width: 22%;
        float: right;
        height: 634px;
        
       .con-news{
            padding-left:20px; 
           p{
                width:100%;
                padding-right: 30px;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
                display: block;
                line-height: 30px;
                cursor: pointer;
                position: relative;
                // .news-re{
                //     position: absolute;
                //     right: 4px;
                //     top: 0;
                // }
           }
           
       }
    }
    .con-left{
        width: 76.5%;
        float: left;
        height: 160px;
        .con-left-boff{
            margin-top:20px; 
            height:450px;
            // @media screen and (max-width:1366px){
            //     height: 300px;
            // }
        }
        .con-totp{
            height:160px;
        }
    }
 
 

 .con-card{
     padding-left:18px;
     line-height: 45px;
     border-bottom: 1px  solid #f4f4f4;
 }
 .com-card-item{
     font-size: 12px;
     line-height: 38px;
     padding: 20px 0 0 33px;
     display: inline-block;
    >p{
        color: #777;
    }
    >span{
        color: #ff7c4c;
    }
 }

.con-card-right{
    float: right;
    a{
        margin-right:25px; 
    }
}
.isCard{
    color: #ff7c4c;
}

.containe-left{
    float: left;
    width:65%;
}

.containe-right{
    width: 35%;
    float: right;
}
.contaicart{
    width:100%;
    height: 156px;
    @media screen and (max-width:1366px){
        height:130px;
    }
}

#containeone{
    height:330px;
    @media screen and (max-width:1366px){
        height:300px;
    }
}

.con-card-bottom{
    padding:30px;
}
.containertwo_title{
    padding-left:24%;
    @media screen and (max-width:1366px){
       padding-left:11%;
    }
}
.containerthr_title{
    padding-left:28%;
    @media screen and (max-width:1366px){
       padding-left:20%;
    }
}

</style>


