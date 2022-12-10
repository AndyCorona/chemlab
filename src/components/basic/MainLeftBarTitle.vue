<template>
  <div class="main-left-bar-title">
    <div class="wrapper">
      <img src="/imgs/左边栏/群组.svg">
      <span class="word-wrap">{{ title }}</span>
    </div>
  </div>

</template>
<script>
export default {
  name: 'MainLeftBarTitle',
  computed: {
    title() {
      return !this.$store.state.groupInfo.name ? '暂未加入' : this.$store.state.groupInfo.name
    }
  }
}
</script>

<style lang="scss">
.main-left-bar-title {
  background-color: #FFFFFF;
  padding: 20px 30px;
  border-radius: 5px;

  .wrapper {
    background-color: #99C8C9;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    span {
      padding-right: 5px;
      font-size: 18px;
      font-weight: bold;
      color: #000000;
    }

    img {
      width: 24px;
      height: 24px;
      margin: 10px 8px;
    }
  }
}
</style>
