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
      this.noImg = false
      const file = event.target.files[0]
      const reader = new FileReader()

      reader.addEventListener('load', () => {
        this.imgPath = reader.result
      }, false)

      if (file) {
        reader.readAsDataURL(file)
      }
    },
    changeInputFile () {
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
