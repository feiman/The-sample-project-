<template>
  <div class="register">
     <div class="header">
       <div onclick="window.location.hash='/';">
            <div class="logo"><img src="static/img/logo.png"></div>
            <div class="he-titile">媒体主用户注册</div>
       </div>
    </div>
    <div class="bg_ddd">

      <div class="content">
        <el-tabs id="idtabs" v-model='activeName' @tab-click="handleClick">
          <el-tab-pane name="0">
            <span slot="label"><i class="icon iconfont icon-_huaban bindIcon"></i>已有媒体主账号，请绑定</span>
          </el-tab-pane>
          <el-tab-pane name="1">
            <span slot="label"><i class="icon iconfont icon-userbind bindIcon"></i>没有媒体主账号，请先用手机号注册</span>
          </el-tab-pane>
        </el-tabs>
        <!-- 需要登录绑定 -->
        <template v-if="activeName==0">
          <template>
              <p class="con-titoop">贴心提示：请勿设置与邮箱密码相同的账户登录密码或支付密码，防止不法分子窃取您的账户信息，谨防诈骗！</p>
              <el-form id="form_reg" :model="form" label-position="top" label-width="100px"  ref="form">
                <el-form-item prop="mobile" :rules="formrules.username">
                  <div class="form-inout">
                    <span style="width:44px">账号：</span>
                    <input type="text" v-model="form.username" placeholder="请输入您的账号">
                  </div>
                </el-form-item>
                <el-form-item prop="password" :rules="formrules.password">
                  <div class="form-inout">
                    <span style="width:44px">密码：</span>
                    <input type="password" v-model="form.password" placeholder="请输入您的密码">
                  </div>
                </el-form-item>
                <el-button type="primary" class="form-btn" :loading="sendlogin" @click="sendrequesLongin('form')">立 即 绑 定</el-button>
            </el-form>
          </template>
        </template>
        <!-- 需要登录绑定 -->
        <!-- 需要注册 -->
        <template v-if="activeName==1">
          <template>
              <p class="con-titoop">贴心提示：请勿设置与邮箱密码相同的账户登录密码或支付密码，防止不法分子窃取您的账户信息，谨防诈骗！</p>
              <el-form id="form_reg" :model="registerValidateForm" label-position="top" label-width="100px"  ref="registerValidateForm">
                <el-form-item prop="mobile" :rules="rules.mobile">
                  <div class="form-inout">
                    <span>手机号码：</span>
                    <input type="text" v-model="registerValidateForm.mobile" placeholder="请输入您的手机号">
                    <p class="place">手机号可用于登录、找回密码、接收订单通知等服务</p>
                  </div>
                </el-form-item>
                <el-form-item prop="randomCode" :rules="rules.randomCode">
                  <div class="form-inout">
                    <span>手机验证码：</span>
                    <input type="number" v-model="registerValidateForm.randomCode" placeholder="请输入验证码">
                    <span @click="sendmsgU()">
                      <form-code :defatime="60" :sendType="1" ref="setCode"></form-code>
                    </span>
                  </div>
                </el-form-item>
                <el-form-item prop="password" :rules="rules.password">
                  <div class="form-inout">
                    <span>设置密码：</span>
                    <input type="password" v-model="registerValidateForm.password" placeholder="密码长度需6-16位，6-12位字母+数字组合，且首位必须为字母">
                  </div>
                </el-form-item>
                <el-form-item prop="checkPass" :rules="rules.checkPass">
                  <div class="form-inout">
                    <span>确认密码：</span>
                    <input type="password" v-model="registerValidateForm.checkPass" placeholder="请再次输入密码">
                  </div>
                </el-form-item>
                <el-form-item>
                  <el-checkbox v-model="registerValidateForm.checked"></el-checkbox>&nbsp;&nbsp;同意并阅读
                  <a href="javascript:;" style="color:#606266;">《广告云优视平台使用协议》</a>
                </el-form-item>
                <el-button type="primary" class="form-btn" @click="submitForm('registerValidateForm')">立 即 注 册</el-button>
            </el-form>
          </template>
        </template>
        <!-- 需要注册 -->
      </div>
    </div>
    <div class="footer">
          <p>Powered by crius Copyright @ 2017-2018 , All Rights Reserved 陕ICP备 098765号</p>
    </div>
  </div>
</template>

<script>
import formCode from './../components/formCode.vue';
import {requestregist,sendMsg,checkCode,requesLongin,requesAddress} from '././../api/user';
import {phoneval} from './../common/validator';

  export default {
    name: 'bind',
    data() {
      // 密码安全性要求
      let validatePass1 = (rule, value, callback) => {
        // 6-16位, 数字, 字母, 字符至少包含两种, 同时不能包含中文和空格
        let reg = /[a-zA-Z]+[a-z0-9]{4,12}$/i;
        if (!reg.test(value)) {
          callback(new Error('密码长度需6-16位，且包含字母和数字'))
        } else {
          callback()
        }
      };
      // 监测两次密码是否相同
      let validatePass2 = (rule, value, callback) => {
        value === '' ? callback(new Error('请再次输入密码')) :
          value !== this.registerValidateForm.password ? callback(new Error('两次输入密码不一致!')) :
            callback()
      };

      return {
        activeName:0,
        registerValidateForm: {
          mobile: '',
          loginType:0,
          randomCode:'',
          password: '',
          checkPass:'',
          checked:false,
          loginType:0
        },
        taggle:true,
        rules: {
          mobile: [{
            required: true,
            message: '请输入正确的手机号码',
            trigger: 'blur'
          },
            {
              validator:phoneval,
              message: '请输入正确的手机号码',
              trigger: 'blur'
            }
          ],
          password: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
            {
              validator: validatePass1,
              trigger: 'blur'
            }
          ],
          randomCode: [{
            required: true,
            message: '请输入验证码',
            trigger: 'blur'
          }],
          checkPass:[
            {validator: validatePass2,
              trigger: 'blur'
            }]
        },
        loading:false,
        userdata:{},
        sendlogin:false,
        form:{
          loginName:"",
          password:"",
          loginType:"0",
          loginType:0,
          loginAddress:"",
          loginIp:"",
          userLoginType:''
        },
        formrules: {
          username: [
            { required: true, message: '请输入账号', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'change' }
          ]
        },
      }
    },
    components: {formCode },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.storage.set('loginName',this.registerValidateForm.mobile);
            this.loading=true;
            if (!this.registerValidateForm.checked) {
                this.$message({
                  type: 'warning',
                  message: '请务必勾选广告云优视平台使用协议！' });
              return;
            };
            let opt = this.registerValidateForm;
            requestregist(opt).then((data) => {
              if (data.success) {
                this.$message({
                  type: 'success',
                  message: `注册成功，请登录`
                });
                this.userdata = data.data;
                //  Register 设计为了 Login 的组件，所以成功跳转时刷新一次页面
                setTimeout(() => {
                //  this.$router.push('/')
                  this.taggle=false;
                }, 1500);
                
              } else {
                this.$message({
                  type: 'error',
                  message:data.msg
                });
              };
              this.loading=false;
            }).catch((err) => {this.loading=false;})
          } else {
            console.log('Error Submit!!');
            return false;
          }
        });
      },
      sendmsgU(){
        this.$refs['registerValidateForm'].validateField('mobile',(valid,data)=>{
          if (!valid) {
            this.$refs.setCode.retimea();
            sendMsg({mobile:this.registerValidateForm.mobile,sendType:0,loginType:0}).then(data=>{
              if (!data.success) {
                 this.$message({type:'success',message:data.msg});
              }
            });
          }
        });
      },
      handleClick(tab, event) {
        console.log(this.activeName)

      },
      toIndex(){
        this.$router.push('index')
      },
      // 登录
      sendrequesLongin(formName){
        
        this.$refs[formName].validate((valid) => {
            if (valid) {
              this.sendlogin=true;
              this.userLoginType = this.browserRedirect();
              requesLongin(this.form).then(result=>{
                  if (result.success) {
                    this.loginSuccess(result)
                  }else{
                   
                  };
                  this.sendlogin=false;
              }).catch(err=>{this.sendlogin=false})
            } else {
              console.log('error submit!!');
              return false;
            }
          }).catch(err=>{this.sendlogin=false});
      },
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
      }
    },
    mounted () {
      this.form.loginIp = returnCitySN['cip'];
      requesAddress(this.form.loginIp).then(data=>{
        this.form.loginAddress = data.content.address;
      });
    }
  }
</script>

<style lang="scss">
#idtabs{
  text-align: center;
  .el-tabs__nav{
    float: none !important;
  }
  .el-tabs__active-bar{
    width: 50% !important;
  }
  .el-tabs__item{
    width: 50%; 
    padding: 0px;
  }
}

</style>

<style scoped lang="scss">

#idtabs{
  text-align: center;
  .el-tabs__nav{
    left: none !important;
  }
  .el-tabs__active-bar{
    width: 10%；
  }
}

.bindIcon{
    font-size: 25px;
    vertical-align: -3px;
}

.register{
  height: 100vh;
  background: #fff;
}

 .header{
    width: 100%;
    background: #fff;
    overflow: hidden;
    border-bottom: 2px solid #ff6933;
    @media (max-width:800px) {
      width: 100%;
      text-align: center;
    }
    >div{
      width:1200px;
      height: 110px;
      line-height: 110px;
      margin: 0 auto;
      @media (max-width:800px) {
         width: 100%;
      }
      >div{
        display: inline-block; 
      }
      .logo{
        margin:0 16px;
        img{vertical-align: middle;}
      }
      .he-titile{
        font-size:24px;
        height: 36px;
        line-height: 36px;
        padding-left: 19px;
        vertical-align: middle;
        color: #ff6933;
      }
    }
    
  }

  .footer{
    background: #fff;
    width: 100%;
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

.bg_ddd{
  background: #f5f5f5;
  height: 580px;
  padding-top:14px; 
}

  .content{
    width:1200px;
    min-height:544px;
    background: #fff;
    margin:0 auto;
    border-top: 2px solid #ea5d5c;
    padding:30px 304px;
    @media (max-width:800px) {
      width: 100%;
      padding: 30px 20px;
    }
    #form_reg{
      padding: 0 50px;
      @media (max-width:800px) {
         padding: 0;
      }
        .el-form-item__error{
            top: 44% !important;
            right: -104px !important;
            text-align: left !important;
        }
        .form-btn{
          width: 100%;
        }
        
      .form-inout{
        width:calc(100% - 24px);
        border: 1px solid #cccccc;
        height: 42px;
        line-height: 42px;
        padding: 0 12px;
        border-radius: 4px;
        margin-top:14px;
        position: relative;
        @media (max-width:800px) {
          width:100%;
        }
        >span{
          width: 84px;
          display:inline-block;
        }
        >input{
          width:calc(100% - 144px);
          border: none;
          outline: none;
          @media (max-width:800px) {
            width: 60%;
          }
          &::-webkit-input-placeholder{
            color: #b6b6b6;
          }
          &:-ms-input-placeholder{
            color: #b6b6b6;
          }
        }
        >.place{
          position: absolute;
          top:36px;
          left:100px;
          color: #c0c4cc;
          font-size: 12px;
          @media (max-width:800px) {
            display: none;
          }
        }
        .form-code{
          position: absolute;
          right: 4px;
          top: 4px;
          background: #f5f5f5;
          width: 118px;
          height: 34px;
          text-align: center;
          line-height: 34px;
          cursor: pointer;
        }
      }
    }
    .con-titoop{
      color: #b6b6b6;
      margin-bottom:24px; 
      @media (max-width:800px) {
        
      }
    }
    .ton-tibom{
      text-align: center;
      margin-top:32px; 
      a{
        color: #e01222;
      }
    }


    .cen_bo{
        margin-top:90px; 
        width: 100%;
        @media (max-width:800px) {
           margin:90px 0; 
        }
        .el-icon-circle-check-outline{
          display: block;
          font-size: 60px;
          color: #109f50;
          line-height:62px;
          margin: 0 16px;
          position: relative;
          left: 110px;
          @media (max-width:800px) {
            left: 0;
            text-align: center;
          }
        }
        .fl{
            position: relative;
            top:-60px;
            left:50%;
            margin-left:-102px; 
            width: 100%;
            text-align: left;
            @media (max-width:800px) {
              left: 0;
              top:0;
              margin-left:0;
              text-align: center;
              top:0px;
            }
            >p{
              font-size: 16px;
            }
            >span{
              color: #777;
            }
            >a{
              color: #e01222;
              display:block;
              margin-top:16px; 
            }
          }
    }
  }

.cen{
  margin-bottom:278px; 
}

</style>


