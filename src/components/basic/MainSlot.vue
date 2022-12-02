<template>
  <div class="main-slot">
    <slot :name="name"></slot>
  </div>
</template>
<script>
export default {
  name: 'MainSlot',
  props: {
    name: String
  }
}
</script>

<sytyle lang="scss">

</sytyle>
