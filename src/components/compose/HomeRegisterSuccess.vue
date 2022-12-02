<template>
  <div class="home-register-success">
    <p>注册成功！</p>
    <p>请前往邮箱激活账号！</p>
    <home-button @click.prevent="toLogin" buttonText="返回登录" buttonStyle="gray"></home-button>
  </div>
</template>

<script>
import HomeButton from '../basic/HomeButton.vue'
export default {
  name: 'HomeRegisterSuccess',
  components: {
    HomeButton
  },
  methods: {
    toLogin () {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss">
.home-register-success {
  p {
    font-size: 18px;
    line-height: 30px;
    font-weight: bold;
    color: #797979;
  }

  p:nth-of-type(1) {
    margin-top: 100px;
  }

  p:nth-of-type(2) {
    margin-bottom: 150px;
  }
}
</style>
