<template>
  <div class="main-drop-list">
    <img :src="src" @mouseenter="show = 'block'">
    <div class="child" id="drop" :style="`display:${show}`">
      <div @click="details">个人中心</div>
      <div @click="help">帮助</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'MainDropList',
  props: {
    src: String
  },
  data() {
    return {
      show: 'none'
    }
  },
  methods: {
    help() {
      this.show = 'none'
      alert('帮助页面，还没做')
    },
    details() {
      this.show = 'none'
      this.$router.push('/main/details')
    }
  }
}
</script>

<style lang="scss">
.main-drop-list {
  position: relative;

  img:hover~#drop {
    display: block;
    border-top: 1px solid #D7D7D7;
    top: 61px;
  }

  #drop:hover {
    display: block;
    border-top: 1px solid #D7D7D7;
    top: 61px;
  }

  #drop {
    display: none;
    top: -100px;
  }

  .child {
    padding: 5px 0;
    cursor: pointer;
    box-sizing: border-box;
    border-radius: 5px;
    width: 120px;
    font-size: 16px;
    position: absolute;
    right: 0;
    background-color: #FFFFFF;

    div {
      padding: 5px 10px;
    }

    div:hover {
      background-color: rgb(236, 235, 235);
    }
  }
}
</style>
