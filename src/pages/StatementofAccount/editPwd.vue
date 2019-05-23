<template>
  <div class="con-box">
      <!-- 修改密码 -->
    <div class="editpwd">
        <el-form :model="ruleForm" size="small" :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
            <el-form-item label="当前密码：" prop="pass">
                <el-input v-model="ruleForm.pass" class="editInput" placeholder="请输入旧密码"></el-input>
            </el-form-item>
            <el-form-item label="新密码：" prop="newpass">
                <el-input type="password：" v-model="ruleForm.newpass" placeholder="请输入新密码" auto-complete="off" class="editInput"></el-input>
                <span class="editTitp">请输入6-18个字符，建议数字和字母组合，且首位必须为字母</span>
            </el-form-item>
            <el-form-item label="确认密码：" prop="checkPass">
                <el-input type="password" v-model="ruleForm.checkPass" placeholder="请再次输入新密码" auto-complete="off" class="editInput"></el-input>
                <span class="editTitp">请输入6-18个字符，建议数字和字母组合，且首位必须为字母</span>
            </el-form-item>
            <el-form-item>
                <el-button size="medium" :loading="loading" type="primary" @click="submitForm('ruleForm')" class="setBtnWidth">保存</el-button>
                <el-button size="medium" @click="resetForm('ruleForm')" class="setBtnWidth">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
  </div>
</template>

<script>
import {updatepassword} from './../../api/StatementofAccount';
import {checkPass} from './../../common/validator';
import {mapGetters} from 'vuex';

  export default {
    data() {
      let avalidatePass = (rule, value, callback) => {
          let reg = /^[a-zA-Z]+[a-z0-9]{4,12}$/i;
          if (value === '') {
              callback(new Error('请输入密码'));
          }else if(!reg.test(value)){
              callback(new Error('密码长度需6-16位，6-12位字母+数字组合，且首位必须为字母'))
          } else {
              if (this.ruleForm.checkPass !== '') {
                  this.$refs.ruleForm.validateField('checkPass');
              }
              callback();
          }
      };
      let areValidatePass =(rule, value, callback)=> {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.newpass) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
      };
      return {
        ruleForm: {
          userId: '',
          pass:'',
          checkPass: '',
          newpass: ''
        },
        rules: {
          pass:[
              { validator:checkPass, trigger: 'blur' }
          ],
          newpass: [
            { validator: avalidatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: areValidatePass, trigger: 'blur' }
          ]
        },
        loading:false
      };
    },
    computed: {...mapGetters(['userInfo']) },
    methods: {
      submitForm(formName) {
        this.ruleForm.userId = this.userInfo.id;
        this.ruleForm.oldpassword = this.ruleForm.pass;
        this.ruleForm.newpassword = this.ruleForm.newpass;
        
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading=true;
            updatepassword(this.ruleForm).then((data) => {
              if (data.success) {
                this.$message({type:'success',message:data.msg});
              }else{
                this.$message({type:'error',message:data.msg});
              };
              this.loading = false;
            }).catch((err) => this.loading=false);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style lang="scss" scoped>
    .editpwd{
        padding:30px 0 18px 0;
        .editInput{
            width: 362px;
        }
    }
</style>
