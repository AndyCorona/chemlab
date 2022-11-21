<template>
  <div class="home-view">
    <div class="container" :style="`background-image: url(${backgroundImage})`">
      <form>
        <home-header :welcomeText="welcomeText" :productIcon="productIcon"></home-header>
        <router-view></router-view>
        <home-footer></home-footer>
      </form>
    </div>
  </div>
</template>

<script>
import HomeHeader from '../components/basic/HomeHeader.vue'
import HomeFooter from '../components/basic/HomeFooter.vue'
export default {
  name: 'HomeView',
  components: {
    HomeHeader,
    HomeFooter
  },
  data () {
    return {
      productIcon: this.$config.productIcon,
      welcomeText: this.$config.welcomeText,
      backgroundImage: this.$config.backgroundImage
    }
  }
}
</script>

<style lang="scss">
@import '../assets/scss/config.scss';

.home-view {
  .container {
    // 放在页面的内联样式中，这样可以通过 js 动态替换背景图片
    // background: url('/imgs/登录页-背景图片.png') no-repeat center;
    background-size: cover;
    height: 1080px;
    width: $min-width;
    margin: 0 auto;
    position: relative;

    form {
      border-radius: 20px;
      left: 50%;
      top: 150px;
      translate: -50% 0;
      position: absolute;
      text-align: center;
      margin: 0 auto;
      background: #FFFFFF;
      width: 450px;
      border: 2px solid #638271;
    }
  }
}
</style>
