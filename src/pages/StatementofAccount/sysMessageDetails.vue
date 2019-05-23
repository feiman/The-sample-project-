<template>
  <div class="con-box con-message" v-loading="loading">
    <div class="con-message-title">
      <div class="message-title">{{maindata.title}}</div>
      <div class="message-subTitle">
        发布来源：<span v-if="maindata.type==1">平台消息</span>  
        <span v-if="maindata.type==2">系统消息</span>
        <!-- type	类型(1平台消息 2系统消息)'  -->
        发布时间：{{maindata.createTime|datetimeFommater}}
      </div>
    </div>
    <div class="message-main" v-html="maindata.content"> </div>
    <div class="con-footer">
      <a href="javascript:;" @click="getdata(maindata.idup)" v-show="maindata.idup">上一篇</a>
      <a href="javascript:;" @click="getdata(maindata.iddown)" v-show="maindata.iddown">下一篇</a>
      <div class="con-right-back">
        <el-button type="primary" size="small" @click="back"
        >返回</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {findnewsbyid,updatenews} from '././../../api/StatementofAccount';

  export default {
    data(){
      return {
        maindata:{},
        loading:false
      }
    },
    methods: {
      back(){
        this.$router.push('/win/sysMessage');
      },
      getdata(id){
        this.$router.push({query:{id:id}});
        findnewsbyid({id}).then((data) => {
          if (data.success) {
            this.maindata = data.data;
          };
          this.loading=false;
        }).catch((err) =>{ this.loading=false});
      }
    },
    mounted () {
        this.getdata(this.$route.query.id);

        let subdata ={id:this.$route.query.id,status:1,delFlag:0}
        updatenews(subdata);
    }
  }
</script>


<style lang="scss" scoped>

.con-message{
    padding: 0 46px;
}

.con-message-title{
  text-align: center;
  .message-title{
    font-size: 16px;
    height: 60px;
    line-height: 60px;
    border-bottom:1px solid #ddd;
  }
  .message-subTitle{
    height: 48px;
    line-height: 48px;
    color: #888;
  }
}
  
  .message-main{
    min-height: 500px;
  }
</style>


