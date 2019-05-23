import plug from './plug';

const auth ={
    gettoken:function(params) {
      let userdata = plug.storage.ifget('userdata',1000*60*60*24*10);
      if (userdata) {
          return userdata.token;
      }else{
          return null
      };
    }
}


export default auth;