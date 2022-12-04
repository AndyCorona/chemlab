<template>
  <div class="main-project-card">
    <div @click="toProject(item.id)" class="wrapper" v-for="(item, index) in projectList" :key="index">
      <img class="project-img" src="/imgs/用户主页/项目图片3.png">
      <div class="project-text">
        <p class="project-title word-wrap">{{ item.name }}</p>
        <img v-show="this.$store.state.groupInfo.isAdmin" @click.stop="deleteProject(item)" class="delete-project"
          src="/imgs/用户主页/删除项目.svg">
      </div>
    </div>
    <div @click="addProject" class="wrapper"
      v-show="((projectList.length < 8 && !inGroup && projectList.length !== 0) || (inGroup && projectList.length < 50 && this.$store.state.groupInfo.isAdmin))">
      <div class="new-project">
        <img src="/imgs/用户主页/添加项目.svg">
        <span>添加项目</span>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'MainProjectCard',
  data() {
    return {
      projectList: [],
      projectId: null,
      inGroup: null
    }
  },
  methods: {
    init() {
      // 根据当前路径决定访问群组还是个人项目
      this.axios.get('/main/project', {
        params: { isGroup: this.isGroup }
      }).then((data) => {
        this.projectList = data
      }).catch((resp) => {
        this.$store.dispatch('toast', { text: resp.msg })
      })
    },
    toProject(id) {
      // 获取一个项目具体内容
      this.axios.get('/project', {
        projectId: id,
        isGroup: this.isGroup
      }).then(() => {
        sessionStorage.setItem('projectId', id)
        // 成功则进行跳转
        this.$router.push(`/main/${this.isGroup ? 'group' : 'user'}/project`)
      }).catch((resp) => {
        this.$store.dispatch('toast', { text: resp.msg })
      })
    },
    addProject() {
      this.axios.put('/project', {
        isGroup: this.isGroup
      }).then((data) => {
        sessionStorage.setItem('projectId', data.projectId)
        // 成功则进行跳转
        this.$router.push(`/main/${this.isGroup ? 'group' : 'user'}/project`)
      }).catch((resp) => {
        this.$store.dispatch('toast', { text: resp.msg })
      })
    },
    deleteProject(item) {
      this.$store.commit('dialog', { text: `是否删除${item.name}?该项目下的所有数据都将删除`, title: '删除提醒' })
      this.projectId = item.id
      this.$store.commit('bindOkEvent', this.confirmDeleteProject)
    },
    confirmDeleteProject() {
      this.axios.delete('/project', {
        projectId: `${this.projectId}`,
        isGroup: this.isGroup
      }).then(() => {
        this.$store.dispatch('toast', { text: '删除成功', state: 0 })
        // 从数组中剔除被删除的项目
        this.projectList = this.projectList.filter(item => {
          return item.id !== this.projectId
        })
      }).catch((resp) => {
        this.$store.dispatch('toast', { text: resp.msg })
      })
      this.$store.dispatch('dialog', { showModal: false })
    }
  },
  mounted() {
    this.init()
  },
  computed: {
    isGroup() {
      return this.$store.state.isGroup
    }
  },
  watch: {
    isGroup: {
      handler(newVal) {
        this.inGroup = newVal
      }
    }
  }
}
</script>

<style lang="scss">
.main-project-card {
  margin: 20px 140px 0 140px;

  .wrapper {
    vertical-align: middle;
    cursor: pointer;
    display: inline-block;
    border: 1px solid #797979;
    border-radius: 10px;
    width: 285px;
    height: 180px;
    margin: 20px 0 20px 40px;

    .project-img {
      display: block;
      border-radius: 10px 10px 0 0;
      width: 285px;
      height: 150px;
      border-bottom: 1px solid #797979;
    }

    .project-text {
      margin: 0 10px;
      line-height: 30px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .project-title {
        font-weight: bold;
        font-size: 16px;
      }

      .delete-project {
        opacity: 0;
      }
    }

    .new-project {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        width: 24px;
        height: 24px;
        margin-right: 10px;
      }

      span {
        font-size: 16px;
        font-weight: bold;
      }
    }
  }

  .wrapper:hover .delete-project {
    opacity: 100%;
    transition: opacity 2s;
  }
}
</style>
