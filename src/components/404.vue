<template>
  <div class="error-page">
    <div class="errorWarp">
      <div class="image">
        <img src="./../../static/img/404.png"/>
      </div>
      <div class="pcontainerss">
          <p class="pclass"> Sorry..页面没有找到！</p>
          <p class="conclass">似乎你所寻找的网页已移动或丢失了  </p>
          <p class="conclass">或者也许你只是键入了错误的一些东西</p>
          <p class="conclass">请不要担心，这没事。如果该资源对你很重要，请与管理员联系</p>
          <p class="conclass">火星不太安全，我可以免费送你回地球！</p>
          <p><el-button class="buttonclass" @click="toindex">返回首页</el-button></p>
      
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  methods: {
    toindex() {
      this.$router.push("/index");
    }
  }
};
</script>
<style type="text/css">
.error-page {
  width: 100%;
  height: 100%;
  /* text-align: center; */
  /* position: relative; */
}

.error-page .errorWarp {
  width: 603px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 208px;
}

.error-page .errorWarp .image {
  width: 177px;
  float: left;
}

.error-page .errorWarp .title {
  color: #666;
  font-size: 36px;
  padding: 15px 30px;
  margin-bottom: 10px;
  margin-top: 20px;
  font-weight: bold;
}

.error-page .errorWarp .desc {
  font-size: 24px;
  color: #474747;
  font-weight: bold;
  line-height: 30px;
}

.error-page .errorWarp .backBtn {
  display: inline-block;
  color: #fff;
  margin-bottom: 20px;
  margin-top: 50px;
  padding: 15px 30px;
  border: 1px solid #fff;
  border-radius: 5px;
  cursor: pointer;
}
.pcontainerss {
  float: right;
}
.pclass {
  font-size: 36px;
  color: #000000;
  padding: 0;
  margin: 0;
}
.conclass {
  font-size: 12px;
  color: #777777;
}
.buttonclass:focus,
.buttonclass:hover {
  background: #fff !important;
  border: 1px solid #dcdfe6 !important;
  color: #606266 !important;
}
</style>
