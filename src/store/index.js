import { createStore } from 'vuex'

export default createStore({
  state: {
    IsGroup: null,
    GroupInfo: {},
    ProjectInfo: {},
    // toast 默认值
    ToastState: null,
    ToastText: null,
    ShowToast: null,
    ToastDurationTime: null,
    // dialog 默认值
    DialogText: null,
    DialogTitle: null,
    ShowDialog: null,
    OkEvent: null,
    // toast 和 dialog 自适应参数
    ScrollTop: 0,
    height: 1080
  },
  getters: {
  },
  mutations: {
    SaveGroupInfo(state, payload) {
      state.GroupInfo = payload
    },
    SaveIsGroup(state, payload) {
      state.IsGroup = payload
    },
    SaveProjectInfo(state, payload) {
      state.ProjectInfo = payload
    },
    SaveScrollTop(state, payload) {
      state.ScrollTop = payload
    },
    SaveHeight(state, payload) {
      state.height = payload
    },
    toast(state, payload) {
      state.ShowToast = payload.ShowModal === undefined ? false : payload.ShowModal
      state.ToastText = payload.text === undefined ? '出 BUG !!!' : payload.text
      state.ToastState = payload.state === undefined ? 1 : payload.state
      state.ToastDurationTime = payload.DurationTime === undefined ? 1500 : payload.DurationTime
    },
    dialog(state, payload) {
      state.ShowDialog = payload.ShowModal === undefined ? false : payload.ShowModal
      state.DialogText = payload.text === undefined ? '出 BUG !!!' : payload.text
      state.DialogTitle = payload.title === undefined ? '提醒: 出 BUG !!!' : payload.title
    },
    DialogStateChange(state, payload) {
      // 点击确认时，执行确认事件
      if (payload) {
        this.state.OkEvent()
      }
      // 确认或取消都需要关闭对话框
      this.state.ShowDialog = false
    },
    BindOkEvent(state, payload) {
      state.OkEvent = payload
    }
  },
  actions: {
    SaveGroupInfo(context, payload) {
      context.commit('SaveGroupInfo', payload)
    },
    SaveIsGroup(context, payload) {
      context.commit('SaveIsGroup', payload)
    },
    SaveProjectInfo(context, payload) {
      context.commit('SaveProjectInfo', payload)
    },
    SaveScrollTop(context, payload) {
      context.commit('SaveScrollTop', payload)
    },
    SaveHeight(context, payload) {
      context.commit('SaveHeight', payload)
    },
    toast(context, payload) {
      context.commit('toast', payload)
    },
    dialog(context, payload) {
      context.commit('dialog', payload)
    },
    DialogStateChange(context, payload) {
      context.commit('DialogStateChange', payload)
    },
    BindOkEvent(context, payload) {
      context.commit('BindOkEvent', payload)
    }
  },
  modules: {
  }
})
