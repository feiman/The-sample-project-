import Advertising_add from "../pages/AdvertisingPisition/releaseAdvertising.vue";
import Advertising_edit from "../pages/AdvertisingPisition/releaseAdvertising_edit.vue";
import NotFoundView from "../components/404.vue";
import app from "../App.vue";
import login from "../pages/login.vue";

// Routes
const routes = [
  { path: "/login", component: login },
  { path: "/", redirect: '/login' },
  {
    path: "/bind",
    component: resolve => require(["../pages/bind.vue"], resolve)
  },
  {
    path: "/player",
    component: resolve => require(["./../pages/Program_editorial/player.vue"], resolve),
    // meta: { keepAlive: false, tabname: null, grouping: null, curname: null, childname: null }
  },
  {
    path: "/register",
    component: resolve => require(["../pages/register.vue"], resolve)
  },
  {
    path: "/resetPwd",
    component: resolve => require(["../pages/resetPwd.vue"], resolve)
  },
  {
    path: "/test",
    component: app,
    children: [{ path: "*", component: NotFoundView }]
  },
  {
    path: "",
    component: app,
    children: [
      {
        path: "/index",
        component: resolve => require(["../pages/index.vue"], resolve),
        // meta: { keepAlive: false, tabname: null, grouping: null, curname: null, childname: null }
      },
      {
        path: "/win",
        component: resolve => require(["../pages/layout/outwin.vue"], resolve),
        // meta: { keepAlive: false, tabname: null, grouping: null, curname: null, childname: null },
        children: [
          {
            path: "/win/Mydevice",
            component: resolve =>
              require(["../pages/ProgramReleased/Mydevice.vue"], resolve),
            meta: { keepAlive: false,
              tabname: "节目发布",
              grouping: "我的广告机",
              curname: "广告机列表",
              childname: null
            }
          },{
            path: "/win/Mydevice_add",
            component: resolve =>
              require(["../pages/ProgramReleased/Mydevice_add.vue"], resolve),
            meta: { keepAlive: false,
              tabname: "节目发布",
              grouping: "我的广告机",
              curname: "广告机列表",
              childname: '添加广告机'
            }
          },
          {
            path: "/win/MaterialGroup",
            component: resolve =>
              require(["../pages/ProgramReleased/MaterialGroup.vue"], resolve),
            meta: { keepAlive: false,
              tabname: "节目发布",
              grouping: "我的素材",
              curname: "素材分组",
              childname: null
            }
          },
          {
            path: "/win/MaterialList",
            component: resolve =>
              require(["../pages/ProgramReleased/MaterialList.vue"], resolve),
            meta: { keepAlive: false,
              tabname: "节目发布",
              grouping: "我的素材",
              curname: "素材列表",
              childname: null
            }
          },{
            path: "/win/MaterialList_uploading",
            component: resolve =>
              require(["../pages/ProgramReleased/MaterialList_uploading.vue"], resolve),
            meta: { keepAlive: false,
              tabname: "节目发布",
              grouping: "我的素材",
              curname: "素材列表",
              childname: '上传素材'
            }
          },{
            path: "/win/MaterialList_upload",
            component: resolve =>
              require(["../pages/ProgramReleased/MaterialList_upload.vue"], resolve),
            meta: { keepAlive: false,
              tabname: "节目发布",
              grouping: "我的素材",
              curname: "素材列表",
              childname: '上传素材'
            }
          },
          {
            path: "/win/MaterialTemplate",
            component: resolve =>
              require([
                "../pages/ProgramReleased/MaterialTemplate.vue"
              ], resolve),
            meta: { keepAlive: false,
              tabname: "节目发布",
              grouping: "我的素材",
              curname: "在线素材库",
              childname: null
            }
          },{
            path: "/win/ProgramList",
            component: resolve =>
              require([
                "../pages/ProgramReleased/ProgramList.vue"
              ], resolve),
            meta: { keepAlive: false,
              tabname: "节目发布",
              grouping: "我的节目",
              curname: "节目清单",
              childname: null
            }
          },{
            path: "/win/Program_new",
            component: resolve =>
              require([
                "../pages/ProgramReleased/Program_new.vue"
              ], resolve),
            meta: { keepAlive: false,
              tabname: "节目发布",
              grouping: "我的节目",
              curname: "节目清单",
              childname: "新建节目"
            }
          },{
            path: "/win/Program_editorial",
            component: resolve =>
              require([
                "../pages/Program_editorial/Program_editorial.vue"
              ], resolve),
            meta: { keepAlive: false,
              tabname: "节目发布",
              grouping: "我的节目",
              curname: "节目清单",
              childname: "编辑内容"
            }
          },{
            path: "/win/Program_Released",
            component: resolve =>
              require([
                "../pages/Program_Released/ProgramReleased.vue"
              ], resolve),
            meta: { keepAlive: false,
              tabname: "节目发布",
              grouping: "我的节目",
              curname: "发布节目",
              childname: null
            }
          },{
            path: "/win/PlayList",
            component: resolve =>
              require([
                "../pages/ProgramReleased/PlayList.vue"
              ], resolve),
            meta: { keepAlive: false,
              tabname: "节目发布",
              grouping: "我的节目",
              curname: "播放清单",
              childname: null
            }
          },{
            path: "/win/PlayList_detail",
            component: resolve =>
              require([
                "../pages/ProgramReleased/PlayList_detail.vue"
              ], resolve),
            meta: { keepAlive: false,
              tabname: "节目发布",
              grouping: "我的节目",
              curname: "播放清单",
              childname: "播放清单详情"
            }
          },{
            path: "/win/PlayList_log",
            component: resolve =>
              require([
                "../pages/ProgramReleased/PlayList_log.vue"
              ], resolve),
            meta: { keepAlive: false,
              tabname: "节目发布",
              grouping: "我的节目",
              curname: "播放清单",
              childname: "查看日志"
            }
          },
          {
            path: "/win/operationLog",
            component: resolve =>
              require([
                "../pages/StatementofAccount/operationLog.vue"
              ], resolve),
            meta: { keepAlive: false,
              tabname: "账户&报表",
              grouping: "日志管理",
              curname: "操作日志",
              childname: null
            }
          },
          {
            path: "/win/PlayLog",
            component: resolve =>
              require(["../pages/StatementofAccount/PlayLog.vue"], resolve),
            meta: { keepAlive: false,
              tabname: "账户&报表",
              grouping: "日志管理",
              curname: "播放日志",
              childname: null
            }
          },
          {
            path: "/win/earnings",
            component: resolve =>
              require(["../pages/StatementofAccount/earnings.vue"], resolve),
            meta: { keepAlive: false,
              tabname: "账户&报表",
              grouping: "报表统计",
              curname: "收益统计",
              childname: null
            }
          },
          {
            path: "/win/ordersReceived",
            component: resolve =>
              require([
                "../pages/StatementofAccount/ordersReceived.vue"
              ], resolve),
            meta: { keepAlive: false,
              tabname: "账户&报表",
              grouping: "报表统计",
              curname: "订单统计",
              childname: null
            }
          },
          {
            path: "/win/PassengersFlowStatistical",
            component: resolve =>
              require([
                "../pages/StatementofAccount/PassengersFlowStatistical.vue"
              ], resolve),
            meta: { keepAlive: false,
              tabname: "账户&报表",
              grouping: "报表统计",
              curname: "客流统计",
              childname: null
            }
          },
          {
            path: "/win/sysMessage",
            component: resolve =>
              require(["../pages/StatementofAccount/sysMessage.vue"], resolve),
            meta: { keepAlive: false,
              tabname: "账户&报表",
              grouping: "账户信息",
              curname: "消息中心",
              childname: null
            }
          },
          {
            path: "/win/sysMessage/sysMessageDetails",
            component: resolve =>
              require([
                "../pages/StatementofAccount/sysMessageDetails.vue"
              ], resolve),
            meta: { keepAlive: false,
              tabname: "账户&报表",
              grouping: "账户信息",
              curname: "消息中心",
              childname: "消息详情"
            }
          },
          {
            path: "/win/editPwd",
            component: resolve =>
              require(["../pages/StatementofAccount/editPwd.vue"], resolve),
            meta: { keepAlive: false,
              tabname: "账户&报表",
              grouping: "账户信息",
              curname: "修改密码",
              childname: null
            }
          },
          {
            path: "/win/information",
            component: resolve =>
              require(["../pages/StatementofAccount/information.vue"], resolve),
            meta: { keepAlive: false,
              tabname: "账户&报表",
              grouping: "账户信息",
              curname: "基本信息",
              childname: null
            }
          },
          {
            path: "/win/authentication",
            component: resolve =>
              require([
                "../pages/StatementofAccount/authentication.vue"
              ], resolve),
            meta: { keepAlive: false,
              tabname: "账户&报表",
              grouping: "账户信息",
              curname: "商家认证",
              childname: null
            }
          },
          {
            path: "/win/ToAuthentication",
            component: resolve =>
              require([
                "../pages/StatementofAccount/ToAuthentication.vue"
              ], resolve),
            meta: { keepAlive: false,
              tabname: "账户&报表",
              grouping: "账户信息",
              curname: "商家验证",
              childname: ""
            }
          },
          {
            path: "/win/ToAuthentication_reSub",
            component: resolve =>
              require([
                "../pages/StatementofAccount/ToAuthentication_reSub.vue"
              ], resolve),
            meta: { keepAlive: false,
              tabname: "账户&报表",
              grouping: "账户信息",
              curname: "商家验证",
              childname: ""
            }
          },
          {
            path: "/win/MyRating",
            component: resolve =>
              require(["../pages/AdvertisingPisition/MyRating.vue"], resolve),
            meta: { keepAlive: false,
              tabname: "广告位交易",
              grouping: "评价管理",
              curname: "我的评价",
              childname: null
            }
          },
          {
            path: "/win/MyRatingDetail",
            component: resolve =>
              require([
                "../pages/AdvertisingPisition/MyRatingDetail.vue"
              ], resolve),
            meta: { keepAlive: false,
              tabname: "广告位交易",
              grouping: "评价管理",
              curname: "我的评价",
              childname: "评价详情"
            }
          },
          {
            path: "/win/transactionDetail",
            component: resolve =>
              require([
                "../pages/AdvertisingPisition/transactionDetail.vue"
              ], resolve),
            meta: { keepAlive: false,
              tabname: "广告位交易",
              grouping: "我的财务",
              curname: "交易明细",
              childname: null
            }
          },
          {
            path: "/win/withdrawDetail",
            component: resolve =>
              require([
                "../pages/AdvertisingPisition/withdrawDetail.vue"
              ], resolve),
            meta: { keepAlive: false,
              tabname: "广告位交易",
              grouping: "我的财务",
              curname: "提现明细",
              childname: null
            }
          },
          {
            path: "/win/FinancialOverview",
            component: resolve =>
              require([
                "../pages/AdvertisingPisition/FinancialOverview.vue"
              ], resolve),
            meta: { keepAlive: false,
              tabname: "广告位交易",
              grouping: "我的财务",
              curname: "财务总览",
              childname: null
            }
          },
          {
            path: "/win/requestWithdrawal",
            component: resolve =>
              require([
                "../pages/AdvertisingPisition/requestWithdrawal.vue"
              ], resolve),
            meta: { keepAlive: false,
              tabname: "广告位交易",
              grouping: "我的财务",
              curname: "财务总览",
              childname: "申请提现"
            }
          },
          {
            path: "/win/Orderdetail",
            component: resolve =>
              require([
                "../pages/AdvertisingPisition/Orderdetail.vue"
              ], resolve),
            meta: { keepAlive: false,
              tabname: "广告位交易",
              grouping: "我的订单",
              curname: "订单列表",
              childname: "订单详情"
            }
          },
          {
            path: "/win/orderList",
            component: resolve =>
              require(["../pages/AdvertisingPisition/orderList.vue"], resolve),
            meta: { keepAlive: false,
              tabname: "广告位交易",
              grouping: "我的订单",
              curname: "订单列表",
              childname: null
            }
          },
          {
            path: "/win/NewList",
            component: resolve =>
              require(["../pages/AdvertisingPisition/NewList.vue"], resolve),
            meta: { keepAlive: false,
              tabname: "广告位交易",
              grouping: "客户节目",
              curname: "播放清单",
              childname: null
            }
          },{
            path: "/win/NewList_detail",
            component: resolve =>
              require(["../pages/AdvertisingPisition/NewList_detail.vue"], resolve),
            meta: { keepAlive: false,
              tabname: "广告位交易",
              grouping: "客户节目",
              curname: "播放清单",
              childname: "清单详情"
            }
          },
          {
            path: "/win/viewLog",
            component: resolve =>
              require(["../pages/AdvertisingPisition/viewLog.vue"], resolve),
            meta: { keepAlive: false,
              tabname: "广告位交易",
              grouping: "客户节目",
              curname: "节目列表",
              childname: "查看日志"
            }
          },
          {
            path: "/win/ShowInformation",
            component: resolve =>
              require([
                "../pages/AdvertisingPisition/ShowInformation.vue"
              ], resolve),
            meta: { keepAlive: false,
              tabname: "广告位交易",
              grouping: "客户节目",
              curname: "节目列表",
              childname: "节目详情"
            }
          },
          {
            path: "/win/confIred",
            component: resolve =>
              require(["../pages/AdvertisingPisition/confIred.vue"], resolve),
            meta: { keepAlive: false,
              tabname: "广告位交易",
              grouping: "客户素材",
              curname: "已审核",
              childname: null
            }
          },
          {
            path: "/win/checkPending",
            component: resolve =>
              require([
                "../pages/AdvertisingPisition/checkPending.vue"
              ], resolve),
            meta: { keepAlive: false,
              tabname: "广告位交易",
              grouping: "客户素材",
              curname: "待审核",
              childname: null
            }
          },
          {
            path: "/win/advertising",
            component: resolve =>
              require([
                "../pages/AdvertisingPisition/advertising.vue"
              ], resolve),
            meta: { keepAlive: false,
              tabname: "广告位交易",
              grouping: "我的广告位",
              curname: "广告位列表",
              childname: null
            }
          },
          {
            path: "/win/advertisingDetail",
            component: resolve =>
              require([
                "../pages/AdvertisingPisition/advertisingDetail.vue"
              ], resolve),
            meta: { keepAlive: false,
              tabname: "广告位交易",
              grouping: "我的广告位",
              curname: "广告位列表",
              childname: "广告位详情"
            }
          },
          {
            path: "/win/releaseAdvertising",
            component:Advertising_add,
            meta: { keepAlive: true,
              tabname: "广告位交易",
              grouping: "我的广告位",
              curname: "广告位列表",
               childname: "发布广告位"
            },
            name:'Advertising_add'
          },
          {
            path: "/win/releaseAdvertising_edit",
            component:Advertising_edit,
            meta: { keepAlive: true,
              tabname: "广告位交易",
              grouping: "我的广告位",
              curname: "广告位列表",
              childname: "修改广告位"
            },
            name:'Advertising_edit'
          }
        ]
      }
    ]
  },
  { path: "*", redirect: '/404' },
  { path: "/404", component:NotFoundView }
  
];

// sysMessageDetails
export default routes

