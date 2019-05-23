import moment from 'moment';
import qs from 'qs';

const set_get_param={
    set_param(router,param, value){ // 改变url
        if (param == 'page') {  value =value ?value:router.$route.query.page; }
        var vaobj = router.$route.query;
        vaobj[param] = value;
        var pathname = window.location.pathname;
        var path = router.$route.path
        let url = `${pathname}#${path}?${qs.stringify(vaobj)}`;
        window.history.pushState(null, null, url);
    },
    getCurPage(router){ // 改变当前页
     
    },
    getSummaries(param) {
        const { columns, data } = param;
     
        const sums = [];
        columns.forEach((column, index) => {
            if (index === 0) {
                sums[index] = '总价';
                return;
            }
            const values = data.map(item => parseFloat(item[column.property]));
            if (!values.every(value => isNaN(value))) {
                sums[index] = values.reduce((prev, curr) => {
                    const value = parseFloat(curr);
                    if (!isNaN(value)) {
                        return prev + curr;
                    } else {
                        return prev;
                    }
                }, 0);
                sums[index] = set_get_param.overFormat(null,null,sums[index]);
            } else {
                sums[index] = '';
            }
        });
        return sums;
    },
    // 金额自动补全后 俩位
    overFormat(row,col,v){
        v =String(v / 100);
        if(v === ''){
            v = '0.00';
        }else if(v === '0'){
            v = '0.00';
        }else if(v === '0.'){
            v = '0.00';
        }else if(/^0+\d+\.?\d*.*$/.test(v)){
            v = v.replace(/^0+(\d+\.?\d*).*$/, '$1');
            v = inp.getRightPriceFormat(v).val;
        }else if(/^0\.\d$/.test(v)){
            v = v + '0';
        }else if(!/^\d+\.\d{2}$/.test(v)){
            if(/^\d+\.\d{2}.+/.test(v)){
                v = v.replace(/^(\d+\.\d{2}).*$/, '$1');
            }else if(/^\d+$/.test(v)){
                v = v + '.00';
            }else if(/^\d+\.$/.test(v)){
                v = v + '00';
            }else if(/^\d+\.\d$/.test(v)){
                v = v + '0';
            }else if(/^[^\d]+\d+\.?\d*$/.test(v)){
                v = v.replace(/^[^\d]+(\d+\.?\d*)$/, '$1');
            }else if(/\d+/.test(v)){
                v = v.replace(/^[^\d]*(\d+\.?\d*).*$/, '$1');
                ty = false;
            }else if(/^0+\d+\.?\d*$/.test(v)){
                v = v.replace(/^0+(\d+\.?\d*)$/, '$1');
                ty = false;
            }else{
                v = '0.00';
            }
        }
        return v; 
    },
    storage:{
        set(key,value,session=false){
            var curTime = new Date().getTime();
            if (session) {
                sessionStorage.setItem(key,JSON.stringify({data:value,time:curTime}));
            }else{
                localStorage.setItem(key,JSON.stringify({data:value,time:curTime}));
            };
        },
        get(key,exp,session=false){
            if (session) {
                var sedata = JSON.parse(sessionStorage.getItem(key))
                if (sedata) {
                    return sedata.data;
                }else{
                    return sedata;
                }
            }else{
                var data = localStorage.getItem(key);
                var dataObj = JSON.parse(data);
                if (dataObj) {
                if (new Date().getTime() - dataObj.time>exp) {
                    console.log('信息已过期');
                    //alert("信息已过期")
                    return false;
                }else{
                    //console.log("data="+dataObj.data);
                    //console.log(JSON.parse(dataObj.data));
                    var dataObjDatatoJson = dataObj.data
                    return dataObjDatatoJson;
                }
               }else{
                return false;
               }
              
            }
        },
        ifget(key,exp){
            if (localStorage.getItem(key)) {
             return this.get(key,exp)
            }else{
             return this.get(key,exp,true)
            }
        }
    },
    TimeMatter(row=null,col=null,val,type=0){
        if(!val){return '---';};
        if (type =='date' ) {
            return moment(val).format('YYYY-MM-DD')
        }else if(type == 'time'){
            return moment(val).format('HH:mm:ss')
        }else if(type == 'timer'){
            return moment(val).format('HH:mm')
        }else{
            return moment(val).format('YYYY-MM-DD HH:mm:ss')
        }
    }
}

export default set_get_param;