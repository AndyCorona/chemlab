<template>
  <div class="error-view">
    <toast-props :show="showModal" :text="randomTitle[count % 3]" :state="count % 3"
      :durationTime="1500" @close="showModal = false"></toast-props>
    <div class="title">{{ title }}</div>
    <div class="subtitle">{{ subtitle }}</div>
    <div class="container">
      <button class="whiteButton " @click.prevent="count++; showModal = true">刷新试试</button>
      <button class="whiteButton" @click.prevent="$router.push('/')">返回首页</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorView',
  data() {
    return {
      title: this.$config.errorTitle,
      subtitle: this.$config.errorSubTitle,
      count: 0,
      showModal: false,
      randomTitle: ['没用的，网线断了', '服务器挂了-_-', '点击 100 次数就可以了']
    }
  }
}
</script>

<style lang="scss">
@import '../assets/scss/config.scss';

.error-view {
  position: relative;
  text-align: center;
  margin: 0 auto;
  width: $min-width;
  height: 1080px;
  font-weight: bold;
  color: #FFFFFF;
  background-color: #638271;

  .title {
    font-size: 500px;
    line-height: 500px;
  }

  .subtitle {
    font-size: 80px;
    line-height: 80px;
    margin-bottom: 200px;
  }

  .container {
    display: flex;
    margin: 0 500px;
    justify-content: space-between;

    button {
      border-radius: 50px;
      width: 300px;
      height: 100px;
      line-height: 100px;
      font-size: 32px;
    }

  }
}
</style>
