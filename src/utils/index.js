import CryptoJS from 'crypto-js'
import { toast } from '@/components/toast'
import {$http} from './http'
import {$http as $axios} from './longHttp'

/**
 * Vue的插件，用来获取和设置localStorage存储
 **/
export const local = {
    set(key, value) {
        window.localStorage[key] = value;
    },
    //读取单个属性
    get(key, defaultValue) {
        return window.localStorage[key] || defaultValue;
    },
    //存储对象，以JSON格式存储
    setObject(key, value) {
        window.localStorage[key] = JSON.stringify(value);
    },
    //读取对象
    getObject(key) {
        return JSON.parse(window.localStorage[key] || '{}');
    },
    //删除单个对象
    remove(key) {
        window.localStorage.removeItem(key);
    },
    //删除所有
    removeAll() {
        window.localStorage.clear();
    }
};

/**
 * util 常用方法
 **/

export const utils = {
    // 拷贝
    copy(data) {
        return JSON.parse(JSON.stringify(data));
    },
    deepClone(obj) {
        if (obj === null || typeof obj !== 'object') {
            return obj;
        }
        if (obj instanceof Array) {
            var copy = [];
            for (var i = 0; i < obj.length; i++) {
                copy.push(obj[i]);
            }
            return copy;
        }
        if (obj instanceof Date) {
            var copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        }
        if (obj instanceof Object) {
            var copy = {};
            for (var key in obj) { //递归
                if (obj.hasOwnProperty(key)) {
                    copy[key] = utils.deepClone(obj[key]);
                }
            }
            return copy;
        }
    },
    copyArr(arr) {
        return arr.map((e) => {
            if (typeof e === 'object') {
                return Object.assign({}, e)
            } else {
                return e
            }
        })
    },
    //多维数组 转 一维 对象
    repeat(data, name) {
        let obj = {};
        let format = (data) => {
            for (var i = 0, j = data.length; i < j; i++) {
                var item = this.copy(data[i]);
                item.children = null;
                obj[item[name]] = item;

                data[i].children && format(data[i].children);
            }
        }
        format(data);
        return obj;
    },
    endTime(date, type) {
        let DATE = new Date(+date);
        let year = DATE.getFullYear(),
            month = DATE.getMonth() + 1,
            day = DATE.getDate();
        let time;

        if (type == 'year') {
            time = new Date(year + 1, 0, 0, 23, 59, 59);
        } else if (type == 'month') {
            time = new Date(year, month - 1, 0, 23, 59, 59);
        } else if (type == 'day') {
            time = new Date(year, month - 1, day, 23, 59, 59);

        } else {
            return new Date().getTime();
        }

        return time.getTime();
    },
    // md5
    MD5(str) {
        return str ? CryptoJS.MD5(str).toString() : '';
    },
    // 登录加密
    enCryption(data) {
        var a1 = data.loginName + ':' + local.getObject('session').realm + ':' + utils.MD5(data.authorizeCode),
            a2 = 'POST:/auth/v1/login',
            ha1 = utils.MD5(a1),
            ha2 = utils.MD5(a2);

        data.authorizeCode = utils.MD5(ha1 + ':' + local.getObject('session').nonce + ':' + ha2);
        return data;
    },
    //加密
    enDES(data) {
        var key = 'RUYUKEY1'; //密钥
        var iv = 'RUYUKEY2';

        var key = CryptoJS.enc.Utf8.parse(key);
        var iv = CryptoJS.enc.Utf8.parse(iv);
        var encrypted = CryptoJS.DES.encrypt(data, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        return encrypted.toString();
    },
    //解密
    deDES(data) {
        var key = 'RUYUKEY1'; //密钥
        var iv = 'RUYUKEY2';

        var key = CryptoJS.enc.Utf8.parse(key);
        var iv = CryptoJS.enc.Utf8.parse(iv);
        var decrypted = CryptoJS.DES.decrypt(data, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        return decrypted.toString(CryptoJS.enc.Utf8); //
    },
    // 图片压缩
    /**
     * 三个参数
     * file：一个是文件(类型是图片格式)，
     * w：图片配置参数
     * photoCompress()
     */
    photoCompress: async function photoCompress(file, w) {
        let blob = null;
        try {
            let re = await utils.fileLoad(file);
            let base64 = await utils.canvasDataURL(re, w);
            blob = await utils.convertBase64UrlToBlob(base64);
        } catch (e) {
            console.log(e)
        }
        return new Promise((resolve) => {
            resolve(blob);
        })
    },
    fileLoad: async function fileLoad(file) {
        return new Promise((resolve) => {
            let ready = new FileReader();
            ready.readAsDataURL(file);
            ready.onload = function () {
                resolve(this.result);
            }
        })
    },
    canvasDataURL: async function canvasDataURL(path, obj) {
        return new Promise((resolve) => {
            let img = new Image();
            img.src = path;
            img.onload = function () {
                let that = this;
                // 默认按比例压缩
                let w = that.width,
                    h = that.height,
                    scale = w / h;
                w = obj.width || w;
                h = obj.height || (w / scale);
                let quality = 0.7;  // 默认图片质量为0.7
                //生成canvas
                let canvas = document.createElement('canvas');
                let ctx = canvas.getContext('2d');
                // 创建属性节点
                let anw = document.createAttribute("width");
                anw.nodeValue = w;
                let anh = document.createAttribute("height");
                anh.nodeValue = h;
                canvas.setAttributeNode(anw);
                canvas.setAttributeNode(anh);
                ctx.drawImage(that, 0, 0, w, h);
                // 图像质量
                if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
                    quality = obj.quality;
                }
                // quality值越小，所绘制出的图像越模糊
                let base64 = canvas.toDataURL('image/jpeg', quality);
                // 回调函数返回base64的值
                resolve(base64);
            }
        });
    },
    /**
     * 将以base64的图片url数据转换为Blob
     * @param urlData
     * 用url方式表示的base64图片数据
     */
    convertBase64UrlToBlob: async function convertBase64UrlToBlob(urlData) {
        return new Promise((resolve) => {
            let arr = urlData.split(','), mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            let blob = new Blob([u8arr], {type: mime});
            resolve(blob);
        })
    },
    /*
    * 身份证校验
    * */
    IdentityCodeValid(code) {
        // 校验香港 台湾 澳门
        var patternHongkong = /^((\s?[A-Za-z])|([A-Za-z]{2}))\d{6}(\([0−9aA]\)|[0-9aA])$/;//香港
        var patternTaiwan = /^[a-zA-Z][0-9]{9}$/;//台湾
        var patternMacao = /^[1|5|7][0-9]{6}\([0-9Aa]\)/;//澳门

        if(patternHongkong.test(code)||patternTaiwan.test(code)||patternMacao.test(code)){
            return true
        }
        var city = {
            11: "北京",
            12: "天津",
            13: "河北",
            14: "山西",
            15: "内蒙古",
            21: "辽宁",
            22: "吉林",
            23: "黑龙江 ",
            31: "上海",
            32: "江苏",
            33: "浙江",
            34: "安徽",
            35: "福建",
            36: "江西",
            37: "山东",
            41: "河南",
            42: "湖北 ",
            43: "湖南",
            44: "广东",
            45: "广西",
            46: "海南",
            50: "重庆",
            51: "四川",
            52: "贵州",
            53: "云南",
            54: "西藏 ",
            61: "陕西",
            62: "甘肃",
            63: "青海",
            64: "宁夏",
            65: "新疆",
            71: "台湾",
            81: "香港",
            82: "澳门",
            91: "国外 "
        };
        var tip = "";
        var pass = true;

        if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
            tip = "身份证号格式错误";
            pass = false;
        } else if (!city[code.substr(0, 2)]) {
            tip = "地址编码错误";
            pass = false;
        } else {
            //18位身份证需要验证最后一位校验位
            if (code.length == 18) {
                code = code.split('');
                //∑(ai×Wi)(mod 11)
                //加权因子
                var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
                //校验位
                var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
                var sum = 0;
                var ai = 0;
                var wi = 0;
                for (var i = 0; i < 17; i++) {
                    ai = code[i];
                    wi = factor[i];
                    sum += ai * wi;
                }
                var last = parity[sum % 11];
                if (parity[sum % 11] != code[17]) {
                    tip = "校验位错误";
                    pass = false;
                }
            }
        }
        return pass;
    },
    /*
    *  安全访问对象
    * */
    saveGetAttr(obj,pathArr){
        return pathArr.reduce((item, key) =>{
            return (item && item[key] !== 'undefined') ? item[key] : null
        }, obj);
    },
    /**
     * 从某一位置，截取指定长度的字符串，一个中文的长度为2
     * @name substr
     * @function
     * @grammar substr(source[, begin, num, dot])
     * @param {string} source 需要处理的字符串
     * @param {number} [begin] 截取的开始位置（字节数）
     * @param {number} [num] 截取的长度（字节数）
     * @param {string} [dot] 截取后补的字符串，一般为...
     *
     * @return {string} 对字符串截取后的结果
     */
    substr(source, begin, num, dot) {
        let ascRegexp = /[^\x00-\xFF]/g,
            i = 0,
            ibegin = begin;
        if(!source) return '';
        while(i < begin) (i++ && source.charAt(i).match(ascRegexp) && begin--);
        i = begin;
        let end = begin + num;
        while(i < end) (i++ && source.charAt(i).match(ascRegexp) && end--);
        if(dot && source.length > end) {
            source = this.substr(source, ibegin, num - dot.length + (dot.length % 2 === 0 ? 0 : 1), false);
            return source + dot;
        }
        return source.substring(begin, end);
    },
    /**
     * 对象转为数组
     * @param obj
     */
    obj2array(obj) {
        if(!obj) return [];
        let list = [];
        Object.keys(obj).forEach((key) => {
            const grade = {
                key,
                value: obj[key]
            };
            list.push(grade)
        });
        return list;
    },
    /**
     *  js 下载文件
     * @param data 二进制数据
     * @param filename 文件名
     * @param mime 文件类型
     */
    jsFileDownload(data,filename,mime){
        const blob = new Blob([data],{type:mime || 'application/octet-stream'});
        // ie
        if (typeof window.navigator.msSaveBlob !== 'undefined') {
            window.navigator.msSaveBlob(blob, filename);
        }else{
            const blobURL = window.URL.createObjectURL(blob);
            const tempLink = document.createElement('a');
            tempLink.style.display = 'none';
            tempLink.href = blobURL;
            tempLink.setAttribute('download', filename);

            // Safari
            if (typeof tempLink.download === 'undefined') {
                tempLink.setAttribute('target', '_blank');
            }

            document.body.appendChild(tempLink);
            tempLink.click();
            document.body.removeChild(tempLink);
            window.URL.revokeObjectURL(blobURL);
        }
    },
    urlSearch() {
        let str = location.href, num = str.indexOf("?"); //取得整个地址栏
        if(num>-1) return str.substr(num);
        return ''
    },
    downloadFile({url,loadingMsg='导出中',fileName}){
        // url = url + this.urlSearch();
        /*const loading = Loading.service(
            {
                lock: true,
                text: loadingMsg,
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.3)'
            }
        );*/
        $axios({
            url,
            method:'get',
            responseType:'blob',
            ignoreError:true
        }).then(res=>{
            const name =fileName || decodeURI((res.headers['content-disposition'].match(/=(\S*)(xls|zip)/)||[])[0]).replace(/=/,'');
            this.jsFileDownload(res.data,name);
            /*loading.close();*/
        }).catch(err=>{
            if(err){
                console.log(err)
                toast({
                    iconClass: 'el-icon-error',
                    tips: '导出失败'
                });
                /*loading.close();*/
            }
        })
    },
    httpGet(url, params, longTime = false, config) {
        return longTime
            ? $http.get(url, {params}, config)
            : $axios.get(url, {params}, config)
    },
    httpPost(url, params, longTime = false, config) {
        return longTime
            ? $axios.post(url, params, config)
            : $http.post(url, params, config)
    },
    isAimsen(){
        return local.getObject('session').role == 10
    },
    // 是否为协议授权
    authorizeType(){
        return local.getObject('session').authorizeType == 1
    },
    // 检测浏览器内核
    getBrowserEngine() {
        let userAgent = navigator.userAgent;
        if (userAgent.indexOf('Trident') !== -1 || userAgent.indexOf('MSIE') !== -1) {
            return 'IE'
        } else if (userAgent.indexOf('Firefox') !== -1) {
            return 'Firefox'
        } else if (userAgent.indexOf('Chrome')) {
            return 'Chrome'
        } else if (userAgent.indexOf('Safari') !== -1) {
            return 'Safari'
        } else {
            return 'Other'
        }
    },
    isMobile(){
        const browser = {
            versions: function () {
                const u = navigator.userAgent;
                return {//移动终端浏览器版本信息
                    trident: u.indexOf('Trident') > -1, //IE内核
                    presto: u.indexOf('Presto') > -1, //opera内核
                    webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                    mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
                    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                    iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
                    iPad: u.indexOf('iPad') > -1, //是否iPad
                    webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
                };
            } (),
            language: (navigator.browserLanguage || navigator.language).toLowerCase()
        };
        let flag = false;
        //1.是否mobile，否，肯定不是。
        if (browser.versions.mobile) {
            //2.是否ios或android终端，有一个是
            if (browser.versions.android || browser.versions.ios) {
                flag = true;
            }
        }
        return flag
    },
    // 检测qq,微信浏览器
    isWecaht(){
        const ua = navigator.userAgent.toLowerCase();
        // || ua.match(/UCBrowser/i) == "ucbrowser"
        if(ua.match(/MicroMessenger/i)=="micromessenger") {
            return true;
        }
        return false
    },
    // 检测uc浏览器
    isUCBrowser(){
        const ua = navigator.userAgent.toLowerCase();
        if(ua.match(/UCBrowser/i) == "ucbrowser"){
            return true;
        }
        return false;
    },
};
export default {
    install: function (vm) {
        vm.prototype.$local = local
        vm.prototype.$utils = utils
    }
}
