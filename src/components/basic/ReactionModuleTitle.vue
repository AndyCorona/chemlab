<template>
  <div class="reaction-module-title">
    <div class="block" v-show="showBlock">将放在这里</div>
    <input type="text" :placeholder='placeholder' v-model="title" @focusout="this.$store.commit('saveDraggable', true)"
      @focusin="this.$store.commit('saveDraggable', false)">
    <img class="delete-reaction" src="/imgs/用户主页/删除项目.svg" @click="deleteModule(moduleOrder)">
  </div>
</template>

<script>
export default {
  name: 'ReactionModuleTitle',
  props: {
    placeholder: String,
    moduleOrder: Number,
    showBlock: Boolean
  },
  methods: {
    deleteModule(number) {
      this.$store.commit('deleteReactionData', number)
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
    }
  }
}
</script>
<style lang="scss">
.reaction-module-title {
  position: relative;
  width: 1200px;
  box-sizing: border-box;
  padding-bottom: 10px;
  padding-top: 20px;

  &:hover img {
    transition: opacity 1s;
    opacity: 100%;
  }

  .delete-reaction {
    opacity: 0;
    cursor: pointer;
    position: absolute;
    top: 25px;
    right: 0px;
    width: 20px;
    height: 20px;
  }

  input {
    width: 1150px;
    border: none;
    font-size: 25px;
    line-height: 25px;
    font-weight: bold;
  }

  .block {
    height: 100px;
    border-radius: 10px;
    border: 1px dashed gray;
    font-size: 50px;
    text-align: center;
    line-height: 100px;
    margin-bottom: 10px;
  }
}
</style>
