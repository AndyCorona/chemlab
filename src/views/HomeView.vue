<template>
  <div class="home-view">
    <toast-props :show="this.ShowModal" :text="text" :state="state" :DurationTime="DurationTime"
      @close="this.ShowModal = false">
    </toast-props>
    <div class="container" :style="`background-image: url(${backgroundImage})`">
      <main>
        <home-header :welcomeText="welcomeText" :productIcon="productIcon"></home-header>
        <router-view @toast="toast"></router-view>
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
  data() {
    return {
      state: 1,
      text: '发生错误',
      ShowModal: false,
      DurationTime: 1500,
      productIcon: this.$config.productIcon,
      welcomeText: this.$config.welcomeText,
      backgroundImage: this.$config.backgroundImage
    }
  },
  methods: {
    toast(text, state, DurationTime = 1500) {
      this.text = text
      this.state = state
      this.ShowModal = true
      this.DurationTime = DurationTime
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
