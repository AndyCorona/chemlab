import { createStore } from 'vuex'

export default createStore({
  state: {
    userInfo: {},
    isGroup: false
  },
  getters: {
  },
  mutations: {
    saveUserInfo(state, payload) {
      state.userInfo = payload
    },
    saveIsGroup(state, isGroup) {
      state.isGroup = isGroup
    }
  },
  actions: {
    saveUserInfo(context, payload) {
      context.commit('saveUserInfo', payload)
    }
  },
  modules: {
  }
})
