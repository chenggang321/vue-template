/**
 *  modules
 */
import { LOGIN_IN, LOGIN_OUT } from '../mutation-types'

// initial state
const state = {
  resumeAmount: 1000,
  openAmount: 500
}

// 对于模块内部的 mutation 和 getter，接收的第一个参数是模块的局部状态对象
// getters
const getters = {
  resumeAmount: state => state.resumeAmount,
  // 对于模块内部的 getter，根节点状态会作为第三个参数暴露出来
  sumWithRootCount(state, getters, rootState) {
    return getters.resumeAmount + rootState.count
  }
}

//mutations
const mutations = {
  [LOGIN_IN](state, payload) {
    state.resumeAmount = payload.resumeAmount
  },
  [LOGIN_OUT](state) {
    state.resumeAmount = 0
  }
}

//actions
const actions = {
  login({ commit, state }, user) {
    commit(LOGIN_IN, { resumeAmount: 2000 })
  },

  logout({ commit }) {
    commit(LOGIN_OUT)
  },
  // 对于模块内部的 action，局部状态通过 context.state 暴露出来，根节点状态则为 context.rootState
 //  incrementIfOddOnRootSum ({ state, commit, rootState }) {
	// console.info(rootState.count);
 //  }
}

//export
export default {
  state,
  getters,
  actions,
  mutations
}
