<template>
  <div class="home-forgot-password">
    <home-input type="text" placeholder="请输入你的邮箱" label="邮箱" name="email"></home-input>
    <home-input type="code" placeholder="点击按钮获取验证码" label="验证码" name="code"></home-input>
    <home-button @click="GetCode($event)" :style="'margin-top:20px'" buttonText="获取验证码" buttonStyle="pink"></home-button>
    <home-button @click.prevent="Next" buttonText="下一步" buttonStyle="green"></home-button>
    <home-button @click.prevent="ToLogin" buttonText="返回登录" buttonStyle="white"></home-button>
  </div>
</template>

<script>
import HomeInput from '../components/HomeInput.vue'
import HomeButton from '../components/HomeButton.vue'
export default {
  name: 'HomeForgotPassword',
  components: {
    HomeInput,
    HomeButton
  },
  methods: {
    Next () {
      this.$router.push('/update-password')
    },
    ToLogin () {
      this.$router.push('/login')
    },
    GetCode (event) {
      // TODO 根据校验情况决定是否提交
      event.preventDefault()
    }
  }
}
</script>

<style lang="scss">
</style>
