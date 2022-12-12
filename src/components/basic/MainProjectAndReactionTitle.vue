<template>
  <div class="main-project-and-reaction-title" style="pointer-events:all">
    <div :class="classType">
      <img draggable="false" src="/imgs/用户主页/项目列表.svg">
      <input @focusout="rename" :readonly="readOnly" type="text" @focusin="$store.commit('savePointerEvent', true)"
        autocomplete="off" v-model="name">
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainProjectAndReactionTitle',
  emits: ['focusout'],
  props: {
    classType: String,
    readOnly: {
      default: true,
      type: Boolean
    }
  },
  methods: {
    rename() {
      if (this.name !== this.$store.state.projectInfo.name) {
        this.$emit('focusout', this.name)
      }
      this.$store.commit('savePointerEvent', false)
    }
  },
  computed: {
    name: {
      get() {
        return this.classType === 'project-title' ? '项目列表' : this.$store.state.projectInfo.unSaveProjectName
      },
      set(newVal) {
        this.$store.commit('saveProjectInfo', { unSaveProjectName: newVal })
      }
    }
  }
}
</script>

<style lang="scss">
.main-project-and-reaction-title {
  margin: auto 140px;

  .project-title {
    border-bottom: 1px solid #000000;
    display: flex;
    align-items: center;

    img {
      width: 24px;
      height: 24px;
      margin: 10px;
      vertical-align: middle;
    }

    input {
      border: none;
      font-size: 24px;
      font-weight: bold;
    }
  }

  .reaction-title {
    border-bottom: 1px solid #000000;
    display: flex;
    align-items: center;

    img {
      width: 36px;
      height: 36px;
      margin: 10px;
      vertical-align: middle;
    }

    input {
      border: 0;
      font-size: 36px;
      font-weight: bold;
      width: 1000px;
    }
  }

}
</style>
