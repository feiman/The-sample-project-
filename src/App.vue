<template>
  <div class="wrapper fixed">
    <vue-progress-bar></vue-progress-bar>
    <imp-header></imp-header>
    <side-menu></side-menu>
      <div class="content-wrapper" :class="{ slideCollapse: sidebar.collapsed,mobileSide:device.isMobile}">
        <el-scrollbar id="el-scrollbar" tag="div" wrapClass="content-scrollbar">
          <section class="content">
            <!-- <el-breadcrumb separator="/" style="margin-bottom: 20px;">
              <template v-for="child in currentMenus">
                <el-breadcrumb-item :to="{ path: child.href }">{{child.name}}</el-breadcrumb-item>
              </template>
            </el-breadcrumb> -->
            <transition mode="out-in" enter-active-class="fadeIn" leave-active-class="fadeOut" appear>
              <router-view></router-view>
            </transition>
            <imp-footer :class="{ slideCollapsepadd: !sidebar.collapsed}"></imp-footer>
          </section>
          
        </el-scrollbar>
      </div>
  </div>
</template>

<script>
  import sideMenu from './components/sideMenu.vue'
  import impHeader from "./pages/layout/header.vue"
  import impFooter from "./pages/layout/footer.vue"
  import {mapGetters, mapActions,mapMutations} from 'vuex'
  import types from "./store/mutation-types"


  export default {
    name: 'app',
    components: {
      sideMenu,
      impFooter,
      impHeader
    },
    computed: {
        ...mapGetters({
            sidebar: 'sidebar',
            device:'device',
            // currentMenus:'currentMenus',
        }),

    },
    data: function () {
      return {
        active: true,
        headerFixed: true,
        breadcrumb: [],
      }
    },
    methods: {
      ...mapMutations({
          toggleDevice: types.TOGGLE_DEVICE,
          toggleSidebar: types.TOGGLE_SIDEBAR,
          toggleSidebarShow: types.TOGGLE_SIDEBAR_SHOW,
      }),
      // ...mapActions({
      //   changeCurrentMenu: 'changeCurrentMenu' // 映射 this.changeCurrentMenu() 为 this.$store.dispatch('changeCurrentMenu')
      // })
    },
    watch: {
      '$route': function (to, from) {
      }
    },
    beforeMount () {
      const { body } = document
      const WIDTH = 780;
      const handler = () => {
        if (!document.hidden) {
          let rect = body.getBoundingClientRect()
          let isMobile = rect.width < WIDTH
          this.toggleDevice(isMobile);
          if (isMobile){
            this.toggleSidebarShow(false);
            this.toggleSidebar(false);
          }else{
            this.toggleSidebarShow(true);
          }
        }
      }
      document.addEventListener('visibilitychange', handler)
      window.addEventListener('DOMContentLoaded', handler)
      window.addEventListener('resize', handler);
      handler(); // 刷新 重置首页
    },
    mounted () {
      //  [App.vue specific] When App.vue is finish loading finish the progress bar
      this.$Progress.finish()
      // window.innerHeight = '200px';
      document.onkeydown = function(e) {
          e = e || event;
          if (e.keyCode == 37) {
              //你自己的代码
              return false;
          }
          if (e.keyCode == 38) {
              //你自己的代码
              return false;
          }
          if (e.keyCode == 39) {
              //你自己的代码
              return false;
          }
          if (e.keyCode == 40) {
              //你自己的代码
              return false;
          }
      }
    },
    created () {
      //  [App.vue specific] When App.vue is first loaded start the progress bar
      this.$Progress.start()
      //  hook the progress bar to start before we move router-view
      this.$router.beforeEach((to, from, next) => {
        //  does the page we want to go to have a meta.progress object
//        if (to.meta.progress !== undefined) {
//          let meta = to.meta.progress
//          // parse meta tags
//          this.$Progress.parseMeta(meta)
//        }
        // this.$store.dispatch('changeCurrentMenu',to); 小菜单
        //  start the progress bar
        this.$Progress.start()
        //  continue to next page
        next()
      })
      //  hook the progress bar to finish after we've finished moving router-view
      this.$router.afterEach((to, from) => {
        //  finish the progress bar
//        console.log(JSON.stringify())
        this.$Progress.finish()
      })

//      this.$router.push('/activePublic');
    }
  }

</script>

<style lang='scss'>

.slideCollapsepadd{
  padding-left: 210px;
  transition: .3s;
}

.wrapper{
  min-width:1000px; 
}

  a {
      text-decoration: none;
      color: #333;
      outline: none;
  }

  .animated {
    animation-duration: .2s;
  }

  blockquote, body, dd, dl, dt, fieldset, figure, h1, h2, h3, h4, h5, h6, hr, html, iframe, legend, li, ol, p, pre, textarea, ul {
    margin: 0;
    padding: 0;
  }

  *,:after, :before {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }


  .content-wrapper {
    -webkit-transition: -webkit-transform 0.3s ease-in-out, margin 0.3s ease-in-out;
    -moz-transition: -moz-transform 0.3s ease-in-out, margin 0.3s ease-in-out;
    -o-transition: -o-transform 0.3s ease-in-out, margin 0.3s ease-in-out;
    transition: transform 0.3s ease-in-out, margin 0.3s ease-in-out;
    margin-left: 230px;
    padding-top: 60px;
    font-size: 12px;
  }

  .content-scrollbar{
    height: calc(100vh - 50px);
  }

  .content-wrapper .el-scrollbar__bar.is-vertical{
    display: none;
  }

  .content-wrapper .content {
    padding:20px;
  }

  .content-wrapper.slideCollapse{
    margin-left: 64px;
  }

  .content-wrapper.mobileSide{
    margin-left: 0px;
   
  }
 @media (max-width: 780px) {
      .content-wrapper.mobileSide{
        margin-left: 0px;
      }
      .content{
        width: 100%;
      }
  }
</style>
