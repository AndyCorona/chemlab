<template>
  <div class="reaction-form" @drop="drop($event, this.modules.length)" @dragenter.prevent="" @dragover.prevent="">
    <img src="/imgs/登录页/产品图标.png" ref="img" style="position: absolute; top: -1000px;width: 100px;height:100px">
    <form>
      <reaction-form-title></reaction-form-title>
      <div class="tool" v-if="!isGroup">
        <img src="/imgs/单个实验/保存实验.svg" @click="saveReaction">
        <img src="/imgs/单个实验/保存模板.svg" @click="saveTemplate">
        <img src="/imgs/单个实验/我的模板.svg" @click="selectTemplate">
      </div>
      <reaction-form-date></reaction-form-date>
      <div class="form-container">
        <reaction-module-wrapper :draggable="isDraggable && !isGroup" v-for="(item, index) in modules" :key="index"
          :moduleName="item.type" :moduleOrder="index" @dragover.prevent="" @dragstart="dragStart($event, index)"
          @dragend="dragEnd($event, index)" @dragenter.prevent="dragEnter($event, index)"
          @dragleave="dragLeave($event, index)" @drop.stop="drop($event, index)" :class="{ dragging: isDragging }"
          :showBlock="showBlock[index]"></reaction-module-wrapper>
      </div>
    </form>
  </div>
</template>
<script>
import ReactionFormTitle from '../basic/ReactionFormTitle.vue'
import ReactionFormDate from '../basic/ReactionFormDate.vue'
import ReactionModuleWrapper from './ReactionModuleWrapper.vue'
import md5 from 'js-md5'
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
      reactionName: '',
      data: [],
      date: '',
      tags: []
    }
  },
  mounted() {
    this.init()
    // 用户点击刷新按钮时，检测页面内容是否修改，若修改则触发系统默认的弹窗
    window.onbeforeunload = () => {
      const thisReactionHash = md5(JSON.stringify(this.$store.state.reactionInfo))
      if (thisReactionHash !== this.$store.state.lastReactionHash) {
        return ''
      }
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
      // 设置传输的数据
      event.dataTransfer.setData('text/plain', index)
      // 设置拖动时的图片效果
      event.dataTransfer.setDragImage(this.$refs.img, 50, 50)
      event.dataTransfer.effectAllowed = 'move'
    },
    dragEnd() {
      this.$store.commit('saveIsDragging', false)
    },
    init() {
      if (!sessionStorage.getItem('reactionId')) {
        this.$store.commit('toast', { text: '保存失败，请不要修改反应 id' })
        return
      }
      const reactionId = JSON.parse(sessionStorage.getItem('reactionId'))
      // 获取一个项目具体内容
      this.axios.get('/reaction', {
        reactionId: reactionId,
        isGroup: this.isGroup
      }).then((data) => {
        data.unSaveReactionName = data.name
        this.$store.dispatch('saveReactionInfo', data)
        // 计算本次获取的实验内容的 hash 值
        this.$store.dispatch('saveLastReactionHash', md5(JSON.stringify(this.$store.state.reactionInfo)))
        this.$store.dispatch('saveLeaveFromReaction', false)
      }).catch((resp) => {
        this.$store.dispatch('toast', { text: resp.msg })
      })
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
    saveReaction() {
      // 计算与上一次保存的 hash 值，没有改变则提醒用户不需要保存
      const thisReactionHash = md5(JSON.stringify(this.$store.state.reactionInfo))
      console.log(thisReactionHash)
      if (thisReactionHash === this.$store.state.lastReactionHash) {
        this.$store.commit('modal', { text: '您的数据没有修改，仍然要保存吗?', title: '无需保存提醒', slotType: 0 })
        this.$store.commit('bindOkEvent', this.confirmSaveReaction)
      } else {
        this.confirmSaveReaction()
      }
    },
    confirmSaveReaction() {
      this.serialize().then(() => {
        // 实验标题、实验日期、实验标签，图片模块所有文件上传成功，数据模块所有数据上传成功，不需要保存的模块删除成功后，
        // 调用保存数据接口

      }).catch((resp) => {
        console.log(resp)
      })
      // 序列化，对每个模块获取信息
      // 对所有图片模块进行校验，所有图片必须都上传成功，获取所有图片的后台 url 地址
      // 对所有文件模块进行校验，所有文件必须都上传成功，获取所有文件的后台 url 地址
      // 对所有模块按约定格式序列化
      if (sessionStorage.getItem('reactionId') === null) {
        return
      }
      const reactionId = JSON.parse(sessionStorage.getItem('reactionId'))
      // 用户没有传入名字，默认为未命名
      const reactionName = !this.unSaveName ? '未命名' : this.unSaveName
      this.axios.post('/reaction', {
        id: reactionId,
        name: reactionName,
        // 如果用户没传入日期，默认为当天日期
        date: !this.date ? this.dateFormat('YYYY-mm-dd', new Date()) : this.date,
        tags: this.tags,
        data: this.data,
        isGroup: this.isGroup
      }).then((data) => {
        // 将实验名称更改为保存后的名称
        this.$store.dispatch('saveReactionInfo', { name: reactionName })
        // 保存成功，更新上次实验内容的 hash 值
        this.$store.commit('saveLastReactionHash', md5(JSON.stringify(this.$store.state.reactionInfo)))
        // 后端传回更新后的版本
        if (data.id) {
          // 获取后端传回来的数据，并对数组最后一个版本进行删除，在数组头部添加最新的版本
          const versions = this.$store.state.reactionInfo.versions
          // 删除最后一个版本
          versions.splice(versions.length - 1, 1)
          // 在数组头部添加最新的版本
          versions.shift(data)
        }
        // 保存成功后，将传递给子组件的保存信号重置
        this.$store.commit('toast', { text: '保存成功', state: 0 })
      }).catch((resp) => {
        this.$store.dispatch('toast', { text: resp.msg })
      })
    },
    async serialize() {

    },
    serializeFormTitle() {

    },
    saveTemplate() {
      this.$store.commit('modal', { slotType: 5 })
      this.$store.commit('bindOkEvent', this.confirmSaveTemplate)
    },
    confirmSaveTemplate() {
      this.axios.post('/template', {
        name: '模版1',
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
    selectTemplate() {
      this.$store.commit('modal', { slotType: 6 })
      this.$store.commit('bindOkEvent', this.confirmSelectTemplate)
    },
    confirmSelectTemplate() {
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
        this.$store.commit('saveReactionInfo', { data: newVal })
      }
    },
    unSaveName() {
      return this.$store.state.reactionInfo.unSaveReactionName
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
