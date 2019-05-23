<template>
   <div class="form-code">{{text}}</div>
</template>

<script>
export default {
  name:'formCode',
  props:{
    mobile:'',
    sendType:{
      type:Number
    },
    defatime:{
      type:Number,
      default:10
    }
  },
  data(){
    return {
      time:this.defatime,
      retime:0,
      text:'获取验证码'
    }
  },
  methods: {
    retimea(){
      if (this.retime !== 0) {return;}
      // this.time
      this.retime = 60;
      var t=setInterval(()=> {
          this.retime--
          this.text=this.retime+'秒';
          if (this.retime  == 0) {
              this.text ='获取验证码';
              this.retime=0;
              clearInterval(t)
          }
      },1000)
    }
  }
}
</script>

<style >
 .form-code{
          position: absolute;
          right: 4px;
          top: 4px;
          background: #f5f5f5;
          width: 118px;
          height: 34px;
          text-align: center;
          line-height: 34px;
          cursor: pointer;
        }
</style>
