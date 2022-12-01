<template>
  <div class="home-login">
    <home-input @pass="GotUsername" :ValidateExpression="/^[A-Za-z0-9\u4e00-\u9fa5]{2,20}$/" type="text"
      placeholder="请输入用户名" label="用户名" name="username">
    </home-input>
    <home-input @pass="GotPassword" :ValidateExpression="/^[A-Za-z0-9\u4e00-\u9fa5@#$%^&*]{6,20}$/" type="password"
      placeholder="请输入密码" label="密码" name="password"></home-input>
    <div class="forgot-password-tips">
      <img src="/imgs/登录页/忘记密码.svg">
      <a href="/#/forgot-password">忘记密码</a>
    </div>
    <home-button @BtnClick="ToUserSpace" :style="'margin-top:20px'" buttonText="登录" buttonStyle="green">
    </home-button>
    <home-button @BtnClick="this.$router.push('/signup')" buttonText="注册" buttonStyle="white"></home-button>
    <home-button @BtnClick="this.$router.push('/error')" buttonText="出错了（测试）" buttonStyle="gray"></home-button>
  </div>
</template>

<script>
import HomeInput from '../basic/HomeInput.vue'
import HomeButton from '../basic/HomeButton.vue'
export default {
  name: 'HomeLogin',
  components: {
    HomeInput,
    HomeButton
  },
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    GotUsername(value) {
      this.username = value
    },
    GotPassword(value) {
      this.password = value
    },
    ToUserSpace() {
      if (!/^[A-Za-z0-9\u4e00-\u9fa5]{2,20}$/.test(this.username)) {
        this.$store.commit('toast', { ShowModal: true, text: '用户名不正确' })
        return
      }
      if (!/^[A-Za-z0-9\u4e00-\u9fa5@#$%^&*]{6,20}$/.test(this.password)) {
        this.$store.commit('toast', { ShowModal: true, text: '密码不正确' })
        return
      }
      this.axios.post('/home/login', {
        username: this.username,
        password: this.password
      }).then((data) => {
        // 首次登录跳转到个人中心
        if (data.firstLogin) {
          this.$router.push('/main/details')
          // 否则直接跳转到个人空间
        } else {
          this.$router.push('/main')
        }
      }).catch((resp) => {
        this.$store.dispatch('toast', { ShowModal: true, text: resp.msg })
      })
    }
  }
}
</script>

<style lang="scss">
.home-login {
  position: relative;

  .forgot-password-tips {
    position: absolute;
    top: 100px;
    right: 75px;
    display: flex;
    align-items: center;

    img {
      width: 16px;
      height: 16px;
    }

    a {
      margin-left: 5px;
      font-size: 12px;
      color: #797979;
    }
  }
}
</style>
