<template>
    <div class="outwin">
        <div class="win-titp">
            <span>{{active.activeName.tabname}}<i class="el-icon-arrow-right"></i></span>
            <span>{{active.activeName.grouping}}<i class="el-icon-arrow-right"></i></span>
            <span>{{active.activeName.curname}}</span>
            <span v-if="active.activeName.childname"><i class="el-icon-arrow-right"></i>{{active.activeName.childname}}</span>
        </div>
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
       <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
</template>
<script>
import {mapGetters, mapActions, mapMutations} from 'vuex';

  export default {
    name:'outwin',
    data(){
      return {
        
      }
    },
    computed: {
      ...mapGetters({
        active: 'active'
      })
    }
  }
  
</script>

<style lang="scss" scoped>
    .win-titp{
        background: #fff;
        height: 40px;
        line-height: 40px;
        margin-bottom: 20px;
        border-left: 2px solid #ff6933;
        padding-left:18px;
        span:first-child{
            color: #ff6933;
        }
    }
   
</style>


