<template>
  <div class="reaction-module-title" :style="`background-color:${showTitle ? 'rgb(239, 240, 228)' : ''}`">
    <div class="block" v-if="showBlock">将放在这里</div>
    <input :style="`background-color:${showTitle ? 'rgb(239, 240, 228)' : ''}`" :readonly="isGroup" type="text"
      :placeholder='placeholder' v-model="title" @change="validateModuleTitle">
    <img draggable="false" class="drag-module" src="/imgs/单个实验/模块拖拽.svg" @mousedown="draggable = true"
      @mouseup="draggable = false">
    <img draggable="false" class="delete-reaction" src="/imgs/用户主页/删除项目.svg" @click="deleteModule(moduleOrder)"
      v-if="!isGroup">
  </div>
</template>

<script>
export default {
  name: 'ReactionModuleTitle',
  props: {
    placeholder: String,
    moduleOrder: Number,
    showBlock: Boolean,
    showTitle: Boolean
  },
  methods: {
    deleteModule(number) {
      this.$store.commit('deleteReactionData', number)
    },
    validateModuleTitle() {
      if (!/^.{0,60}$/.test(this.title)) {
        this.$store.commit('toast', { text: '模块标题不超过60个字', state: 2, durationTime: 3000 })
      }
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
    isGroup() {
      return this.$store.state.isGroup
    },
    draggable: {
      get() {
        return this.$store.state.draggable
      },
      set(newVal) {
        this.$store.commit('saveDraggable', newVal)
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
  border-radius: 10px;

  &:hover img {
    transition: opacity 1s;
    opacity: 100%;
  }

  .delete-reaction,
  .drag-module {
    opacity: 0;
    cursor: pointer;
    position: absolute;
    width: 25px;
    height: 25px;
    top: 10px;
    padding: 5px;
  }

  .delete-reaction {
    right: 0px;
  }

  .drag-module {
    cursor: grab;
    right: 35px;
  }

  input {
    border-radius: 10px;
    padding: 15px 0 15px 0;
    width: 1130px;
    border: none;
    font-size: 25px;
    line-height: 25px;
    height: 25px;
    font-weight: bold;
  }

  .block {
    background-color: rgb(224, 238, 224);
    height: 100px;
    border-radius: 10px;
    border: 1px dashed rgb(13, 117, 7);
    font-size: 50px;
    text-align: center;
    line-height: 100px;
    margin: 10px 0;
  }
}
</style>
