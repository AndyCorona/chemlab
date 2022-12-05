<template>
  <div class="reaction-module-title">
    <input type="text" :placeholder='placeholder' v-model="title" @input="$emit('input', title)">
    <img class="delete-reaction" src="/imgs/用户主页/删除项目.svg" @click="deleteModule(moduleOrder)">
  </div>
</template>

<script>
export default {
  name: 'ReactionModuleTitle',
  emits: ['input'],
  props: {
    placeholder: String,
    moduleOrder: Number,
    dataOrder: Number
  },
  methods: {
    deleteModule(number) {
      this.$store.commit('deleteModuleNumber', number)
    }
  },
  data() {
    return {
      title: !this.$store.state.reactionInfo.data ? '' : this.$store.state.reactionInfo.data[this.dataOrder].title
    }
  },
  computed: {
    readonlyTitle() {
      return !this.$store.state.reactionInfo.data ? '' : this.$store.state.reactionInfo.data[this.dataOrder].title
    }
  },
  watch: {
    readonlyTitle: {
      handler(newVal) {
        this.title = newVal
        this.$emit('input', this.title)
      },
      immediate: true
    }
  }
}
</script>
<style lang="scss">
.reaction-module-title {
  position: relative;
  width: 1200px;
  box-sizing: border-box;
  padding-top: 20px;

  &:hover img {
    transition: opacity 1s;
    opacity: 100%;
  }

  .delete-reaction {
    opacity: 0;
    cursor: pointer;
    position: absolute;
    top: 20px;
    right: 0px;
    width: 20px;
    height: 20px;
  }

  input {
    width: 1150px;
    border: none;
    font-size: 20px;
    line-height: 20px;
    font-weight: bold;
    margin-bottom: 10px;
  }
}
</style>
