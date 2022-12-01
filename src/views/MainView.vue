<template>
  <div class="main-view">
    <toast-props :show="this.$store.state.ShowToast" :text="this.$store.state.ToastText"
      :state="this.$store.state.ToastState" :DurationTime="this.$store.state.ToastDurationTime" @close="CloseToast">
    </toast-props>
    <common-inform-modal @ok="this.$store.commit('DialogStateChange', true)"
      @no="this.$store.commit('DialogStateChange', false)" :show="this.$store.state.ShowDialog"
      :ShowText="this.$store.state.DialogText" :ShowTitle="this.$store.state.DialogTitle">
    </common-inform-modal>
    <div class="left-container">
      <main-left-bar></main-left-bar>
    </div>
    <div class="right-container">
      <main-top-bar :TopBarLeftImg="TopBarLeftImg" :TopBarSettingImg="TopBarSettingImg"
        :TopBarLogoutImg="TopBarLogoutImg" :NavPath="NavPath"></main-top-bar>
      <main-background-and-profile :background="background" :logo="logo"></main-background-and-profile>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import MainLeftBar from '../components/compose/MainLeftBar.vue'
import MainTopBar from '../components/basic/MainTopBar.vue'
import MainBackgroundAndProfile from '../components/basic/MainBackGroundAndProfile.vue'
export default {
  name: 'MainView',
  components: {
    MainLeftBar,
    MainTopBar,
    MainBackgroundAndProfile
  },
  data() {
    return {
      TopBarSettingImg: this.$config.TopBarSettingImg,
      TopBarLogoutImg: this.$config.TopBarLogoutImg
    }
  },
  methods: {
    CloseToast() {
      setTimeout(() => {
        this.$store.dispatch('toast', { ShowModal: false })
        // 魔数
      }, 300)
    }
  },
  computed: {
    background() {
      const path = this.$route.fullPath
      if (path === '/main/user') {
        return '/imgs/用户主页/用户背景.png'
      } else if (path === '/main/group') {
        return '/imgs/群组主页/背景图片.png'
      } else {
        return '/imgs/用户主页/用户背景.png'
      }
    },
    logo() {
      return this.$store.state.IsGroup ? '/imgs/群组主页/群组头像.svg' : '/imgs/用户主页/头像.svg'
    },
    TopBarLeftImg() {
      const path = this.$route.fullPath
      if (path === '/main/user') {
        return '/imgs/顶部栏/烧瓶.svg'
      } else if (path === '/main/group') {
        return '/imgs/顶部栏/群组.svg'
      } else if (path === '/main/details') {
        return '/imgs/顶部栏/个人中心.svg'
      } else {
        return '/imgs/顶部栏/烧瓶.svg'
      }
    },
    NavPath() {
      return []
    }
  },
  mounted() {
    window.addEventListener('scroll', () => {
      const scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
      this.$store.dispatch('SaveScrollTop', scrollTop)
    })
    window.addEventListener('resize', () => {
      const height = document.body.clientHeight
      this.$store.dispatch('SaveHeight', height)
    })
  },
  updated() {
    const height = document.body.clientHeight
    this.$store.dispatch('SaveHeight', height)
  }
}
</script>

<style lang="scss">
@import '../assets/scss/config.scss';

.main-view {
  width: $min-width;
  margin: 0 auto;
  position: relative;
  display: flex;
  justify-content: space-around;

  .left-container {
    z-index: 20;
    width: 300px;
  }

  .right-container {
    width: 1600px;
  }
}
</style>
