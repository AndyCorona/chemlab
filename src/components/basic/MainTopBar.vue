<template>
  <div class="top-bar">
    <div class="left">
      <img draggable="false" :src="topBarLeftImg">
      <a draggable="false" class="word-wrap" :style="`pointer-events: ${item.disabled ? 'none' : 'auto'}`"
        v-for="(item, index) in navPath" :key="index" :href="item.path">{{ item.name }}</a>
    </div>
    <div class="right">
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
    width: 1500px;
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

    img {
      cursor: pointer;
      padding: 14px 10px 15px 10px;
    }

    .setting {
      margin-right: 0;
    }

  }
}
</style>
