<template>
  <div class="main-view">
    <toast-props :show="this.$store.state.showToast" :text="this.$store.state.toastText"
      :state="this.$store.state.toastState" :durationTime="this.$store.state.toastDurationTime" @close="closeToast">
    </toast-props>
    <common-inform-modal @ok="this.$store.commit('dialogStateChange', true)"
      @no="this.$store.commit('dialogStateChange', false)" :show="this.$store.state.showDialog"
      :showText="this.$store.state.dialogText" :showTitle="this.$store.state.dialogTitle">
    </common-inform-modal>
    <div class="left-container">
      <main-left-bar></main-left-bar>
    </div>
    <div class="right-container">
      <main-top-bar :topBarLeftImg="topBarLeftImg" :topBarSettingImg="topBarSettingImg"
        :topBarLogoutImg="topBarLogoutImg" :navPath="navPath"></main-top-bar>
      <main-slot
        :name="this.$route.fullPath === `/main/${this.isGroup ? 'group' : 'user'}/project/reaction` ? 'reaction' : 'main'">
        <template v-slot:main>
          <main-background-and-profile :background="background" :logo="logo"></main-background-and-profile>
          <router-view></router-view>
        </template>
        <template v-slot:reaction>
          <div class="reaction-wrapper">
            <reaction-form></reaction-form>
            <reaction-right-bar></reaction-right-bar>
          </div>
        </template>
      </main-slot>
    </div>
  </div>
</template>

<script>
import MainLeftBar from '../components/compose/MainLeftBar.vue'
import MainTopBar from '../components/basic/MainTopBar.vue'
import MainBackgroundAndProfile from '../components/basic/MainBackGroundAndProfile.vue'
import ReactionForm from '../components/compose/ReactionForm.vue'
import ReactionRightBar from '../components/compose/ReactionRightBar.vue'
import MainSlot from '../components/basic/MainSlot.vue'
export default {
  name: 'MainView',
  components: {
    MainLeftBar,
    MainTopBar,
    ReactionForm,
    ReactionRightBar,
    MainBackgroundAndProfile,
    MainSlot
  },
  data() {
    return {
      topBarSettingImg: this.$config.topBarSettingImg,
      topBarLogoutImg: this.$config.topBarLogoutImg
    }
  },
  methods: {
    closeToast() {
      setTimeout(() => {
        this.$store.dispatch('toast', { showModal: false })
        // 魔数
      }, 300)
    },
    checkIsGroup() {
      const path = this.$route.fullPath
      if (path.startsWith('/main/group')) {
        this.$store.commit('saveIsGroup', true)
      } else {
        this.$store.commit('saveIsGroup', false)
      }
    }
  },
  computed: {
    background() {
      return this.isGroup ? '/imgs/群组主页/背景图片.png' : '/imgs/用户主页/用户背景.png'
    },
    logo() {
      return this.isGroup ? '/imgs/群组主页/群组头像.svg' : '/imgs/用户主页/头像.svg'
    },
    topBarLeftImg() {
      if (this.$route.fullPath === '/main/details') {
        return '/imgs/顶部栏/个人中心.svg'
      } else {
        if (this.isGroup) {
          return '/imgs/顶部栏/群组.svg'
        } else {
          return '/imgs/顶部栏/烧瓶.svg'
        }
      }
    },
    navPath() {
      const path = this.$route.fullPath
      if (path === '/main/details') {
        return [{ name: '个人中心', path: '/#/main/details', disabled: true }]
      } else if (path === '/main/user') {
        return [{ name: '我的实验', path: '/#/main/user', disabled: true }]
      } else if (path === '/main/group') {
        return [{ name: `${this.groupName}`, path: '/#/main/group', disabled: true }]
      } else if (path === '/main/group/project') {
        return [{ name: `${this.groupName}`, path: '/#/main/group', disabled: false }, { name: `${this.projectName}`, path: '/#/main/group/project', disabled: true }]
      } else if (path === '/main/user/project') {
        return [{ name: '我的实验', path: '/#/main/user', disabled: false }, { name: `${this.projectName}`, path: '/#/main/user/project', disabled: true }]
      } else {
        let projectName = sessionStorage.getItem('projectName')
        if (projectName === null) {
          projectName = '嗯哼？想干嘛?'
        }
        if (path === '/main/group/project/reaction') {
          return [{ name: `${this.groupName}`, path: '/#/main/group', disabled: false }, { name: `${projectName}`, path: '/#/main/group/project', disabled: false }, { name: `${this.reactionName}`, path: '/#/main/group/project/reaction', disabled: true }]
        } else if (path === '/main/user/project/reaction') {
          return [{ name: '我的实验', path: '/#/main/user', disabled: false }, { name: `${projectName}`, path: '/#/main/user/project', disabled: false }, { name: `${this.reactionName}`, path: '/#/main/user/project/reaction', disabled: true }]
        } else {
          return [{ name: '不可能，肯定有 BUG !!!' }]
        }
      }
    },
    projectName() {
      return this.$store.state.projectInfo.projectName
    },
    groupName() {
      return this.$store.state.groupInfo.groupName === undefined ? '暂未加入' : this.$store.state.groupInfo.groupName
    },
    isGroup() {
      return this.$store.state.isGroup
    },
    reactionName() {
      return '还没拿到数据呢'
    }
  },
  mounted() {
    window.addEventListener('scroll', () => {
      const scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
      this.$store.dispatch('saveScrollTop', scrollTop)
    })
    window.addEventListener('resize', () => {
      const height = document.body.clientHeight
      this.$store.dispatch('saveHeight', height)
    })
    this.checkIsGroup()
  },
  updated() {
    const height = document.body.clientHeight
    this.$store.dispatch('saveHeight', height)
    this.checkIsGroup()
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
    z-index: 200;
    position: relative;
    width: 300px;
  }

  .right-container {
    border-left: 1px solid #D7D7D7;
    z-index: 100;
    position: relative;
    width: 1620px;

    .reaction-wrapper {
      display: flex;
    }
  }
}
</style>
