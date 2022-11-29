<template>
  <div class="main-user">
    <main-title-and-slogon title="我的实验" slogon="每个人都有梦想。但不同的是：有的人只梦，有的人敢想"></main-title-and-slogon>
    <main-project-and-reaction-title ClassType="project-title" ProjectName="项目列表"></main-project-and-reaction-title>
    <main-project-card></main-project-card>
  </div>
</template>

<script>
import MainTitleAndSlogon from '../basic/MainTitleAndSlogon.vue'
import MainProjectAndReactionTitle from '../basic/MainProjectAndReactionTitle.vue'
import MainProjectCard from '../basic/MainProjctCard.vue'
export default {

  name: 'MainUser',
  components: {
    MainTitleAndSlogon,
    MainProjectAndReactionTitle,
    MainProjectCard
  }
}
</script>

<style lang="scss">

</style>
