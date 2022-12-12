import { createStore } from 'vuex'

export default createStore({

  state: {
    // 用户是否切换为晚上主题
    isNight: false,
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
    // 项目信息
    projectInfo: {
      isGroup: false,
      id: 0,
      name: '',
      // 用户尚未保存的项目名
      unSaveProjectName: '',
      reactions: []
    },
    // 用户空间、群组空间的项目集合、用户分享实验时获取的群组项目集合
    projectList: [],
    // 用户分享实验模态框的控制参数
    shareProjectInfo: {
      id: 0,
      showDropdown: false,
      dropdownTitle: ''
    },
    // 是否关闭鼠标事件
    pointerEvent: false,
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
    // 当前处于的版本 id
    versionId: 0,
    // router 中是否对用户从实验页面跳转行为进行判断
    uncheckLeaveReaction: false,
    // 初始化实验页面或上一次保存之后的 hash 值
    lastReactionHash: '',
    // 模版信息
    templateDefine: [],
    // 内置的模版信息
    templateBuiltin: [
      { id: 1, name: '最全的', data: ['scheme', 'table', 'text', 'data', 'reference'] }, { id: 2, name: '全图', data: ['scheme', 'scheme', 'scheme', 'scheme'] }, { id: 3, name: '个人汇报', data: ['scheme', 'table', 'text'] }, { id: 4, name: '论文', data: ['text', 'scheme', 'text', 'reference'] }, { id: 5, name: '保存数据', data: ['scheme', 'text', 'data'] }
    ],
    templateName: '',
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
    // 是否启用模块的拖拽行为
    draggable: false
  },
  getters: {
  },
  mutations: {
    saveIsNight(state, payload) {
      state.isNight = payload
    },
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
    saveProjectInfo(state, payload) {
      if (payload.isGroup !== undefined) {
        state.projectInfo.isGroup = payload.isGroup
      }
      if (payload.id !== undefined) {
        state.projectInfo.id = payload.id
      }
      if (payload.name !== undefined) {
        state.projectInfo.name = payload.name
      }
      if (payload.reactions !== undefined) {
        state.projectInfo.reactions = payload.reactions
      }
      if (payload.unSaveProjectName !== undefined) {
        state.projectInfo.unSaveProjectName = payload.unSaveProjectName
      }
    },
    saveProjectList(state, payload) {
      state.projectList = payload
    },
    saveShareProjectInfo(state, payload) {
      if (payload.id !== undefined) {
        state.shareProjectInfo.id = payload.id
      }
      if (payload.showDropdown !== undefined) {
        state.shareProjectInfo.showDropdown = payload.showDropdown
      }
      if (payload.dropdownTitle) {
        state.shareProjectInfo.dropdownTitle = payload.dropdownTitle
      }
    },
    clearShareProjectInfo(state) {
      state.shareProjectInfo = {
        id: 0,
        showDropdown: false,
        dropdownTitle: ''
      }
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
    saveUncheckLeaveReaction(state, payload) {
      state.uncheckLeaveReaction = payload
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
    },
    saveTemplateName(state, payload) {
      state.templateName = payload
    },
    saveVersoinId(state, payload) {
      state.versionId = payload
    },
    savePointerEvent(state, payload) {
      state.pointerEvent = payload
    }
  },
  actions: {
    saveIsNight(context, payload) {
      context.commit('saveIsNight', payload)
    },
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
    saveShareProjectInfo(context, payload) {
      context.commit('saveShareProjectInfo', payload)
    },
    clearShareProjectInfo(context) {
      context.commit('clearShareProjectInfo')
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
    saveUncheckLeaveReaction(context, payload) {
      context.commit('saveUncheckLeaveReaction', payload)
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
    saveTemplateDefine(context, payload) {
      context.commit('saveTemplateDefine', payload)
    },
    saveTemplateName(context, payload) {
      context.commit('saveTemplateName', payload)
    },
    saveVersoinId(context, payload) {
      context.commit('saveVersoinId', payload)
    },
    savePointerEvent(context, payload) {
      context.commit('savePointerEvent', payload)
    }
  },
  modules: {
  }
})
