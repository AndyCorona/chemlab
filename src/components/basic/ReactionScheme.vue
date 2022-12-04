<template>
  <div class="reaction-scheme">
    <reaction-module-title placeholder="图片" name="scheme"></reaction-module-title>
    <div class="container" v-show="noImg">
      <label :for="`img${randomNum}`">+</label>
      <input ref="inputRef" :id="`img${randomNum}`" type="file" @change="previewImg($event)">
    </div>
    <div class="container" v-show="!noImg">
      <img :src="imgPath" @click="changeInputFile">
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
  data() {
    return {
      imgPath: '',
      randomNum: Math.random(),
      title: '',
      noImg: true
    }
  },
  methods: {
    previewImg(event) {
      const file = event.target.files[0]
      const type = ['bmp', 'jpg', 'png', 'tif', 'gif', 'svg']
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
      this.noImg = false
      const reader = new FileReader()

      reader.addEventListener('load', () => {
        this.imgPath = reader.result
      }, false)

      if (file) {
        reader.readAsDataURL(file)
      }
    },
    changeInputFile() {
      this.$refs.inputRef.click()
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
