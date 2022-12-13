<template>
  <div class="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    init() {
      const isNight = JSON.parse(sessionStorage.getItem('isNight'))
      this.$store.commit('saveIsNight', isNight)
      if (isNight) {
        document.documentElement.style.filter = 'invert(1)'
      } else {
        document.documentElement.style.filter = ''
      }
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style lang="scss">
@import './assets/scss/reset.scss';
@import './assets/scss/base.scss';
</style>
