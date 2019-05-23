<template>
<div class="con-box peakfire">
    <!-- 我要认证 -->
    <el-form :model="ruleForm" size="small" :inline="true" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
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

                <!-- 企业 -->
                <template>
                    <el-form-item label="企业名称：" prop="companyName" v-show="ruleForm.userType==2">
                        <el-input type="text" v-model="ruleForm.companyName" auto-complete="off" class="peakfire-input" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="法人姓名：" prop="legalName" v-show="ruleForm.userType==2">
                        <el-input type="text" v-model="ruleForm.legalName" auto-complete="off" class="peakfire-input" placeholder="请输入"></el-input>
                    </el-form-item><br v-show="ruleForm.userType==2"/>
                    <el-form-item label="企业性质：" prop="companyNature" v-show="ruleForm.userType==2">
                        <Select id="ivu_selent" v-model="ruleForm.companyNature" class="peakfire-input" >
                            <Option v-for="item in enterpriseType" :value="item.label" :key="item.label" class="peakfire-input">{{ item.label }}</Option>
                        </Select>
                    </el-form-item>
                    <el-form-item label="所属行业：" prop="industryName" v-show="ruleForm.userType==2">
                        <Select id="ivu_selent" v-model="ruleForm.industryName" class="peakfire-input">
                            <Option v-for="item in businessList" :value="item.name" :key="item.name" class="peakfire-input">{{ item.name }}</Option>
                        </Select>
                    </el-form-item><br v-show="ruleForm.userType==2"/>
                    <el-form-item label="信用代码：" prop="rganizat" v-show="ruleForm.userType==2">
                        <el-input type="text" v-model="ruleForm.rganizat" auto-complete="off" class="peakfire-input" placeholder="请输入"></el-input>
                    </el-form-item><br v-show="ruleForm.userType==2"/>
                    <el-form-item label="营业执照：" prop="businessImg" v-show="ruleForm.userType==2">
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
                        <span class="editTitp verBottm">说明：执照必须是jpg或png格式的图片，且大小不得大于2M，图片必须清晰可见。</span>
                    </el-form-item>
</template>

                <!-- 个人 -->
<template>
<el-form-item label="真实姓名：" prop="realname" v-show="ruleForm.userType==1">
    <el-input type="text" v-model="ruleForm.realname" auto-complete="off" class="peakfire-input" placeholder="请输入"></el-input>
</el-form-item>
<el-form-item label="性别：" prop="sex" v-show="ruleForm.userType==1">
    <!-- <Select id="ivu_selent" v-model="ruleForm.sex" class="peakfire-input">
        <Option v-for="item in sexTypeList" :value="item.value" :key="item.value" class="peakfire-input">{{ item.name }}</Option>
    </Select> -->
    <el-radio-group v-model="ruleForm.sex">
        <el-radio :label="1">男</el-radio>
        <el-radio :label="2">女</el-radio>
    </el-radio-group>
</el-form-item><br/>
</el-form-item>
<el-form-item label="身份证号：" prop="identity" v-show="ruleForm.userType==1">
    <el-input type="text" v-model="ruleForm.identity" auto-complete="off" class="peakfire-input" placeholder="请输入"></el-input>
</el-form-item><br/>
<el-form-item label="手持身份证：" prop="identityImg" v-show="ruleForm.userType==1">
    <el-upload class="peakfire-upload avatar-uploader" action="/criussell/sell/show/upfile" :show-file-list="false" :on-success="handleidentityImgSuccess" :before-upload="beforeAvatarUpload">
        <img v-if="identityImg" :src="identityImg" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon editIccon"></i>
    </el-upload>
    <span class="editTitp verBottm">说明：照片必须是jpg或png格式的图片，且大小不得大于2M，图片必须清晰可见。</span>
</el-form-item>
</template>
            </div>

            <div class="peakfire-main-title">
              联系信息
            </div>
            <div class="peakfire-min-box">
                <el-form-item label="所在地区：" prop="place">
                    <al-selector searchable data-type="name" level="2" v-model="resArr" :placeholder="['请选择省', '请选择市','请选择区']" class="peakfire-input" id="plae_d"/>
                </el-form-item>
                <el-form-item label="所在街道：" prop="address">
                    <el-input type="text" v-model="ruleForm.address" auto-complete="off" class="peakfire-input" placeholder="请输入"></el-input>
                </el-form-item><br/>
<template>
<!-- 企业 -->
<el-form-item label="企业电话：" v-show="ruleForm.userType==2">
    <el-input type="number" v-model="ruleForm.companyTel" auto-complete="off" class="peakfire-input" placeholder="请输入"></el-input>
</el-form-item>
<el-form-item label="企业邮箱：" prop="companyEmail" v-show="ruleForm.userType==2">
    <el-input type="text" v-model="ruleForm.companyEmail" auto-complete="off" class="peakfire-input" placeholder="请输入"></el-input>
</el-form-item><br v-show="ruleForm.userType==2" />
<el-form-item label="联系人姓名：" prop="callPerson" v-show="ruleForm.userType==2">
    <el-input type="text" v-model="ruleForm.callPerson" auto-complete="off" class="peakfire-input" placeholder="请输入"></el-input>
</el-form-item>
</template>
              <!--个人  -->
                <el-form-item label="联系电话：" prop="callMobile">
                    <el-input type="text" v-model="ruleForm.callMobile" auto-complete="off" class="peakfire-input" placeholder="请输入"></el-input>
                </el-form-item><br/>
                <el-form-item label=" ">
                    <el-button size="medium" type="primary" @click="submitForm('ruleForm')" :loading="loading" class="setBtnWidth">提  交</el-button>
                    <el-button size="medium" @click="resetForm('ruleForm')" class="setBtnWidth">重  置</el-button>
                </el-form-item>
            </div>
      </div>
    </el-form>
   </div>
</template>

<script>
import {
    mapGetters,
    mapMutations
} from 'vuex';
import types from './../../store/mutation-types';
import businessList from './../../common/trade';
import enterpriseType from './../../common/enterpriseType';
import {
    IDvalidatorl,
    phoneval
} from './../../common/validator';
import {
    realnamecheck
} from './../../api/user';

export default {
    data() {
        return {
            businessList: businessList,
            enterpriseType: enterpriseType,
            sexTypeList: [{
                    name: "男",
                    value: 1
                },
                {
                    name: "女",
                    value: 2
                }
            ],
            ruleForm: {
                userId: "",
                userType: 2,
                realname: '',
                sex: '',
                identity: '',
                identityImg: '',
                companyName: '',
                legalName: '',
                companyNature: '',
                rganizat: '',
                businessImg: '',
                companyTel: "",
                companyEmail: "",
                industryName: "",
                place: "",
                address: "",
                callPerson: "",
                callMobile: ""
            },
            rules: {
                // 个人
                realname: [{
                    required: true,
                    message: '请输入姓名',
                    trigger: 'blur'
                }],
                sex: [{
                    required: true,
                    message: '请选择性别',
                    trigger: 'blur'
                }],
                identity: [{
                        required: true,
                        message: '请输入身份证号码',
                        trigger: 'blur'
                    },
                    {
                        validator: IDvalidatorl,
                        message: '请输入正确身份证号码',
                        trigger: 'blur'
                    }
                ],
                identityImg: [{
                    required: true,
                    message: '请上传手持身份证照片',
                    trigger: 'blur'
                }],
                place: [{
                    required: true,
                    message: '请选择所在地区',
                    trigger: 'blur'
                }],
                address: [{
                    required: true,
                    message: '请输入所在街道',
                    trigger: 'blur'
                }],
                callMobile: [{
                    required: true,
                    message: '请输入联系电话',
                    trigger: 'blur'
                }],
                //   企业
                companyName: [{
                    required: true,
                    message: '请输入企业名称',
                    trigger: 'blur'
                }, ],
                legalName: [{
                    required: true,
                    message: '请输入法人姓名',
                    trigger: 'blur'
                }, ],
                companyNature: [{
                    required: true,
                    message: '请选择企业性质',
                    trigger: 'blur'
                }, ],
                industryName: [{
                    required: true,
                    message: '请选择所属行业',
                    trigger: 'blur'
                }, ],
                rganizat: [{
                    required: true,
                    message: '请输入信用代码',
                    trigger: 'blur'
                }, ],
                businessImg: [{
                    required: true,
                    message: '请上传营业执照照片',
                    trigger: 'blur'
                }, ],
                companyEmail: [{
                    required: true,
                    message: '请输入企业邮箱',
                    trigger: 'blur'
                }, ],
                callPerson: [{
                    required: true,
                    message: '请输入联系人姓名',
                    trigger: 'blur'
                }, ],
                callMobile: [{
                        required: true,
                        message: '请输入联系人电话',
                        trigger: 'blur'
                    },
                    {
                        validator: phoneval,
                        message: '请输入正确手机号码',
                        trigger: 'blur'
                    }
                ]
            },
            resArr: [],
            imageUrl: "",
            identityImg: '',
            loading: false
        };
    },
    computed: { ...mapGetters(["userInfo"])
    },
    methods: {
        ...mapMutations({
            'SET_USER_INFO': types.SET_USER_INFO
        }),
        submitForm(formName) {
            this.ruleForm.place = String(this.resArr);

            this.ruleForm.userId = this.userInfo.id;
            if (this.ruleForm.userType == 2) { // 企业 
                this.ruleForm.sex = 1;
                this.ruleForm.realname = 1;
                this.ruleForm.identity = 600301199103129494;
                this.ruleForm.identityImg = 1;
            } else { // 个人
                this.ruleForm.companyName = 1;
                this.ruleForm.legalName = 1;
                this.ruleForm.companyNature = 1;
                this.ruleForm.industryName = 1;
                this.ruleForm.rganizat = 1;
                this.ruleForm.businessImg = 1;
                this.ruleForm.companyTel = 1;
                this.ruleForm.companyEmail = 1;
                this.ruleForm.callPerson = 1;
            };
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // alert('submit!');
                    if (this.ruleForm.userType == 2) { // 企业 
                        this.ruleForm.sex = "";
                        this.ruleForm.realname = "";
                        this.ruleForm.identity = "";
                        this.ruleForm.identityImg = "";
                    } else { // 个人
                        this.ruleForm.companyName = "";
                        this.ruleForm.legalName = "";
                        this.ruleForm.companyNature = "";
                        this.ruleForm.industryName = "";
                        this.ruleForm.rganizat = "";
                        this.ruleForm.businessImg = "";
                        this.ruleForm.companyTel = "";
                        this.ruleForm.companyEmail = "";
                        this.ruleForm.callPerson = "";
                    };
                    this.submitData();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        submitData() {
            this.loading = true;
            realnamecheck(this.ruleForm).then(data => {
                if (data.success) {
                    setTimeout(() => {
                            this.$router.push('ToAuthentication');
                    }, 1500);
                    this.$message({
                        type: "success",
                        message: data.msg
                    });
                } else {
                    this.$message({
                        type: "warning",
                        message: data.msg
                    });
                };
                this.loading = false
            }).catch(err => {
                this.loading = false;
            })
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        handleAvatarSuccess(res, file) { // 上传营业执照
            this.imageUrl = res.data.url;
            this.ruleForm.businessImg = res.data.url
        },
        handleidentityImgSuccess(res, file) { // 上传营业执照
            this.identityImg = res.data.url;
            this.ruleForm.identityImg = res.data.url
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传图片只能是 JPG 或 PNG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        }
    },
    mounted () {
        // ruleForm
        this.ruleForm.userId=this.userInfo.userId;
        this.ruleForm.userType=this.userInfo.userType;
        this.ruleForm.realname=this.userInfo.realname;
        this.ruleForm.sex=this.userInfo.sex;
        this.ruleForm.identity=this.userInfo.identity;
        this.ruleForm.identityImg=this.userInfo.identityImg;
        this.identityImg=this.userInfo.identityImg;

        this.ruleForm.companyName=this.userInfo.companyName;
        this.ruleForm.legalName=this.userInfo.legalName;
        this.ruleForm.companyNature=this.userInfo.companyNature;
        this.ruleForm.rganizat=this.userInfo.rganizat;
        this.ruleForm.businessImg=this.userInfo.businessImg;

        this.imageUrl=this.userInfo.businessImg;
        this.ruleForm.companyTel=this.userInfo.companyTel;
        this.ruleForm.companyEmail=this.userInfo.companyEmail;
        this.ruleForm.industryName=this.userInfo.industryName;
        this.ruleForm.place=this.userInfo.place;
        this.ruleForm.address=this.userInfo.address;
        this.ruleForm.place=this.userInfo.place;
        this.ruleForm.callPerson=this.userInfo.callPerson;
        this.ruleForm.callMobile=this.userInfo.callMobile;
        this.resArr=this.userInfo.place.split(',');
    }
}
</script>

<style lang="scss">
#ivu_selent {
    .ivu-select-dropdown {
        overflow: hidden !important;
        overflow-y: auto !important;
    }
}
.ivu-select-dropdown{
    width:auto !important;
}
</style>

<style lang="scss" scoped>
.peakfire {
    padding: 22px 22px;
    overflow: hidden;
}

.peakfire-main-title {
    height: 40px;
    line-height: 40px;
    background: #f5f5f5;
    padding-left: 24px;
    margin: 16px 0px;
}

.peakfire-input {
    width: 278px;
}

.peakfire-block {
    display: block;
}

.peakfire-upload {
    width: 118px;
    height: 148px;
    border: 1px solid #ddd;
    color: #ddd;
    text-align: center;
    display: inline-block;
    .editIccon {
        line-height: 148px;
        font-size: 30px;
    }
}

.peakfire-min-box {
    padding-left: 50px;
}
</style>
<style lang="scss">
.avatar-uploader .el-upload {
    position: relative;
    overflow: hidden;
    height: 100%;
    width: 100%;
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

