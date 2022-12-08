<template>
  <div class="home-slot">
    <slot :name="name"></slot>
  </div>
</template>
<script>
export default {
  name: 'HomeSlot',
  props: {
    name: String
  }
}
</script>

<sytyle lang="scss">

</sytyle>
