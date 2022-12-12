<template>
  <div class="home-view">
    <toast-props :show="this.$store.state.showToast" :text="this.$store.state.toastText"
      :state="this.$store.state.toastState" :durationTime="this.$store.state.toastDurationTime" @close="closeToast">
    </toast-props>
    <div class="container"
      :style="`background-image: url(${backgroundImage});filter: ${$store.state.isNight ? 'invert(1)' : ''}`">
      <main :style="`filter: ${$store.state.isNight ? 'invert(1)' : ''}`">
        <home-header :welcomeText="welcomeText" :productIcon="productIcon"></home-header>
        <home-slot :name="this.$route.fullPath.split('/')[1]">
          <template v-slot:login>
            <div class="home-login">
              <home-input :state="0" type="text" placeholder="请输入用户名" label="用户名">
              </home-input>
              <home-input @keyup.enter="toUserSpace" :state="2" type="password" placeholder="请输入密码"
                label="密码"></home-input>
              <div class="forgot-password-tips">
                <img draggable="false" src="/imgs/登录页/忘记密码.svg">
                <a draggable="false" href="/#/forgot-password">忘记密码</a>
              </div>
              <home-button @btnClick="toUserSpace" :style="'margin-top:20px'" buttonText="登录" buttonStyle="greenButton">
              </home-button>
              <home-button @btnClick="this.$router.push('/signup')" buttonText="注册"
                buttonStyle="whiteButton"></home-button>
              <home-button @btnClick="this.$router.push('/error')" buttonText="出错了（测试）"
                buttonStyle="grayButton"></home-button>
            </div>
          </template>
          <template v-slot:signup>
            <div class="home-signup">
              <home-input @change="validate(0)" :state="0" type="text" placeholder="请输入2-20个字符的汉字、英文或数字"
                label="用户名"></home-input>
              <home-input @change="validate(1)" :state="1" type="email" placeholder="请输入你的邮箱" label="邮箱"></home-input>
              <home-input @change="validate(2)" :state="2" type="password" placeholder="请输入6-20个字符的英文、数字或特殊字符"
                label="密码"></home-input>
              <home-input :state="3" type="password" placeholder="请再次确认密码" label="二次确认"></home-input>
              <home-button @btnClick="signup" buttonText="注册" buttonStyle="whiteButton"></home-button>
              <home-button @btnClick="this.$router.push('/login')" buttonText="返回登录"
                buttonStyle="grayButton"></home-button>
            </div>
          </template>
          <template v-slot:update-password>
            <div class="home-update-password">
              <home-input :state="0" :readOnly="true" class="username" type="text" :placeholder="username" label="用户名">
              </home-input>
              <home-input :state="1" :readOnly="true" class="email" type="text" :placeholder="email" label="邮箱">
              </home-input>
              <home-input @change="validate(2)" @keyup.enter="confirmUpdate" :state="2" type="password"
                placeholder="请输入6-20个字符的英文、数字或特殊字符" label="密码"></home-input>
              <home-input @change="validate(3)" @keyup.enter="confirmUpdate" :state="3" type="password"
                placeholder="请再次确认密码" label="二次确认"></home-input>
              <home-button @btnClick="confirmUpdate" buttonText="确认修改" buttonStyle="greenButton"></home-button>
            </div>
          </template>
          <template v-slot:forgot-password>
            <div class="home-forgot-password">
              <home-input @change="validate(1)" @keyup.enter="getCode" :state="1" type="email" placeholder="请输入你的邮箱"
                label="邮箱"></home-input>
              <home-input @change="validate(4)" @keyup.enter="toUpdatePassword" :state="4" type="text"
                placeholder="请输入验证码" label="验证码"></home-input>
              <home-button :disabled="isSent" :style="'margin-top:20px'" @btnClick="getCode" :buttonText="buttonText"
                buttonStyle="whiteButton">
              </home-button>
              <home-button @btnClick="toUpdatePassword" buttonText="下一步" buttonStyle="greenButton"></home-button>
              <home-button @btnClick="this.$router.push('/login')" buttonText="返回登录"
                buttonStyle="grayButton"></home-button>
            </div>
          </template>
          <template v-slot:register-success>
            <div class="home-register-success">
              <p>注册成功！</p>
              <p>请前往邮箱激活账号！</p>
              <home-button @click.prevent="this.$router.push('/login')" buttonText="返回登录"
                buttonStyle="grayButton"></home-button>
            </div>
          </template>
          <template v-slot:activate-success>
            <div class="home-activate-success">
              <p>激活成功！</p>
              <p>请使用用户名和密码登录！</p>
              <home-button @click.prevent="this.$router.push('/login')" buttonText="返回登录"
                buttonStyle="grayButton"></home-button>
            </div>
          </template>
        </home-slot>
        <home-footer></home-footer>
      </main>
    </div>
  </div>
</template>

<script>
import HomeHeader from '../components/basic/HomeHeader.vue'
import HomeFooter from '../components/basic/HomeFooter.vue'
import HomeSlot from '../components/basic/HomeSlot.vue'
import HomeInput from '../components/basic/HomeInput.vue'
import HomeButton from '../components/basic/HomeButton.vue'
export default {
  name: 'HomeView',
  components: {
    HomeHeader,
    HomeFooter,
    HomeSlot,
    HomeInput,
    HomeButton
  },
  data() {
    return {
      usernameExp: /^[A-Za-z0-9\u4e00-\u9fa5]{2,20}$/,
      emailExp: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
      passwordExp: /^[A-Za-z0-9\u4e00-\u9fa5@#$%^&*]{6,20}$/,
      codeExp: /^\d{6}$/,
      // 计时器的句柄
      handler: null,
      // 倒计时
      count: 60,
      buttonText: '获取验证码',
      isSent: false,
      productIcon: this.$config.productIcon,
      welcomeText: this.$config.welcomeText,
      backgroundImage: this.$config.backgroundImage
    }
  },
  computed: {
    username: {
      get() {
        return this.$store.state.loginInfo.username
      },
      set(newVal) {
        this.$store.commit('saveLoginInfo', { username: newVal })
      }
    },
    email: {
      get() {
        return this.$store.state.loginInfo.email
      },
      set(newVal) {
        this.$store.commit('saveLoginInfo', { email: newVal })
      }
    },
    password: {
      get() {
        return this.$store.state.loginInfo.password
      },
      set(newVal) {
        this.$store.commit('saveLoginInfo', { password: newVal })
      }
    },
    confirmPassword: {
      get() {
        return this.$store.state.loginInfo.confirmPassword
      },
      set(newVal) {
        this.$store.commit('saveLoginInfo', { confirmPassword: newVal })
      }
    },
    code: {
      get() {
        return this.$store.state.loginInfo.code
      },
      set(newVal) {
        this.$store.comit('saveLoginInfo', { code: newVal })
      }
    }
  },
  methods: {
    validate(type) {
      // 校验用户名
      if (type === 0) {
        if (!this.usernameExp.test(this.username)) {
          this.$store.commit('toast', { text: '请输入有效的用户名' })
          return false
        }
        return true
        // 校验邮箱
      } else if (type === 1) {
        if (!this.emailExp.test(this.email)) {
          this.$store.commit('toast', { text: '请输入有效的邮箱' })
          return false
        }
        return true
        // 校验密码
      } else if (type === 2) {
        if (!this.passwordExp.test(this.password)) {
          this.$store.commit('toast', { text: '请输入有效的密码' })
          return false
        }
        return true
        // 校验确认密码
      } else if (type === 3) {
        if (this.confirmPassword !== this.password) {
          this.$store.commit('toast', { text: '两次输入密码不一致' })
          return false
        }
        if (!this.passwordExp.test(this.confirmPassword)) {
          this.$store.commit('toast', { text: '请输入有效的密码' })
          return false
        }
        return true
        // 校验验证码
      } else if (type === 4) {
        if (!this.codeExp.test(this.code)) {
          this.$store.commit('toast', { text: '请输入有效的验证码' })
          return false
        }
        return true
      }
    },
    toUpdatePassword() {
      if (!this.isSent) {
        this.$store.commit('toast', { text: '请先获取验证码' })
        return
      }
      if (this.validate(1) && this.validate(4)) {
        // 验证验证码是否一致且有效
        this.axios.post('/home/verify', {
          code: this.code
        }).then((data) => {
          sessionStorage.setItem('username', data.username)
          sessionStorage.setItem('email', data.email)
          this.$router.push('/update-password')
        }).catch((resp) => {
          this.$store.dispatch('toast', { text: resp.msg })
        })
      }
    },
    getCode() {
      if (this.validate(1)) {
        this.axios.post('/home/code', {
          email: this.email
        }
        ).then(() => {
          this.$store.dispatch('toast', { text: '邮件已发送，请及时查收', state: 0 })
          // 更新状态为验证码已发送
          this.isSent = true
          // 显示倒计时
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
    confirmUpdate() {
      if (this.validate(0) && this.validate(1) && this.validate(2) && this.validate(3)) {
        this.axios.post('/home/update', {
          username: this.username,
          email: this.email,
          password: this.password
        }).then(() => {
          // 清空留在 vuex  的信息，跳转到登录页
          this.$store.dispatch('toast', { text: '修改成功', state: 0 })
          setTimeout(() => {
            this.$router.push('/login')
            this.$store.dispatch('clearLoginInfo')
          }, 500)
        }).catch((resp) => {
          this.$store.dispatch('toast', { text: resp.msg })
        })
      }
    },
    toUserSpace() {
      if (this.validate(0) && this.validate(2)) {
        this.axios.post('/home/login', {
          username: this.username,
          password: this.password
        }).then((data) => {
          // 清空之前注册留在 vuex  的信息
          this.$store.dispatch('clearLoginInfo')
          // 首次登录跳转到个人中心
          if (data.firstLogin) {
            this.$router.push('/main/details')
            // 否则直接跳转到个人空间
          } else {
            this.$router.push('/main')
          }
        }).catch((resp) => {
          this.$store.dispatch('toast', { text: resp.msg })
        })
      }
    },
    gotconfirmPassword(value) {
      if (this.validate(3)) {
        this.confirmPassword = value
      }
    },
    signup() {
      if (this.validate(0) && this.validate(1) && this.validate(2) && this.validate(3)) {
        this.axios.post('/home/register', {
          username: this.username,
          email: this.email,
          password: this.password
        }).then(() => {
          this.$store.dispatch('clearLoginInfo')
          this.$router.push('/register-success')
        }).catch((resp) => {
          this.$store.dispatch('toast', { text: resp.msg })
        })
      }
    },
    closeToast() {
      setTimeout(() => {
        this.$store.dispatch('toast', { showModal: false })
        // 魔数
      }, 300)
    }
  },
  // 监听计时器，当计时器数字为 0 时重置计时器
  watch: {
    count: {
      handler(newVal) {
        if (newVal === 0) {
          clearInterval(this.handler)
          this.buttonText = '获取验证码'
          this.isSent = false
          this.count = 60
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import '../assets/scss/config.scss';
@import '../assets/scss/base.scss';

.home-view {
  position: relative;
  height: 100%;

  .container {
    // 放在页面的内联样式中，可以通过 js 动态替换背景图片
    background-size: cover;
    height: 100%;
    position: relative;

    main {
      border-radius: 20px;
      left: 50%;
      top: 150px;
      translate: -50% 0;
      position: absolute;
      text-align: center;
      margin: 0 auto;
      background: #FFFFFF;
      width: 450px;
      border: 2px solid #638271;

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

      .home-register-success,
      .home-activate-success {
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
    }
  }
}
</style>
