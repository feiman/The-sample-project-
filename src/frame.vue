<template>
  <transition mode="out-in" enter-active-class="fadeIn" leave-active-class="fadeOut" appear>
    <router-view></router-view>
  </transition>
</template>

<script>
  import "font-awesome/css/font-awesome.css";

  export default{
      name:'frame'
  }
  
</script>
<style>
  html {
    background-color: #f5f5f5;
    font-size: 14px;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    min-width: 300px;
    overflow-x: hidden;
    /*overflow-y: hidden;*/
    text-rendering: optimizeLegibility;
    box-sizing: border-box;
    /* font-family: SimSun; */
    font-family:'Microsoft YaHei','黑体', Arial, Helvetica, sans-serif;
  }

  body {
    color: #4a4a4a;
    font-size: 12px;
    font-weight: 400;
    line-height: 1.5;
  }

  .animated {
    animation-duration: .5s;
  }
</style>
