<template>
  <div class="main-project-card">
    <div @click="ToProject" class="wrapper" v-for="(item, index) in ProjectList" :key="index">
      <img class="project-img" src="/imgs/用户主页/项目图片3.png">
      <div class="project-text">
        <p class="project-title">{{ item.title }}</p>
        <img @click.stop="DeleteProject" class="delete-project" src="/imgs/用户主页/删除项目.svg">
      </div>
    </div>
    <div @click="ToProject" class="wrapper" v-show="ProjectList.length < 8">
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
  data () {
    return {
      ProjectList: [
        { title: '项目1' },
        { title: '项目2' },
        { title: '项目3' },
        { title: '项目4' },
        { title: '项目5' },
        { title: '项目6' },
        { title: '项目7' }
      ]
    }
  },
  methods: {
    ToProject () {
      this.$router.push('/main/project')
    },
    DeleteProject () {
      alert('确认删除项目吗')
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
