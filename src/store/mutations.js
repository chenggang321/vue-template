/**
 * mutations
 */
// 使用常量替代 Mutation 事件类型
import * as type from './mutation-types'
// 缓存
import {local, utils} from '@/utils/index'

export default {
    degrees: (state, data) => {
        state.degrees = data;
    },
    degreesObj: (state, data) => {
        state.degreesObj = data;
    },
    [type.LOGIN_IN](state, data){
        local.setObject('user', data);
        state.user = utils.copy(data);
    },
    [type.LOGIN_OUT](state, data){
        local.remove('user');
        state.user = {};
    },
    [type.SET_IS_COLLAPSE](state,isCollapse){
        state.isCollapse = isCollapse;
    },
}
