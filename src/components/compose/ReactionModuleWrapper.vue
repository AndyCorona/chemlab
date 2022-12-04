<template>
  <div class="reaction-module-wrapper">
    <reaction-scheme v-if="moduleName === 'scheme'" :moduleOrder="moduleOrder"></reaction-scheme>
    <reaction-table v-if="moduleName === 'table'" :moduleOrder="moduleOrder"></reaction-table>
    <reaction-text v-if="moduleName === 'text'" :moduleOrder="moduleOrder"></reaction-text>
    <reaction-data v-if="moduleName === 'data'" :moduleOrder="moduleOrder"></reaction-data>
  </div>
</template>
<script>
import ReactionScheme from '../basic/ReactionScheme.vue'
import ReactionTable from '../basic/ReactionTable.vue'
import ReactionText from '../basic/ReactionText.vue'
import ReactionData from '../basic/ReactionData.vue'
export default {
  name: 'ReactionModuleWrapper',
  components: {
    ReactionScheme,
    ReactionTable,
    ReactionText,
    ReactionData
  },
  props: {
    moduleName: String,
    moduleOrder: Number
  }
}
</script>

<style lang="scss">

</style>
