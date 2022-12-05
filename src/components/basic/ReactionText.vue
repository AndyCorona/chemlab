<template>
  <div class="reaction-text">
    <reaction-module-title placeholder="文字" @input="gotTitle" :moduleOrder="moduleOrder"
      :dataOrder="dataOrder"></reaction-module-title>
    <div class="container">
      <textarea v-model="text"></textarea>
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
    dataOrder: Number
  },
  inject: ['isSubmit'],
  emits: ['success', 'fail'],
  data() {
    return {
      title: '',
      text: !this.$store.state.reactionInfo.data ? '' : this.$store.state.reactionInfo.data[this.dataOrder].content
    }
  },
  methods: {
    gotTitle(value) {
      this.title = value
    },
    // 当文本模块有内容时进行序列化
    serialize() {
      let isBlank = true
      // 标题不为空
      if (this.title.trim() !== '') {
        isBlank = false
      }
      // 文本内容不为空
      if (isBlank && this.text.trim() !== '') {
        isBlank = false
      }
      // 如果是空白表格
      if (isBlank) {
        this.$emit('success', null)
        return
      }
      const data = {
        type: 'text',
        title: this.title,
        content: this.text
      }
      this.$emit('success', data)
    }
  },
  computed: {
    readonlyText() {
      return !this.$store.state.reactionInfo.data ? '' : this.$store.state.reactionInfo.data[this.dataOrder].content
    }
  },
  watch: {
    readonlyText(newVal) {
      this.text = newVal
    },
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
