<template>
  <div class="home-header">
    <div class="wrapper">
      <img draggable="false" :src="productIcon">
      <p class="welcome-text">{{ welcomeText }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeHeader',

  props: {
    productIcon: String,
    welcomeText: String
  }
}
</script>

<style lang="scss">
.home-header {
  .wrapper {
    width: 350px;
    padding: 30px 50px 0 50px ;
    margin: 0 auto;
    img {
      margin: 0 auto;
      display: block;
      width: 80px;
      height: 80px;
      margin-bottom:18px;
    }

    .welcome-text {
      margin: 0 auto;
      width: 350px;
      height: 40px;
      line-height: 40px;
      font-size: 34px;
      font-weight: bolder;
      margin-bottom: 20px;
    }
  }

}
</style>
