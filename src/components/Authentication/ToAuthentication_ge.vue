<template>
  <div class="peakfire">
      <!-- 我要认证 -->
    <el-form size="small" :inline="true" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <div class="peakfire-main">
            <div class="peakfileTitle">
                <div class="peakfilet-left">
                      <img v-if="userInfo.realStatus==3" src="./../../../static/img/ge_Authentication_error.png">
                    <img v-else src="./../../../static/img/ge_Authentication_success.png">
                </div>
                <div class="peakHr"></div>
                <div class="peakfilet-right">
                    <h4><span class="peakLabel">认证状态：</span>
                        <span class="peakStatusFont" v-if="userInfo.realStatus==1">待审核中</span>
                        <span class="peakStatusFont" v-if="userInfo.realStatus==2">审核通过</span>
                        <span class="peakStatusFont" v-if="userInfo.realStatus==3">审核失败</span></h4>
                    <h5 v-if="userInfo.realStatus==2"><span class="peakLabel">拥有的权益：</span><span class="peakStatusTip">发布广告位</span></h5>
                    <h5 v-if="userInfo.realStatus==3"><span class="peakLabel">原因：</span><span class="peakStatusTip">{{userInfo.remark}}</span></h5>
                </div>
                <div class="peakfilet-make">
                    <h5><span class="peakLabel">您可以：</span>
                          <el-button type="primary" size="small" @click="reToauth">重新认证</el-button>
                    </h5>
                </div>
            </div>
            <div class="peakfire-main-title">
              基本信息
            </div>
            <div class="peakfire-min-box">
                <el-form-item label="账号：">
                    <span class="editTitp">{{userInfo.loginName}}</span>
                </el-form-item>
                <el-form-item label="用户类型：">
                    <span class="editTitp">个人</span>
                </el-form-item><br/>
                <el-form-item label="真实姓名：">
                    <span class="editTitp">{{userInfo.realname}}</span>
                </el-form-item>
                <el-form-item label="性别：">
                    <span class="editTitp">{{userInfo.sex==1?"男":"女"}}</span>
                </el-form-item><br/>
                <el-form-item label="身份证号：">
                    <span class="editTitp">{{userInfo.identity}}</span>
                </el-form-item><br/>
                <el-form-item label="手持身份证：">
                    <div class="peakfire-upload">
                       <img v-if="userInfo.identityImg" :src="userInfo.identityImg" >
                    </div>
                    <span class="editTitp verBottm" style="cursor:pointer;" @click="perverImg(userInfo.identityImg)"><i class="el-icon-zoom-in zoom_in_size"></i>点击放大</span>
                </el-form-item>
            </div>

            <div class="peakfire-main-title">
              联系信息
            </div>
            <div class="peakfire-min-box">
                <el-form-item label="所在地区：">
                    <span class="editTitp">{{userInfo.place}}</span>
                </el-form-item>
                <el-form-item label="所在街道：">
                    <span class="editTitp">{{userInfo.address}}</span>
                </el-form-item><br/>
                <el-form-item label="联系电话：">
                    <span class="editTitp">{{userInfo.callMobile}}</span>
                </el-form-item>
            </div>
      </div>
    </el-form>
    <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl">
    </el-dialog>
   </div>
</template>

<script>
import {
    mapGetters
} from "vuex";

  export default {
    data() {
      return {
            dialogVisible:false,
            dialogImageUrl:""
      };
    },
    computed: { ...mapGetters(["userInfo"])},
    methods: {
       reToauth() {
            this.$router.push("ToAuthentication_reSub");
       },
       perverImg(url){
        this.dialogImageUrl =url;
        this.dialogVisible = true;
       }
    }
  }
</script>

<style lang="scss" scoped>
.zoom_in_size{
    font-size: 16px;
    margin:0 6px;
    vertical-align: -2px;
}

.peakfileTitle{
    width: 100%;
    height: 105px;
    background: #FCF8F1;
    border: 1px solid #FF8558;
    padding: 22.5px 20px;
    overflow: hidden;
    div{
        float: left;
    }
    .peakfilet-left{
        width: 60px;
        height: 60px;
        img{
            height: 100%;
            width: 100%;
            display: block;
        }
    }
    .peakHr{
        width:1px;
        height:60px;
        background: #DEDDDD;
        margin: 0 22px;
    }
    .peakfilet-right{
        h4{
            line-height: 30px;
            font-size: 14px;
            color:#000;
            font-weight: bold;
            .peakStatusFont{
                color: #FF7C4C;
            }
        }
        h5{
            margin-top: 10px;
            line-height: 14px;
            font-size: 12px;
            font-weight: normal;
            color: #000;
            .peakStatusTip{
                color: #888786;
            }
        }
    }
    .peakfilet-make{
        margin-left: 35px;
        h5{
            font-size: 12px;
            color: #000;
            font-weight: normal;
           .peakfileResetBtn{
               margin-left: 10px;
               display: inline-block;
               border-radius: 6px;
               color: #fff;
               background: #FF7C4C;
               font-size: 14px;
               width: 85px;
               text-align: center;
               height: 35px;
               line-height: 35px;
               cursor: pointer;
           } 
        }
    }
}
.editTitp{
    display: inline-block;
    width: 150px;
}
.peakfire{
    padding: 22px 22px;
    overflow: hidden;
}
.peakLabel{
    display: inline-block;
}
.peakfire-main-title{
    height: 40px;
    line-height: 40px;
    background: #f5f5f5;
    padding-left:24px; 
    margin: 16px 0px;
}
.peakfire-input{
    width:278px;
}

.peakfire-upload{
    width: 118px;
    height: 148px;
    border:1px solid #ddd;
    color: #ddd;
    text-align: center;
    display: inline-block;
    img{
        display: block;
        width: 100%;
        height: 100%;
    }
}

.peakfire-min-box{
    padding-left: 50px;
}

</style>
