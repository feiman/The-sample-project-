<template>
  <div class="register">
     <div class="header">
       <div onclick="window.location.hash='/';">
            <div class="logo"><img src="static/img/logo.png"></div>
            <div class="he-titile">忘记密码</div>
       </div>
    </div>
    <div class="box_register">
      <div class="content">
        <!-- <p class="con-titoop">贴心提示：请勿设置与邮箱密码相同的账户登录密码或支付密码，防止不法分子窃取您的账户信息，谨防诈骗！</p> -->
          <el-form id="form_reg" :model="registerValidateForm" label-position="top" label-width="100px"  ref="registerValidateForm">
            <el-form-item prop="mobile" :rules="rules.mobile">
              <div class="form-inout">
                <span>手机号码：</span>
                <input type="text" v-model="registerValidateForm.mobile" placeholder="请输入您的手机号">
                <!-- <p class="place">手机号可用于登录、找回密码、接收订单通知等服务</p> -->
              </div>
            </el-form-item>
            <el-form-item prop="code" :rules="rules.code">
              <div class="form-inout">
                <span>手机验证码：</span>
                <input type="number" v-model="registerValidateForm.code" maxlength="6" placeholder="请输入验证码">
                <span @click="sendmsgU()">
                  <form-code :defatime="60" :sendType="1" ref="setCode"></form-code>
                </span>
              </div>
            </el-form-item>
            <el-form-item prop="password" :rules="rules.password">
              <div class="form-inout">
                <span>设置新密码：</span>
                <input type="password" v-model="registerValidateForm.password" placeholder="6-12位字母+数字组合，且首字母必须为字母">
              </div>
            </el-form-item>
            <el-button type="primary" :loading="loading" class="form-btn" @click="submitForm('registerValidateForm')">确  认</el-button>
        </el-form>
      </div>
    </div>
    <div class="footer">
          <p>Powered by crius Copyright @ 2017-2018 , All Rights Reserved 陕ICP备 098765号</p>
    </div>
  </div>
</template>

<script>
import formCode  from './../components/formCode.vue';
import  {requesregister,sendMsg,checkCode} from './../api/user';
import {phoneval} from './../common/validator';

  export default {
    name: 'respwd',
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
        registerValidateForm: {
          mobile: '',
          code:'',
          password: '',
          checkPass: '',
          first: 'first',
          checked:'',
          loginType:0
        },
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
          code: [{
            required: true,
            message: '请输入验证码',
            trigger: 'blur'
          }],
          checkPass: [{
            required: true,
            message: '请再次输入密码',
            trigger: 'blur'
          },
            {
              validator: validatePass2,
              trigger: 'blur'
            }
          ]
        },
        loading:false
      }
    },
    components: {formCode },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
               this.loading=true;
               this.infocheckCode(resl=>{
                 if (resl.success) {
                  let opt = this.registerValidateForm;
                  requesregister(opt).then((data) => {
                      if (data.success) {
                        this.$message({ type: 'success', message:'重置密码成功，请登录' });
                        //  Register 设计为了 Login 的组件，所以成功跳转时刷新一次页面
                          setTimeout(() => {
                           this.$router.push('/')
                          }, 1500);
                      } else {
                        this.$message({type: 'error', message:data.msg});};
                      this.loading=false;
                    }).catch((err) => {this.loading=false; });
                 }else{ 
                   this.$message({type: 'error', message:resl.msg});
                   this.loading=false; };
              });
          } else {
            console.log('Error Submit!!');
            return false;
          }
        });
      },
      infocheckCode(cb){
        checkCode({mobile:this.registerValidateForm.mobile,randomCode:this.registerValidateForm.code}).then((data) => {
            cb(data)
        });
      },
      sendmsgU(){
        this.$refs['registerValidateForm'].validateField('mobile',(valid,data)=>{
          if (!valid) {
            this.$refs.setCode.retimea();
            sendMsg({mobile:this.registerValidateForm.mobile,sendType:1,loginType:0}).then(data=>{
              if (!data.success) {
                 this.$message({type:'success',message:data.msg});
              }
            })
          }
        });
      }
    },
    mounted () {
      // setTimeout(() => {
      //    var classlist=document.querySelector('.el-form-item__error');
      //   // console.log(classlist)
      //   // classlist.style.left='40px;'
      // }, 500);
    }
  }
</script>


<style scoped lang="scss">

.register{
  background: #fff;
  height: 100vh;
}

.box_register{
  background: #f5f5f5;
  padding: 14px 0;
}

 .header{
    width: 100%;
    background: #fff;
    overflow: hidden;
    border-bottom: 2px solid #ff6933;
    >div{
      width:1200px;
      height: 110px;
      line-height: 110px;
      margin: 0 auto;
      @media (max-width:800px) {
        width: 100%;
        text-align: center;
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


  .content{
    width: 1200px;
    // height:496px;
    background: #fff;
    margin:0 auto;
    border-top: 2px solid #ea5d5c;
    padding:30px 304px;
    @media (max-width:800px) {
      width: 100%;
      padding:30px 5%;
    }
    #form_reg{
      padding: 0 50px;
      @media (max-width:800px) {
        padding: 0;
      }
      .form-btn{
        margin-top:16px;
        width: 100%;
      }
        .el-form-item__error{
          right:0 !important;
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
          width: 100%;
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
            width:60%;
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
          top:26px;
          left:100px;
          color: #c0c4cc;
          font-size: 12px;
        }
       
      }
    }
    .con-titoop{
      color: #b6b6b6;
      line-height:0px;
      margin-bottom:24px;
    }
    .ton-tibom{
      text-align: center;
      margin-top:32px;
      a{
        color: #e01222;
      }
    }
  }


</style>
