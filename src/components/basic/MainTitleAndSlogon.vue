
<template>
  <div class="main-title-and-slogon">
    <p class="title">{{ title }}</p>
    <p class="slogon">{{ slogon }}</p>
  </div>
</template>

<script>
export default {
  name: 'MainTitleAndSlogon',
  props: {
    title: String,
    slogon: String
  }
}
</script>
<style lang="scss">
.main-title-and-slogon {
  margin: auto 140px;

  .title {
    font-size: 36px;
    line-height: 36px;
    font-weight: bold;
    margin-bottom: 11px;
  }

  .slogon {
    font-size: 16px;
    margin-bottom: 36px;
  }
}
</style>
