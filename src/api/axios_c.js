import { Message } from 'element-ui';
import auth from './../common/auth';
import axios from 'axios';

// axios.defaults.headers = {
//     "Content-Type": "application/json"
// };

// axios 配置
axios.defaults.timeout = 100000;
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
//axios.defaults.baseURL = 'http://localhost:8008';
// axios.defaults.baseURL = getBaseUrl(window.location.href);

// axios.defaults.headers.common[ 'token' ] = auth.gettoken();

//POST传参序列化
axios.interceptors.request.use((config) => {
  config.headers.token=auth.gettoken()
  return config;
}, (error) => {
  return Promise.reject(error);
});

//返回状态判断
axios.interceptors.response.use(
  response => {
    // console.log(response.data)
    if (response.data.code === -1) {
      Message({type:"warning",message:response.data.msg,title:"温馨提示"});
      // alert(JSON.parse(localStorage.getItem('loginste')));
      localStorage.clear();
      localStorage.setItem('loginste',JSON.stringify({"data":"1","time":new Date().getTime()}));
      setTimeout(() => {
        window.location.href='/criussell&www';
      },1500);
      return response;
    }
    return response;
  },
  error => {
    console.log(error)
    if (error.response) {
      //全局ajax错误信息提示
      // Message({type:"error",message:error.response.data,title:"温馨提示",});
    }
    return Promise.reject(error);
  });

export default axios;