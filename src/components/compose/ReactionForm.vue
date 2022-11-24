<template>
  <div class="reaction-form">

    <form>
      <reaction-form-title></reaction-form-title>
      <reaction-save-template-modal :show="ShowSaveTemplateModal" @close="this.ShowSaveTemplateModal = false">
      </reaction-save-template-modal>
      <reaction-select-template-modal :show="ShowSelectTemplateModal" @close="this.ShowSelectTemplateModal = false">
      </reaction-select-template-modal>
      <div class="tool">
        <img src="/imgs/实验内容/保存实验.svg">
        <img src="/imgs/实验内容/保存模板.svg" @click="this.ShowSaveTemplateModal = true">
        <img src="/imgs/实验内容/我的模板.svg" @click="this.ShowSelectTemplateModal = true">
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
      ShowSaveTemplateModal: false,
      ShowSelectTemplateModal: false,
      modules: [
        'scheme', 'table', 'text', 'data', 'reference'
      ]
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
