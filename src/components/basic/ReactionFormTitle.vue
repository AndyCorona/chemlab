<template>
  <div class="reaction-form-title">
    <img draggable="false" src="/imgs/单个实验/实验标题.svg">
    <input type="text" v-model="title" @change="valiDateTitle" :readonly="isGroup">
  </div>
</template>

<script>
export default {
  name: 'ReactionFormTitle',
  methods: {
    valiDateTitle() {
      if (!/^.{0,30}$/.test(this.title)) {
        this.$store.commit('toast', { text: '实验标题不超过30个字', state: 2 })
        return false
      }
      return true
    }
  },
  computed: {
    title: {
      get() {
        return this.$store.state.reactionInfo.unSaveReactionName
      },
      set(newVal) {
        this.$store.commit('saveReactionInfo', { unSaveReactionName: newVal })
      }
    },
    isGroup() {
      return this.$store.state.isGroup
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
