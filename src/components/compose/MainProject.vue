<template>
  <div class="main-project">
    <main-project-and-reaction-title classType="reaction-title" :readOnly="readOnly" @change="rename">
    </main-project-and-reaction-title>
    <div class="wrapper">
      <img @click="addReaction" src="/imgs/反应/添加.svg" v-show="(!isGroup && !isProjectLimitation)">
      <img @click="share" src="/imgs/反应/分享.svg" v-show="!isGroup">
      <img @click="deleteReaction" src="/imgs/反应/删除.svg"
        v-show="!isGroup || (isGroup && this.$store.state.groupInfo.isAdmin)">
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
      projectName: '',
      isProjectLimitation: null
    }
  },
  methods: {
    rename(value) {
      if (!/^.{0,30}$/.test(value)) {
        this.$store.commit('toast', { text: '修改失败，请输入有效的项目名' })
        return
      }
      this.axios.post('/project', {
        // 当用户故意删除 sessionStorage 中的数据时，会修改一个不存在的项目，最终返回错误
        projectId: sessionStorage.getItem('projectId') === null ? '-1' : sessionStorage.getItem('projectId'),
        projectName: value,
        isGroup: this.isGroup
      }).then(() => {
        sessionStorage.setItem('projectName', value)
        this.$store.dispatch('toast', { text: '修改成功', state: 0 })
      }).catch((resp) => {
        this.$store.dispatch('toast', { text: resp.msg })
      })
    },
    init() {
      // 当用户故意删除 sessionStorage 中的数据时，会查询一个不存在的项目列表，最终返回错误
      const projectId = sessionStorage.getItem('projectId') === null ? '-1' : sessionStorage.getItem('projectId')
      // 获取一个项目具体内容
      this.axios.get('/project', {
        projectId: projectId,
        isGroup: this.isGroup
      }).then((data) => {
        this.projectName = data.projectName
        sessionStorage.setItem('projectName', data.projectName)
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
      this.$store.commit('dialog', { text: `确认删除${length > 1 ? '这些' : '该'}反应吗?`, title: '删除提醒' })
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
    share() {

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
    isGroup() {
      return this.$store.state.isGroup
    },
    reactions() {
      return this.$store.state.projectInfo.reactions
    }
  },
  watch: {
    reactions(newVal) {
      this.isProjectLimitation = newVal.length >= 50
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
