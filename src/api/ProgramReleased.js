  /* 节目发布 api */
  import axios from './axios_c';

  const baseh = ""


  //  @查询 所有广告机 criussell/sell/show/findallAdmachine
  export const findallAdmachine = params => {
    return axios
    .post(`${baseh}/criussell/sell/show/findallAdmachine`,params)
    .then(res => res.data)
    .catch(error => error);
};


// @查询 我的广告机 criussell/sell/show/findAdmachine
export const findAdmachine = params => {
  return axios
  .post(`${baseh}/criussell/sell/show/findAdmachine`,params)
  .then(res => res.data)
  .catch(error => error);
};

//@捆绑 广告机  criussell/sell/show/updateAdmachine
export const updateAdmachine = params => {
  return axios
  .post(`${baseh}/criussell/sell/show/updateAdmachine`,params)
  .then(res => res.data)
  .catch(error => error);
};

// @效验 广告机 criussell/sell/show/checkAdmachine
export const checkAdmachine = params => {
  return axios
  .post(`${baseh}/criussell/sell/show/checkAdmachine`,params)
  .then(res => res.data)
  .catch(error => error);
};

/**
 * @name {删除广告机}
 * @param criussell/sell/show/delAdmachine 
 */
export const delAdmachine = params => {
  return axios
  .post(`${baseh}/criussell/sell/show/delAdmachine`,params)
  .then(res => res.data)
  .catch(error => error);
};

/**
 * 查询分组列表
 * criussell/sell/show/findmaterialgroup 
 */
export const findmaterialgroup = params => {
  return axios
  .post(`${baseh}/criussell/sell/show/findmaterialgroup`,params)
  .then(res => res.data)
  .catch(error => error);
};

/**
 * 新建素材分组
 * criussell/sell/show/addmaterialgroup 
 */
export const addmaterialgroup = params => {
  return axios
  .post(`${baseh}/criussell/sell/show/addmaterialgroup`,params)
  .then(res => res.data)
  .catch(error => error);
};

/**
 * @name {修改素材分组}
 * @param criussell/sell/show/updatematerialgroup
 */
export const updatematerialgroup = params => {
  return axios
  .post(`${baseh}/criussell/sell/show/updatematerialgroup`,params)
  .then(res => res.data)
  .catch(error => error);
};
/**
 * 删除 素材分组
 * @criussell/sell/show/delmaterialgroup
  */
 export const delmaterialgroup = params => {
  return axios
  .post(`${baseh}/criussell/sell/show/delmaterialgroup`,params)
  .then(res => res.data)
  .catch(error => error);
};

/**
 * 查询 在线素材库
 * @criussell/sell/show/findonlinematerial
  */
 export const findonlinematerial = params => {
  return axios
  .post(`${baseh}/criussell/sell/show/findonlinematerial`,params)
  .then(res => res.data)
  .catch(error => error);
};

/**
 * @name {查询我的素材}
 * @param  criussell/sell/show/findmymaterial
  */
 export const findmymaterial = params => {
  return axios
  .post(`${baseh}/criussell/sell/show/findmymaterial`,params)
  .then(res => res.data)
  .catch(error => error);
};
/**
 * @name {查询我的节目下 播放清单}
 * @param criussell//sell/show/findmyplay 
 */
export const findmyplay = params => {
  return axios
  .post(`${baseh}/criussell/sell/show/findmyplay`,params)
  .then(res => res.data)
  .catch(error => error);
};
/**
 * @name {新建节目}
 * @param criussell/sell/show/addmyshow
  */
 export const addmyshow = params => {
  return axios
  .post(`${baseh}/criussell/sell/show/addmyshow`,params)
  .then(res => res.data)
  .catch(error => error);
};
/**
 * @name {查询节目清单}
 * @param criussell//sell/show/findmyshow 
 */
export const findmyshow = params => {
  return axios
  .post(`${baseh}/criussell/sell/show/findmyshow`,params)
  .then(res => res.data)
  .catch(error => error);
};

/**
 * @name {查询分辨率接口}
 * @param crius_admin/basicSet/findResolution
  */
 export const findResolution = params => {
  return axios
  .post(`${baseh}/crius_admin/basicSet/findResolution`,params)
  .then(res => res.data)
  .catch(error => error);
};
/**
 * @name {上传素材接口}
 * @param criussell/sell/show/addmymaterial 
 */
export const addmymaterial = params => {
  return axios
  .post(`${baseh}/criussell/sell/show/addmymaterial`,params)
  .then(res => res.data)
  .catch(error => error);
};
/**
 * @name {删除我的素材}
 * @param criussell/sell/show/delmymaterial
 */
export const delmymaterial = params => {
  return axios
  .post(`${baseh}/criussell/sell/show/delmymaterial`,params)
  .then(res => res.data)
  .catch(error => error);
};
/**
 * @name {查询我的所有节目}
 * @param criussell/sell/show/findmyallshow 
 */
export const findmyallshow = params => {
  return axios
  .post(`${baseh}/criussell/sell/show/findmyallshow`,params)
  .then(res => res.data)
  .catch(error => error);
};
/**
 * @name {删除我的节目}
 * @param criussell/sell/show/delmyshow 
 */
export const delmyshow = params => {
  return axios
  .post(`${baseh}/criussell/sell/show/delmyshow`,params)
  .then(res => res.data)
  .catch(error => error);
};
/**
 * @name {修改我的素材}
 * @param criussell/sell/show/updatemymaterial 
 */
export const updatemymaterial = params => {
  return axios
  .post(`${baseh}/criussell/sell/show/updatemymaterial`,params)
  .then(res => res.data)
  .catch(error => error);
};

/**
 * @name {修改、发布节目}
 * @param criussell/sell/show/updatemyshow 
 */
export const updatemyshow = params => {
  return axios
  .post(`${baseh}/criussell/sell/show/updatemyshow`,params)
  .then(res => res.data)
  .catch(error => error);
};
/**
 * @name {根据广告机查询所有出租时段}
 * @param criussell/sell/show/finddevicetime 
 */
export const finddevicetime = params => {
  return axios
  .post(`${baseh}/criussell/sell/show/finddevicetime`,params)
  .then(res => res.data)
  .catch(error => error);
};
