import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
// import publicResume from './modules/public'
// import login from './modules/login'
import apply from './modules/apply'
import pay from './modules/pay'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'


export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    // publicResume,
    // login
      apply,
      pay
  },
  strict: debug,
})
