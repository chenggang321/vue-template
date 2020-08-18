import { SET_PAY_DATA } from '../mutation-types'
import {local} from '@/utils/index'

const state = {
    payData:local.getObject('payData')
};

const getters = {
    payData: state => state.payData
};

const mutations = {
    [SET_PAY_DATA](state,data){
        state.payData = data;
        local.setObject('payData',data)
    }
};

const actions = {

};

export default {
    state,
    getters,
    mutations,
    actions
}
