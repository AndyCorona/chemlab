<template>
  <div class="reaction-form">
    <form>
      <reaction-form-title></reaction-form-title>
      <reaction-save-template-modal :show="showSaveTemplateModal" @close="this.showSaveTemplateModal = false">
      </reaction-save-template-modal>
      <reaction-select-template-modal :show="showSelectTemplateModal" @close="this.showSelectTemplateModal = false">
      </reaction-select-template-modal>
      <div class="tool">
        <img src="/imgs/实验内容/保存实验.svg">
        <img src="/imgs/实验内容/保存模板.svg" @click="this.showSaveTemplateModal = true">
        <img src="/imgs/实验内容/我的模板.svg" @click="this.showSelectTemplateModal = true">
      </div>
      <reaction-form-date></reaction-form-date>
      <!-- <test-me :list="modules"></test-me> -->
      <div class="form-container">
        <reaction-scheme></reaction-scheme>
        <reaction-text></reaction-text>
        <reaction-table></reaction-table>
        <reaction-data></reaction-data>
      </div>
    </form>

  </div>
</template>
<script>
import ReactionFormTitle from '../basic/ReactionFormTitle.vue'
import ReactionFormDate from '../basic/ReactionFormDate.vue'
// import TestMe from '../basic/TestMe.vue'
import ReactionScheme from '../basic/ReactionScheme.vue'
import ReactionText from '../basic/ReactionText.vue'
import ReactionTable from '../basic/ReactionTable.vue'
import ReactionData from '../basic/ReactionData.vue'
import ReactionSaveTemplateModal from '../basic/ReactionSaveTemplateModal.vue'
import ReactionSelectTemplateModal from '../basic/ReactionSelectTemplateModal.vue'
export default {
  name: 'ReactionForm',
  components: {
    ReactionFormTitle,
    ReactionFormDate,
    // TestMe,
    ReactionScheme,
    ReactionText,
    ReactionTable,
    ReactionData,
    ReactionSaveTemplateModal,
    ReactionSelectTemplateModal
  },
  data() {
    return {
      showSaveTemplateModal: false,
      showSelectTemplateModal: false,
      modules: [
        'scheme', 'table', 'text', 'data', 'reference'
      ]
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      // 当用户故意删除 sessionStorage 中的数据时，会查询一个不存在的反应列表，最终返回错误
      const reactionId = sessionStorage.getItem('reactionId') === null ? '-1' : sessionStorage.getItem('reactionId')
      // 获取一个项目具体内容
      this.axios.get('/reaction', {
        reactionId: reactionId,
        isGroup: this.$store.state.isGroup
      }).then((data) => {
        this.projectName = data.projectName
        sessionStorage.setItem('projectName', data.projectName)
        this.$store.dispatch('saveProjectInfo', data)
      }).catch((resp) => {
        this.$store.dispatch('toast', { text: resp.msg })
      })
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
