<template>
  <div class="home-input">
    <div class="wrapper">
      <label>{{ label }}</label>
      <input :readonly="readOnly" @change="validate" autocomplete="off" :type="type" :placeholder="placeholder" v-model="value">
    </div>
  </div>
</template>

<script>

export default {
  name: 'HomeInput',
  emits: ['intercept', 'pass'],
  props: {
    type: String,
    placeholder: String,
    label: String,
    validateExpression: RegExp,
    readOnly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      value: ''
    }
  },
  methods: {
    // 外部传入正则表达式，验证成功触发 pass 事件，验证失败触发 intercept 事件
    validate() {
      if (this.validateExpression.test(this.value)) {
        // 校验成功
        this.$emit('pass', this.value)
      } else {
        // 校验失败
        this.$emit('intercept', this.value)
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

    input,
    input:focus {
      font-size: 14px;
      width: 300px;
      height: 40px;
      line-height: 40px;
      padding: 6px 10px;
      box-sizing: border-box;
      background-color: #E0E6E3;
      border-radius: 5px;
      border: none;
    }

    input {
      box-shadow: inset 0 0 4px 1px rgba(0, 0, 0, 0.35);
    }

    input:focus {
      box-shadow: inset 0 0 4px 1px rgba(0, 0, 0, 0.35), 0 0 10px 0 #99C8C9;
    }

    input::placeholder {
      color: #B3B3B3;
    }
  }
}
</style>
