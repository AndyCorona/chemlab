<template>
  <div class="main-view">
    <main-left-side-bar></main-left-side-bar>
    <div class="container">
      <main-top-bar :TopBarLeftImg="TopBarLeftImg" :TopBarSettingImg="TopBarSettingImg"
        :TopBarLogoutImg="TopBarLogoutImg" :NavPath="NavPath"></main-top-bar>
      <main-background-and-profile :background="background" :logo="logo"></main-background-and-profile>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import MainLeftSideBar from '../components/MainLeftSideBar.vue'
import MainTopBar from '../components/basic/MainTopBar.vue'
import MainBackgroundAndProfile from '../components/basic/MainBackGroundAndProfile.vue'
export default {
  name: 'MainView',
  components: {
    MainLeftSideBar,
    MainTopBar,
    MainBackgroundAndProfile
  },
  data () {
    return {
      TopBarLeftImg: this.$config.TopBarLeftImg,
      TopBarSettingImg: this.$config.TopBarSettingImg,
      TopBarLogoutImg: this.$config.TopBarLogoutImg,
      NavPath: [{ name: '我的实验', path: '/#/main/user' }, { name: '项目', path: '/#/main/project' }]
    }
  },
  computed: {
    background () {
      const path = this.$route.fullPath
      if (path === '/main/user') {
        return '/imgs/用户主页/用户背景.png'
      } else if (path === '/main/group') {
        return '/imgs/群组主页/背景图片.png'
      } else {
        return '/imgs/用户主页/用户背景.png'
      }
    },
    logo () {
      const path = this.$route.fullPath
      if (path === '/main/user') {
        return '/imgs/用户主页/头像.svg'
      } else if (path === '/main/group') {
        return '/imgs/群组主页/群组头像.svg'
      } else {
        return '/imgs/用户主页/头像.svg'
      }
    }
  }
}
</script>

<style lang="scss">
@import '../assets/scss/config.scss';

.main-view {
  width: $min-width;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;

  .container {
    height: 1080px;
    width: 1620px;
  }
}
</style>
