<template>
  <div class="home-signup">
    <home-input @pass="GotUsername" @intercept="this.$store.commit('toast', { ShowModal: true, text: '用户名不合法' })"
      :ValidateExpression="/^[A-Za-z0-9\u4e00-\u9fa5]{2,20}$/" type="text" placeholder="请输入2-20个字符的汉字、英文或数字" label="用户名"
      name="username"></home-input>
    <home-input @pass="GotEmail" @intercept="this.$store.commit('toast', { ShowModal: true, text: '邮箱不合法' })"
      :ValidateExpression="/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/" type="email" placeholder="请输入你的邮箱"
      label="邮箱" name="email"></home-input>
    <home-input @pass="GotPassword" @intercept="this.$store.commit('toast', { ShowModal: true, text: '密码不合法' })"
      :ValidateExpression="/^[A-Za-z0-9\u4e00-\u9fa5@#$%^&*]{6,20}$/" type="password"
      placeholder="请输入6-20个字符的英文、数字或特殊字符" label="密码" name="password"></home-input>
    <home-input @pass="GotConfirmPassword" @intercept="this.$store.commit('toast', { ShowModal: true, text: '密码不合法' })"
      :ValidateExpression="/^[A-Za-z0-9\u4e00-\u9fa5@#$%^&*]{6,20}$/" type="password" placeholder="请再次确认密码" label="二次确认"
      name="password-confirm"></home-input>
    <home-button @BtnClick="Signup" buttonText="注册" buttonStyle="white"></home-button>
    <home-button @BtnClick="this.$router.push('/login')" buttonText="返回登录" buttonStyle="gray"></home-button>
  </div>
</template>

<script>
import HomeInput from '../basic/HomeInput.vue'
import HomeButton from '../basic/HomeButton.vue'
export default {
  name: 'HomeSignup',
  components: {
    HomeInput,
    HomeButton
  },
  data() {
    return {
      username: '',
      email: '',
      password: '',
      ConfirmPassword: ''
    }
  },
  methods: {
    // 用户名符合正则
    GotUsername(value) {
      this.username = value
    },
    GotEmail(value) {
      // 邮箱符合正则
      this.email = value
    },
    GotPassword(value) {
      // 密码符合正则
      this.password = value
    },
    GotConfirmPassword(value) {
      // 两次密码保持一致
      if (this.password !== value) {
        this.$store.commit('toast', { ShowModal: true, text: '两次输入密码不一致' })
      } else {
        this.ConfirmPassword = value
      }
    },
    Signup() {
      // 用户名、邮箱和密码都符合正则
      if (this.username !== '' && this.email !== '' && this.password !== '' && this.ConfirmPassword !== '' && this.password === this.ConfirmPassword) {
        this.axios.post('/home/register', {
          username: this.username,
          email: this.email,
          password: this.password
        }).then(() => {
          this.$router.push('/register-success')
        }).catch((resp) => {
          this.$store.dispatch('toast', { ShowModal: true, text: resp.msg })
        })
      } else if (this.username === '') {
        this.$store.commit('toast', { ShowModal: true, text: '用户名不合法' })
      } else if (this.email === '') {
        this.$store.commit('toast', { ShowModal: true, text: '邮箱不合法' })
      } else if (this.password === '' || this.ConfirmPassword === '') {
        this.$store.commit('toast', { ShowModal: true, text: '密码不合法' })
      } else if (this.password !== this.ConfirmPassword) {
        this.$store.commit('toast', { ShowModal: true, text: '两次输入密码不一致' })
      } else {
        this.$store.commit('toast', { ShowModal: true, text: '位置错误，有 BUG !!!' })
      }
    }
  }
}
</script>

<style lang="scss">

</style>
