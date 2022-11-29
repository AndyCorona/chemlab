<template>
  <div class="main-view">
    <toast-props :show="this.ShowModal" :text="text" :state="state" :DurationTime="DurationTime"
      @close="this.ShowModal = false"></toast-props>
    <common-inform-modal @ok="confirmLogout" @no="this.ShowCommonModal = false" :show="this.ShowCommonModal"
      :ShowText="ShowText" :ShowTitle="ShowTitle"></common-inform-modal>
    <div class="left-container">
      <main-left-bar></main-left-bar>
    </div>
    <div class="right-container">
      <main-top-bar @logout="logout" :TopBarLeftImg="TopBarLeftImg" :TopBarSettingImg="TopBarSettingImg"
        :TopBarLogoutImg="TopBarLogoutImg" :NavPath="NavPath"></main-top-bar>
      <main-background-and-profile :background="background" :logo="logo"></main-background-and-profile>
      <router-view @toast="toast"></router-view>
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
      isGroup: this.$store.state.isGroup,
      ShowText: '是否删除',
      ShowTitle: '删除提醒',
      ShowCommonModal: false,
      state: 1,
      text: '发生错误',
      ShowModal: false,
      DurationTime: 1500,
      TopBarSettingImg: this.$config.TopBarSettingImg,
      TopBarLogoutImg: this.$config.TopBarLogoutImg,
      ProjectName: ''
    }
  },
  methods: {
    init() {
      this.axios.get('/main/info').then((data) => {
        // 异步操作使用 dispatch
        this.$store.dispatch('saveUserInfo', data)
      }).catch((resp) => {
        this.toast(true, resp.msg, 1)
      })
    },
    toast(ShowModal = true, text = '', state = 1, DurationTime = 1500) {
      this.ShowModal = ShowModal
      this.text = text
      this.state = state
      this.DurationTime = DurationTime
    },
    logout() {
      this.ShowCommonModal = true
      this.ShowText = '是否退出?'
      this.ShowTitle = '退出提醒'
    },
    confirmLogout() {
      this.axios.get('/main/logout')
        .then(() => {
          this.toast(true, '退出成功', 0)
          this.$router.push('/')
        }).catch((resp) => {
          this.toast(true, resp.msg)
          this.ShowCommonModal = false
        })
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
      const path = this.$route.fullPath
      if (path === '/main/user') {
        return '/imgs/用户主页/头像.svg'
      } else if (path === '/main/group') {
        return '/imgs/群组主页/群组头像.svg'
      } else {
        return '/imgs/用户主页/头像.svg'
      }
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
      const path = this.$route.fullPath
      if (path === '/main/user') {
        return [{ name: '我的实验', path: '/#/main/user', disabled: true }]
      } else if (path === '/main/group') {
        return [{ name: '我的课题组', path: '/#/main/group', disabled: true }]
      } else if (path === '/main/project' && !this.isGroup) {
        return [{ name: '我的实验', path: '/#/main/user', disabled: false }, { name: '项目', path: '/#/main/project', disabled: true }]
      } else if (path === '/main/project' && this.isGroup) {
        return [{ name: '我的课题组', path: '/#/main/group', disabled: false }, { name: '项目', path: '/#/main/project', disabled: true }]
      } else {
        return [{}]
      }
    }
  },
  mounted() {
    // 首次登录时，跳转到个人中心
    if (this.$store.state.userInfo.firstLogin) {
      this.$router.push('/main/details')
    } else {
      this.init()
    }
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
    width: 300px;
  }

  .right-container {
    width: 1600px;
  }
}
</style>
