<template>
  <div class="main-project-and-reaction-title">
    <div :class="classType">
      <img src="/imgs/用户主页/项目列表.svg">
      <input @change="this.$emit('change', name)" :readonly="readOnly" type="text" autocomplete="off" v-model="name">
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainProjectAndReactionTitle',
  emits: ['change'],
  props: {
    classType: String,
    readOnly: {
      default: true,
      type: Boolean
    }
  },
  data() {
    return {
      name: this.classType === 'project-title' ? '项目列表' : this.$store.state.projectInfo.projectName
    }
  },
  computed: {
    titleName() {
      return !this.$store.state.projectInfo.projectName ? '未命名' : this.$store.state.projectInfo.projectName
    }
  },
  watch: {
    titleName: {
      handler(newVal) {
        if (this.name === '项目列表' && (this.$route.fullPath === '/main/group' || this.$router.fullPath === '/main/user')) {
          return
        }
        this.name = newVal
      }
    }
  }
}
</script>

<style lang="scss">
.main-project-and-reaction-title {
  margin: auto 140px;

  .project-title {
    border-bottom: 1px solid #000000;
    display: flex;
    align-items: center;

    img {
      width: 24px;
      height: 24px;
      margin: 10px;
      vertical-align: middle;
    }

    input {
      border: none;
      font-size: 24px;
      font-weight: bold;
    }
  }

  .reaction-title {
    border-bottom: 1px solid #000000;
    display: flex;
    align-items: center;

    img {
      width: 36px;
      height: 36px;
      margin: 10px;
      vertical-align: middle;
    }

    input {
      border: 0;
      font-size: 36px;
      font-weight: bold;
      width: 1000px;
    }
  }

}
</style>
