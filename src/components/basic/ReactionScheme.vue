<template>
  <div class="reaction-scheme">
    <reaction-module-title placeholder="图片" :moduleOrder="moduleOrder" :showBlock="showBlock"></reaction-module-title>
    <div class="container" v-show="!imgPath">
      <label :for="`img${randomNum}`">+</label>
      <input ref="inputRef" :id="`img${randomNum}`" type="file" @change="previewImg($event)">
    </div>
    <div class="container" v-show="imgPath">
      <img :src="imgPath" @click="this.$refs.inputRef.click()">
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
    showBlock: Boolean
  },
  inject: ['isSubmit'],
  emits: ['success', 'fail'],
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
    serialize() {
      const file = this.$store.state.reactionInfo.data[this.moduleOrder].content[0]
      let isBlank = true
      // 标题不为空
      if (this.title.trim() !== '') {
        isBlank = false
      }
      // 用户重新上传的图片
      if (isBlank && file) {
        isBlank = false
      }
      // 用户没有重新上传图片，但是原来图片路径还在
      if (isBlank && this.imgPath) {
        isBlank = false
      }
      // 标题为空、用户没有重新上传图片、原来的图片路径不存在 => 该模块不需要保存
      if (isBlank) {
        this.$emit('success', null)
        return
      }
      // 如果没有更新图片，不用上传，否则将当前图片上传到服务器中，并返回图片的 url 地址。若上传成功则触发 success 事件，否则触发 fail 事件
      // this.axios.post('')
      const isUploaded = true
      // 用户重新上传文件后替换之前的图片路径
      if (file) {
        this.imgPath = 'https://img0.baidu.com/it/u=3971440307,1631408802&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=333'
      }
      if (isUploaded) {
        const data = {
          type: 'scheme',
          title: this.title,
          content: ['', this.imgPath]
        }
        this.$emit('success', data)
      } else {
        this.$emit('fail')
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
    imgPath: {
      get() {
        return !this.$store.state.reactionInfo.data[this.moduleOrder] ? '' : this.$store.state.reactionInfo.data[this.moduleOrder].content[1]
      },
      set(newVal) {
        this.$store.commit('saveReactionDataContent', { index: this.moduleOrder, content: ['', newVal] })
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
