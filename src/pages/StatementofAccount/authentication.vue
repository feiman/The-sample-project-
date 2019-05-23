<template>
  <div class="con-box peakfire">
      <!-- 商家认证 -->
      <div class="peakfire-title">
          <h3>关于交易费率、资金提现，请注意：</h3>
          <p>1、按照银行规定，每笔交易手续费率为1，交易费率由系统自动扣除；</p>
          <p> 2、结算时间：当天收款金额2天后可申请提现；</p>
          <p>3、提现时间：工作日成功申请提现，2小时内到账；非工作日、节假日的提现和结算可能出现延迟；</p>
          <p> 4、提现金额：满100元方可提现；</p>
          <p>5、提现失败：若发生提现失败，则金额会自动回到账户余额中，可再次申请提现。</p>
      </div>

      <div class="peakfire-main">
          <div class="peakfire-main-title">
              商家实名认证
          </div>
          <div class="peakfire-main-box">
              <span>企业logo：</span>
              <div>
                  <!-- <div class="peakfire-upload">
                       <i class="el-icon-plus avatar-uploader-icon editIccon"></i>
                  </div> -->

                    <el-upload class="peakfire-upload avatar-uploader"
                    action="/criussell/sell/show/upfile"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon editIccon"></i>
                    </el-upload>
                  <br/>
                  <p class="editTitp">商家实名认证，企业店铺更加专业，更加安全，对于消费者更有保障。</p><br/>
                  <el-button type="primary" class="isBtnHover" @click="ToAuthentication">我要认证</el-button>
              </div>
          </div>
      </div>
   </div>
</template>

<script>
import {realnamecheck} from './../../api/user';
import {mapGetters,mapMutations} from 'vuex';
import types from './../../store/mutation-types';

  export default {
    data(){
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        imageUrl: ''
      }
    },
    computed: {...mapGetters(["userInfo"])  },
    methods: {
        ...mapMutations({'SET_USER_INFO':types.SET_USER_INFO}),
        ToAuthentication(){
            // 我要去认证
            this.$router.push('/win/ToAuthentication');
        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = res.data.url;
            this.subImg(res.data.url)
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 5;

            if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 5MB!');
            }
            return isJPG && isLt2M;
        },
        subImg(Url){
            realnamecheck({headImage:Url,userId:this.userInfo.id}).then(data=>{
                if (data.success) {
                    var userdata =JSON.parse(JSON.stringify(this.userInfo));
                    userdata.headImage=Url;
                    var loginste =this.storage.ifget('loginste',1000*60*60*24*200 )
                    if (loginste==0) {
                        this.storage.set('userdata',userdata) // localstorage
                    }else {
                        this.storage.set('userdata',userdata,true) // sessionstorage
                    };
                    setTimeout(() => {
                    this.SET_USER_INFO(userdata);     
                    }, 100);
                   this.$message({type:"success",message:data.msg});
                }else{
                   this.$message({type:"error",message:data.msg});
                };
            });
        }
    },
    mounted () {
      
    }
  }
</script>

<style lang="scss" scoped>
.peakfire{
    padding: 22px 22px;
    overflow: hidden;
}
.peakfire-title{
    color: #777;
    >h3{
        font-weight: normal;
        font-size: 12px;
    }
    >p{
        text-indent: 2em;
        line-height: 30px;
    }
}

.peakfire-main-title{
    height: 40px;
    line-height: 40px;
    background: #f5f5f5;
    padding-left:24px; 
    margin: 16px 0px;
}
.peakfire-main-box{
    >span{
        float: left;
    }
    >div{
        float: left;
    }
}

.peakfire-upload{
    width: 148px;
    height: 148px;
    border:1px solid #ddd;
    color: #ddd;
    text-align: center;
    .editIccon{
        line-height: 148px;
        font-size: 30px;
    }
}


.avatar-uploader .el-upload {
    position: relative;
    overflow: hidden;
  }
  
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 100%;
    height: 100%;
    display: block;
  }
</style>
