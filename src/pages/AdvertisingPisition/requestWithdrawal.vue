
<style lang="scss" scoped>

.financeal-content{
    color: #888;
    line-height: 30px;
    padding:12px 24px;
    h3{
    font-size: 12px;
    font-weight: normal;
    }
    p{
    padding-left:24px;
    }
}


.request-title{
    height: 38px;
    line-height: 38px;
    background: #f5f5f5;
    padding: 0 22px;
    span{
        margin-right: 64px;
    }
}

.financial{
    padding: 0 22px;
}

.request-content{
    padding:20px 0 40px 108px;
}
</style>


<template>
  <div class="con-box financial">
    <!-- 申请提现 -->
    <div class="financeal-content">
        <h3>提现规则说明：</h3>
        <p>
            1、提现方式为微信提现和支付宝提现两种方式。<br/>
            2、微信提现：提取现金只能以100为单位，不足100的将继续累加到账户中，即时到账，免手续费。<br/>
            3、支付宝提现：提取现金只能以100为单位，不足100的将继续累加到账户中，2个工作日内到账，2018年2月1日起，每笔收取1元手续费。<br/>
        </p>
    </div>

    <div class="request-title">
        总余额：<span class="seColor">￥{{data.withdrawal|overFormat}}</span>
        <span v-if="usname">提现账号：<span class="seColor">{{usname}}</span></span>
    </div>
    <div class="request-content">
        <el-form size="small" :model="numberValidateForm" :rules="rules" ref="numberValidateForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="可提现金额：">
                <span class="seColor" style="font-size:12px;">￥{{data.getmoney|overFormat}}</span>
            </el-form-item>
            <el-form-item label="转账方式：">
                <Select v-model="numberValidateForm.type" style="width:144px">
                    <Option v-for="item in opList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </el-form-item>
            <el-form-item label="收款方账号：">
                <!-- <p class="seco888">未绑定微信账户&nbsp;&nbsp;<a href="javascript:;" class="seColor">去绑定</a></p> -->
                <p class="secoff69" v-if="usname">{{usname}}</p>
                <p v-else class="seco888">未绑定提现账号&nbsp;&nbsp;<a href="javascript:;" class="secoff69" @click="binding">绑定账号</a></p>
            </el-form-item>
            <el-form-item label="提现金额：" prop="money">
                <el-input size="small" style="width:144px" type="age" v-model.number="numberValidateForm.money" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button size="medium" type="primary" style="width:144px;height:44px" @click="submitForm('numberValidateForm')">确  定</el-button>
                <el-button size="medium" style="height:44px" @click="toWithdrawDetail">查看提现记录</el-button>
            </el-form-item>
        </el-form>
    </div>

    <Modal v-model="modalShow" title="绑定支付宝账号" width="300" :mask-closable="false" class-name="vertical-center-modal">
        <div>  <el-input v-model="Account" size="small" placeholder="请输入您的支付宝账号"></el-input> </div><br/>
        <div>  <el-input v-model="reAccount" size="small" placeholder="请再次输入您的支付宝账号"></el-input> </div>
        <div slot="footer">
          <el-button size="small" @click="modalShow=false">取消</el-button>
          <el-button size="small" type="primary" @click="bingdsub" :loading="loading">确定</el-button>
        </div>
    </Modal>
  </div>
</template>

<script>
import {mapGetters,mapMutations} from 'vuex';
import {findmymoney,getmoney} from './../../api/AdvertisingPisition';
import {updateuserinformation} from './../../api/StatementofAccount';
import types from './../../store/mutation-types';

  export default {
    data(){
        var validate = (rule, value, callback) => {
                if (!value) {
                return callback(new Error('输入金额不能为空'));
                }else if (value*100<10000) {
                      return callback(new Error('提现金额不足100元;'));
                    // callback();
                }else{
                    callback();
                }
        };
      return {
        loading:false,
        modalShow:false,
        data:{},
        usname:'',
        Account:'',
        reAccount:"",
        numberValidateForm: {
            money: '',
            type:'0'
        },
        rules:{
            money:[{ type: 'number', message: '金额必须为数字值'},{ validator: validate, trigger: 'blur'},
            ]
        },
        opList:[{
            value:'0',label:'微信'
        },{
            value:'1',label:'支付宝'
        }]
      }
    },
    computed: {...mapGetters(['userInfo'])},
    watch:{
        'numberValidateForm.type'(val){
            if (val==1) {
                this.usname=this.userInfo.alipayAccount; // 支付宝账号
            }else{
                var openId=this.userInfo.openId;
                if (openId) {
                    this.usname='已绑定';
                }else {
                    this.usname='';
                }
            }
        }
    },
    methods: {
        ...mapMutations({
            SET_USER_INFO:types.SET_USER_INFO
        }),
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.backmoney();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      toWithdrawDetail(){
        //   提现明细
        this.$router.push('/win/withdrawDetail');
      },
      getdata(){
        findmymoney({userId:this.userInfo.id}).then(data=>{
            if (data.success) {
                this.data = data.data;
            }else{
                this.getdata();
            }
        });
      },
      binding(){
        this.modalShow=true;
      },
      bingdsub(){
        if (this.Account=='') {
            this.$message({type:'warning',message:'请输入您的支付宝账号！'});return;
        }else if(this.Account != this.reAccount){
            this.$message({type:'warning',message:'俩次输入支付宝账号不一致!'});return;
        };
        this.loading=true;
        var subdata={
            userId:this.userInfo.id,
            alipayAccount:this.Account,
            openId:''
        }
        updateuserinformation(subdata).then(data=>{
            if (data.success) {
              this.$message({type:'success',message:data.msg});
                var lidata =JSON.parse(JSON.stringify(this.userInfo));
                lidata.alipayAccount = this.Account;
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
              this.$message({type:'error',message:data.msg});
            };
            this.loading=false
        }).catch(err=>this.loading=false)
      },
    //   退款
      backmoney(){
           this.loading=true;
          getmoney({
              userId:this.userInfo.id,
              money:this.numberValidateForm.money*100,
              type:this.numberValidateForm.type
          }).then((data) => {
            if (data.success) {
                this.$message({type:'success',message:data.msg});
                this.getdata();
            }else{
                this.$message({type:'error',message:data.msg});
            };
            this.loading=false;
          }).catch((err) => {
              this.loading=false;
          })
      }
    },
    mounted () {
        this.getdata();
    }
  }
</script>


