<template>
  <div class="top-bar">
    <div class="left">
      <img :src="TopBarLeftImg">
      <a v-for="(item, index) in NavPath" :key="index" :href="item.path">{{ item.name }}</a>
    </div>
    <div class="right">
      <img class="setting" :src="TopBarSettingImg">
      <img class="logout" @click="logout" :src="TopBarLogoutImg">
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopBar',
  props: {
    TopBarLeftImg: String,
    TopBarSettingImg: String,
    TopBarLogoutImg: String,
    NavPath: Array
  },
  methods: {
    logout () {
      alert('确认退出吗')
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
  height: 61px;

  .left {
    display: flex;
    align-items: center;

    img {
      width: 32px;
      height: 32px;
      margin: 14px 20px;
    }

    a {
      font-size: 20px;
      color: #000000;
    }

    a:hover {
      color: gray;
    }

    a:after {
      content: '/';
      padding: 0 5px;
      color: #000000;
    }
  }

  .right {
    img {
      cursor: pointer;
      margin: 14px 10px;
    }

    .setting {
      margin-right: 0;
    }

  }
}
</style>
