<template>
  <div class="reaction-form">
    <form>
      <reaction-form-title @success="(value) => { this.reactionName = value }"
        @fail="(this.isSubmitFail = true)"></reaction-form-title>
      <reaction-save-template-modal :show="showSaveTemplateModal" @close="this.showSaveTemplateModal = false">
      </reaction-save-template-modal>
      <reaction-select-template-modal :show="showSelectTemplateModal" @close="this.showSelectTemplateModal = false">
      </reaction-select-template-modal>
      <div class="tool" v-show="!isGroup">
        <img src="/imgs/实验内容/保存实验.svg" @click="saveReaction">
        <img src="/imgs/实验内容/保存模板.svg" @click="this.showSaveTemplateModal = true">
        <img src="/imgs/实验内容/我的模板.svg" @click="this.showSelectTemplateModal = true">
      </div>
      <reaction-form-date @success="(date, tags) => {
        if (date) { this.date = date }
        this.tags = tags
      }"></reaction-form-date>
      <div class="form-container">
        <reaction-module-wrapper @success="(value) => {this.success(value, index)}" @fail="fail"
          v-for="(item, index) in modules" :key="index" :moduleName="item.name" :moduleOrder="index"
          :dataOrder="item.dataIndex"></reaction-module-wrapper>
      </div>
    </form>
  </div>
</template>
<script>
import ReactionFormTitle from '../basic/ReactionFormTitle.vue'
import ReactionFormDate from '../basic/ReactionFormDate.vue'
import ReactionSaveTemplateModal from '../basic/ReactionSaveTemplateModal.vue'
import ReactionSelectTemplateModal from '../basic/ReactionSelectTemplateModal.vue'
import ReactionModuleWrapper from './ReactionModuleWrapper.vue'
import { computed } from '@vue/reactivity'
export default {
  name: 'ReactionForm',
  components: {
    ReactionFormTitle,
    ReactionFormDate,
    ReactionSaveTemplateModal,
    ReactionSelectTemplateModal,
    ReactionModuleWrapper
  },
  data() {
    return {
      showSaveTemplateModal: false,
      showSelectTemplateModal: false,
      modules: [{ name: 'scheme', dataIndex: 0 }, { name: 'text', dataIndex: 1 }, { name: 'table', dataIndex: 2 }, { name: 'data', dataIndex: 3 }, { name: 'reference', dataIndex: 4 }],
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
    init() {
      // 当用户故意删除 sessionStorage 中的数据时，会查询一个不存在的反应列表，最终返回错误
      const reactionId = JSON.parse(sessionStorage.getItem('reactionId') === null ? '-1' : sessionStorage.getItem('reactionId'))
      // reactionId 为 0 代表新增反应的行为，为 > 0 的整数代表查询反应的行为
      if (reactionId === 0) {
        this.$store.commit('saveReactionInfo', {
          reactionId: null,
          reactionName: '未命名',
          date: this.dateFormat('YYYY-mm-dd', new Date()),
          tags: [],
          data: [],
          versions: []
        })
      } else {
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
    }
  },
  computed: {
    isGroup() {
      return this.$store.state.isGroup
    },
    deleteModuleNumber() {
      return this.$store.state.deleteModuleNumber
    }
  },
  watch: {
    deleteModuleNumber(newVal) {
      if (newVal !== -1) {
        this.$store.commit('deleteModuleNumber', -1)
        let retArr = []
        retArr = this.modules.filter((item, index) => {
          return index !== newVal
        })
        this.modules = retArr
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
    }
  }
}
</style>
