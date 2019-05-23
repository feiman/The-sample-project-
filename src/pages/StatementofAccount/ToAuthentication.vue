<template>
  <div class="con-box peakfire" v-loading="loading" style="min-height:600px;">
      <!-- 我要认证 -->
    <to-authentication v-if="showStatus==0"/>
    <to-authentication-ge v-else-if="showStatus==1"/>
    <to-authentication-shang v-else-if="showStatus==2"/>
   </div>
</template>

<script>
import ToAuthentication from './../../components/Authentication/ToAuthentication';
import ToAuthenticationGe from './../../components/Authentication/ToAuthentication_ge';
import ToAuthenticationShang from './../../components/Authentication/ToAuthentication_shang';
import {finduser} from './../../api/user';
import types from './../../store/mutation-types';

import {
    mapGetters,
    mapMutations
} from 'vuex';

  export default {
    data() {
      return {
        showStatus:3,
        loading:false
      };
    },
    components:{ToAuthentication,ToAuthenticationGe,ToAuthenticationShang},
    computed:{...mapGetters(["userInfo"])},
    methods: {
        ...mapMutations({
            'SET_USER_INFO': types.SET_USER_INFO
        }),
     inity(){
       this.loading=true;
       finduser({userId:this.userInfo.id}).then((data)=>{
         if (data.success) {
                  if (data.data.realStatus) {
                    if (data.data.userType==1) {
                      this.showStatus=1;
                    }else{
                       this.showStatus=2;
                    }
                  }else{
                    this.showStatus=0;
                  };
                 var loginste = this.storage.ifget('loginste', 1000 * 60 * 60 * 24 * 200)
                  if (loginste == 0) {
                      this.storage.set('userdata', data.data) // localstorage
                  } else {
                      this.storage.set('userdata', data.data, true) // sessionstorage
                  };
                  setTimeout(() => {
                      this.SET_USER_INFO(data.data);
                  }, 100);
         }
         this.loading=false;
       })
     }
    },
    mounted () {
      this.inity();
    }
  }
</script>
