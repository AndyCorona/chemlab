<template>
  <div class="reaction-text">
    <reaction-module-title placeholder="文字" :moduleOrder="moduleOrder" :showBlock="showBlock"></reaction-module-title>
    <div class="container">
      <textarea v-model="text" @focusout="this.$store.commit('saveDraggable', true)"
        @focusin="this.$store.commit('saveDraggable', false)"></textarea>
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
  inject: ['isSubmit'],
  emits: ['success', 'fail'],
  methods: {
    // 当文本模块有内容时进行序列化
    serialize() {
      let isBlank = true
      // 标题不为空
      if (this.title.trim() !== '') {
        isBlank = false
      }
      // 文本内容不为空
      if (isBlank && this.text && this.text.trim()) {
        isBlank = false
      }
      // 标题为空、文本内容为空 => 该模块不需要保存
      if (isBlank) {
        this.$emit('success', null)
        return
      }
      const data = {
        type: 'text',
        title: this.title,
        content: [this.text]
      }
      this.$emit('success', data)
    }
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
    }
  },
  watch: {
    isSubmit(newVal) {
      if (newVal) {
        this.serialize()
      }
    }
  }
}
</script>
<style lang="scss">
.reaction-text {
  .container {
    textarea {
      font-size: 16px;
      width: 1200px;
      min-height: 150px;
      resize: vertical;
    }
  }
}
</style>
