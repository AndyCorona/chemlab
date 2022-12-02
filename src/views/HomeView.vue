<template>
  <div class="home-view">
    <toast-props :show="this.$store.state.showToast" :text="this.$store.state.toastText"
      :state="this.$store.state.toastState" :durationTime="this.$store.state.toastDurationTime" @close="closeToast">
    </toast-props>
    <div class="container" :style="`background-image: url(${backgroundImage})`">
      <main>
        <home-header :welcomeText="welcomeText" :productIcon="productIcon"></home-header>
        <router-view></router-view>
        <home-footer></home-footer>
      </main>
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
  methods: {
    closeToast() {
      setTimeout(() => {
        this.$store.dispatch('toast', { showModal: false })
        // 魔数
      }, 300)
    }
  },
  data() {
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
  position: relative;
  width: $min-width;

  .container {
    // 放在页面的内联样式中，可以通过 js 动态替换背景图片
    background-size: cover;
    height: 1080px;
    margin: 0 auto;
    position: relative;

    main {
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
