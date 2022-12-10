<template>
  <div class="main-user">
    <main-title-and-slogon :title="isGroup ? name : '我的实验'"
      :slogon="isGroup ? slogon : '每个人都有梦想。但不同的是：有的人只梦，有的人敢想'"></main-title-and-slogon>
    <main-project-and-reaction-title classType="project-title"></main-project-and-reaction-title>
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
  },
  computed: {
    name() {
      return !this.$store.state.groupInfo.name ? '暂未加入' : this.$store.state.groupInfo.name
    },
    isGroup() {
      return this.$store.state.isGroup
    },
    slogon() {
      return !this.$store.state.groupInfo.slogon ? '可以选择加入一个群组哦' : this.$store.state.groupInfo.slogon
    }
  }
}
</script>

<style lang="scss">

</style>
