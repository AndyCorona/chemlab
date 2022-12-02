<template>
  <div class="home-forgot-password">
    <home-input @pass="gotEmail" :validateExpression="/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/" type="email"
      placeholder="请输入你的邮箱" label="邮箱"></home-input>
    <home-input @pass="gotCode" :validateExpression="/^\d{6}$/" type="text" placeholder="请输入验证码"
      label="验证码"></home-input>
    <home-button :disabled="disabledBtn" :style="'margin-top:20px'" @btnClick="getCode" :buttonText="buttonText"
      buttonStyle="white">
    </home-button>
    <home-button @btnClick="next" buttonText="下一步" buttonStyle="green"></home-button>
    <home-button @btnClick="this.$router.push('/login')" buttonText="返回登录" buttonStyle="gray"></home-button>
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
      // 计时器的句柄
      handler: null,
      // 倒计时
      count: 60,
      buttonText: '获取验证码',
      email: '',
      code: ''
    }
  },
  methods: {
    gotEmail(value) {
      this.email = value
    },
    gotCode(value) {
      this.code = value
    },
    next() {
      if (!JSON.parse(sessionStorage.getItem('isSent'))) {
        this.$store.commit('toast', { text: '请先获取验证码' })
      } else {
        if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this.email)) {
          this.$store.commit('toast', { text: '请输入有效的邮箱' })
          return
        }
        if (!/^\d{6}$/.test(this.code)) {
          this.$store.commit('toast', { text: '验证码错误' })
          return
        }
        // 验证验证码是否一致且有效
        this.axios.post('/home/verify', {
          code: this.code
        }).then((data) => {
          sessionStorage.removeItem('isSent')
          sessionStorage.setItem('username', data.username)
          sessionStorage.setItem('email', data.email)
          this.$router.push('/update-password')
        }).catch((resp) => {
          this.$store.dispatch('toast', { text: resp.msg })
        })
      }
    },
    getCode() {
      if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this.email)) {
        this.$store.commit('toast', { text: '请输入有效的邮箱' })
        return
      }
      this.axios.get('/home/code', {
        params: {
          email: this.email
        }
      }
      ).then(() => {
        this.$store.dispatch('toast', { text: '邮件已发送，请及时查收', state: 0 })
        // 更新状态为验证码已发送
        sessionStorage.setItem('isSent', true)
        // 获取验证码按钮禁用，显示倒计时
        this.disabledBtn = true
        const handler = setInterval(() => {
          this.count--
          this.buttonText = this.count + ''
        }, 1000)
        this.handler = handler
      }).catch((resp) => {
        this.$store.dispatch('toast', { text: resp.msg })
      })
    }
  },
  // 监听计时器，当计时器数字为 0 时重置计时器
  watch: {
    count: {
      handler(newVal) {
        if (newVal === 0) {
          clearInterval(this.handler)
          this.buttonText = '获取验证码'
          this.disabledBtn = false
          this.count = 60
        }
      }
    }
  }
}
</script>

<style lang="scss">

</style>
