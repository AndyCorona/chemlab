import { createStore } from 'vuex'
function dateFormat(fmt, date) {
  let ret
  const opt = {
    // 年
    'Y+': date.getFullYear().toString(),
    // 月
    'm+': (date.getMonth() + 1).toString(),
    // 日
    'd+': date.getDate().toString(),
    // 时
    'H+': date.getHours().toString(),
    // 分
    'M+': date.getMinutes().toString(),
    // 秒
    'S+': date.getSeconds().toString()
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  }
  for (const k in opt) {
    ret = new RegExp('(' + k + ')').exec(fmt)
    if (ret) {
      fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')))
    }
  }
  return fmt
}

export default createStore({

  state: {
    isGroup: null,
    // 登录时的信息, [用户名、邮箱、密码、确认密码、验证码]
    loginInfo: ['', '', '', '', ''],
    // 群组信息
    groupInfo: {
      groupSlogon: '',
      groupName: '',
      groupUUID: '',
      isAdmin: false,
      members: []
    },
    // 项目信息
    projectInfo: {
      isGroup: false,
      projectId: null,
      projectName: '未命名',
      reactions: []
    },
    // 用户打开分享实验模态框时的群组项目数据
    projectList: [],
    // 用户决定将实验分享到的具体项目 id
    shareProjectId: null,
    // 反应信息
    reactionInfo: {
      reactionId: null,
      reactionName: '未命名',
      date: dateFormat('YYYY-mm-dd', new Date()),
      tags: [],
      data: [],
      versions: []
    },
    // 模版信息
    templateDefine: [],
    // 内置的模版信息
    templateBuiltin: [
      { templateId: 1, templateName: '模版1', data: ['scheme', 'table'] }, { templateId: 2, templateName: '模版2', data: ['scheme', 'table'] }, { templateId: 3, templateName: '模版3', data: ['scheme', 'table'] }, { templateId: 4, templateName: '模版4', data: ['scheme', 'table'] }, { templateId: 5, templateName: '模版5', data: ['scheme', 'table'] }
    ],
    // toast 默认值
    toastState: null,
    toastText: null,
    showToast: null,
    toastDurationTime: null,
    // modal 默认值
    modalText: null,
    modalTitle: null,
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
      state.loginInfo[payload.index] = payload.content
    },
    clearLoginInfo(state) {
      state.loginInfo = ['', '', '', '', '']
    },
    saveGroupInfo(state, payload) {
      if (payload.groupSlogon) {
        state.groupInfo.groupSlogon = payload.groupSlogon
      }
      if (payload.groupName) {
        state.groupInfo.groupName = payload.groupName
      }
      if (payload.groupUUID) {
        state.groupInfo.groupUUID = payload.groupUUID
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
        groupName: '暂未加入',
        groupSlogon: '可以申请加入一个群组',
        groupUUID: '',
        isAdmin: false,
        members: []
      }
    },
    saveIsGroup(state, payload) {
      state.isGroup = payload
    },
    saveProjectList(state, payload) {
      state.projectList = payload
    },
    saveProjectInfo(state, payload) {
      state.projectInfo = payload
    },
    saveProjectName(state, payload) {
      state.projectInfo.projectName = payload
    },
    saveShareProjectId(state, payload) {
      state.shareProjectId = payload
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
    modal(state, payload) {
      state.modalText = payload.text === undefined ? '' : payload.text
      state.modalTitle = payload.title === undefined ? '必须有标题!!!' : payload.title
      state.showModal = payload.showModal === undefined ? true : payload.showModal
      state.slotType = payload.slotType
    },
    modalStateChange(state, payload) {
      // 点击确认按钮时，自动执行绑定的事件
      if (payload) {
        this.state.okEvent()
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
    saveReactionName(state, payload) {
      state.reactionInfo.reactionName = payload
    },
    saveReactionDate(state, payload) {
      state.reactionInfo.date = payload
    },
    saveReactionTags(state, payload) {
      state.reactionInfo.tags = payload
    },
    saveReactionData(state, payload) {
      state.reactionInfo.data = payload
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
    saveProjectInfo(context, payload) {
      context.commit('saveProjectInfo', payload)
    },
    saveProjectList(context, payload) {
      context.commit('saveProjectList', payload)
    },
    saveProjectName(context, payload) {
      context.commit('saveProjectName', payload)
    },
    saveShareProjectId(context, payload) {
      context.commit('saveShareProjectId', payload)
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
    saveReactionName(context, payload) {
      context.commit('saveReactionName', payload)
    },
    saveReactionDate(context, payload) {
      context.commit('saveReactionDate', payload)
    },
    saveReactionTags(context, payload) {
      context.commit('saveReactionTags', payload)
    },
    saveReactionData(context, payload) {
      context.commit('saveReactionData', payload)
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
    }
  },
  modules: {
  }
})
