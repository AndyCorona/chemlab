<template>
  <div class="reaction-text">
    <reaction-module-title placeholder="文字" :moduleOrder="moduleOrder" :showBlock="showBlock"></reaction-module-title>
    <div class="container">
      <textarea :readonly="isGroup" v-model="text" @mouseenter="this.$store.commit('saveDraggable', false)"
        @mouseleave="this.$store.commit('saveDraggable', true)"></textarea>
    </div>
  </div>
</template>

<script>
import ReactionModuleTitle from '../basic/ReactionModuleTitle.vue'
export default {
  name: 'ReactionText',
  components:
    { ReactionModuleTitle },
  props: {
    moduleOrder: Number,
    showBlock: Boolean
  },
  computed: {
    title: {
      get() {
        return !this.$store.state.reactionInfo.data[this.moduleOrder] ? '' : this.$store.state.reactionInfo.data[this.moduleOrder].title
      },
      set(newVal) {
        this.$store.commit('saveReactionDataTitle', { index: this.moduleOrder, content: newVal })
      }
    },
    text: {
      get() {
        return !this.$store.state.reactionInfo.data[this.moduleOrder] ? '' : this.$store.state.reactionInfo.data[this.moduleOrder].content[0]
      },
      set(newVal) {
        this.$store.commit('saveReactionDataContent', { index: this.moduleOrder, content: [newVal] })
      }
    },
    isGroup() {
      return this.$store.state.isGroup
    }
  }
}
</script>
<style lang="scss">
.reaction-text {
  cursor: grab;
  .container {
    textarea {
      cursor: text;
      box-sizing: border-box;
      font-size: 16px;
      width: 1200px;
      min-height: 150px;
      resize: vertical;
    }
  }
}
</style>
