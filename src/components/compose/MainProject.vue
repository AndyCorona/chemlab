<template>
  <div class="main-project">
    <main-project-and-reaction-title classType="reaction-title" :readOnly="readOnly" @focusout="rename">
    </main-project-and-reaction-title>
    <div class="wrapper">
      <img draggable="false" @click="addReaction" src="/imgs/实验列表/添加.svg" v-if="(!isGroup && reactions.length < 50)">
      <img draggable="false" @click="shareReaction" src="/imgs/实验列表/分享.svg" v-if="!isGroup">
      <img draggable="false" @click="deleteReaction" src="/imgs/实验列表/删除.svg" v-if="!isGroup || (isGroup && isAdmin)">
    </div>
  </div>
  <main-reaction :show="!isGroup || (isGroup && isAdmin)" @change="selection"></main-reaction>
</template>

<script>
import MainProjectAndReactionTitle from '../basic/MainProjectAndReactionTitle.vue'
import MainReaction from '../basic/MainReaction.vue'
export default {
  name: 'MainProject',
  data() {
    return {
      selectedReactions: []
    }
  },
  components: {
    MainProjectAndReactionTitle,
    MainReaction
  },
  methods: {
    rename(value) {
      if (!/^.{0,30}$/.test(value)) {
        this.$store.commit('toast', { text: '修改失败，请输入有效的项目名' })
        return
      }
      if (value === '') {
        value = '未命名'
      }
      this.axios.post('/project', {
        projectId: sessionStorage.getItem('projectId'),
        projectName: value,
        isGroup: this.isGroup
      }).then(() => {
        sessionStorage.setItem('projectName', value)
        this.$store.dispatch('saveProjectInfo', { name: value })
        this.$store.dispatch('toast', { text: '修改成功', state: 0 })
      }).catch((resp) => {
        this.$store.dispatch('toast', { text: resp.msg })
      })
    },
    init() {
      // 获取一个项目具体内容
      this.axios.get('/project', {
        params: {
          projectId: sessionStorage.getItem('projectId'),
          isGroup: this.isGroup
        }
      }).then((data) => {
        sessionStorage.setItem('projectName', data.name)
        data.unSaveProjectName = data.name
        this.$store.dispatch('saveProjectInfo', data)
      }).catch((resp) => {
        this.$store.dispatch('toast', { text: resp.msg })
      })
    },
    // 删除反应
    deleteReaction() {
      const length = this.selectedReactions.length
      if (length === 0) {
        this.$store.commit('toast', { text: '请勾选要删除的实验', state: 2 })
        return
      }
      this.$store.commit('modal', { text: `确认删除${length > 1 ? '这些' : '该'}实验吗?`, title: '删除实验提醒', slotType: 0 })
      this.$store.commit('bindOkEvent', this.confirmDeleteReaction)
    },
    confirmDeleteReaction() {
      this.axios.delete('/reaction', {
        reactionId: this.selectedReactions,
        isGroup: this.isGroup
      }).then((data) => {
        this.$store.dispatch('saveProjectInfo', { reactions: data })
        this.$store.dispatch('toast', { text: '删除成功', state: 0 })
      }).catch((resp) => {
        this.$store.dispatch('toast', { text: resp.msg })
      })
    },
    addReaction() {
      this.axios.put('/reaction', {
        isGroup: this.isGroup
      }).then((data) => {
        sessionStorage.setItem('reactionId', data.id)
        this.$store.dispatch('toast', { text: '创建成功', state: 0 })
        this.$router.push(`/main/${this.isGroup ? 'group' : 'user'}/project/reaction`)
      }).catch((resp) => {
        this.$store.dispatch('toast', { text: resp.msg })
      })
    },
    shareReaction() {
      // 判断用户是否有加入群组中
      if (!this.inGroup) {
        this.$store.commit('toast', { text: '请先加入一个群组', state: 2 })
        return
      }
      if (!this.selectedReactions.length) {
        this.$store.commit('toast', { text: '请勾选要分享的实验', state: 2 })
        return
      }
      // 获取该用户所在群组中的项目列表
      this.axios.post('/main/project', {
        isGroup: this.isGroup
      }).then((data) => {
        this.$store.dispatch('saveProjectList', data)
        this.$store.dispatch('clearShareProjectInfo')
        this.$store.dispatch('modal', { slotType: 4 })
        this.$store.dispatch('bindOkEvent', this.confirmShareReaction)
      }).catch((resp) => {
        this.$store.dispatch('toast', { text: resp.msg })
      })
    },
    confirmShareReaction() {
      if (!this.$store.state.shareProjectInfo.dropdownTitle) {
        this.$store.commit('toast', { text: '请选择要分享的群组', state: 2 })
        return
      }
      const shareProjectId = this.$store.state.shareProjectId
      this.axios.post('/reaction/share', {
        projectId: shareProjectId,
        reactionId: this.selectedReactions
      }).then(() => {
        // 手动关闭模态框
        this.$store.dispatch('modal', { showModal: false })
        this.$store.dispatch('toast', { text: '分享成功', state: 0 })
      }).catch((resp) => {
        this.$store.dispatch('toast', { text: resp.msg })
      })
    },
    selection(selectedReactions) {
      this.selectedReactions = selectedReactions
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
    },
    isAdmin() {
      return this.$store.state.groupInfo.isAdmin
    },
    reactions() {
      return this.$store.state.projectInfo.reactions
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
