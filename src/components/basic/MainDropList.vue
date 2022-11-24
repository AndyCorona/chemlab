<template>
  <div class="main-drop-list">
    <img :src="src" @click="this.drop = 'drop'">
    <div class="child" :id="drop">
      <div @click="this.drop = 'close'">个人中心</div>
      <div @click="this.drop = 'close'">帮助</div>
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
      drop: 'close'
    }
  }
}
</script>

<style lang="scss">
.main-drop-list {
  position: relative;

  #drop {
    top: 62px;
    display: block;

  }

  #close {
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
