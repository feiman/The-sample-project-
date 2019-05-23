/* 账户和报表 api*/
import axios from './axios_c';
const baseh = ""

/**
 * @name {查询消息接口}
 * @param criussell/sell/account/findnews 
 */
export const findnews = params => {
    return axios
    .post(`${baseh}/criussell/sell/account/findnews`,params)
    .then(res => res.data)
    .catch(error => error);
};

/**
 * @name {修改信息}
 * @param criussell/sell/account/updateuserinformation 
 */
export const updateuserinformation = params => {
    return axios
    .post(`${baseh}/criussell/sell/account/updateuserinformation`,params)
    .then(res => res.data)
    .catch(error => error);
};
/**
 * @name {修改密码}
 * @param criussell/sell/account/updatepassword 
 */
export const updatepassword = params => {
    return axios
    .post(`${baseh}/criussell/sell/account/updatepassword`,params)
    .then(res => res.data)
    .catch(error => error);
};
/**
 * @name {修改消息状态接口}
 * @param criussell/sell/account/updatenews 
 */
export const updatenews = params => {
    return axios
    .post(`${baseh}/criussell/sell/account/updatenews`,params)
    .then(res => res.data)
    .catch(error => error);
};
/**
 * @name {根据id查询消息 上一个下一个}
 * @param criussell/sell/account/findnewsbyid 
 */
export const findnewsbyid = params => {
    return axios
    .post(`${baseh}/criussell/sell/account/findnewsbyid`,params)
    .then(res => res.data)
    .catch(error => error);
};

/**
 * @name {查询订单统计表}
 * @param /criussell/sell/account/findallorder  
 */
export const findallorder = params => {
    return axios
    .post(`${baseh}/criussell/sell/account/findallorder`,params)
    .then(res => res.data)
    .catch(error => error);
};
/**
 * @name {查询操作日志}
 * @param criussell/sell/account/findoperationlog
  */
 export const findoperationlog = params => {
    return axios
    .post(`${baseh}/criussell/sell/account/findoperationlog`,params)
    .then(res => res.data)
    .catch(error => error);
};
/**
 * @name {查询播放日志}
 * @param criussell/sell/account/findplayerlog  
  */
 export const findplayerlog = params => {
    return axios
    .post(`${baseh}/criussell/sell/account/findplayerlog`,params)
    .then(res => res.data)
    .catch(error => error);
};
/**
 * @name {查询客流量统计}
 * @param criussell/sell/account/findtraffic
  */
 export const findtraffic = params => {
    return axios
    .post(`${baseh}/criussell/sell/account/findtraffic`,params)
    .then(res => res.data)
    .catch(error => error);
};