<template>
  <div class="home-button">
    <div class="wrapper">
      <button :class="buttonStyle" @click.capture="$emit('BtnClick')">{{ buttonText }}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeButton',
  props: {
    buttonText: String,
    buttonStyle: String
  },
  emits: ['BtnClick'],
  data () {
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

    .pink {
      background-color: #f7e5e5;
      color: #638271;
      border: 2px solid #638271;
    }

    .white {
      background-color: #e2baba;
      color: #FFFFFF;
      border: none;
    }
  }
}
</style>
