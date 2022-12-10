<template>
  <div class="reaction-right-bar">
    <reaction-right-bar-title title="修改历史" img="/imgs/单个实验/修改历史.svg"></reaction-right-bar-title>
    <reaction-right-bar-history></reaction-right-bar-history>
    <reaction-right-bar-title title="记录模块" img="/imgs/单个实验/记录模块.svg" v-if="!isGroup"></reaction-right-bar-title>
    <reaction-right-bar-record v-if="!isGroup"></reaction-right-bar-record>
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
  },
  computed: {
    isGroup() {
      return this.$store.state.isGroup
    }
  }
}
</script>

<style lang="scss" >
.reaction-right-bar {
  position: sticky;
  top: 62px;
  width: 300px;
  height: 1019px;
}
</style>
