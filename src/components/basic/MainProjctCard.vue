<template>
  <div class="main-project-card">
    <div @click="ToProject(item.id)" class="wrapper" v-for="(item, index) in ProjectList" :key="index">
      <img class="project-img" src="/imgs/用户主页/项目图片3.png">
      <div class="project-text">
        <p class="project-title">{{ item.name }}</p>
        <img v-show="this.$store.state.GroupInfo.isAdmin" @click.stop="DeleteProject(item)" class="delete-project"
          src="/imgs/用户主页/删除项目.svg">
      </div>
    </div>
    <div @click="ToProject" class="wrapper" v-show="ProjectList.length < (this.$store.state.IsGroup ? 50 : 8)">
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
      ProjectList: [],
      ProjectId: null
    }
  },
  methods: {
    init() {
      // 根据当前路径决定访问群组还是个人项目
      const path = this.$route.fullPath
      this.axios.get(`${path}/project`).then((data) => {
        this.ProjectList = data.projectList
        this.$store.dispatch('SaveIsGroup', data.isGroup)
      }).catch((resp) => {
        this.$store.dispatch('toast', { ShowModal: true, text: resp.msg })
      })
    },
    ToProject(id) {
      // 获取一个项目具体内容
      this.axios.post('/project', {
        projectId: id,
        isGroup: this.$store.state.IsGroup
      }).then((data) => {
        console.log(data)
        sessionStorage.setItem('projectId', id)
        sessionStorage.setItem('isGroup', data.isGroup)
        this.$store.dispatch('SaveProjectInfo', data)
        // 成功则进行跳转
        this.$router.push('/main/project')
      }).catch((resp) => {
        this.$store.dispatch('toast', { ShowModal: true, text: resp.msg })
      })
    },
    DeleteProject(item) {
      this.$store.commit('dialog', { ShowModal: true, text: `是否删除${item.name}?该项目下的所有数据都将删除`, title: '删除提醒' })
      this.ProjectId = item.id
      this.$store.commit('BindOkEvent', this.ConfirmDeleteProject)
    },
    ConfirmDeleteProject() {
      this.axios.delete('/project', {
        projectId: `${this.ProjectId}`,
        isGroup: this.$store.state.IsGroup
      }).then(() => {
        this.$store.dispatch('toast', { ShowModal: true, text: '删除成功', state: 0 })
        // 从数组中剔除被删除的项目
        this.ProjectList = this.ProjectList.filter(item => {
          return item.id !== this.ProjectId
        })
      }).catch((resp) => {
        this.$store.dispatch('toast', { ShowModal: true, text: resp.msg })
      })
      this.$store.dispatch('dialog', { ShowModal: false })
    }
  },
  mounted() {
    this.init()
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
