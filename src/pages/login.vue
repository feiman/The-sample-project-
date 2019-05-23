<template>
      <div class="login">
        <div class="header">
            <div class="logo"><img src="static/img/logo.png"></div>
            <div class="he-titile">媒体主登录</div>
        </div>
        <div class="conent">
          <div class="latout-content">
            <div class="form">
                <div class="form-title">
                  <span>会员登录</span>
                  <router-link to="register"><i class="el-icon-d-arrow-right"></i>立即注册</router-link>
                </div>
                <!-- <div class="foem-tipo"> <i class="icon-den"></i>公共场所不建议自动登录，以防账号丢失</div> -->
                 <div class="foem-tipo"> 
                    <i class="icon-den" v-show="errmsg.length >17"></i>
                    <i class="el-icon-error reseiz" v-show="errmsg.length <18"></i>
                 {{errmsg}}</div>
                <el-form :model="form" :show-message="false" label-position="top" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                  <el-form-item prop="username">
                    <el-input type="text" v-model="form.username" @keyup.enter.native="login('ruleForm')" placeholder="账号" auto-complete="off">
                      <template slot="prepend"><i class="icon iconfont icon-icon loginicon"></i></template>
                    </el-input>
                  </el-form-item>
                  <el-form-item prop="password">
                    <el-input type="password" v-model="form.password" @keyup.enter.native="login('ruleForm')" placeholder="密码" auto-complete="off">
                      <template slot="prepend"><i class="icon iconfont icon-icon2 loginicon"></i></template>
                    </el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-checkbox v-model="form.checked">自动登录</el-checkbox>
                    <router-link to="resetPwd" class="fomr-pwd">忘记密码？</router-link>
                  </el-form-item>
                  <el-form-item>
                     <el-button type="primary" :loading=loading class="form-btn" @click="login('ruleForm')">登     录</el-button>
                  </el-form-item>
                  <el-form-item class="biaoq">
                    便捷登录：
                      <a href="javascript:;"><i class="icon iconfont icon-weixin-copy"></i>微信</a>
                      <a href="javascript:;" @click="toLogin"><i class="icon iconfont icon-QQ"></i>QQ</a>
                      <a href="javascript:;"><i class="icon iconfont icon-logo-weibo"></i>新浪微博</a>
                  </el-form-item>
                </el-form>
            </div>
          </div>
        </div>
        <div class="footer">
          <p>
            <a href="javascript:;">关于我们&nbsp;&nbsp;|&nbsp;&nbsp;</a>
            <a href="javascript:;">联系我们&nbsp;&nbsp;|&nbsp;&nbsp;</a>
            <a href="javascript:;">使用指南&nbsp;&nbsp;|&nbsp;&nbsp;</a>
            <a href="javascript:;">常见问题&nbsp;&nbsp;|&nbsp;&nbsp;</a>
            <a href="javascript:;">入住流程</a>
          </p>
          <p>Powered by crius Copyright @ 2017-2018 , All Rights Reserved 陕ICP备 098765号</p>
        </div>
      </div>
</template>

<script>
  import types from '../store/mutation-types'
  import {requesLongin,requesAddress} from "../api/user";
  import {mapGetters, mapActions, mapMutations} from 'vuex'

  export default {
    name: 'login',
    data() {
      return {
        form: {
          username: '',
          password: '',
          checked:''
        },
        errmsg:'公共场所不建议自动登录，以防账号丢失',
        rules: {
          username: [
            { required: true, message: '请输入账号', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'change' }
          ]
        },
        address:'',
        cip:'',
        loading:false
      }
    },
    components: {},
    computed:{
      ...mapGetters(['userInfo'])
    },
    methods: {
      ...mapMutations({
        setUserInfo: types.SET_USER_INFO
      }),
      browserRedirect() {
            var sUserAgent = navigator.userAgent.toLowerCase();
            var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
            var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
            var bIsMidp = sUserAgent.match(/midp/i) == "midp";
            var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
            var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
            var bIsAndroid = sUserAgent.match(/android/i) == "android";
            var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
            var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
            if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
               return 'phone';
            } else {
              return 'pc';
            }
      },
      login(formName){
          //  console.log(returnCitySN['cip'] + returnCitySN['cname']);
         
        if (!this.form.username) {
            this.errmsg = '请输入用户名';
        }else if(!this.form.password){
            this.errmsg = '请输入密码';
        };
         this.$refs[formName].validate((valid) => {
           
          if (valid) {
            var userLoginType = this.browserRedirect();
            this.loading=true;
            requesLongin({
              loginName: this.form.username,
              password: this.form.password,
              loginType: "0",
              loginAddress: this.address,
              loginIp: this.cip,
              userLoginType:userLoginType,
              loginType:0
            }).then(result=>{
                if (result.success) {
                  this.loginSuccess(result)
                }else{
                  // console.log(result)
                  this.errmsg = result.msg;
                };
                this.loading=false;
            }).catch(err=>{this.loading=false})
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      },
      loginSuccess(result){
         if (this.form.checked) {
            this.storage.set('loginste',0);
            this.storage.set('userdata',result.data) // localstorage
         }else {
            this.storage.set('loginste',1)
            this.storage.set('userdata',result.data,true) // sessionstorage
         };
         this.storage.set('loginName',this.form.username)
         var redirectUrl = '/index';
         this.$router.push(redirectUrl)
         this.errmsg = '公共场所不建议自动登录，以防账号丢失';
      },
      toLogin(){
        //以下为按钮点击事件的逻辑。注意这里要重新打开窗口
        //否则后面跳转到QQ登录，授权页面时会直接缩小当前浏览器的窗口，而不是打开新窗口
        // &display=mobile   终端类型
        var A=window.open("https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=1106862849&state=0&redirect_uri=true","TencentLogin","width=650,height=520,menubar=0,scrollbars=1,resizable=1,status=1,titlebar=0,toolbar=0,location=1");
      } 
    },
    mounted () {
      // 获取 ip 和地址
      this.cip = returnCitySN['cip']
      const address =requesAddress(this.cip).then(data=>{
        this.address = data.content.address
      });

    var loginste =this.storage.ifget('loginste',1000*60*60*24*10 );
    var userdata =this.storage.ifget('userdata',1000*60*60*24*10 );
    var loginName = this.storage.get('loginName',1000*60*60*24*10);
// alert(loginste)
      if (loginste === 0) {
        this.form.checked = true;
        this.form.username = userdata.loginName;
        this.form.password = userdata.token;
        this.$message({
          message: '2秒后自动登录',
          type: 'success'
        });
        setTimeout(() => {
           var redirectUrl = '/index';
          this.$router.push(redirectUrl)
        }, 2000);
      }else{
        if (loginName) {
          this.form.username = loginName;
        };
      };
    }
  }
</script>

<style lang="scss" scoped>

.loginicon{
    font-size: 16px !important;
    margin-left:none !important;
    margin-right: -2px  !important;
}

  .header{
    width:1200px;
    height: 110px;
    line-height: 110px;
    margin: 0 auto;
    @media (max-width:800px) {
      width: 100%;
      text-align: center;
    }
    >div{display: inline-block;}
    .logo{
      margin:0 16px;
      @media (max-width:800px) {
        width: 34%;
      }
      img{vertical-align: middle;
        @media (max-width:800px) {
          width: 100%;
          margin-top:42px;
        }
      }
    }
    .he-titile{
      font-size:30px;
      border-left: 1px solid #cccccc;
      height: 36px;
      line-height: 36px;
      padding-left: 19px;
      vertical-align: middle;
      @media (max-width:800px) {
        font-size:28px;
        margin-top:42px;
      }
    }

  }
  .conent{
    width: 100%;
    background:url('./../../static/img/bg_ban.png') center #ff6933 no-repeat;
    height: 475px;
    @media (max-width:800px) {
      background: none;
    }
    >.latout-content{
      width: 1200px;
      margin: 0 auto;
      position: relative;
      @media (max-width:800px) {
        width: 100%;
      }
      .form{
        padding: 20px;
        display: block;
        width: 366px;
        height: 377px;
        background: #fff;
        position: absolute;
        right: 0;
        top: 46px;
        @media (max-width:800px) {
          left: 5%;
          width: 90%;
        }
        .form-title{
          font-size: 14px;
          line-height: 24px;
          a{
            float:right;
            color: #ff2b2b;
          }
        }
        .foem-tipo{
          height: 23px;
          line-height: 23px;
          width: 100%;
          border:1px solid #ffe57d;
          background: #fff6d2;
          margin: 10px 0px 14px 0;
          .icon-den{
            display: inline-block;
            width: 12px;
            height: 16px;
            background: url('./../../static/img/content_icons.png');
            background-position:-60px -23px;
            vertical-align: -3px;
            margin: 0 10px;
          }
        }
        .form-btn{
          width: 100%;
        }
        .fomr-pwd{
          float:right;
        }
        .el-form-item{
          margin-bottom:24px;
        }
      }
    }
  }

  .footer{
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    padding:16px 0;
    line-height: 28px;
    @media (max-width:800px) {
      display: none;
    }
  }

  a{
    outline: none;
    text-decoration:none;
    color: #333;
  }
  .biaoq{
    a{
      margin: 0 2px;
    }
    i{
      font-size: 18px;
      vertical-align: -2px;;
      margin: 0 2px;
    }
    .icon-logo-weibo{color: #ea5d5c;}
    .icon-QQ{color:#1f9be6; }
    .icon-weixin-copy{color:#00cc00; }
  }
  .login{
    background: #fff;
    height: 100vh;
    @media (max-width:800px) {
      background: #f5f5f5;
    }
  }

.reseiz{
  color: red;
  margin:0 10px;
  font-size: 14px;
}
</style>

<style>
 .demo-ruleForm .el-input-group__prepend{
    width: 38px !important;
    padding:0 !important;
    text-align: center;
   /* padding-left: 14px !important; */
  }
</style>
