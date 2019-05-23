/*
 * @Author: Xuesheng Zhang 
 * @Date: 2018-04-25 15:22:56 
 * @Last Modified by: 
 * @Last Modified time: 2018-04-25 15:23:22
 */

 
 // 广告位发布 api
 import axios from './axios_c';

 const baseh = ""
/** 
* {[查询我的广告位]} 
**  @ criussell/sell/Ad/findmyAdRelease
 */
export const findmyAdRelease = params => {
    return axios
    .post(`${baseh}/criussell/sell/Ad/findmyAdRelease`,params)
    .then(res => res.data)
    .catch(error => error);
};

/** 
*  {[添加广告位]} 
* @criussell/sell/Ad/addmyAdRelease
*/
export const addmyAdRelease = params => {
    return axios
    .post(`${baseh}/criussell/sell/Ad/addmyAdRelease`,params)
    .then(res => res.data)
    .catch(error => error);
};
/** 
 * 查询我的订单
* @ criussell/sell/Ad/findmyorder
 */
export const findmyorder = params => {
    return axios
    .post(`${baseh}/criussell/sell/Ad/findmyorder`,params)
    .then(res => res.data)
    .catch(error => error);
};
/**
 * @name {删除、下架、上架 我的广告位}
 * @param criussell/sell/Ad/delmyAdRelease
  */
 export const delmyAdRelease = params => {
    return axios
    .post(`${baseh}/criussell/sell/Ad/delmyAdRelease`,params)
    .then(res => res.data)
    .catch(error => error);
};

/**
 * 订单提醒接口
 * @ criussell/sell/Ad/warning 
 */
export const adwarning = params => {
    return axios
    .post(`${baseh}/criussell/sell/Ad/warning`,params)
    .then(res => res.data)
    .catch(error => error);
};

/** 
*查询 生活区类型 列表
*@crius_admin/basicSet/findLiveList
*/
export const findLiveList = params => {
    return axios
    .post(`${baseh}/crius_admin/basicSet/findLiveList`,params)
    .then(res => res.data)
    .catch(error => error);
};
/**
 * 查询 关键字
 * @crius_admin/basicSet/findKeywordList 
 */
export const findKeywordList = params => {
    return axios
    .post(`${baseh}/crius_admin/basicSet/findKeywordList`,params)
    .then(res => res.data)
    .catch(error => error);
};


/**
 * 查询客户素材
 * @param criussell/sell/Ad/findmaterial
  */
 export const findmaterial = params => {
    return axios
    .post(`${baseh}/criussell/sell/Ad/findmaterial`,params)
    .then(res => res.data)
    .catch(error => error);
};
/**
 * 修改客户素材
 * @param criussell/sell/Ad/updatematerial 
 */
export const updatematerial = params => {
    return axios
    .post(`${baseh}/criussell/sell/Ad/updatematerial`,params)
    .then(res => res.data)
    .catch(error => error);
};

/**
 * 修改我的广告位
 * @param criussell/sell/Ad/updatemyAdRelease
 */
export const updatemyAdRelease = params => {
    return axios
    .post(`${baseh}/criussell/sell/Ad/updatemyAdRelease`,params)
    .then(res => res.data)
    .catch(error => error);
};
/**
 * 查询客户节目
 * @param criussell/sell/Ad/findcustomershow
 */
export const findcustomershow = params => {
    return axios
    .post(`${baseh}/criussell/sell/Ad/findcustomershow`,params)
    .then(res => res.data)
    .catch(error => error);
};
/**
 * 查询财务总览
 * @param /criussell/sell/Ad/findmymoney  
 */
export const findmymoney = params => {
    return axios
    .post(`${baseh}/criussell/sell/Ad/findmymoney`,params)
    .then(res => res.data)
    .catch(error => error);
};

/**
 * 查询提现明细
 * @param criussell/sell/Ad/findwithdrawal 
 */
export const findwithdrawal = params => {
    return axios
    .post(`${baseh}/criussell/sell/Ad/findwithdrawal`,params)
    .then(res => res.data)
    .catch(error => error);
};
/**
 * 查询交易明细
 * @param criussell/sell/Ad/finddeal 
 */
export const finddeal = params => {
    return axios
    .post(`${baseh}/criussell/sell/Ad/finddeal`,params)
    .then(res => res.data)
    .catch(error => error);
};
/**
 * @name {查询评价列表}
 * @param criussell/sell/Ad/findmydevice 
 */
export const findmydevice = params => {
    return axios
    .post(`${baseh}/criussell/sell/Ad/findmydevice`,params)
    .then(res => res.data)
    .catch(error => error);
};
/**
 * @name {通过广告机查询我的评价列表}
 * @param criussell/sell/Ad/findmydevicebyid 
 */
export const findmydevicebyid = params => {
    return axios
    .post(`${baseh}/criussell/sell/Ad/findmydevicebyid`,params)
    .then(res => res.data)
    .catch(error => error);
};
/**
 * @name {提现}
 * @param criussell/sell/show/getmoney 
 */
export const getmoney = params => {
    return axios
    .post(`${baseh}/criussell/sell/show/getmoney`,params)
    .then(res => res.data)
    .catch(error => error);
};