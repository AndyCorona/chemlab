<template>
  <div class="reaction-form-title">
    <img src="/imgs/实验内容/实验标题.svg">
    <input type="text" v-model="title" @change="valiDateTitle">
  </div>
</template>

<script>
export default {
  name: 'ReactionFormTitle',
  inject: ['isSubmit'],
  emits: ['success', 'fail'],
  methods: {
    valiDateTitle() {
      if (!/^.{0,30}$/.test(this.title)) {
        this.$store.commit('toast', { text: '实验标题不超过30个字', state: 2, durationTime: 3000 })
      }
    },
    serialize() {
      if (!/^.{0,30}$/.test(this.title)) {
        this.$store.commit('toast', { text: '实验标题不超过30个字', state: 2, durationTime: 3000 })
        this.$emit('fail')
      } else {
        this.$emit('success', this.title.trim() === '' ? '未命名' : this.title)
      }
    }
  },
  computed: {
    title: {
      get() {
        return this.$store.state.reactionInfo.reactionName
      },
      set(newVal) {
        this.$store.commit('saveReactionName', newVal)
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
.reaction-form-title {
  display: flex;
  margin: 0 40px;
  border-bottom: 1px solid #000000;

  img {
    width: 32px;
    height: 32px;
    margin: 15px;
  }

  input {
    border: none;
    font-weight: bold;
    font-size: 36px;
    width: 1050px;
  }
}
</style>
