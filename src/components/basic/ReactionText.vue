<template>
  <div class="reaction-text">
    <reaction-module-title placeholder="文字" :moduleOrder="moduleOrder" :showBlock="showBlock"
      :showTitle="showTitle"></reaction-module-title>
    <div class="container">
      <textarea :readonly="isGroup" v-model="text" @change="validateText" @input="autoResize"></textarea>
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
    showBlock: Boolean,
    showTitle: Boolean
  },
  methods: {
    validateText() {
      if (!/^.{0,10000}$/.test(this.text)) {
        this.$store.commit('toast', { text: '不超过 10000 个字', state: 2, durationTime: 3000 })
      }
    },
    autoResize(event) {
      if (event.target.scrollHeight < 150) {
        return
      }
      event.target.style.height = '150px'
      // textarea 框自动适应高度，当前高度 + 50 px
      event.target.style.height = event.target.scrollHeight + 50 + 'px'
    }
  },
  computed: {
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
