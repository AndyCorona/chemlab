<template>
  <div class="reaction-form" @drop="drop($event, this.modules.length)" @dragenter.prevent="" @dragover.prevent="">
    <form>
      <reaction-form-title @success="(value) => { this.reactionName = value }"
        @fail="(this.isSubmitFail = true)"></reaction-form-title>
      <div class="tool" v-show="!isGroup">
        <img src="/imgs/实验内容/保存实验.svg" @click="saveReaction">
        <img src="/imgs/实验内容/保存模板.svg" @click="saveTemplate">
        <img src="/imgs/实验内容/我的模板.svg" @click="selectTemplate">
      </div>
      <reaction-form-date @success="(date, tags) => {
        if (date) { this.date = date }
        this.tags = tags
      }"></reaction-form-date>
      <div class="form-container">
        <reaction-module-wrapper :draggable="isDraggable" @success="(value) => { this.success(value, index) }"
          @fail="fail" v-for="(item, index) in modules" :key="index" :moduleName="item.type" :moduleOrder="index"
          @dragover.prevent="" @dragstart="dragStart($event, index)" @dragend="dragEnd($event, index)"
          @dragenter.prevent="dragEnter($event, index)" @dragleave="dragLeave($event, index)"
          @drop.stop="drop($event, index)" :class="{ dragging: isDragging }"
          :showBlock="showBlock[index]"></reaction-module-wrapper>
      </div>
    </form>
  </div>
</template>
<script>
import ReactionFormTitle from '../basic/ReactionFormTitle.vue'
import ReactionFormDate from '../basic/ReactionFormDate.vue'
import ReactionModuleWrapper from './ReactionModuleWrapper.vue'
import { computed } from '@vue/reactivity'
export default {
  name: 'ReactionForm',
  components: {
    ReactionFormTitle,
    ReactionFormDate,
    ReactionModuleWrapper
  },
  data() {
    return {
      showBlock: [],
      submit: false,
      isSubmitFail: false,
      reactionName: '未命名',
      data: [],
      date: this.dateFormat('YYYY-mm-dd', new Date()),
      tags: []
    }
  },
  mounted() {
    this.init()
    window.onbeforeunload = function () {
      return ''
    }
  },
  methods: {
    dragEnter(event, index) {
      this.showBlock[index] = true
    },
    dragLeave(event, index) {
      this.showBlock[index] = false
    },
    drop(event, index) {
      // 每个实验模块数量不超过 15 个
      if (this.modules.length >= 15) {
        this.$store.commit('toast', { text: '每个实验最多只能放置 15 个模块', state: 2, durationTime: 3000 })
        this.showBlock = []
        return
      }
      // 放置成功后所有装饰块都应该取消显示
      this.showBlock = []
      // 根据指定模块添加对应的模块数据
      const data = event.dataTransfer.getData('text/plain')
      // 如果是从右边栏目拖拽的
      if (data === 'scheme' || data === 'text') {
        this.modules.splice(index, 0, { type: data, title: '', content: [] })
      } else if (data === 'table') {
        this.modules.splice(index, 0, { type: data, title: '', content: [['1120'], ['默认'], []] })
      } else if (data === 'data' || data === 'reference') {
        this.modules.splice(index, 0, { type: data, title: '', content: [[], []] })
        // 如果是从已经有的模块进行拖拽的
      } else {
        // 获取被拖拽模块的之前位置
        const module = this.modules.splice(parseInt(data), 1)
        // 放置在实验内容的最后一个模块之后
        this.modules.splice(index, 0, module[0])
      }
    },
    dragStart(event, index) {
      // 启动拖拽事件，让表单元素禁止
      this.$store.commit('saveIsDragging', true)
      const img = document.createElement('img')
      img.src = '/imgs/登录页/产品图标.png'
      // 设置传输的数据
      event.dataTransfer.setData('text/plain', index)
      // 设置拖动时的图片效果
      event.dataTransfer.setDragImage(img, 200, 200)
    },
    dragEnd() {
      this.dragCursor = 'pointer'
      this.$store.commit('saveIsDragging', false)
    },
    init() {
      // 当用户故意删除 sessionStorage 中的数据时，会查询一个不存在的反应列表，最终返回错误
      const reactionId = JSON.parse(sessionStorage.getItem('reactionId') === null ? '-1' : sessionStorage.getItem('reactionId'))
      // reactionId 为 0 代表新增反应的行为，为 > 0 的整数代表查询反应的行为
      if (reactionId > 0) {
        // 获取一个项目具体内容
        this.axios.get('/reaction', {
          reactionId: reactionId,
          isGroup: this.isGroup
        }).then((data) => {
          this.$store.dispatch('saveReactionInfo', data)
        }).catch((resp) => {
          this.$store.dispatch('toast', { text: resp.msg })
        })
      }
      // 获取用户的所有自定义模版
      this.axios.get('/template').then((data) => {
        this.$store.dispatch('saveTemplateDefine', data)
      }).catch((resp) => {
        this.$store.dispatch('toast', { text: resp.msg })
      })
    },
    dateFormat(fmt, date) {
      let ret
      const opt = {
        // 年
        'Y+': date.getFullYear().toString(),
        // 月
        'm+': (date.getMonth() + 1).toString(),
        // 日
        'd+': date.getDate().toString(),
        // 时
        'H+': date.getHours().toString(),
        // 分
        'M+': date.getMinutes().toString(),
        // 秒
        'S+': date.getSeconds().toString()
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
      }
      for (const k in opt) {
        ret = new RegExp('(' + k + ')').exec(fmt)
        if (ret) {
          fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')))
        }
      }
      return fmt
    },
    success(value, index) {
      this.data[index] = value
    },
    fail() {
      this.isSubmitFail = true
    },
    saveReaction() {
      this.submit = true
      // 序列化，对每个模块获取信息
      // 对所有图片模块进行校验，所有图片必须都上传成功，获取所有图片的后台 url 地址
      // 对所有文件模块进行校验，所有文件必须都上传成功，获取所有文件的后台 url 地址
      // 对所有模块按约定格式序列化
      if (this.isSubmitFail) {
        this.$store.commit('toast', { text: '保存失败，请重试', durationTime: 3000 })
      } else {
        // 调用保存实验内容接口，保存序列化数据
        const reactionId = JSON.parse(sessionStorage.getItem('reactionId') === null ? '-1' : sessionStorage.getItem('reactionId'))
        if (reactionId === 0) {
          return true
        } else {
          return true
        }
      }
    },
    saveTemplate () {
      this.$store.commit('modal', { slotType: 5 })
      this.$store.commit('bindOkEvent', this.confirmSaveTemplate)
    },
    confirmSaveTemplate() {
      this.axios.post('/template', {
        templateName: '模版1',
        data: ['scheme', 'table', 'text']
      }).then((data) => {
        this.$store.dispatch('toast', { text: '保存成功', state: 0 })
        // 将数据保存到 vuex 中
        this.$store.dispatch('saveTemplateDefine', data)
        // 手动关闭模态框
        this.$store.dispatch('modal', { showModal: false })
      }).catch((resp) => {
        this.$store.dispatch('toast', { text: resp.msg })
      })
    },
    selectTemplate () {
      this.$store.commit('modal', { slotType: 6 })
      this.$store.commit('bindOkEvent', this.confirmSelectTemplate)
    },
    confirmSelectTemplate () {
      this.axios.get('/template', {
        template: ''
      }).then((data) => {
      }).catch((resp) => {
        this.$store.dispatch('toast', { text: resp.msg })
      })
    }
  },
  computed: {
    isGroup() {
      return this.$store.state.isGroup
    },
    isDragging() {
      return this.$store.state.isDragging
    },
    isDraggable() {
      return this.$store.state.draggable
    },
    modules: {
      get() {
        return this.$store.state.reactionInfo.data
      },
      set(newVal) {
        this.$store.commit('saveReactionData', newVal)
      }
    }
  },
  provide() {
    return {
      // 响应式数据，给所有模块发送序列化信号
      isSubmit: computed(() => this.submit)
    }
  }
}
</script>

<style lang="scss">
.reaction-form {
  vertical-align: middle;
  display: inline-block;
  width: 1320px;
  min-height: 1080px;
  border-left: 1px solid #D7D7D7;
  border-right: 1px solid #D7D7D7;
  // 为了方便用户将模块放置在实验的最下方
  padding-bottom: 200px;

  form {
    position: relative;

    .tool {
      position: absolute;
      top: 25px;
      right: 50px;

      img {
        cursor: pointer;
        margin-right: 10px;
        width: 24px;
        height: 24px;
      }
    }

    .form-container {
      margin: 0 60px 20px 60px;
      width: 1200px;

      // 防止在拖拽过程中，模块内部数据对拖拽的影星啊
      .dragging *:not(.picture, .rText, .rTable, .rData, .rReference) {
        pointer-events: none;
      }
    }
  }
}
</style>
