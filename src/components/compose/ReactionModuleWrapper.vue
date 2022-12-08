<template>
  <div class="reaction-module-wrapper">
    <reaction-scheme @success="(value) => this.$emit('success', value)" @fail="(value) => this.$emit('fail', value)"
      v-if="moduleName === 'scheme'" :moduleOrder="moduleOrder" :showBlock="showBlock"></reaction-scheme>
    <reaction-table @success="(value) => this.$emit('success', value)" @fail="(value) => this.$emit('fail', value)"
      v-if="moduleName === 'table'" :moduleOrder="moduleOrder" :showBlock="showBlock"></reaction-table>
    <reaction-text @success="(value) => this.$emit('success', value)" @fail="(value) => this.$emit('fail', value)"
      v-if="moduleName === 'text'" :moduleOrder="moduleOrder" :showBlock="showBlock"></reaction-text>
    <reaction-data @success="(value) => this.$emit('success', value)" @fail="(value) => this.$emit('fail', value)"
      v-if="moduleName === 'data'" :moduleOrder="moduleOrder" :showBlock="showBlock"></reaction-data>
    <reaction-reference @success="(value) => this.$emit('success', value)" @fail="(value) => this.$emit('fail', value)"
      v-if="moduleName === 'reference'" :moduleOrder="moduleOrder" :showBlock="showBlock"></reaction-reference>
  </div>
</template>
<script>
import ReactionScheme from '../basic/ReactionScheme.vue'
import ReactionTable from '../basic/ReactionTable.vue'
import ReactionText from '../basic/ReactionText.vue'
import ReactionData from '../basic/ReactionData.vue'
import ReactionReference from '../basic/ReactionReference.vue'
export default {
  name: 'ReactionModuleWrapper',
  emits: ['success', 'fail'],
  components: {
    ReactionScheme,
    ReactionTable,
    ReactionText,
    ReactionData,
    ReactionReference
  },
  props: {
    moduleName: String,
    moduleOrder: Number,
    showBlock: Boolean
  }
}
</script>

<style lang="scss">

</style>
