import animates from './../pages/Program_editorial/components/animates';
import moment from 'moment'
import set_get_param from "./../common/plug";
/**
 * 去除首尾空格
 * @param  {[string]} string [字符串]
 * @return {[string]}        [返回处理后数据]
 */


const trim = (string) => {
  return string.toString().replace();
}

const subString = (value, length = 10) => {
  if (value && value != null && value.length > length) {
    return value.substring(0, length)
  }
  return value;
}

const timeFommater = (val) => {
  return set_get_param.TimeMatter(null, null, val, 'time')
}

const dateFommater = (val) => {
  return set_get_param.TimeMatter(null, null, val, 'date')
}

const datetimeFommater = (val) => {
  return set_get_param.TimeMatter(null, null, val)
}

const overFormat = (val) => {
  return set_get_param.overFormat(null, null, val)
}

const payTypeFormat = (val) => {
  // 支付类型1微信 2支付宝 3银联'
  if (val) {
    if (val == 1) {
      return '微信';
    } else if (val == 2) {
      return '支付宝';
    } else if (val == 3) {
      return '银联';
    }
  } else {
    return '----';
  }
}
const filterfilesize = (val) => {
  if (val) {
    let num = (val / 1024 / 1024);
    if(num<0){
      return (val / 1024).toFixed(2) + 'K';
    }else{
      return num.toFixed(2) + 'M';
    };
  } else {
    return "";
  };
};

const sliderName = (val) => {
  var name = '';
  animates.forEach(item => {
    if (item.value == val) {
      name = item.label;
    }
  });
  return name;
};


const secondsFilter = (val) => {
  // 大于60秒  然后 取分
  if (val) {
    if (Number(val) > 59) {
      let seconds = val * 1 / 60;
      let secondsarr=overFormat(seconds*100).split('.');
      if(secondsarr[1]>0){
        return `${secondsarr[0]}'${val*1-secondsarr[0]*60}"`
      }else{
        return `${secondsarr[0]}'`
      }
    } else {
      return `${val}"`;
    };
  } else {
    return val;
  }
};

const resolutionFe = (val) => {
  //把 分辨率 * 改 ×
  if(val){
    let [w,h]=val.split('*');
    return `${w}×${h}px`;
  }else{
    return val;
  }
};

const nameFiler = (val) => {
  //把 分辨率 * 改 ×
  if(val){
    return val;
  }else{
    return '---';
  }
};

export default {
  trim,
  subString,
  timeFommater,
  dateFommater,
  datetimeFommater,
  overFormat,
  payTypeFormat,
  filterfilesize,
  sliderName,
  secondsFilter,
  resolutionFe,
  nameFiler
}
