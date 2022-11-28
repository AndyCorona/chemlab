<template>
  <div class="home-forgot-password">
    <home-input @pass="GotEmail" @intercept="this.$emit('toast', '请输入有效的邮箱', 1)"
      :ValidateExpression="/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/" type="email" placeholder="请输入你的邮箱"
      label="邮箱" name="email"></home-input>
    <home-input @pass="GotCode" @intercept="this.$emit('toast', '请输入有效的验证码', 1)" :ValidateExpression="/^\d{6}$/"
      type="text" placeholder="点击按钮获取验证码" label="验证码" name="code"></home-input>
    <home-button :disabled="disabledBtn" :style="'margin-top:20px'" @BtnClick="GetCode" :buttonText="buttonText"
      buttonStyle="white">
    </home-button>
    <home-button @BtnClick="Next" buttonText="下一步" buttonStyle="green"></home-button>
    <home-button @BtnClick="this.$router.push('/login')" buttonText="返回登录" buttonStyle="gray"></home-button>
  </div>
</template>

<script>
import HomeInput from '../basic/HomeInput.vue'
import HomeButton from '../basic/HomeButton.vue'
export default {
  name: 'HomeForgotPassword',
  components: {
    HomeInput,
    HomeButton
  },
  data() {
    return {
      disabledBtn: false,
      handler: null,
      conut: 60,
      buttonText: '获取验证码',
      email: '',
      code: ''
    }
  },
  methods: {
    GotEmail(value) {
      this.email = value
    },
    GotCode(value) {
      this.code = value
    },
    Next() {
      if (!JSON.parse(sessionStorage.getItem('IsSent'))) {
        this.$emit('toast', '请先获取验证码', 1)
      } else {
        if (this.email === '') {
          this.$emit('toast', '请输入有效的邮箱', 1)
        } else if (this.code === '') {
          this.$emit('toast', '请输入有效的验证码', 1)
        } else {
          // 验证验证码是否一致且有效
          this.axios.post('/home/verify', {
            code: this.code
          }).then((data) => {
            sessionStorage.removeItem('IsSent')
            sessionStorage.setItem('username', data.username)
            sessionStorage.setItem('email', data.email)
            this.$router.push('/update-password')
          }).catch((resp) => {
            this.$emit('toast', resp.msg, 1)
          })
        }
      }
    },
    GetCode() {
      if (this.email === '') {
        this.$emit('toast', '请输入有效的邮箱', 1)
      } else {
        this.axios.get('/home/code', {
          params: {
            email: this.email
          }
        }
        ).then(() => {
          this.$emit('toast', '验证码已发送，请及时查看邮件', 0)
          // 更新状态为验证码已发送
          sessionStorage.setItem('IsSent', true)
          // 获取验证码按钮禁用，显示倒计时
          this.disabledBtn = true
          const handler = setInterval(() => {
            this.conut--
            this.buttonText = this.conut + ''
          }, 1000)
          this.handler = handler
        }).catch((resp) => {
          this.$emit('toast', resp.msg, 1)
        })
      }
    }
  },
  watch: {
    conut: {
      handler(newVal) {
        if (newVal === 0) {
          clearInterval(this.handler)
          this.buttonText = '获取验证码'
          this.disabledBtn = false
          this.conut = 60
        }
      }
    }
  }
}
</script>

<style lang="scss">

</style>
