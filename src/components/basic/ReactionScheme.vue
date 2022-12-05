<template>
  <div class="reaction-scheme">
    <reaction-module-title placeholder="图片" @input="gotTitle" :moduleOrder="moduleOrder"
      :dataOrder="dataOrder"></reaction-module-title>
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
  props: {
    moduleOrder: Number,
    dataOrder: Number
  },
  inject: ['isSubmit'],
  emits: ['success', 'fail'],
  data() {
    return {
      imgPath: !this.$store.state.reactionInfo.data ? '' : this.$store.state.reactionInfo.data[this.dataOrder].content,
      randomNum: Math.random(),
      title: '',
      noImg: true,
      imgFile: null
    }
  },
  methods: {
    gotTitle(value) {
      this.title = value
    },
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
      this.noImg = false
      const reader = new FileReader()

      reader.addEventListener('load', () => {
        this.imgPath = reader.result
      }, false)
      reader.readAsDataURL(file)
      this.imgFile = file
    },
    serialize() {
      let isBlank = true
      // 标题不为空
      if (this.title.trim() !== '') {
        isBlank = false
      }
      // 图片内容不为空
      if (isBlank && this.imgFile !== null && this.imgPath !== null) {
        isBlank = false
      }
      if (isBlank) {
        this.$emit('success', null)
        return
      }
      // 将当前图片上传到服务器中，并返回图片的 url 地址。若上传成功则触发 success 事件，否则触发 fail 事件
      // this.axios.post('')
      const isUploaded = true
      this.imgPath = 'https://img0.baidu.com/it/u=3971440307,1631408802&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=333'
      if (isUploaded) {
        const data = {
          type: 'scheme',
          title: this.title,
          content: this.imgPath
        }
        this.$emit('success', data)
      } else {
        this.$emit('fail')
      }
    },
    changeInputFile() {
      this.$refs.inputRef.click()
    }
  },
  computed: {
    readonlyImgPath() {
      return !this.$store.state.reactionInfo.data ? '' : this.$store.state.reactionInfo.data[this.dataOrder].content
    }
  },
  watch: {
    isSubmit(newVal) {
      if (newVal) {
        this.serialize()
      }
    },
    imgPath: {
      handler(newVal) {
        if (newVal !== '') {
          this.noImg = false
        } else {
          this.noImg = true
        }
      },
      immediate: true
    },
    readonlyImgPath: {
      handler(newVal) {
        this.imgPath = newVal
      }
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
