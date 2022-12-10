<template>
  <div class="main-project">
    <main-project-and-reaction-title classType="reaction-title" :readOnly="readOnly" @change="rename">
    </main-project-and-reaction-title>
    <div class="wrapper">
      <img @click="addReaction" src="/imgs/实验列表/添加.svg"
        v-if="(!isGroup && this.$store.state.projectInfo.reactions.length < 50)">
      <img @click="shareReaction" src="/imgs/实验列表/分享.svg" v-if="!isGroup">
      <img @click="deleteReaction" src="/imgs/实验列表/删除.svg"
        v-if="!isGroup || (isGroup && this.$store.state.groupInfo.isAdmin)">
    </div>
  </div>
  <main-reaction :show="!isGroup || (isGroup && this.$store.state.groupInfo.isAdmin)"
    @change="selection"></main-reaction>
</template>

<script>
import MainProjectAndReactionTitle from '../basic/MainProjectAndReactionTitle.vue'
import MainReaction from '../basic/MainReaction.vue'
export default {
  name: 'MainProject',
  components: {
    MainProjectAndReactionTitle,
    MainReaction
  },
  data() {
    return {
      reactionIdList: [],
      projectName: ''
    }
  },
  methods: {
    rename(value) {
      if (!/^.{0,30}$/.test(value)) {
        this.$store.commit('toast', { text: '修改失败，请输入有效的项目名' })
        return
      }
      this.axios.post('/project', {
        projectId: sessionStorage.getItem('projectId'),
        projectName: value,
        isGroup: this.isGroup
      }).then(() => {
        sessionStorage.setItem('projectName', value)
        this.$store.dispatch('toast', { text: '修改成功', state: 0 })
        this.$store.dispatch('saveProjectInfo', { name: value })
      }).catch((resp) => {
        this.$store.dispatch('toast', { text: resp.msg })
      })
    },
    init() {
      // 获取一个项目具体内容
      this.axios.get('/project', {
        projectId: sessionStorage.getItem('projectId'),
        isGroup: this.isGroup
      }).then((data) => {
        console.log(data)
        this.projectName = data.name
        sessionStorage.setItem('projectName', data.name)
        this.$store.dispatch('saveProjectInfo', data)
      }).catch((resp) => {
        this.$store.dispatch('toast', { text: resp.msg })
      })
    },
    // 删除反应
    deleteReaction() {
      const length = this.reactionIdList.length
      if (length === 0) {
        this.$store.commit('toast', { text: '请勾选要删除的实验', state: 2 })
        return
      }
      this.$store.commit('modal', { text: `确认删除${length > 1 ? '这些' : '该'}反应吗?`, title: '删除提醒', slotType: 0 })
      this.$store.commit('bindOkEvent', this.confirmDeleteReaction)
    },
    confirmDeleteReaction() {
      this.axios.delete('/reaction', {
        reactionId: this.reactionIdList,
        isGroup: this.isGroup
      }).then(() => {
        this.$store.dispatch('toast', { text: '删除成功', state: 0 })
        // 重新获取最新的接口数据
        this.init()
      }).catch((resp) => {
        this.$store.dispatch('toast', { text: resp.msg })
      })
    },
    addReaction() {
      // reactionId 为 0 代表是一个新增实验的行为
      sessionStorage.setItem('reactionId', 0)
      this.$router.push(`/main/${this.isGroup ? 'group' : 'user'}/project/reaction`)
    },
    shareReaction() {
      // 判断用户是否有加入群组中
      if (!this.inGroup) {
        this.$store.commit('toast', { text: '请先加入一个群组', state: 2 })
        return
      }
      // 获取该用户所在群组中的项目列表
      this.axios.post('/main/project', {
        isGroup: this.isGroup
      }).then((data) => {
        this.$store.dispatch('saveProjectList', data)
        // 打开模态框
        this.$store.commit('modal', { slotType: 4 })
        // 绑定确认事件
        this.$store.commit('bindOkEvent', this.confirmShareReaction)
      }).catch((resp) => {
        this.$store.dispatch('toast', { text: resp.msg })
      })
      return true
    },
    confirmShareReaction() {
      const shareProjectId = this.$store.state.shareProjectId
      this.axios.post('/reaction/share', {
        projectId: shareProjectId,
        reactionid: this.reactionIdList
      }).then(() => {
        this.$store.dispatch('toast', { text: '分享成功', state: 0 })
        // 手动关闭模态框
        this.$store.dispatch('modal', { showModal: false })
      }).catch((resp) => {
        this.$store.dispatch('toast', { text: resp.msg })
      })
    },
    selection(reactionIdList) {
      this.reactionIdList = reactionIdList
    }
  },
  mounted() {
    this.init()
  },
  computed: {
    // 位于个人空间时，可以随意重命名；处于群组空间时，只有群主才能重命名
    readOnly() {
      if (this.isGroup) {
        return !this.$store.state.groupInfo.isAdmin
      } else {
        return false
      }
    },
    // 用户当前是否处于群组页面
    isGroup() {
      return this.$store.state.isGroup
    },
    // 用户是否有加入群组中
    inGroup() {
      return this.$store.state.groupInfo.members.length
    }
  }
}
</script>

<style lang="scss">
.main-project {
  position: relative;

  .wrapper {
    position: absolute;
    top: 15px;
    right: 140px;

    img {
      cursor: pointer;
      margin-left: 10px;
      width: 30px;
      height: 30px;
    }
  }
}
</style>
