<template>
  <aside class="main-sidebar animated" :class="{ showSlide: sidebar.show, hideSlide: !sidebar.show, expandSide:(!sidebar.collapsed||device.isMobile)}">
    <el-scrollbar tag="div" wrapClass="vue-scrollbar" v-if="(!sidebar.collapsed||device.isMobile)">
      <div class="sidebar">
        <el-menu :unique-opened="true" :default-active="onRoutes"
                 class="el-menu-style"
                 theme="light" router :collapse="sidebar.collapsed&&!device.isMobile" @select="handleSelect">
          <template v-for="item in menulist">
              <el-submenu id="menusid" :index="item.href" v-if="item.children && item.children.length>0" class="el-menu-sub">
                <template slot="title"><i :class="item.icon"></i><span>{{item.name}}</span></template>
                <div v-show="sidebar.collapsed" class="slidnav-title">{{item.name}}</div>
                <template v-for="child in item.children">
                  <sub-menu v-if="child.children && child.children.length>0" :param="child"></sub-menu>
                  <el-menu-item class="mun_item":index="child.href" v-else><i class="icon iconfont icon-dian"></i><span>{{child.name}}</span></el-menu-item>
                </template>
              </el-submenu>
              <el-menu-item :index="item.href" v-else class="el-menu-each"><i :class="item.icon"></i><span>{{item.name}}</span></el-menu-item>
          </template>
        </el-menu>
      </div>
    </el-scrollbar>
    
    <div class="sidebar" v-else>
      <el-menu :default-active="onRoutes" :unique-opened="true"
               class="el-menu-style"
               theme="light" router :collapse="sidebar.collapsed&&!device.isMobile" @select="handleSelect">
        <template v-for="item in menulist">
            <el-submenu id="menusid" :index="item.href" v-if="item.children && item.children.length>0" class="el-menu-sub">
              <template slot="title"><i :class="item.icon"></i><span>{{item.name}}</span></template>
            <div v-show="sidebar.collapsed" class="slidnav-title">{{item.name}}</div>
              <template v-for="child in item.children">
                <sub-menu v-if="child.children && child.children.length>0" :param="child"></sub-menu>
                <el-menu-item :index="child.href" v-else><i class="icon iconfont icon-dian"></i><span>{{child.name}}</span></el-menu-item>
              </template>
            </el-submenu>
            <el-menu-item :index="item.href" v-else class="el-menu-each"><i :class="item.icon"></i><span>{{item.name}}</span></el-menu-item>
        </template>
      </el-menu>
    </div>
  </aside>
</template>
<script>
  import {mapGetters, mapActions, mapMutations} from 'vuex'
  import types from "../store/mutation-types"


  export default {
    props: {
      show: Boolean,
    },
    data() {
      return {
        dataone:[{"id":1,"parentId":null,
            "sort":0,"name":"我的广告机",
            "href":"0",
            "icon":"icon iconfont icon-tubiao-10",
            "children":[
              {"id":2,"parentId":6,"sort":0,"name":" 广告机列表","href":"/win/Mydevice","icon":"icon iconfont icon-dian","children":[],"isShow":"1"},
              ],"isShow":"1"},
              {"id":3,"parentId":null,
            "sort":0,"name":"我的素材",
            "href":"1",
            "icon":"icon iconfont icon-tubiao_huaban",
            "children":[
              {"id":4,"parentId":6,"sort":0,"name":" 素材分组","href":"/win/MaterialGroup","icon":"","children":[],"isShow":"1"},
              {"id":4,"parentId":6,"sort":0,"name":" 素材列表","href":"/win/MaterialList","icon":"","children":[],"isShow":"1"},
              {"id":4,"parentId":6,"sort":0,"name":" 在线素材库","href":"/win/MaterialTemplate","icon":"","children":[],"isShow":"1"}
              ],"isShow":"1"},
              {"id":5,"parentId":null,
            "sort":0,"name":"我的节目",
            "href":"2",
            "icon":"icon iconfont icon-tubiao-5",
            "children":[
              {"id":6,"parentId":6,"sort":0,"name":" 节目清单","href":"/win/ProgramList","icon":"","children":[],"isShow":"1"},
              {"id":6,"parentId":6,"sort":0,"name":" 播放清单","href":"/win/PlayList","icon":"","children":[],"isShow":"1"},
              ],"isShow":"1"}
        ],
        datatwo:[{"id":2,"parentId":null,
            "sort":0,"name":"我的广告位",
            "href":"a",
            "icon":"icon iconfont icon-tubiao-3",
            "children":[
              {"id":21,"parentId":21,"sort":0,"name":" 广告位列表","href":"/win/advertising","icon":"","children":[],"isShow":"1"},
              ],"isShow":"1"},
              {"id":22,"parentId":null,
            "sort":0,"name":"我的订单",
            "href":"b",
            "icon":"icon iconfont icon-tubiao-",
            "children":[
              {"id":4,"parentId":22,"sort":0,"name":" 订单列表","href":"/win/orderList","icon":"","children":[],"isShow":"1"},
              ],"isShow":"1"},
              {"id":5,"parentId":null,
            "sort":0,"name":"客户素材",
            "href":"c",
            "icon":"icon iconfont icon-tubiao-4",
            "children":[
              {"id":6,"parentId":23,"sort":0,"name":"待审核","href":"/win/checkPending","icon":"","children":[],"isShow":"1"},
              {"id":6,"parentId":221,"sort":0,"name":"已审核","href":"/win/confIred","icon":"","children":[],"isShow":"1"},
              ],"isShow":"1"},
              {"id":24,"parentId":null,
            "sort":0,"name":"客户节目",
            "href":"d",
            "icon":"icon iconfont icon-tubiao-1",
            "children":[
              {"id":6,"parentId":24,"sort":0,"name":" 播放清单","href":"/win/NewList","icon":"","children":[],"isShow":"1"},
              ],"isShow":"1"},
              {"id":26,"parentId":null,
            "sort":0,"name":"我的财务",
            "href":"e",
            "icon":"icon iconfont icon-tubiao-8",
            "children":[
              {"id":26,"parentId":26,"sort":0,"name":" 财务总览","href":"/win/FinancialOverview","icon":"","children":[],"isShow":"1"},
              {"id":27,"parentId":27,"sort":0,"name":" 提现明细","href":"/win/withdrawDetail","icon":"","children":[],"isShow":"1"},
              {"id":28,"parentId":28,"sort":0,"name":" 交易明细","href":"/win/transactionDetail","icon":"","children":[],"isShow":"1"},
              ],"isShow":"1"},
              {"id":29,"parentId":null,
            "sort":0,"name":"评价管理",
            "href":"f",
            "icon":"icon iconfont icon-tubiao-5",
            "children":[
              {"id":29,"parentId":29,"sort":0,"name":" 我的评价","href":"/win/MyRating","icon":"","children":[],"isShow":"1"},
              ],"isShow":"1"}
        ],
        datathree:[{"id":3,"parentId":null,
            "sort":0,"name":"账户信息",
            "href":"3",
            "icon":"icon iconfont icon-tubiao-6",
            "children":[
              {"id":31,"parentId":31,"sort":0,"name":" 基本信息","href":"/win/information","icon":"","children":[],"isShow":"1"},
              {"id":33,"parentId":33,"sort":0,"name":" 商家认证","href":"/win/ToAuthentication","icon":"","children":[],"isShow":"1"},
              {"id":34,"parentId":34,"sort":0,"name":" 修改密码","href":"/win/editPwd","icon":"","children":[],"isShow":"1"},
              {"id":35,"parentId":35,"sort":0,"name":" 消息中心","href":"/win/sysMessage","icon":"","children":[],"isShow":"1"},
              ],"isShow":"1"},
              {"id":3,"parentId":null,
            "sort":0,"name":"报表统计",
            "href":"1",
            "icon":"icon iconfont icon-tubiao-7",
            "children":[
              {"id":36,"parentId":36,"sort":0,"name":" 客流量统计表","href":"/win/PassengersFlowStatistical","icon":"","children":[],"isShow":"1"},
              {"id":37,"parentId":37,"sort":0,"name":" 订单统计表","href":"/win/ordersReceived","icon":"","children":[],"isShow":"1"},
              {"id":38,"parentId":38,"sort":0,"name":" 收益统计表","href":"/win/earnings","icon":"","children":[],"isShow":"1"}
              ],"isShow":"1"},
              {"id":5,"parentId":null,
            "sort":0,"name":"日志管理",
            "href":"2",
            "icon":"icon iconfont icon-tubiao-9",
            "children":[
              {"id":39,"parentId":39,"sort":0,"name":" 播放日志","href":"/win/PlayLog","icon":"","children":[],"isShow":"1"},
              {"id":311,"parentId":311,"sort":0,"name":" 操作日志","href":"/win/operationLog","icon":"","children":[],"isShow":"1"},
              ],"isShow":"1"}
        ],
        menulist:[]
      }
    },
    computed: {
      ...mapGetters({
        sidebar: 'sidebar',
        device:'device',
        menuList:'menuList'
      }),
      onRoutes(){
        // console.log(this.$route.name)

        // console.log(this.$route)
        return this.$route.path;
      },
      activetab(){
        return this.$store.state.active.activetab;
      },
      onRouteKeys(){
        
      }
    },
    mounted () {
      this.menulist=this.dataone;
    },
    created() {
// console.log(1123)
    },
    methods: {
      handleSelect() {
        if(this.device.isMobile){
          this.toggleSidebarShow(false);
        }
      },
      ...mapMutations({
        toggleSidebarShow: types.TOGGLE_SIDEBAR_SHOW,
        nav_active:types.ACTIVE_TAB
      })
    },
    watch: {
      activetab(val){
        if (val == 2) {
          this.menulist= this.datathree;
        }else if(val == 1){
          this.menulist=this.datatwo
        }else{
          this.menulist=this.dataone;
        }
      }
    }
  }
</script>
<style>
@import url('./../../static/font_text/iconfont.css');

.el-menu--popup-right-start .el-menu-item:hover{
  color: #ff7c4c;
  background: #ffece5;
}

.iconfont{
  font-size: 24px;
  margin-left:-4px;
  margin-right:8px;
}
.icon-tubiao-4{
  font-size: 22px;
  margin-left:-3px; 
}
.icon-tubiao-6{
  font-size: 22px;
}

  .showSlide {
    animation-duration: .2s;
    animation-name: slideInLeft;
  }

  .hideSlide {
    animation-duration: .2s;
    animation-name: slideOutLeft;
  }

  .main-sidebar {
    font-size: 14px;
    background-color: #ffffff;
    position: fixed;
    top: 60px;
    left: 0;
    bottom: 0;
    height: calc(100vh - 50px);
    width: 60px;
    z-index: 810;
    -webkit-transition: -webkit-transform 0.3s ease-in-out, width 0.3s ease-in-out;
    -moz-transition: -moz-transform 0.3s ease-in-out, width 0.3s ease-in-out;
    -o-transition: -o-transform 0.3s ease-in-out, width 0.3s ease-in-out;
    transition: transform 0.3s ease-in-out, width 0.3s ease-in-out;
  }

  .expandSide {
    width: 230px;
  }

  .el-menu-style,
  .el-menu-style .el-menu{
    background-color: #ffffff;
  }
  .el-menu-style .el-menu-item:hover,
  .el-menu-style .el-submenu__title:hover{
    background-color: #eeeeee !important;
  }

  .el-menu-style .el-submenu .el-menu-item {
    height: 45px;
    line-height: 45px;
  }

  .el-menu-style .el-menu-item,
  .el-menu-style .el-submenu__title {
    height: 45px;
    line-height: 45px;
  }

  /* .main-sidebar .el-menu--collapse {
    /* width: 44px;
  } */

  /* .main-sidebar .el-menu--collapse>.el-menu-item,
  .main-sidebar .el-menu--collapse>.el-submenu>.el-submenu__title {
    padding-left: 13px !important;
  } */

  .vue-scrollbar{
    background-color: #ffffff !important;
    height: calc(100vh - 50px)
  }

  .main-sidebar .el-scrollbar__bar.is-vertical{
    display: none;
  }

  .sidebar{
    min-height: 450px;
  }

.el-menu--vertical{
  left: 60px !important;
  box-shadow:none !important;
}

  .el-menu .fa {
    margin-right: 10px;
  }

  #menusid  .is-active{
      color: #ff7c4c !important;
  }

  #menusid .el-submenu__title:hover{
      background: #ff7c4c !important;
      color: #fff;
  }
.el-submenu__title i{
  font-size: 20px;
}

#menusid .el-submenu__title:hover .el-icon-arrow-down:before{
  color: #fff;
}
#menusid .el-submenu__title:hover .iconfont{
  color: #fff;
}

#menusid .el-menu-item:hover{
      background: #ffece5 !important;
}
.el-menu-item, .el-submenu__title{
  height: 44px;
  line-height: 44px;
}

/* .el-menu-item span::before{
  content: '\e608';
  font-size: 12px;
  margin-right: 6px;
} */

  .slidnav-title{
    background: #ff7c4c;
    color: #fff;
    padding-left:28px;
    padding-bottom:1px; 
    line-height:44px;
    font-size: 14px;
  }
</style>
