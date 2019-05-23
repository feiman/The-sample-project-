<template>
  <div class="con-box program-new">
      <!-- 修改密码 -->
    <div class="editpwd">
        <el-form :model="ruleForm" size="small" :label-position="'left'" :rules="rules" ref="ruleForm" label-width="90px" class="ruleForm">
            <el-form-item label="节目名称：" prop="showName">
                <el-input v-model="ruleForm.showName" class="editInput" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="分辨率：" prop="resolution">
               <Select v-model="ruleForm.resolution" style="width:205px" placeholder="请输入">
                  <Option v-for="item in opentsList" :value="item.name" :key="item.name">{{ item.name }}</Option>
                </Select>
            </el-form-item>
            <el-form-item label="描述：" prop="describes">
                <el-input type="textarea" resize="none" :rows="3"  placeholder="请输入" v-model="ruleForm.describes" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button size="medium" type="primary" :loading="loading" @click="submitForm('ruleForm')" class="setBtnWidth">确 定</el-button>
                <el-button size="medium" @click="$router.go(-1)" class="setBtnWidth">取 消</el-button>
            </el-form-item>
        </el-form>
    </div>
  </div>
</template>

<script>
import {addmyshow,findResolution} from './../../api/ProgramReleased';
import { mapGetters } from 'vuex';

  export default {
    data() {
      return {
        opentsList:[],
        ruleForm: {
          userId:'',
          showName: '',
          describes: '',
          resolution: ''
        },
        rules: {
          showName:[
              { required:true, trigger: 'blur',message:'请输入节目名称'}
          ],
          resolution: [
            {  required:true, message:'请选择分辨率'}
          ],
          describes: [
            {  required:true, trigger: 'blur',message:'请输入描述'}
          ]
        },
        loading:false
      };
    },
    computed: {...mapGetters(['userInfo'])},
    methods: {
      submitForm(formName) {
          this.ruleForm.userId =  this.userInfo.id
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading=true;
            addmyshow(this.ruleForm).then(data=>{
              if (data.success) {
                this.$message({type:'success',message:data.msg});
                setTimeout(() => {
                  this.$router.push('ProgramList')
                }, 1000);
              }else{
                this.$message({type:'error',message:data.msg});
              }
              this.loading=false
            }).catch(err=>this.loading=false)
            // alert('submit!');
            // sessionStorage.setItem('new_program',JSON.stringify({
            //     name:this.ruleForm.name,describe:this.ruleForm.describe,resolution:this.ruleForm.resolution
            // }));
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      getResolution(){
        findResolution().then(data=>{
          if (data.success) {
            this.opentsList = data.data;
          };
        });
      }
    },
    mounted () {
      this.getResolution()
    }
  }
</script>

<style lang="scss" scoped>
    .editpwd{
        padding:30px 0 18px 0;
        .editInput{
            width: 500px;
        }
    }
    .program-new{
      padding: 0 68px;
    }
</style>
