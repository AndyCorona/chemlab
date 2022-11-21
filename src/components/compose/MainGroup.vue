<template>
  <div class="main-group">
    <main-title-and-slogon title="Ye Lab" slogon="欢迎"></main-title-and-slogon>
    <main-project-and-reaction-title ClassType="project-title" ProjectName="项目列表"></main-project-and-reaction-title>
    <main-project-card></main-project-card>
  </div>
</template>

<script>
import MainTitleAndSlogon from '../basic/MainTitleAndSlogon.vue'
import MainProjectAndReactionTitle from '../basic/MainProjectAndReactionTitle.vue'
import MainProjectCard from '../basic/MainProjctCard.vue'
export default {

  name: 'MainGroup',
  components: {
    MainTitleAndSlogon,
    MainProjectAndReactionTitle,
    MainProjectCard
  }
}
</script>

<style lang="scss">

</style>
