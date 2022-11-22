<template>
  <div class="reaction-form">
    <form>
      <reaction-form-title></reaction-form-title>
      <div class="tool">
        <img src="/imgs/实验内容/保存实验.svg">
        <img src="/imgs/实验内容/保存模板.svg">
        <img src="/imgs/实验内容/我的模板.svg">
      </div>
      <reaction-form-date></reaction-form-date>
    </form>
  </div>
</template>
<script>
import ReactionFormTitle from '../basic/ReactionFormTitle.vue'
import ReactionFormDate from '../basic/ReactionFormDate.vue'
export default {
  name: 'ReactionFrom',
  components: {
    ReactionFormTitle,
    ReactionFormDate
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
  }
}
</style>
