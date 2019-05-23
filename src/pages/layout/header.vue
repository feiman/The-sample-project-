<template>
  <header class="main-header animated" :class="{closeLogo:sidebar.collapsed,mobileLogo:device.isMobile}">
    <a href="#/index" class="logo">
      <span class="logo-lg">
        <i class="fa logs" v-if="!sidebar.collapsed"></i>
        <i class="fa logsa" v-else></i>
      </span>
    </a>
    <nav class="navbar">
      <div class="nav_title">
        媒体商家中心
      </div>
      <a href="javascript:;" class="sidebar-toggle" data-toggle="offcanvas" role="button"
         @click.stop.prevent="toggleMenu(!sidebar.collapsed,device.isMobile)">
         <!-- !sidebar.collapsed, -->
      </a>

      <div class="tables-nav">
        <div :class="{activetab:active.activetab==0}" @click="nav_active(0)"> <i class="icon-fabu"></i> 节目发布</div>
        <div :class="{activetab:active.activetab==1}" @click="nav_active(1)"> <i class="icon-jiaoyi"></i> 广告位交易</div>
        <div :class="{activetab:active.activetab==2}" @click="nav_active(2)"> <i class="icon-baobiao"></i> 账户&报表</div>
      </div>
      <!-- pc nav -->
      <div class="navbar-custom-menu" id="navbar-custom-menu-pc">
        </el-dropdown>
            <a href="javascript:;" class="demonstration">您好！欢迎您 {{userInfo.nickname}}&nbsp;{{userInfo.loginName}} 
            <span @click="logout">退出</span></a>
            <a href="javascript:;" class="demonstration">买广告</a>
            <a href="javascript:;" class="demonstration">小野商城</a>
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">客户服务<Icon class="arrow-down" type="arrow-down-b"></Icon>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>客户服务</el-dropdown-item>
                  <el-dropdown-item>客户服务</el-dropdown-item>
                  <el-dropdown-item>客户服务</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
      </div>
      <!-- screen -->
      <div class="navbar-custom-menu" id="navbar-custom-menu-screen">
          <i class="menu_mobile"></i>
      </div>
    </nav>

    <div class="menu_mobile_slider">
      <div><i class="icon_fabu_menu meun_icon"></i> 节目发布</div>
      <div><i class="icon-jiaoyi meun_icon"></i> 广告位交易</div>
      <div><i class="icon-baobiao meun_icon"></i> 账户&报表</div>
    </div>
  </header>
</template>
<script>
  import {mapGetters, mapActions, mapMutations} from 'vuex'
  import types from "../../store/mutation-types"

  export default {
    data(){
      return {
        showMessageBox: false,
        showProfileBox: false,
        list: [],
        count: 4,
        show:true
      }
    },
    computed: mapGetters({
      sidebar: 'sidebar',
      userInfo: 'userInfo',
      device:'device',
      active:'active'
    }),
    methods: {
      toggleMenu(collapsed,isMobile){
        if(isMobile){
          // this.toggleSidebarShow();
        }else{
          this.toggleSidebar();
        }
      },
      logout(){
        this.storage.set('userdata',null,true)
        this.storage.set('loginste',1)
        this.$router.push('/');
      },
      ...mapMutations({
        toggleSidebar: types.TOGGLE_SIDEBAR,
        toggleSidebarShow: types.TOGGLE_SIDEBAR_SHOW,
        setUserInfo: types.SET_USER_INFO,
        nav_active:types.ACTIVE_TAB,
        loaddevice:types.LOAD_DEVICE
      }),
      toggleMessage(){
        this.showMessageBox = !this.showMessageBox;
      },
      toggleProfile(){
        this.showProfileBox = !this.showProfileBox;
      },
      autoHide(evt) {
        // if (!this.$el.querySelector('li.messages-menu').contains(evt.target)) {
        //   this.showMessageBox = false
        // }
        // if (!this.$el.querySelector('li.user-menu').contains(evt.target)) {
        //   this.showProfileBox = false
        // }
      }
    },
    created(){
      
    },
    mounted() {
      this.setUserInfo();
      this.$store.dispatch('syncloaddevice');
      this.$store.dispatch('getFindUserdata');


      document.addEventListener('click', this.autoHide, false)
      setTimeout(() => {
        var activetab=sessionStorage.getItem('state.activetab');
        if (activetab) {
          this.nav_active(activetab);
        }else{
          this.nav_active(0)
        }
      }, 200);
    },
    destroyed() {
      // document.removeEventListener('click', this.autoHide, false)
    }
  }
</script>
<style lang="scss" scoped>

  .animated {
    animation-duration: .2s;
  }

  .main-header a {
    text-decoration: none;
    color: #fff;
  }

  .main-header {
    position: fixed;
    min-width: 100%;
    box-shadow: 0 2px 3px hsla(0, 0%, 7%, .1), 0 0 0 1px hsla(0, 0%, 7%, .1);
    z-index: 1999;
    animation-name: slideInDown;
    animation-fill-mode: both;
    color: #48576a;
    height: 60px;
    line-height: 60px;
  }

  .main-header .navbar .sidebar-toggle {
    float: left;
    background-color: transparent;
    background-image: none;
    font-family: fontAwesome;
  }

  .main-header .navbar .sidebar-toggle:before {
    content: "";
    display: inline-block;
    color: #fff;
    background: url('./../../../static/img/icons.png') no-repeat;
    width: 22px;
    height:22px;
    background-position-x:-58px; 
    vertical-align: middle;
  }

  .main-header {
    background-color: #ff6933;
  }

  .main-header .logo {
    -webkit-transition: width 0.3s ease-in-out;
    -o-transition: width 0.3s ease-in-out;
    transition: width 0.3s ease-in-out;
    display: block;
    float: left;
    height: 50px;
    font-size: 20px;
    line-height: 60px;
    text-align: center;
    width: 230px;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    padding: 0 15px;
    font-weight: 300;
    overflow: hidden;
    text-decoration: none;
  }

  .main-header .logo .logo-lg {
    display: block;
    height: 38px;
    line-height: 38px;
    margin-top: 6px;
  }

  .main-header .navbar {
    -webkit-transition: margin-left 0.3s ease-in-out;
    -o-transition: margin-left 0.3s ease-in-out;
    transition: margin-left 0.3s ease-in-out;
    margin-bottom: 0;
    margin-left: 230px;
    border: none;
    border-radius: 0;
  }

  .layout-top-nav .main-header .navbar {
    margin-left: 0;
  }


  body.hold-transition .main-header .navbar,
  body.hold-transition .main-header .logo {
    -webkit-transition: none;
    -o-transition: none;
    transition: none;
  }

  .main-header .navbar .sidebar-toggle {
    display: block;
  }

  // .main-header .navbar .sidebar-toggle:hover {
  //   background: #f9f9f9;
  // }

  .main-header .logo {
    border-bottom: 0 solid transparent;
  }

#navbar-custom-menu-screen{
  display: none;
}

/* screen */
 @media (max-width: 800px) {
   #navbar-custom-menu-pc{
     display: none;
   }
  #navbar-custom-menu-screen{
    display:block;
    float: none;
    text-align: right;
    padding-right:20px; 
  }
  #navbar-custom-menu-screen .el-dropdown-link{
    padding: 0;
  }
  .sidebar-toggle{
    margin-left:20px; 
  }
  .demonstration{
    margin:0;
    margin-right:20px;  
  }
  
  div.tables-nav{
    display: none;
  }
 }

 /*pc*/
  @media (max-width: 800px) {

    .main-header .logo {
      display: none;
    }

    .main-header .navbar {
      margin: 0;
    }

    .main-header .logo, .main-header .navbar {
      width: 100%;
      float: none;
    }

  }
  .main-header.closeLogo .navbar{
    margin-left: 78px;
  }

  .main-header.closeLogo .logo{
    width: 60px;
    // padding: 0 8px;
  }
  .main-header.closeLogo .logo .logo-lg b{
    display: none;
  }

  .navbar-custom-menu{
    float: right;
  }

  .navbar-custom-menu .el-dropdown-link{
    cursor: pointer;
    height: 60px;
    text-align: center;
    color: #fff;
    padding:0 22px; 
  }
  .navbar-custom-menu .el-dropdown-link img{
    background-color: #108ee9;
  }


  .message-list {
    list-style: none;
    padding: 0 10px;
  }
  .message-list li{
    list-style: none;
    height: 25px;
    line-height: 25px;
  }
  .message-list li a{
    text-decoration: none;
    color: #666666;
  }
  .message-list li:hover{
    background-color: #f9f9f9;
  }

  .el-dropdown-menu .header-pic{
    text-align: center;
    background-color: #108ee9;
    padding: 20px;
  }
  .el-dropdown-menu .header-pic img{
    vertical-align: middle;
    height: 90px;
    width: 90px;
    border: 3px solid;
    border-color: transparent;
    border-color: hsla(0,0%,100%,.2);
    background-color: #108ee9;
  }
  .el-dropdown-menu .header-pic p{
    font-size: 1.5rem;
    color: #ffffff;
  }
  .el-dropdown-menu .pull-left{
    background-color: #f9f9f9;
    padding: 10px;
    display: inline-block;
    float: left;
  }
  .el-dropdown-menu .pull-right{
    background-color: #f9f9f9;
    padding: 10px;
    float: right;
    display: inline-block;
  }
  .logs{
      background: url('./../../../static/img/los-d.png') no-repeat center;
      width: 194px;
      height: 50px;
      display:inline-block;
      line-height:60px;
  }
  .logsa{
      background: url('./../../../static/img/shang.png') no-repeat center;
      width: 36px;
      height: 50px;
      display:inline-block;
      line-height:60px;
  }

  .demonstration{
    margin-left:20px; 
  }

  .tables-nav{
    margin-left:26px; 
    display: inline-block;
    div{
      display: inline-block;
      width: 163px;
      height: 43px;
      background: #fce4b5;
      padding-left:25px; 
      line-height: 44px;
      position: relative;
      top:9px;
      border-radius: 9px 43px 0 0;
      -moz-box-shadow:5px 5px 30px rgba(214, 199, 167, 0.8);
      -webkit-box-shadow:5px 5px 30px rgba(214, 199, 167, 0.8); 
      box-shadow:5px 5px 30px rgba(214, 199, 167, 0.8);
      cursor: pointer;
      transition: 0.5s;
      z-index: 1;
      &:hover{
        // z-index: 20;
        background: #fcf1da;
      }
      &:first-child{
        z-index: 2;
      }
      &:nth-child(2){
        left: -15px;
        z-index: 8;
      }
      &:last-child{
        left: -30px;
      }
      &.activetab{
        z-index: 10;
        background: #fcf1da;
      }
      i{
        width: 24px;
        height: 20px;
        display: inline-block;
        background: url('./../../../static/img/content_icons.png') no-repeat;
        vertical-align: middle;
        margin: 0 4px;
      }
       .icon-jiaoyi{
          background-position:-28px 0px;
        }
        .icon-baobiao{
          background-position:-56px 0px;
        }
    }

  }

  .arrow-down{
    margin: 0 8px;
  }


  // @moble
.menu_mobile{
  display: none;
}
.nav_title{
  display: none;
}
.menu_mobile_slider{
  display: none;
}

  @media screen and (max-width:800px){
    .nav_title{
      display: block;
      float: left;
      font-size: 18px;
      color: #fff;
      margin-left:20px;
    }

    .menu_mobile{
      display: inline-block;
      width: 32px;
      height: 32px;
      background: url('./../../../static/img/moble_slid.png') center no-repeat;
      background-size:30px;
      vertical-align: middle;
      margin-top:-6px; 
    }

    .menu_mobile_slider{
      background: #fff;
      display: block;
      >div{
        height: 44px;
        line-height: 44px;
        border-bottom:1px solid #ddd;
        width: 92vw;
        margin: 0 auto;
      }
    }

    .meun_icon{
      display: inline-block;
      background: url('./../../../static/img/menu_icon.png') no-repeat;
      width:20px;
      height: 20px;
      background-size: 44px;
      vertical-align: middle;
      margin:-4px 2vw 0px 0;
    }

    .icon-jiaoyi{
      background-position: -22px 0;
    }

  }
  
</style>
