import { createStore } from 'vuex'

export default createStore({
  state: {
    isGroup: null,
    // 保存群组信息
    groupInfo: {},
    // 保存项目信息
    projectInfo: {},
    // 保存反应信息
    reactionInfo: {},
    // toast 默认值
    toastState: null,
    toastText: null,
    showToast: null,
    toastDurationTime: null,
    // dialog 默认值
    dialogText: null,
    dialogTitle: null,
    showDialog: null,
    okEvent: null,
    // toast 和 dialog 自适应参数
    scrollTop: 0,
    height: 1080
  },
  getters: {
  },
  mutations: {
    saveGroupInfo(state, payload) {
      state.groupInfo = payload
    },
    saveIsGroup(state, payload) {
      state.isGroup = payload
    },
    saveProjectInfo(state, payload) {
      state.projectInfo = payload
    },
    saveReactionInfo(state, payload) {
      state.reactionInfo = payload
    },
    saveScrollTop(state, payload) {
      state.scrollTop = payload
    },
    saveHeight(state, payload) {
      state.height = payload
    },
    toast(state, payload) {
      state.showToast = payload.showModal === undefined ? true : payload.showModal
      state.toastText = payload.text === undefined ? '出 BUG !!!' : payload.text
      state.toastState = payload.state === undefined ? 1 : payload.state
      state.toastDurationTime = payload.durationTime === undefined ? 1500 : payload.durationTime
    },
    dialog(state, payload) {
      state.dialogText = payload.text === undefined ? '出 BUG !!!' : payload.text
      state.dialogTitle = payload.title === undefined ? '提醒: 出 BUG !!!' : payload.title
      state.showDialog = payload.showModal === undefined ? true : payload.showModal
    },
    dialogStateChange(state, payload) {
      // 点击确认时，执行确认事件
      if (payload) {
        this.state.okEvent()
      }
      // 确认或取消都需要关闭对话框
      this.state.showDialog = false
    },
    bindOkEvent(state, payload) {
      state.okEvent = payload
    }
  },
  actions: {
    saveGroupInfo(context, payload) {
      context.commit('saveGroupInfo', payload)
    },
    saveIsGroup(context, payload) {
      context.commit('saveIsGroup', payload)
    },
    saveProjectInfo(context, payload) {
      context.commit('saveProjectInfo', payload)
    },
    saveReactionInfo(context, payload) {
      context.commit('saveReactionInfo', payload)
    },
    saveScrollTop(context, payload) {
      context.commit('saveScrollTop', payload)
    },
    saveHeight(context, payload) {
      context.commit('saveHeight', payload)
    },
    toast(context, payload) {
      context.commit('toast', payload)
    },
    dialog(context, payload) {
      context.commit('dialog', payload)
    },
    dialogStateChange(context, payload) {
      context.commit('dialogStateChange', payload)
    },
    bindOkEvent(context, payload) {
      context.commit('bindOkEvent', payload)
    }
  },
  modules: {
  }
})
