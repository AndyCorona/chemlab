<template>
  <div class="reaction-text">
    <reaction-module-title placeholder="文字" name="text"></reaction-module-title>
    <div class="container">
      <textarea></textarea>
    </div>
  </div>
</template>

<script>
import ReactionModuleTitle from '../basic/ReactionModuleTitle.vue'
export default {
  name: 'ReactionText',
  components:
    { ReactionModuleTitle }
}
</script>
<style lang="scss">
.reaction-text {
  .container {
    textarea {
      font-size: 16px;
      width: 1200px;
      min-height: 150px;
      resize: vertical;
    }
  }
}
</style>
