    /**
     * @name {手机号验证 }
     * @param Number
     */

    export const phoneval=(rule, value, callback) => {
        let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
        if (!reg.test(value)) {
        callback(new Error('请输入正确的手机号码'))
        } else {
        callback()
        }
    };

    /**
     * @name {身份证号验证 }
     * @param Number
     */

    export const IDvalidatorl=(rule, value, callback) => {
        let reg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
        if (!reg.test(value)) {
        callback(new Error('请输入正确的身份证号码'))
        } else {
        callback()
        }
    };
  /**
     * @name {密码验证 不能为空}
     * @param Number
     */
    export const checkPass = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('当前密码不能为空'));
        }else{
            callback();
        }
   };
    /**
     * @name {密码验证 格式}
     * @param  /^[a-zA-Z]+[a-z0-9]{4,12}$/i
     */
   export const validatePass = (rule, value, callback) => {
        let reg = /^[a-zA-Z]+[a-z0-9]{4,12}$/i;
        if (value === '') {
            callback(new Error('请输入密码'));
        }else if(!reg.test(value)){
            callback(new Error('密码长度需6-16位，6-12位字母+数字组合，且首位必须为字母'))
        } else {
            // console.log(this)
            // if (this.ruleForm.checkPass !== '') {
            //     this.$refs.ruleForm.validateField('checkPass');
            // }
            callback();
        }
    };
    /**
     * @name {再次验证密码}
     * @param  /^[a-zA-Z]+[a-z0-9]{4,12}$/i
     */
    export const reValidatePass =(rule, value, callback)=> {
        console.log($el)
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.newpass) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
       
   };