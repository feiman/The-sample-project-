import { findallAdmachine, finddevicetime } from "./../api/ProgramReleased";

import { Message } from 'element-ui';
import Vue from "vue";
import Vuex from "vuex";
import {finduser} from './../api/user';
import { getSessionKey } from "./../common/utils";
import set_get_param from "./../common/plug";
import types from "./mutation-types";

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: true, // process.env.NODE_ENV !== 'production', 直接修改state 抛出异常

  getters: {
    loading: state => state.loading,
    menuList: state => state.menuList,
    sidebar: state => state.sidebar,
    userInfo: state => state.userInfo,
    device: state => state.device,
    // currentMenus: state => state.currentMenus,
    active: state => state.active,
    setPageSize: state => state.setPageSize,
    edituserdata: state => state.edituserdata,
    devicetime: state => state.devicetime
  },
  state: {
    loading: false,
    menuList: [],
    active: {
      activetab: 3, //导航
      activeName: {}, // 标签
      weekTag: 0
    },
    sidebar: {
      collapsed: getSessionKey("state.sidebar.collapsed", "false") === "true",
      show: getSessionKey("state.sidebar.show", "true") === "true"
    },
    device: {
      isMobile: false,
      list: [
        {
          serialNumber: "",
          deviceMo: "",
          onlineStatus: "",
          id: "",
          position: "暂无广告机",
          switchStatus: "",
          deviceName: "",
          version: "",
          space: ""
        }
      ]
    },
    userInfo: {},
    // currentMenus:[],
    setPageSize: {
      block: 12,
      liner: 15
    },
    statusList: {
      // (0待审核 1审核通过 2审核驳回 3上架 4下架)'
      pstatus: [
        { value: "", label: "全部" },
        { value: "0", label: "待审核" },
        { value: "1", label: "审核通过" },
        { value: "2", label: "审核驳回" },
        { value: "3", label: "上架" },
        { value: "4", label: "下架" }
      ]
    },
    // 用户节目清单 数据
    edituserdata: {
      editdata: {}
    },
    devicetime: { // 发节目选择时间 
      driveId: "",
      startDate: set_get_param.TimeMatter(null, null, new Date(), "date"),
      endDate: set_get_param.TimeMatter(null, null, new Date(), "date"),
      timers: {},
      day:{// 天视图
        computed_start_time:"",
        computed_end_time:""
      },
      week:[],// 周视图
      month:[]
    } // 用户 已出租 和 已使用的 的时间
  },
  mutations: {
    //只能同步的函数
    [types.TOGGLE_DEVICE](state, isMobile) {
      state.device.isMobile = isMobile;
    },
    [types.TOGGLE_LOADING](state) {
      state.loading = !state.loading;
    },
    [types.LOAD_MENU](state, menu) {
      state.menuList = menu;
    },
    // [types.LOAD_CURRENT_MENU] (state, menu) {
    //   state.currentMenus = menu;
    // },
    [types.SET_USER_INFO](state, info) {
      var userdata = set_get_param.storage.ifget("userdata",1000 * 60 * 60 * 24 * 100);
      if (userdata) {
        state.userInfo = userdata;
        return;
      } else {
        state.userInfo = { id: null };
        return;
      }
      state.userInfo = info;
    },
    [types.TOGGLE_SIDEBAR](state, collapsed) {
      if (collapsed == null) collapsed = !state.sidebar.collapsed;
      state.sidebar.collapsed = collapsed;
      window.sessionStorage.setItem("state.sidebar.collapsed", collapsed);
    },
    [types.TOGGLE_SIDEBAR_SHOW](state, show) {
      if (show == null) state.sidebar.show = !state.sidebar.show;
      else {
        state.sidebar.show = show;
      }
      window.sessionStorage.setItem("state.sidebar.show", state.sidebar.show);
    },
    [types.ACTIVE_TAB](state, tabn) {
      sessionStorage.setItem("state.activetab", tabn);
      state.active.activetab = tabn;
    },
    [types.ACTIVE_NAME](state, activeName) {
      // 标签切换
      state.active.activeName = activeName;
    },
    [types.ACTIVE_WEEKTAG](state, weektag) {
      state.active.weekTag = weekTag;
    },
    [types.LOAD_DEVICE](state, list) {
      state.device.list = list;
    },
    [types.EDIT_USERDATA](state, data) {
      state.edituserdata.editdata = data;
    },
    [types.getfinddevicetime](state, data) {
      state.devicetime.timers = data;
    },
    [types.setSelTime](state, { sDate, eDate }) {
      //选择组件修改 时间
      state.devicetime.startDate = sDate;
      state.devicetime.endDate = eDate;
      this.dispatch("getfinddevicetime");
    },
    [types.seSeldeviceid](state, data) {
      // 修改广发 中 广告机
      state.devicetime.driveId = data;
      this.dispatch("getfinddevicetime");
    },
    [types.edit_daytime](state,{sDate,eDate}){// 修改 日视图 选择时间
      state.devicetime.day.computed_start_time=sDate;
      state.devicetime.day.computed_end_time=eDate;
    },
    [types.edit_weektime](state,weekarr){
      state.devicetime.week=weekarr;
    },
    [types.edit_monthtime](state,montharr){
      state.devicetime.month=montharr;
    }
  },
  actions: {
    //异步的函数
    toggleLoading: ({ commit }) => commit(types.TOGGLE_LOADING),
    loadMenuList: ({ commit }) => {
      // Vue.axios.get(api.SYS_MENU_LIST).then(res => {
      //   commit(types.LOAD_MENU, res.data);
      // }).catch(exp => commit(types.LOAD_MENU, defaultValue.menuList));
    },
    // 获取广告机列表
    syncloaddevice: ({ context, state, commit }) => {
      // 请求 广告机
      findallAdmachine({ userId: state.userInfo.id }).then(data => {
        if (data.success) {
          // data.data.unshift({"serialNumber":"","deviceMo":"","onlineStatus":"","id":"","position":" ","switchStatus":"","deviceName":"","version":"","space":""})
          commit(types.LOAD_DEVICE, data.data);
        }
      });
    },
    getfinddevicetime: ({ context, state, commit }) => {
      // 每次时间发生变化时 就改变该广告机的时间
      if(state.devicetime.driveId){
        finddevicetime({
          userId: state.userInfo.id,
          deviceId: state.devicetime.driveId,
          startDate: state.devicetime.startDate,
          endDate: state.devicetime.endDate
        }).then(data => {
          if (data.success) {
            // console.log(data);
            // data.data.forEach(item => {
              
            // });
            commit(types.getfinddevicetime, data.data);
          } else {
            console.log(data.msg);
          }
        });
      }else{
        Message({type:"warning",message:"请先选择一个广告机！",title:"温馨提示"});
      };
    },
    // 获取用户信息， 每次刷新后去 获取最新的用户信息
    getFindUserdata:({ context, state, commit })=>{ 
        finduser({userId:state.userInfo.id}).then((data)=>{
          if (data.success) {
              var loginste = set_get_param.storage.ifget('loginste', 1000 * 60 * 60 * 24 * 200)
                if (loginste == 0) {
                  set_get_param.storage.set('userdata', data.data) // localstorage
                } else {
                  set_get_param.storage.set('userdata', data.data, true) // sessionstorage
                };
              commit(types.SET_USER_INFO,data.data);
          };
        });
    }
  }
});

export default store;
