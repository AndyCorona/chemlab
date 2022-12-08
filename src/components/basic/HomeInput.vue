<template>
  <div class="home-input">
    <div class="wrapper">
      <label>{{ label }}</label>
      <input class="input" :readonly="readOnly" autocomplete="off" :type="type" :placeholder="placeholder"
        v-model="value">
    </div>
  </div>
</template>

<script>

export default {
  name: 'HomeInput',
  props: {
    type: String,
    placeholder: String,
    label: String,
    readOnly: {
      type: Boolean,
      default: false
    },
    // 表明当前 input 保存什么数据，[0, 1, 2, 3, 4] 分别代表了保存用户名、邮箱、密码、确认密码和验证码
    state: Number
  },
  computed: {
    value: {
      get() {
        return this.$store.state.loginInfo[this.state]
      },
      set(newVal) {
        this.$store.commit('saveLoginInfo', { index: this.state, content: newVal })
      }
    }
  }
}
</script>

<style lang="scss">
.home-input {
  .wrapper {
    margin: 0 auto;
    width: 350px;

    label {
      text-align: left;
      margin-top: 10px;
      margin-bottom: 20px;
      display: block;
      font-size: 16px;
      font-weight: bold;
      color: #3B3737;
      box-sizing: border-box;
      padding: 0 260px 4px 25px;
      border-bottom: 1px solid #AAAAAA;
    }
  }
}
</style>
