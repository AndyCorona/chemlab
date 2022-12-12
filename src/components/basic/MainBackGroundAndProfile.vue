<template>
  <div class="main-background-and-profile">
    <img draggable="false" class="background" :src="background"
      :style="`filter: ${$store.state.isNight ? 'invert(1)contrast(0.5)' : ''}`">
    <img draggable="false" class="logo" :src="logo"
      :style="`filter: ${$store.state.isNight ? 'invert(1)contrast(0.5)' : ''}`">
  </div>
</template>

<script>
export default {
  name: 'MainBackgroundAndProfile',
  props: {
    background: String,
    logo: String
  }
}

</script>

<style lang="scss">
.main-background-and-profile {
  height: 280px;
  position: relative;
  margin-bottom: 76px;

  .background {
    width: 100%;
    height: 100%;
  }

  .logo {
    width: 80px;
    height: 80px;
    position: absolute;
    top: 100%;
    left: 140px;
    transform: translateY(-40px);
    box-shadow: 0 4px 4px 0 #000000;
  }
}
</style>
