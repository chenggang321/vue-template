import Axios from 'axios'
import queryString from 'querystring'
import { toast } from '@/components/toast'

// 状态
import store from '@/store'
// 异常数据 需要路由跳转 或者通过 store 状态中心跳转
import router from '@/router'
//
import {local} from '@/utils/index'

// loading
let LOAD;
let axios = Axios.create();

// 超时时间30s
axios.defaults.timeout = 30000;
axios.defaults.withCredentials = true;
// 配置请求路径公共部分
// axios.defaults.baseURL = 'https://api.github.com';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

// http请求拦截器
axios.interceptors.request.use(config => {
    //POST数据转换 上传文件时不做处理
    if(config.headers['Content-Type'] != 'multipart/form-data'){
        var data = config.data;
        config.data = queryString.stringify(data);
    }

    // token
	config.headers.accessToken = local.getObject('session').sessionId

    return config
}, error => {
    return Promise.reject(error);
})

// http响应拦截器
axios.interceptors.response.use(res => {
    // 统一处理服务端异常错误
    if (!res.data.success && !res.config.ignoreError) {
        toast({
            iconClass: 'el-icon-error',
            tips: res.data.message || '出错了！但后台未返回错误信息'
        })
    }

    return res
}, error => {
    // 返回状态
    if (error.response) {
        console.info('返回状态', error.response.status);
        switch (error.response.status) {
            case 401:
                // 401 清除token信息并跳转到登录页面
                toast({
                    iconClass : 'el-icon-warning',
                    tips: '请登录后访问',
                })
                // 退出通知
                store.commit('LOGIN_OUT');
                // 切换路由
                router.push({
                    name: 'redirect'
                })
                break;
            case 404:
                toast({
                    iconClass : 'i-warn',
                    tips: '请求接口不存在'
                })
                break;
            case 500:
                toast({
                    iconClass : 'i-warn',
                    tips: '后台接口报错'
                })
                break;
            default:
                toast({
                    iconClass : 'i-warn',
                    tips: '错误码：' + error.request.status
                })
        }
    }
    // 请求状态
    if (error.request) {
        console.info('请求状态', error.request.status);
        switch (error.request.status) {
            case 0:
                toast({
                    iconClass : 'el-icon-warning',
                    tips: (error && error.data && error.data.message) || '请求超时',
                })
                break;
            case 401:
                toast({
                    iconClass : 'el-icon-warning',
                    tips: '请登录后访问',
                })

                break;
            case 404:
                toast({
                    iconClass: 'el-icon-warning',
                    tips: '请求接口不存在'
                })
                break;
                case 500:
                    toast({
                        iconClass : 'i-warn',
                        tips: '后台接口报错'
                    })
                  break;
            default:
                toast({
                    iconClass : 'el-icon-warning',
                    tips: error.data.message,
                })
                break;
        }
    }
    return Promise.reject(error);

})
export const $http = axios;

export default {
    install: function(vm) {
        vm.prototype.$http = axios
    }
}
