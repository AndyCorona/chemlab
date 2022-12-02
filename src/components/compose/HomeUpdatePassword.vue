<template>
  <div class="home-update-password">
    <home-input :readOnly="true" class="username" type="password" :placeholder="username" label="用户名">
    </home-input>
    <home-input :readOnly="true" class="email" type="password" :placeholder="email" label="邮箱">
    </home-input>
    <home-input @pass="gotPassword" @intercept="this.$store.commit('toast', { text: '密码不合法' })"
      :validateExpression="/^[A-Za-z0-9\u4e00-\u9fa5@#$%^&*]{6,20}$/" type="password"
      placeholder="请输入6-20个字符的英文、数字或特殊字符" label="密码"></home-input>
    <home-input @pass="gotConfirmPassword" @intercept="this.$store.commit('toast', { text: '密码不合法' })"
      :validateExpression="/^[A-Za-z0-9\u4e00-\u9fa5@#$%^&*]{6,20}$/" type="password" placeholder="请再次确认密码"
      label="二次确认"></home-input>
    <home-button @btnClick="confirmUpdate" buttonText="确认修改" buttonStyle="green"></home-button>
  </div>
</template>

<script>
import HomeInput from '../basic/HomeInput.vue'
import HomeButton from '../basic/HomeButton.vue'
export default {
  name: 'HomeUpdatePassword',
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
    gotPassword(value) {
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
    confirmUpdate() {
      if (this.username === '' || !/^[A-Za-z0-9\u4e00-\u9fa5]{2,20}$/.test(this.username)) {
        this.$store.commit('toast', { text: '用户名不正确' })
      } else if (this.email === '' || !/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this.email)) {
        this.$store.commit('toast', { text: '邮箱不正确' })
      } else if (this.password === '' || this.confirmPassword === '') {
        this.$store.commit('toast', { text: '请输入有效的密码' })
      } else if (this.password !== this.confirmPassword) {
        this.$store.commit('toast', { text: '两次输入密码不一致' })
      } else {
        sessionStorage.removeItem('username')
        sessionStorage.removeItem('email')
        this.axios.post('/home/update', {
          username: this.username,
          email: this.email,
          password: this.password
        }).then(() => {
          this.$store.dispatch('toast', { text: '修改成功', state: 0 })
          setTimeout(() => {
            this.$router.push('/login')
          }, 1500)
        }).catch((resp) => {
          this.$store.dispatch('toast', { text: resp.msg })
        })
      }
    }
  },
  mounted() {
    this.username = sessionStorage.getItem('username')
    this.email = sessionStorage.getItem('email')
  }
}
</script>

<style lang="scss">
.home-update-password {

  .username,
  .email {
    .wrapper {
      input {
        border: none;
        box-shadow: none;
        background-color: rgb(247, 247, 247);
      }
    }
  }
}
</style>
