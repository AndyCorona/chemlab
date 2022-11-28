<template>
  <div class="home-update-password">
    <home-input :ReadOnly="true" class="username" type="password" :placeholder="username" label="用户名" name="username">
    </home-input>
    <home-input :ReadOnly="true" class="email" type="password" :placeholder="email" label="邮箱" name="email">
    </home-input>
    <home-input @pass="GotPassword" @intercept="this.$emit('toast', '密码不合法', 1)"
      :ValidateExpression="/^[A-Za-z0-9\u4e00-\u9fa5@#$%^&*]{6,20}$/" type="password"
      placeholder="请输入6-20个字符的英文、数字或特殊字符" label="密码" name="password"></home-input>
    <home-input @pass="GotConfirmPassword" @intercept="this.$emit('toast', '密码不合法', 1)"
      :ValidateExpression="/^[A-Za-z0-9\u4e00-\u9fa5@#$%^&*]{6,20}$/" type="password" placeholder="请再次确认密码" label="二次确认"
      name="password-confirm"></home-input>
    <home-button @BtnClick="ConfirmUpdate" buttonText="确认修改" buttonStyle="green"></home-button>
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
      ConfirmPassword: ''
    }
  },
  methods: {
    GotPassword(value) {
      this.password = value
    },
    GotConfirmPassword(value) {
      // 两次密码保持一致
      if (this.password !== value) {
        this.$emit('toast', '两次输入密码不一致', 1)
      } else {
        this.ConfirmPassword = value
      }
    },
    ConfirmUpdate() {
      if (this.username === '' || !/^[A-Za-z0-9\u4e00-\u9fa5]{2,20}$/.test(this.username)) {
        this.$emit('toast', '用户名不正确', 1)
      } else if (this.email === '' || !/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this.email)) {
        this.$emit('toast', '邮箱不正确', 1)
      } else if (this.password === '' || this.ConfirmPassword === '') {
        this.$emit('toast', '请输入有效的密码', 1)
      } else if (this.password !== this.ConfirmPassword) {
        this.$emit('toast', '两次输入密码不一致', 1)
      } else {
        sessionStorage.removeItem('username')
        sessionStorage.removeItem('email')
        this.axios.post('/home/update', {
          username: this.username,
          email: this.email,
          password: this.password
        }).then(() => {
          this.$emit('toast', '修改成功', 0)
          setTimeout(() => {
            this.$router.push('/login')
          }, 1500)
        }).catch((resp) => {
          this.$emit('toast', resp.msg, 1)
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
