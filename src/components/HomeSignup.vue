<template>
  <div class="home-signup">
    <home-input type="text" placeholder="请输入2-20个字符的汉字、英文或数字" label="用户名" name="username"></home-input>
    <home-input type="email" placeholder="请输入你的邮箱" label="邮箱" name="email"></home-input>
    <home-input type="password" placeholder="请输入6-20个字符的英文、数字或特殊字符" label="密码" name="password"></home-input>
    <home-input type="password" placeholder="请再次确认密码" label="二次确认" name="password-confirm"></home-input>
    <home-button @click="Signup($event)" buttonText="注册" buttonStyle="white"></home-button>
    <home-button @click.prevent="ToLogin" buttonText="返回登录" buttonStyle="gray"></home-button>
  </div>
</template>

<script>
import HomeInput from '../components/HomeInput.vue'
import HomeButton from '../components/HomeButton.vue'
export default {
  name: 'HomeSignup',
  components: {
    HomeInput,
    HomeButton
  },
  methods: {
    ToLogin () {
      this.$router.push('/login')
    },
    Signup (event) {
      // TODO 根据校验情况决定是否提交
      // event.preventDefault()
      this.$router.push('/register-success')
    }
  }
}
</script>

<style lang="scss">

</style>
