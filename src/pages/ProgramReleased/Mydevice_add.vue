<template>
  <div class="con-box">
      <!-- 修改密码 -->
    <div class="editpwd" id="editpwd">
        <el-form :model="ruleForm" size="small" :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
            <el-form-item label="广告机编号" prop="serialNumber">
                <el-input v-model="ruleForm.serialNumber" class="editInput" size="small" placeholder="例如：BZSA3245345345345353" auto-complete="off" ></el-input>
                <span class="editTitp">

                  <el-button class="rebtn" @click="chkdeevice" :loading="chloading">检查</el-button> 
                  <i v-if="chked" class="el-icon-check checkSize" style="color:#30ac67"></i>
                  <i v-else class="el-icon-close checkSize" style="color:red"></i> 
                  说明：广告机编号见包装盒外
                </span>
            </el-form-item>
            <el-form-item label="名称" prop="deviceName">
                <el-input v-model="ruleForm.deviceName" placeholder="" auto-complete="off" class="editInput"></el-input>
            </el-form-item>
            <!-- <el-form-item label="位置">
               <al-selector searchable level="2" v-model="ruleForm.address" :placeholder="['请选择省', '请选择市','请选择区']" class="editInput_address"/>
            </el-form-item> -->
            <el-form-item label="详细地址" prop="position">
                <el-input v-model="ruleForm.position" placeholder="" auto-complete="off" class="editInput"></el-input>
            </el-form-item>
            <el-form-item label="分辨率" prop="resolutionId">
               <!-- <el-input v-model="ruleForm.name" placeholder="" auto-complete="off" class="editInput"></el-input> -->
                <Select v-model="ruleForm.resolutionId"  class="editInput" placeholder="">
                  <Option v-for="item in opentsList" :value="item.resolutionId" :key="item.resolutionId">{{ item.name }}</Option>
                </Select>
            </el-form-item>
            <div style="width: 96%;margin-left: 20px;margin-bottom: 18px;background:#ddd;height:1px;"></div>
            <el-form-item label="账号" prop="account">
                <el-input v-model="ruleForm.account" class="editInput" placeholder="" auto-complete="off" ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="ruleForm.password" placeholder="" auto-complete="off" class="editInput"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button size="medium" type="primary" @click="submitForm('ruleForm')" :loading="loading" class="setBtnWidth">确 定</el-button>
                <el-button size="medium" @click="$router.go(-1)" class="setBtnWidth">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
  </div>
</template>

<script>
import {updateAdmachine,checkAdmachine,findResolution} from './../../api/ProgramReleased'
import {mapState} from 'vuex';

  export default {
    data() {
      return {
        opentsList:[],
        ruleForm: {
          serialNumber:'',
          position: '',
          deviceName: '',
          resolutionId:'',
          account:'',
          password:''
        },
        rules: {
          serialNumber:[
              { required:true, message:'广告机编号不能为空'}
          ],
          deviceName:[
             { required:true, message:'广告机名称不能为空'}
          ],
          position:[
             { required:true, message:'广告机位置不能为空'}
          ],
          resolutionId:[
             { required:true, message:'广告机分辨率不能为空'}
          ],
          account:[
             { required:true, message:'账号不能为空'}
          ],
          password:[
             { required:true, message:'密码不能为空'}
          ]
        },
        chked:false,
        chloading:false,
        loading:false
      };
    },
    computed: {
      ...mapState(['userInfo'])
    },
    methods: {
      submitForm(formName) {
        
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (!this.ruleForm.id) {
               this.$message({
                message:'请先效验设备编号',
                type:'warning',
                duration:1000
              });
              return;
            }
            this.submit()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      chkdeevice(){
        if (!this.ruleForm.serialNumber) { return;}
        this.chloading = true;
        checkAdmachine({serialNumber:this.ruleForm.serialNumber}).then((data) => {
          if (data.success) {
            this.chked=true;
            this.ruleForm = data.data;
            this.ruleForm.account="";
            this.ruleForm.password="";
          }else{
            this.$message({
              message:data.msg,
              type:'warning',
              duration:1000
            });
          };
          this.chloading=false
        })
      },
      getResolution(){
        findResolution().then(data=>{
          if (data.success) {
            this.opentsList = data.data;
          };
        });
      },
      submit(){
        this.loading=true
        this.ruleForm.userId = this.userInfo.id;
        updateAdmachine(this.ruleForm).then((data) => {
          if (data.success) {
            this.$message({
              type:'success',
              message:data.msg+'1秒后跳回广告机列表'
            });
            // 查询广告机
            this.$store.dispatch('syncloaddevice');

            setTimeout(() => {
              this.$router.push('Mydevice')
            }, 1000);
          }else{
            this.$message({
              type:'warning',
              message:data.msg
            });
          }
          this.loading=false
        }).catch(err=>this.loading=false)
      }
    },
    mounted () {
      this.getResolution();
    }
  }
</script>

<style lang="scss">
#editpwd .is-disabled .el-input__inner{
  color:#333 !important;
}
</style>

<style lang="scss" scoped>
.editpwd{
    padding:30px 0 18px 0;
    .editInput{
        width: 514px;
    }
}
.editInput_address{
      width: 476px;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
    }

    .checkSize{
      font-size: 18px;
      vertical-align: -2px;
    }
</style>
