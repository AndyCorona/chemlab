<template>
  <div class="home-button">
    <div class="wrapper">
      <button :style="`cursor:${this.disabled ? 'not-allowed' : 'pointer'}`" :disabled="disabled" :class="buttonStyle"
        @click="this.$emit('BtnClick')">{{ buttonText }}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeButton',
  emits: ['BtnClick'],
  props: {
    buttonText: String,
    buttonStyle: String,
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
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
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      text-align: center;
      margin-top: 20px;
      width: 300px;
      height: 40px;
      font-size: 20px;
      font-weight: bold;
      line-height: 20px;
      border-radius: 5px;
      letter-spacing: 15px;
      padding-left: 15px;
      cursor: pointer;
    }

    .green {
      background-color: #638271;
      color: #FFFFFF;
      border: none;
    }

    .white {
      background-color: #FFFFFF;
      color: #638271;
      border: 2px solid #638271;
    }

    .gray {
      background-color: #D7D7D7;
      color: #FFFFFF;
      border: none;
    }
  }
}
</style>
