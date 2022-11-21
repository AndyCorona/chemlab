<template>
  <div class="main-project">
    <main-project-and-reaction-title ClassType="reaction-title" ProjectName="项目一" :ReadOnly="false" Value="项目一"></main-project-and-reaction-title>
    <div class="wrapper">
      <img @click="func" src="/imgs/反应/添加.svg">
      <img @click="func" src="/imgs/反应/分享.svg">
      <img @click="func" src="/imgs/反应/删除.svg">
    </div>
  </div>
  <main-reaction></main-reaction>
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
  methods: {
    func () {
      alert('成功')
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
