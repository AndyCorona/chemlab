<template>
  <div class="reaction-scheme">
    <reaction-module-title placeholder="图片" :moduleOrder="moduleOrder" :showBlock="showBlock"
      :showTitle="showTitle"></reaction-module-title>
    <div class="container" v-show="!imgPath">
      <label :for="`img${randomNum}`">+</label>
      <input ref="inputRef" :id="`img${randomNum}`" type="file" @change="previewImg($event)">
    </div>
    <div class="container" v-if="imgPath" @click="changeImg($event)">
      <img draggable="false" :src="imgPath" :style="`filter: ${$store.state.isNight ? 'invert(1)' : ''}`">
    </div>
  </div>
</template>

<script>
import ReactionModuleTitle from '../basic/ReactionModuleTitle.vue'
export default {
  name: 'ReactionScheme',
  components: {
    ReactionModuleTitle
  },
  props: {
    moduleOrder: Number,
    showBlock: Boolean,
    showTitle: Boolean
  },
  data() {
    return {
      randomNum: Math.random()
    }
  },
  methods: {
    previewImg(event) {
      const file = event.target.files[0]
      if (!file) {
        return
      }
      const type = ['bmp', 'jpg', 'jpeg', 'png', 'tif', 'gif', 'svg']
      let isValidImg = false
      for (let i = 0; i < type.length; i++) {
        if (file.type.includes(type[i])) {
          isValidImg = true
          break
        }
      }
      if (!isValidImg) {
        this.$store.commit('toast', { text: '请选择正确的图片类型', state: 2 })
        return
      }
      if (file.size >= 1024 * 3 * 1024) {
        this.$store.commit('toast', { text: '上传图片大小不超过 3 M', state: 2 })
        return
      }
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        this.$store.dispatch('saveReactionDataContent', { index: this.moduleOrder, content: [file, reader.result] })
      }, false)
      reader.readAsDataURL(file)
    },
    changeImg() {
      if (!this.isGroup) {
        this.$refs.inputRef.click()
      }
    }
  },
  computed: {
    imgPath: {
      get() {
        return !this.$store.state.reactionInfo.data[this.moduleOrder] ? '' : this.$store.state.reactionInfo.data[this.moduleOrder].content[1]
      },
      set(newVal) {
        this.$store.commit('saveReactionDataContent', { index: this.moduleOrder, content: ['', newVal] })
      }
    },
    isGroup() {
      return this.$store.state.isGroup
    }
  }
}
</script>

<style lang="scss">
.reaction-scheme {

  .container {
    cursor: pointer;
    width: 1200px;

    img {
      max-width: 100%;
    }

    input {
      display: none;
    }

    label {
      text-align: center;
      border: 1px dashed #555555;
      border-radius: 5px;
      line-height: 100px;
      cursor: pointer;
      display: inline-block;
      width: 1200px;
      height: 100px;
      font-size: 16px;
    }
  }
}
</style>
