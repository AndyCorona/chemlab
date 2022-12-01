<template>
  <div class="main-left-bar-button">
    <div class="wrapper">
      <img :src="img">
      <span>{{ text }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainLeftBarButton',
  props: {
    img: String,
    text: String
  }
}
</script>

<style lang="scss">
.main-left-bar-button {
  background-color: #DE8D4C;
  cursor: pointer;
  border-bottom: 1px solid #FFFFFF;
  z-index: 10;

  .wrapper {

    display: flex;
    align-items: center;
    justify-content: flex-start;

    span {
      font-size: 20px;
      font-weight: bold;
      color: #FFFFFF;
    }

    img {
      width: 32px;
      height: 32px;
      margin: 14px 20px;
    }
  }
}

.main-left-bar-button:hover {
  span {
    color: #638271;
  }
}
</style>
