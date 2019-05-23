<template>
  <div class="con-box peakfire">
      <!-- 基本信息 -->
    <el-form :model="ruleForm" size="small" inline-message :inline="true" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <div class="peakfire-main">
            <div class="peakfire-main-title">
              基本信息
            </div>
            <div class="peakfire-min-box">
                <el-form-item label="账号：" class="peakfire-block">
                    <span class="editTitp">{{userInfo.loginName}}</span>
                </el-form-item>
                <el-form-item label="用户类型：" class="peakfire-block">
                    <el-radio-group v-model="ruleForm.userType">
                      <el-radio :label="2">企业</el-radio>
                      <el-radio :label="1">个人</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="真实姓名：" class="peakfire-block" prop="realname" v-show="ruleForm.userType == 1">
                    <el-input type="text" v-model="ruleForm.realname" auto-complete="off" placeholder="请输入" class="peakfire-input"></el-input>
                </el-form-item>
                <el-form-item label="企业名称：" prop="companyName" class="peakfire-block" v-show="ruleForm.userType == 2">
                    <el-input type="text" v-model="ruleForm.companyName" auto-complete="off" placeholder="请输入" class="peakfire-input"></el-input>
                </el-form-item>
                <el-form-item label="所属行业：" prop="industryName" class="peakfire-block" v-show="ruleForm.userType == 2">
                    <Select id="ivu_selent" v-model="ruleForm.industryName" class="peakfire-input">
                        <Option v-for="item in businessList" :value="item.name" :key="item.name" class="peakfire-input">{{ item.name }}</Option>
                    </Select>
                </el-form-item>
            </div>

            <div class="peakfire-main-title">
              联系信息
            </div>

            <div class="peakfire-min-box">
                <el-form-item label="居住地：" prop="place" class="peakfire-block">
                    <al-selector searchable  data-type="name" level="2" v-model="place" :placeholder="['请选择省', '请选择市','请选择区']" class="peakfire-input peakfrie-address"/>
                </el-form-item>
                <el-form-item label="所在街道：" prop="address" class="peakfire-block">
                    <el-input type="text" v-model="ruleForm.address" auto-complete="off" placeholder="请输入" class="peakfire-input"></el-input>
                </el-form-item>
                <el-form-item label="联系人：" prop="callPerson" class="peakfire-block" v-show="ruleForm.userType == 2">
                    <el-input type="text" v-model="ruleForm.callPerson" auto-complete="off" placeholder="请输入" class="peakfire-input"></el-input>
                </el-form-item>
                <el-form-item label="联系电话：" prop="callMobile" class="peakfire-block">
                    <el-input type="number" v-model="ruleForm.callMobile" auto-complete="off" placeholder="请输入" class="peakfire-input"></el-input>
                </el-form-item>
                <el-form-item label=" ">
                    <el-button size="medium" type="primary" @click="submitForm('ruleForm')" :loading='loading' class="setBtnWidth">保  存</el-button>
                    <el-button size="medium" @click="resetForm('ruleForm')" class="setBtnWidth">重  置</el-button>
                </el-form-item>
            </div>
      </div>
    </el-form>
    
   </div>
</template>

<script>
import {updateuserinformation} from '././../../api/StatementofAccount';
import trade from './../../common/trade.js'
import {phoneval} from './../../common/validator';
import {mapGetters,mapMutations} from 'vuex';
import types from './../../store/mutation-types';

  export default {
    data() {
      return {
        ruleForm: {
          userId:'',
          realname:'',
          companyName:'',
          place:'',
          address:'',
          callMobile:'',
          userType:1,
          industryName:'',
          callPerson:""
        },
        rules: {
          realname:[{required:true,message:'姓名不能为空'}],
          companyName:[{required:true,message:'企业名称不能为空'}],
          place:[{required:true,message:'居住地不能为空'}],
          address:[{required:true,message:'所在街道不能为空'}],
          callMobile:[{required:true,validator:phoneval}],
          industryName:[{required:true,message:'所属行业不能为空'}],
          callPerson:[{required:true,message:'联系人不能为空'}]
        },
        place:[],
        businessList:trade,
        loading:false
      };
    },
    computed: {...mapGetters(['userInfo']) },
    methods: {
        ...mapMutations({'SET_USER_INFO':types.SET_USER_INFO}),
      submitForm(formName) {
          this.ruleForm.userId = this.userInfo.id;
          var placr = [];
          this.place.forEach(item=>{
            placr.push(item)
          });
          this.ruleForm.place = String(placr);
          if (this.ruleForm.userType==1) {
            //   1:个人 2：企业'
            this.ruleForm.companyName='暂无';
            this.ruleForm.industryName='暂无';
            this.ruleForm.callPerson="00";
          }
        //   console.log(this.ruleForm);

        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            if (this.ruleForm.userType==1) {
                //   1:个人 2：企业'
               this.ruleForm.companyName='';
               this.ruleForm.industryName='';
               this.ruleForm.callPerson=""
            }
            updateuserinformation(this.ruleForm).then(data=>{
                if (data.success) {
                    this.$message({type:'success',message:data.msg})
                        var lidata =JSON.parse(JSON.stringify(this.userInfo));
                        lidata.userType = this.ruleForm.userType;
                        lidata.companyName = this.ruleForm.companyName;
                        lidata.realname = this.ruleForm.realname;
                        lidata.industryName = this.ruleForm.industryName;
                        lidata.address = this.ruleForm.address;
                        lidata.callMobile = this.ruleForm.callMobile;
                        lidata.place = this.resetForm.place;

                        var loginste =this.storage.ifget('loginste',1000*60*60*24*200 )
                        if (loginste==0) {
                            this.storage.set('userdata',lidata) // localstorage
                        }else {
                            this.storage.set('userdata',lidata,true) // sessionstorage
                        };
                        setTimeout(() => {
                        this.SET_USER_INFO(lidata);     
                        }, 100);
                       
                }else{
                    this.$message({type:'error',message:data.msg})
                }
                this.loading=false
            }).catch(err=>this.loading=false)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    mounted () {
        this.ruleForm.userType = this.userInfo.userType==0?2:this.userInfo.userType;
        this.ruleForm.companyName = this.userInfo.companyName;
        this.ruleForm.realname = this.userInfo.realname;
        this.ruleForm.industryName = this.userInfo.industryName;
        this.ruleForm.address = this.userInfo.address;
        this.ruleForm.callMobile =this.userInfo.callMobile?Number(this.userInfo.callMobile):"";
        this.ruleForm.callPerson=this.userInfo.callPerson;
        setTimeout(()=>{
            if (this.userInfo.place) {
                var placr = this.userInfo.place.split(',');
                placr.forEach(item=>{
                    this.place.push(item)      
                })
            }
        },20)
        // console.log(this.place);
    }
  }
</script>

<style lang="scss">
.peakfrie-address{
    input::-webkit-input-placeholder{
        color: #888 !important;
    }
    input:-moz-placeholder{
        color: #888 !important;
    }
    .ivu-select-input{
       padding: 0 24px 0 14px !important;
    }
} 
#ivu_selent .ivu-select-placeholder{
    padding-left: 14px !important;
}
</style>

<style lang="scss" scoped>

.peakfire{
    padding: 22px 22px;
    overflow: hidden;
}
#ivu_selent .peakfire-input{
    width:100% !important;
}

.peakfire-main-title{
    height: 40px;
    line-height: 40px;
    background: #f5f5f5;
    padding-left:24px; 
    margin: 16px 0px;
}

.peakfire-input{
    width:462px;
}

.peakfire-block{
    display:block;
}
.peakfrie-address{
    display: inline-block;
}
.peakfrie-address+.el-form-item__error--inline{
    vertical-align: 100%;
} 


.peakfire-upload{
    width: 118px;
    height: 148px;
    border:1px solid #ddd;
    color: #ddd;
    text-align: center;
    display: inline-block;
    .editIccon{
        line-height: 148px;
        font-size: 30px;
    }
}

.peakfire-min-box{
    padding-left: 50px;
}

</style>
