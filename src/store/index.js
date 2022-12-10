import { createStore } from 'vuex'

export default createStore({

  state: {
    isGroup: false,
    // 登录页面信息
    loginInfo: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      code: ''
    },
    // 群组信息
    groupInfo: {
      slogon: '',
      name: '',
      UUID: '',
      isAdmin: false,
      members: []
    },
    // 用户创建群组时输入的群组名和群组简介
    createGroup: {
      name: '',
      slogon: ''
    },
    // 用户尚未保存的项目名
    unSaveProjectName: '',
    // 项目信息
    projectInfo: {
      isGroup: false,
      id: 0,
      name: '',
      reactions: []
    },
    // 用户打开分享实验模态框时的群组项目数据
    projectList: [],
    // 用户决定将实验分享到的具体项目 id
    shareProjectId: 0,
    // 反应信息
    reactionInfo: {
      id: 0,
      name: '',
      date: '',
      tags: [],
      data: [],
      versions: [],
      // 用户尚未保存的实验名
      unSaveReactionName: ''
    },
    // router 中是否对用户从实验页面跳转行为进行判断
    leaveFromReaction: false,
    // 初始化实验页面或上一次保存之后的 hash 值
    lastReactionHash: '',
    // 模版信息
    templateDefine: [],
    // 内置的模版信息
    templateBuiltin: [
      { id: 1, name: '模版1', data: ['scheme', 'table'] }, { id: 2, name: '模版2', data: ['scheme', 'table'] }, { id: 3, name: '模版3', data: ['scheme', 'table'] }, { id: 4, name: '模版4', data: ['scheme', 'table'] }, { id: 5, name: '模版5', data: ['scheme', 'table'] }
    ],
    // toast 默认值
    toastState: 0,
    toastText: '',
    showToast: false,
    toastDurationTime: 0,
    // modal 默认值
    modalText: '',
    modalTitle: '',
    showModal: false,
    // 绑定到模态框的事件
    okEvent: null,
    // 决定应该插入哪种插槽,[0, 1, 2, 3, 4, 5, 6] 分别代表[通知, 加入群组、创建群组、添加成员、分享实验、保存模版、选择模版]
    slotType: 0,
    // toast 和 modal 自适应参数
    scrollTop: 0,
    height: 1080,
    // 监听右边栏是否有拖动事件发生
    isDragging: false,
    // 用来禁止模块的拖拽行为
    draggable: false
  },
  getters: {
  },
  mutations: {
    saveLoginInfo(state, payload) {
      if (payload.username) {
        state.loginInfo.username = payload.username
      }
      if (payload.email) {
        state.loginInfo.email = payload.email
      }
      if (payload.password) {
        state.loginInfo.password = payload.password
      }
      if (payload.confirmPassword) {
        state.loginInfo.confirmPassword = payload.confirmPassword
      }
      if (payload.code) {
        state.loginInfo.code = payload.code
      }
    },
    clearLoginInfo(state) {
      state.loginInfo = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        code: ''
      }
    },
    saveGroupInfo(state, payload) {
      if (payload.slogon) {
        state.groupInfo.slogon = payload.slogon
      }
      if (payload.name) {
        state.groupInfo.name = payload.name
      }
      if (payload.UUID) {
        state.groupInfo.UUID = payload.UUID
      }
      if (payload.isAdmin) {
        state.groupInfo.isAdmin = payload.isAdmin
      }
      if (payload.members) {
        state.groupInfo.members = payload.members
      }
    },
    clearGroupInfo(state) {
      state.groupInfo = {
        name: '',
        slogon: '',
        UUID: '',
        isAdmin: false,
        members: []
      }
    },
    saveIsGroup(state, payload) {
      state.isGroup = payload
    },
    saveCreateGroup(state, payload) {
      if (payload.name) {
        state.createGroup.name = payload.name
      }
      if (payload.slogon) {
        state.createGroup.slogon = payload.slogon
      }
    },
    clearCreateGroup(state) {
      state.createGroup = {
        name: '',
        slogon: ''
      }
    },
    saveProjectList(state, payload) {
      state.projectList = payload
    },
    saveProjectInfo(state, payload) {
      if (payload.isGroup) {
        state.projectInfo.isGroup = payload.isGroup
      }
      if (payload.id) {
        state.projectInfo.id = payload.id
      }
      if (payload.name) {
        state.projectInfo.name = payload.name
      }
      if (payload.reactions) {
        state.projectInfo.reactions = payload.reactions
      }
    },
    saveUnSaveProjectName(state, payload) {
      state.unSaveProjectName = payload
    },
    saveUnSaveReactionName(state, payload) {
      state.reactionInfo.unSaveReactionName = payload
    },
    saveShareProjectId(state, payload) {
      state.shareProjectId = payload
    },
    saveReactionInfo(state, payload) {
      if (payload.id) {
        state.reactionInfo.id = payload.id
      }
      if (payload.name) {
        state.reactionInfo.name = payload.name
      }
      if (payload.date) {
        state.reactionInfo.date = payload.date
      }
      if (payload.tags) {
        state.reactionInfo.tags = payload.tags
      }
      if (payload.data) {
        state.reactionInfo.data = payload.data
      }
      if (payload.versions) {
        state.reactionInfo.versions = payload.versions
      }
      if (payload.unSaveReactionName) {
        state.reactionInfo.unSaveReactionName = payload.unSaveReactionName
      }
    },
    clearReactionInfo(state) {
      state.reactionInfo = {
        id: 0,
        name: '',
        date: '',
        tags: [],
        data: [],
        versions: []
      }
    },
    saveLeaveFromReaction(state, payload) {
      state.leaveFromReaction = payload
    },
    saveLastReactionHash(state, payload) {
      state.lastReactionHash = payload
    },
    saveScrollTop(state, payload) {
      state.scrollTop = payload
    },
    saveHeight(state, payload) {
      state.height = payload
    },
    toast(state, payload) {
      state.showToast = payload.showModal === undefined ? true : payload.showModal
      state.toastText = !payload.text ? '未知错误' : payload.text
      state.toastState = payload.state === undefined ? 1 : payload.state
      state.toastDurationTime = !payload.durationTime ? 1500 : payload.durationTime
    },
    modal(state, payload) {
      state.modalText = !payload.text ? '' : payload.text
      state.modalTitle = !payload.title ? '默认标题' : payload.title
      state.showModal = payload.showModal === undefined ? true : payload.showModal
      state.slotType = payload.slotType
    },
    modalStateChange(state, payload) {
      // 点击确认按钮时，自动执行绑定的事件
      if (payload) {
        state.okEvent()
      }
    },
    bindOkEvent(state, payload) {
      state.okEvent = payload
    },
    saveIsDragging(state, payload) {
      state.isDragging = payload
    },
    saveDraggable(state, payload) {
      state.draggable = payload
    },
    saveReactionDataTitle(state, payload) {
      state.reactionInfo.data[payload.index].title = payload.content
    },
    saveReactionDataContent(state, payload) {
      state.reactionInfo.data[payload.index].content = payload.content
    },
    deleteReactionData(state, payload) {
      state.reactionInfo.data.splice(payload, 1)
    },
    saveTemplateDefine(state, payload) {
      state.templateDefine = payload
    }
  },
  actions: {
    saveLoginInfo(context, payload) {
      context.commit('saveLoginInfo', payload)
    },
    clearLoginInfo(context) {
      context.commit('clearLoginInfo')
    },
    saveGroupInfo(context, payload) {
      context.commit('saveGroupInfo', payload)
    },
    clearGroupInfo(context) {
      context.commit('clearGroupInfo')
    },
    saveIsGroup(context, payload) {
      context.commit('saveIsGroup', payload)
    },
    saveCreateGroup(context, payload) {
      context.commit('saveCreateGroup', payload)
    },
    clearCreateGroup(context) {
      context.commit('clearCreateGroup')
    },
    saveProjectInfo(context, payload) {
      context.commit('saveProjectInfo', payload)
    },
    saveProjectList(context, payload) {
      context.commit('saveProjectList', payload)
    },
    saveUnSaveProjectName(context, payload) {
      context.commit('saveUnSaveProjectName', payload)
    },
    saveUnSaveReactionName(context, payload) {
      context.commit('saveUnSaveReactionName', payload)
    },
    saveShareProjectId(context, payload) {
      context.commit('saveShareProjectId', payload)
    },
    saveReactionInfo(context, payload) {
      context.commit('saveReactionInfo', payload)
    },
    clearReactionInfo(context) {
      context.commit('clearReactionInfo')
    },
    saveLastReactionHash(context, payload) {
      context.commit('saveLastReactionHash', payload)
    },
    saveLeaveFromReaction(context, payload) {
      context.commit('saveLeaveFromReaction', payload)
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
    modal(context, payload) {
      context.commit('modal', payload)
    },
    modalStateChange(context, payload) {
      context.commit('modalStateChange', payload)
    },
    bindOkEvent(context, payload) {
      context.commit('bindOkEvent', payload)
    },
    saveIsDragging(context, payload) {
      context.saveIsDragging('saveIsDragging', payload)
    },
    saveDraggable(context, payload) {
      context.commit('saveDraggable', payload)
    },
    saveReactionDataTitle(context, payload) {
      context.commit('saveReactionDataTitle', payload)
    },
    saveReactionDataContent(context, payload) {
      context.commit('saveReactionDataContent', payload)
    },
    deleteReactionData(context, payload) {
      context.commit('deleteReactionData', payload)
    },
    saveSubmitInfo(context, payload) {
      context.commit('saveSubmitInfo', payload)
    },
    clearSubmitInfo(context) {
      context.commit('clearSubmitInfo')
    },
    saveTemplateDefine(context, payload) {
      context.commit('saveTemplateDefine', payload)
    }
  },
  modules: {
  }
})
