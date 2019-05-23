import axios from 'axios';


// http://49.4.12.144:8080/ http://sbch6t.natappfree.cc
const baseh = "http://oz6haf75u.bkt.clouddn.com"

axios.interceptors['Access-Control-Request-Headers']=""
/**
 * @name {七牛获取图片基本信息 } imageInfo
  */
export const getimageInfo = params => {
    return new Promise((resolve, reject) => {
        $.get(`${baseh}/${params}?imageInfo`,function(data) {resolve(data); });},function(error) {reject(error);
    })
};
/**
 * @name {七牛获取视频基本信息 } imageInfo
  */
export const getavinfo = params => {
    return new Promise((resolve, reject) => {
        $.get(`${baseh}/${params}?avinfo`,function(data) {resolve(data); });},function(error) {reject(error);
    })
};
/**
 * @name {七牛获取视频缩略图 } vframe
 */
 export const getvframe = params => {
    return new Promise((resolve, reject) => {
        $.get(`${baseh}/${params}?vframe/jpg/offset/2`,function(data) {resolve(data); });},function(error) {reject(error);
    })
};
/**
 * @name {七牛下载链接}
 * @param http://oz6haf75u.bkt.clouddn.com/海报%20%281%29.jpg?attname=name.jpg
  */
 export const getfile = (params,name) => {
    return new Promise((resolve, reject) => {
        $.get(`${params}?attname=${name}`,function(data) {resolve(data); });},function(error) {reject(error);
    })
};

