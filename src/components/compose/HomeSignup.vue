<template>
  <div class="home-signup">
    <home-input @pass="gotUsername" @intercept="this.$store.commit('toast', { text: '用户名不合法' })"
      :validateExpression="/^[A-Za-z0-9\u4e00-\u9fa5]{2,20}$/" type="text" placeholder="请输入2-20个字符的汉字、英文或数字" label="用户名"
     ></home-input>
    <home-input @pass="gotEmail" @intercept="this.$store.commit('toast', { text: '邮箱不合法' })"
      :validateExpression="/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/" type="email" placeholder="请输入你的邮箱"
      label="邮箱" ></home-input>
    <home-input @pass="gotPassword" @intercept="this.$store.commit('toast', { text: '密码不合法' })"
      :validateExpression="/^[A-Za-z0-9\u4e00-\u9fa5@#$%^&*]{6,20}$/" type="password"
      placeholder="请输入6-20个字符的英文、数字或特殊字符" label="密码" ></home-input>
    <home-input @pass="gotConfirmPassword" @intercept="this.$store.commit('toast', { text: '密码不合法' })"
      :validateExpression="/^[A-Za-z0-9\u4e00-\u9fa5@#$%^&*]{6,20}$/" type="password" placeholder="请再次确认密码" label="二次确认"
      ></home-input>
    <home-button @btnClick="signup" buttonText="注册" buttonStyle="white"></home-button>
    <home-button @btnClick="this.$router.push('/login')" buttonText="返回登录" buttonStyle="gray"></home-button>
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
      confirmPassword: ''
    }
  },
  methods: {
    // 用户名符合正则
    gotUsername(value) {
      this.username = value
    },
    gotEmail(value) {
      // 邮箱符合正则
      this.email = value
    },
    gotPassword(value) {
      // 密码符合正则
      this.password = value
    },
    gotConfirmPassword(value) {
      // 两次密码保持一致
      if (this.password !== value) {
        this.$store.commit('toast', { text: '两次输入密码不一致' })
      } else {
        this.confirmPassword = value
      }
    },
    signup() {
      // 用户名、邮箱和密码都符合正则
      if (this.username !== '' && this.email !== '' && this.password !== '' && this.confirmPassword !== '' && this.password === this.confirmPassword) {
        this.axios.post('/home/register', {
          username: this.username,
          email: this.email,
          password: this.password
        }).then(() => {
          this.$router.push('/register-success')
        }).catch((resp) => {
          this.$store.dispatch('toast', { text: resp.msg })
        })
      } else if (this.username === '') {
        this.$store.commit('toast', { text: '用户名不合法' })
      } else if (this.email === '') {
        this.$store.commit('toast', { text: '邮箱不合法' })
      } else if (this.password === '' || this.confirmPassword === '') {
        this.$store.commit('toast', { text: '密码不合法' })
      } else if (this.password !== this.confirmPassword) {
        this.$store.commit('toast', { text: '两次输入密码不一致' })
      } else {
        this.$store.commit('toast', { text: '位置错误，有 BUG !!!' })
      }
    }
  }
}
</script>

<style lang="scss">

</style>
