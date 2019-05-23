<template>
  <div class="con-box">
    <!-- 头部 标签 -->
    <div class="con-win-title">广告机：
      <Select v-model="initdata.serialNumber" style="width:287px" class="con-maleft" placeholder="全部">
        <Option v-for="item in device.list" :value="item.serialNumber" :key="item.serialNumber">{{ item.position +item.deviceName  }}</Option>
      </Select>
      <el-button size="small" type="primary" icon="el-icon-search" @click="initdatafun">搜索</el-button>

      <div class="con-win-title-right">
        <a href="javascript:;" class="con-win-title-right-text" :class="{seColor:seColorShow==0}" @click="selTime(0)">最近一天</a>
        <a href="javascript:;" class="con-win-title-right-text" :class="{seColor:seColorShow==1}" @click="selTime(1)">最近一周</a>
        <a href="javascript:;" class="con-win-title-right-text" :class="{seColor:seColorShow==2}" @click="selTime(2)">最近一月</a>
      </div>
    </div>

    <div class="con-win-chart" v-loading="loading">
        <div class="chart-main">
          <div class="con-card">
              <div class="vertical"></div>
              <span v-if="seColorShow==0">最近一天 的客流量统计表（总客流量{{sum}}人）</span>
              <span v-else-if="seColorShow==1">最近一周 的客流量统计表（总客流量{{sum}}人）</span>
              <span v-else-if="seColorShow==2">最近一月 的客流量统计表（总客流量{{sum}}人）</span>
          </div>
          <div class="chart-detail">
            <div id="containerone"></div>
          </div>
        </div>
          <div class="chart-left">
              <div class="con-card">
                  <div class="vertical"></div>
                  <span v-if="seColorShow==0">最近一天不同年龄段的客流量分布情况</span>
                  <span v-else-if="seColorShow==1">最近一周不同年龄段的客流量分布情况</span>
                  <span v-else-if="seColorShow==2">最近一月不同年龄段的客流量分布情况</span>
              </div>
              <div class="chart-detail">
                <div id="containertwo"></div>
              </div>
          </div>
          <div class="chart-right">
             <div class="con-card">
                  <div class="vertical"></div>
                  <span v-if="seColorShow==0">最近一天男女客流量分布情况</span>
                  <span v-else-if="seColorShow==1">最近一周男女客流量分布情况</span>
                  <span v-else-if="seColorShow==2">最近一月男女客流量分布情况</span>
              </div>
              <div class="chart-detail">
                <div id="containerthr"></div>
              </div>
          </div>
    </div>
  </div>
</template>

<script>
import {findtraffic} from '././../../api/StatementofAccount';
import {mapGetters} from 'vuex';

  export default {
    data(){
      return {
        initdata:{
            userId:'',
            serialNumber:'',
            type:0
        },
        seColorShow:0,
        loading:false,
        driveValue:'',
        sum:""
      }
    },
    computed:{...mapGetters(['userInfo','device'])},
    methods: {
      initdatafun(){
            this.initdata.userId = this.userInfo.id;
            this.loading=true;
            findtraffic(this.initdata).then(data=>{
                if (data.success) {
                    this.sum=data.data.sexmap.sum;
                    this.mons(data.data.todaylist);
                    this.Twos(data.data.agemap);
                    this.Thr(data.data.sexmap);
                }
                this.loading=false;
            }).catch(err=>this.loading=false)
      },
      selTime(type){
				this.initdata.type=type;
				this.seColorShow=type;
				this.initdatafun();
      },
      mons(todaylist){
                var xdata=[];
                var ydata=[];
            if (this.initdata.type==0) {
                todaylist.forEach(item=>{
                    xdata.push(item.endtime+'点');
                    ydata.push({marker:{},color:'#ff7c4c',y:item.count})
                });
            }else{
                todaylist =  todaylist.reverse();
                todaylist.forEach(item=>{
                    xdata.push(item.endtime.slice(-5));
                    ydata.push({marker:{},color:'#ff7c4c',y:item.count})
                });
                
            };
            var self = this;
            var options = {
                    "xAxis": [
                        {
                        "type": "category",
                        "categories": xdata,
                        "allowDecimals": false,
                        "endOnTick": true,
                        "max":xdata.length-1,
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
                          "data":ydata,
                          "animation": true,
                          "connectEnds": true,
                          "enableMouseTracking": false,
                          "_colorIndex": 0,
                          "_symbolIndex": 0,
                          color:'#89c997'
                        },
                        {
                          "enableMouseTracking": false,
                          "_colorIndex": 1,
                          "_symbolIndex": 1,
                          "data": []
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
                        "index": 0,
                        "minRange":200,
                         "allowDecimals":false,
                         lineWidth:1
                        }
                    ],
                    "chart": {
                        "style": {
                        "fontFamily": "\"微软雅黑\", Arial, Helvetica, sans-serif",
                        "color": "#333",
                        "fontSize": "12px",
                        "fontWeight": "normal",
                        "fontStyle": "normal"
                        },
                        "borderWidth": 0,
                        "borderColor": "",
                        "height": null,
                        "type": "line"
                    },
                    "title": {
                        "text": "",
                        "align": "center"
                    },
                    "subtitle": {
                        "text": ""
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

            Highcharts.chart("containerone",options)
      },
      Twos(agemap){
        //   console.log(agemap);
        //  agemap.six
          var dom = document.getElementById("containertwo");
          var myChart = echarts.init(dom);
          var app = {};
          var option = null;
          app.title = '';

            var keyarr=['学龄前（6岁以下）','小学生（6-11岁）','中学生（12-17岁）'
            ,'青年期（18-25岁）','壮年期（26-35岁）','盛年期（36-45岁）','中年期（46-60岁）','老年期（60岁以上）']
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
                  formatter: "{b}: ({d}%)"
              },
              legend: {
                  orient: 'vertical',
                  x: 'left',
                  data:keyarr,
                  align:'left',
                  itemWidth:16
              },
              series: [
                  {
                      name:'',
                      type:'pie',
                      radius: ['34%', '70%'],
                      avoidLabelOverlap: false,
                      label: {
                          normal: {
                              show: true,
                              position: 'inner',
                              align:'center',
                              formatter: '{d}%'
                          }
                      },
                      labelLine: {
                          normal: {
                              show: false
                          }
                      },
                      data:oparr,
                      itemStyle: {
                          normal: {
                              borderWidth:2,
                              borderType:'solid',
                              borderColor:'#fff'
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
                  data:keyarr,
                  align:'left',
                  itemWidth:16
              },
              series: [
                  {
                      name:'',
                      type:'pie',
                      radius: ['34%', '70%'],
                      avoidLabelOverlap: false,
                      label: {
                          normal: {
                              show: true,
                              position: 'inner',
                              align:'center',
                              formatter: '{d}%'
                          }
                      },
                      labelLine: {
                          normal: {
                              show: false
                          }
                      },
                      data:dataarr,
                      itemStyle: {
                          normal: {
                              borderWidth:2,
                              borderType:'solid',
                              borderColor:'#fff'
                          }
                      }
                  }
              ],
              color:['#00aff0','#f39c12']
          };
          myChart.setOption(option, true);
      },
      ones(){
        var dom = document.getElementById("containerone");
          var myChart = echarts.init(dom);
          var app = {};
          var option = null;
          app.title = '';

       var option = {
              title: {
                  text: ''
              },
              tooltip: {
                  trigger: 'none'
              },
              legend: {
                  data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
              },
              grid: {
                  left: '3%',
                  right: '4%',
                  bottom: '3%',
                  containLabel: true
              },
              toolbox: {
                  feature: {
                      saveAsImage: {}
                  }
              },
              xAxis: {
                  type: 'category',
                  boundaryGap: false,
                  data: ['1','2','3','4','5','6','7','1','2','3','4','5','6','7','1','2','3','4','5','6','7']
              },
              yAxis: {
                  type: 'value'
              },
              series: [
                  {
                      name:'',
                      type:'line',
                      stack: '总量',
                      data:[
                        {value:820,name:'1'},
                        {value:820,name:'1'}],
                      itemStyle:{
                        normal:{color:'#89c997',borderWidth:10,borderType:'solid',borderColor:"#ff7c4c"}
                      },
                      hoverAnimation:false
                  }
              ],
              color:'#ff7c4c'
          };
          myChart.setOption(option, true);
      }
    },
    mounted () {
			if(this.device.list.length){
				this.initdata.serialNumber=this.device.list[0].serialNumber;
			};
      this.initdatafun();
    }
  }
</script>

<style lang="scss" scoped>
.con-win-chart{
  padding: 0px 24px 20px 24px;
  overflow: hidden;
  .chart-main{
    border-bottom:1px solid #ddd;
    margin-bottom:30px;
  }
  .chart-detail{
    margin:20px 0px;
  }
}

#containerone{
  width: 60%;
  height: 330px;
  margin: 0 auto;
  @media(max-width:800px) {
    width: 96%;
  }
}


.chart-left{
  float: left;
  width: 50%;
}
.chart-right{
  float: right;
  width: 50%;
}

#containertwo{
  width: 98%;
  height: 330px;
}
#containerthr{
  width: 98%;
  height: 330px;
}
</style>
