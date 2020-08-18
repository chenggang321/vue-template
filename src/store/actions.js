/**
 * 异步改变状态，通过commit 触发 mutations， 不能直接改变state状态
 * 默认接收context 参数
 * increment (context) {
 *    context.commit('increment')
 * }
 * 也可以通过结构赋值方式传递参数 context下面有：state、getters、commit、dispatch
 * increment ({ commit }) {
 *   commit('increment')
 * }
 *
 *
 * 调用方式：store.dispatch('increment')
 *
 * 除了触发方式名称不同（commit <=> dispatch）, 其余使用与 commit 一致
 *
 */
// api
import * as baseData from '@/api'
// 缓存
import {local, utils} from '@/utils/index'

// degrees    学历  number
// industrys   行业  number


export default {
    degrees ({commit}) {
        baseData.getDegrees().then(res => {
            if(res.data.success){
                let obj = utils.repeat(res.data.data, 'id');

                local.setObject('degrees', res.data.data);
                local.setObject('degreesObj', obj);

                commit('degrees', res.data.data);
                commit('degreesObj', obj);

            }
        })
    },
    // 检测数据是否存在
    detection ({ commit, dispatch }){
        let degrees = local.getObject('degrees');
        let degreesObj = local.getObject('degreesObj');

        if(!Object.keys(degrees).length){
            dispatch('degrees')
        }else{
            commit('degrees', degrees);
            commit('degreesObj', degreesObj);
        }
    },
    // 获取基础数据版本号
    BASE_DATA ({ dispatch}) {
        let v = local.getObject('version');
        baseData.getBaseData().then(res => {
            if (res.data.success) {
                let version = res.data.data;
                // 版本号不相等的就把数据删除
                for(let i in version){
                    if(v[i] != version[i]){
                        local.remove(i);
                    }
                }
                // 设置最新版本
                local.setObject('version', version);
                // 触发检测方法
                dispatch('detection');
            }
        })
    }

};
