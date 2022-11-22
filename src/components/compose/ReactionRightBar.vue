<template>
  <div class="reaction-right-bar">
    <reaction-right-bar-title title="修改历史" img="/imgs/实验内容/修改历史.svg"></reaction-right-bar-title>
    <reaction-right-bar-history></reaction-right-bar-history>
    <reaction-right-bar-title title="记录模块" img="/imgs/实验内容/记录模块.svg"></reaction-right-bar-title>
    <reaction-right-bar-record></reaction-right-bar-record>
  </div>
</template>

<script>
import ReactionRightBarTitle from '../basic/ReactionRightBarTitle.vue'
import ReactionRightBarHistory from '../basic/ReactionRightBarHistory.vue'
import ReactionRightBarRecord from '../basic/ReactionRightBarRecord.vue'
export default {
  name: 'ReactionRightBar',
  components: {
    ReactionRightBarTitle,
    ReactionRightBarHistory,
    ReactionRightBarRecord
  }
}
</script>

<style lang="scss" >
.reaction-right-bar {
  position: sticky;
  top: 61px;
  width: 300px;
  height: 1080px;
}
</style>
