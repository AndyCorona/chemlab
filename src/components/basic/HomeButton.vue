<template>
  <div class="home-button">
    <div class="wrapper">
      <button :style="`cursor:${this.disabled ? 'not-allowed' : 'pointer'}`" :disabled="disabled" :class="buttonStyle"
        @click="this.$emit('btnClick')">{{ buttonText }}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeButton',
  emits: ['btnClick'],
  props: {
    buttonText: String,
    buttonStyle: String,
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
.home-button {
  .wrapper {
    margin: 0 auto;
    width: 350px;

    button {
      margin-top: 20px;
      width: 300px;
      letter-spacing: 15px;
      padding-left: 15px;
    }
  }
}
</style>
