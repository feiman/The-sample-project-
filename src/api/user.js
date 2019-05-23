import axios from './axios_c';

// http://49.4.12.144:8080/ http://sbch6t.natappfree.cc
const baseh = ""

// @根据 ip 获取 访问地址的 第三方接口 https://api.map.baidu.com/location/ip?ip=ip？&ak=GTZR2x44Hvx3pzo8DVBMtCoRPOd5ej7Q&coor=bd09ll&callback=?
export const requesAddress = params => {
  return new Promise((resolve, reject) => {
    $.getJSON(`https://api.map.baidu.com/location/ip?ip=${params}&ak=GTZR2x44Hvx3pzo8DVBMtCoRPOd5ej7Q&coor=bd09ll&callback=?`,function(json){  resolve(json)});
  }).then(data => data).catch((err) => err);
};

  // @ 登陆 /user/login
export const requesLongin = params => {
    return axios
    .post(`${baseh}/crius_buyer/user/login`,params)
    .then(res => res.data)
    .catch(error => error);
};

// @找回密码 /crius_buyer/user/forgetPassWord
  export const requesregister = params => {
    return axios
    .post(`${baseh}/crius_buyer/user/forgetPassWord`,params)
    .then(res => res.data)
    .catch(error => error);
};
/**
 * @name {用户注册}
 * @param crius_buyer/user/regist 
 */
export const requestregist = params => {
  return axios
  .post(`${baseh}/crius_buyer/user/regist`,params)
  .then(res => res.data)
  .catch(error => error);
};

 // @发送验证码 user/app/sendMsg
 export const  sendMsg = params => {
  return axios
  .post(`${baseh}/crius_buyer/user/app/sendMsg`,params)
  .then(res => res.data)
  .catch(error => error);
};

 // @验证 验证码 user/checkUser
 export const checkCode = params => {
  return axios
  .post(`${baseh}/crius_buyer/user/checkUser`,params)
  .then(res => res.data)
  .catch(error => error);
};
/**
 * @name {查询卖家首页数据（金额、客流量、订单、待审核素材）}
 * @param criussell/sell/show/findhomepage
  */
 export const  findhomepage = params => {
  return axios
  .post(`${baseh}/criussell/sell/show/findhomepage`,params)
  .then(res => res.data)
  .catch(error => error);
};
/**
 * @name {查询用户信息}
 * @param criussell/sell/account/finduser
  */
 export const  finduser = params => {
  return axios
  .post(`${baseh}/criussell/sell/account/finduser`,params)
  .then(res => res.data)
  .catch(error => error);
};
/**
 * @name {忘记密码}
 * @param user/forgetPassWord 
 */
export const forgetPassWord = params => {
  return axios
  .post(`${baseh}/crius_buyer/user/forgetPassWord`,params)
  .then(res => res.data)
  .catch(error => error);
};
/**
 * @name {获取七牛token}
 * @param crius_admin/system/findQniuToken 
 */
export const findQniuToken = params => {
  return axios
  .post(`${baseh}/crius_admin/system/findQniuToken`,params)
  .then(res => res.data)
  .catch(error => error);
};

/**
 * @name {实名认证}
 * @param criussell/sell/account/realnamecheck 
 */
export const realnamecheck = params => {
  return axios
  .post(`${baseh}/criussell/sell/account/realnamecheck`,params)
  .then(res => res.data)
  .catch(error => error);
};

export const getWeather = params => {
  return new Promise((resolve, reject) => {
    $.getJSON(`http://api.map.baidu.com/telematics/v3/weather?location=${params}&output=json&ak=6tYzTvGZSOpYB5Oc2YGGOKt8`,{dataType:"jsonp"},function(json){  resolve(json)});
  }).then(data => data).catch((err) => err);
};
