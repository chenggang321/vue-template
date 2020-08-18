import {SET_CUSTOMIZE,SET_PRODUCT,CLEAR_PRODUCT_CUSTOMIZE} from '../mutation-types'
import {local} from '@/utils/index'

const state = {
    product:local.getObject('product'),
    customize:local.getObject('customize'),
};

const getters = {
    product: state => state.product,
    customize: state => state.customize
};

const mutations = {
    [SET_CUSTOMIZE](state,customize){
        state.customize = customize;
        local.setObject('customize',customize)
    },
    [SET_PRODUCT](state,product){
        state.product = product;
        local.setObject('product',product)
    },
    [CLEAR_PRODUCT_CUSTOMIZE](state){
        state.product = null;
        state.customize = null;
        local.remove('product');
        local.remove('customize')
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
