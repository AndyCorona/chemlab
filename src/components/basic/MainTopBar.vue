<template>
  <div class="top-bar">
    <div class="left">
      <img draggable="false" :src="topBarLeftImg">
      <a draggable="false" class="word-wrap" :style="`pointer-events: ${item.disabled ? 'none' : 'auto'}`"
        v-for="(item, index) in navPath" :key="index" :href="item.path">{{ item.name }}</a>
    </div>
    <div class="right">
      <button :class="toggleStyle" :style="`filter: ${$store.state.isNight ? 'invert(1)' : ''}`">
        <img draggable="false" class="sun" @click="toDark" src="/imgs/顶部栏/白天.svg">
        <img draggable="false" @click="toLight" class="moon" src="/imgs/顶部栏/夜晚.svg">
      </button>
      <main-drop-list :src="topBarSettingImg"></main-drop-list>
      <img draggable="false" class="logout" @click="logout" :src="topBarLogoutImg">
    </div>
  </div>
</template>

<script>
import MainDropList from './MainDropList.vue'
export default {
  name: 'TopBar',
  components: {
    MainDropList
  },
  props: {
    topBarLeftImg: String,
    topBarSettingImg: String,
    topBarLogoutImg: String,
    navPath: Array
  },
  data() {
    return {
      toggleStyle: this.$store.state.isNight ? 'sunToMoon' : 'showSun'
    }
  },
  methods: {
    logout() {
      this.$store.commit('modal', { text: '是否退出?', title: '退出登录提醒', slotType: 0 })
      this.$store.commit('bindOkEvent', this.confirmLogout)
    },
    confirmLogout() {
      this.axios.get('/main/logout')
        .then(() => {
          this.$router.push('/')
        }).catch((resp) => {
          this.$store.dispatch('toast', { text: resp.msg })
        })
    },
    toDark() {
      this.$store.commit('saveIsNight', true)
      this.$config.backgroundImage = '/imgs/登录页/化学公式.jpg'
      this.toggleStyle = 'sunToMoon'
      document.documentElement.style.filter = 'invert(1)'
    },
    toLight() {
      this.$store.commit('saveIsNight', false)
      this.$config.backgroundImage = '/imgs/登录页/背景图片.png'
      this.toggleStyle = 'moonToSun'
      document.documentElement.style.filter = ''
    }
  }
}
</script>

<style lang="scss">
.top-bar {
  display: flex;
  justify-content: space-between;
  z-index: 10;
  position: sticky;
  top: 0;
  background-color: #FFFFFF;
  border-bottom: 1px solid #D7D7D7;
  height: 61px;

  .left {
    width: 1450px;
    display: flex;
    align-items: center;

    img {
      width: 32px;
      height: 32px;
      margin: 14px 20px;
    }

    a {
      max-width: 33%;
      font-size: 20px;
      color: #000000;
    }

    a:hover {
      color: gray;
    }

    a::before {
      content: '/';
      padding: 0 5px;
      color: #000000;
    }
  }

  .right {
    display: flex;
    align-items: center;

    img {
      cursor: pointer;
      padding: 14px 10px 15px 10px;
    }

    button {
      height: 35px;
      justify-content: space-around;
      width: 60px;
      box-shadow: none;
      border-radius: 20px;
      border: none;
      display: flex;
      align-items: center;
      position: relative;

      img {
        position: absolute;
        left: 5px;
        width: 20px;
        height: 20px;
        padding: 0;
      }
    }

    .showSun {
      .moon {
        opacity: 0;
      }

      .sun {
        z-index: 10;
        opacity: 100%;
      }
    }

    .sunToMoon {
      .moon {
        opacity: 100%;
        left: 35px;
        transition: left .5s;
      }

      .sun {
        opacity: 0;
        left: 35px
      }
    }

    .moonToSun {
      .sun {
        z-index: 10;
        opacity: 100%;
        left: 5px;
        transition: left .5s;
      }

      .moon {
        opacity: 0;
        left: 5px;
      }
    }

    .setting {
      margin-right: 0;
    }

  }
}
</style>
