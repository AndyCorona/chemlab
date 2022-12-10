<template>
  <div class="main-details">
    <div class="left-container">
      <label class="title">基本信息</label>
      <div class="basic-details">
        <div class="wrapper">
          <label>邮箱：</label>
          <input type="text" readonly :placeholder="email">
        </div>
        <div class="wrapper" :class="basitStyle">
          <label>用户名：</label>
          <input @change="validate(0)" type="text" :readonly="basicToggle" v-model="username" :placeholder="username">
        </div>
        <div class="wrapper" :class="basitStyle">
          <label>密码：</label>
          <input @change="validate(1)" type="password" :readonly="basicToggle" v-model="password"
            :placeholder="password">
        </div>
        <div class="wrapper" :class="basitStyle" :style="`opacity:${basicToggle ? '0' : '100%'}`">
          <label>确认密码：</label>
          <input @change="validate(2)" type="password" :readonly="basicToggle" v-model="confirmPassword"
            :placeholder="confirmPassword">
        </div>
        <div class="wrapper">
          <button class="greenButton" @click.prevent="saveBasic">保存</button>
          <button class="grayButton" @click.prevent="basicToggle = false">修改</button>
        </div>
      </div>
    </div>
    <div class="right-container">
      <label class="title">个人信息</label>
      <div class="personal-details">
        <div class="wrapper" :class="personalStyle">
          <label>学校：</label>
          <input @change="validate(3)" type="text" :readonly="personalToggle" v-model="school" :placeholder="school">
        </div>
        <div class="wrapper" :class="personalStyle">
          <label>专业：</label>
          <input @change="validate(4)" type="text" :readonly="personalToggle" v-model="major" :placeholder="major">
        </div>
        <div class="wrapper" :class="personalStyle">
          <label>研究领域：</label>
          <input @change="validate(5)" type="text" :readonly="personalToggle" v-model="field" :placeholder="field">
        </div>
        <div class="wrapper">
          <button class="greenButton" @click.prevent="savePersonal">保存</button>
          <button class="grayButton" @click.prevent="personalToggle = false">修改</button>
        </div>
      </div>
    </div>
  </div>

</template>
<script>

export default {
  name: 'MainDetails',
  data() {
    return {
      usernameExp: /^[A-Za-z0-9\u4e00-\u9fa5]{2,20}$/,
      emailExp: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
      passwordExp: /^[A-Za-z0-9\u4e00-\u9fa5@#$%^&*]{6,20}$/,
      personalExp: /^[A-Za-z\u4e00-\u9fa5]{0,20}$/,
      username: '',
      email: '',
      password: '111111',
      confirmPassword: '',
      school: '',
      major: '',
      field: '',
      // 个人信息不可修改
      personalToggle: true,
      // 基本信息不可修改
      basicToggle: true
    }
  },
  methods: {
    init() {
      // 获取基本信息和个人信息
      this.axios.get('/main/info').then((data) => {
        this.username = data.username
        this.email = data.email
        this.school = data.school
        this.major = data.major
        this.field = data.field
      }).catch((resp) => {
        this.$store.dispatch('toast', { text: resp.msg })
      })
    },
    validate(type) {
      // 校验用户名
      if (type === 0) {
        if (!this.usernameExp.test(this.username)) {
          this.$store.commit('toast', { text: '请输入有效的用户名' })
          return false
        }
        return true
        // 校验密码
      } else if (type === 1) {
        if (!this.passwordExp.test(this.password)) {
          this.$store.commit('toast', { text: '请输入有效的密码' })
          return false
        }
        return true
        // 校验确认密码
      } else if (type === 2) {
        if (this.confirmPassword !== this.password) {
          this.$store.commit('toast', { text: '两次输入密码不一致' })
          return false
        }
        if (!this.passwordExp.test(this.confirmPassword)) {
          this.$store.commit('toast', { text: '请输入有效的密码' })
          return false
        }
        return true
        // 校验学校名称
      } else if (type === 3) {
        if (!this.personalExp.test(this.school)) {
          this.$store.commit('toast', { text: '请输入有效的学校名称' })
          return false
        }
        return true
        // 校验专业
      } else if (type === 4) {
        if (!this.personalExp.test(this.major)) {
          this.$store.commit('toast', { text: '请输入有效的专业' })
          return false
        }
        return true
        // 校验研究方向
      } else if (type === 5) {
        if (!this.personalExp.test(this.field)) {
          this.$store.commit('toast', { text: '请输入有效的研究方向' })
          return false
        }
        return true
      } else {
        throw new Error('the type is between 0 - 5')
      }
    },
    saveBasic() {
      if (this.validate(0) && this.validate(1) && this.validate(2)) {
        this.axios.post('/main/basic', {
          username: this.username,
          password: this.password
        }).then(() => {
          this.$store.dispatch('toast', { text: '修改成功', state: 0 })
          this.basicToggle = !this.basicToggle
        }).catch((resp) => {
          this.$store.dispatch('toast', { text: resp.msg })
        })
      }
    },
    savePersonal() {
      if (this.validate(3) && this.validate(4) && this.validate(5)) {
        this.school = !this.school ? '门头沟大学' : this.school
        this.major = !this.major ? '化学' : this.major
        this.field = !this.field ? '有机' : this.field
        this.axios.post('/main/me', {
          school: this.school,
          major: this.major,
          field: this.field
        }).then(() => {
          this.$store.dispatch('toast', { text: '修改成功', state: 0 })
          this.personalToggle = !this.personalToggle
        }).catch((resp) => {
          this.$store.dispatch('toast', { text: resp.msg })
        })
      }
    }
  },
  mounted() {
    this.init()
  },
  computed: {
    basitStyle() {
      return this.basicToggle ? 'unchangable' : 'changable'
    },
    personalStyle() {
      return this.personalToggle ? 'unchangable' : 'changable'
    }
  }
}
</script>

<style lang="scss">
.main-details {
  display: flex;
  justify-content: space-between;
  margin: 125px 140px 0 140px;

  .left-container,
  .right-container {
    width: 600px;
    height: 485px;

    .title {
      display: block;
      font-size: 20px;
      font-weight: bold;
      margin-left: 5px;
      height: 50px;
    }

    .personal-details {
      .wrapper {
        margin: 60px 130px 60px 90px;
      }
    }

    .basic-details {
      .wrapper {
        margin: 40px 130px 40px 90px;
      }
    }

    .personal-details,
    .basic-details {
      width: 600px;
      height: 440px;
      border-radius: 10px;
      border: 1px solid #D7D7D7;
      box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.35);

      .wrapper {
        display: flex;
        align-items: center;
        width: 400px;
        height: 40px;
        justify-content: space-between;

        label {
          font-size: 16px;
          font-weight: bold;
        }

        input {
          background: #F2F2F2;
          border-radius: 5px;
          border: none;
          font-size: 14px;
          width: 300px;
          height: 40px;
          line-height: 40px;
          padding: 6px 10px;
          box-sizing: border-box;
        }

        button {
          width: 80px;
          border: none;
          padding: 4px;
        }

        button:first-child {
          margin-left: 100px;
        }
      }

      .changable {

        input,
        input:focus {
          font-size: 14px;
          width: 300px;
          height: 40px;
          line-height: 40px;
          padding: 6px 10px;
          box-sizing: border-box;
          background-color: #E0E6E3;
          border-radius: 5px;
          border: none;
        }

        input {
          box-shadow: inset 0 0 4px 1px rgba(0, 0, 0, 0.35);
        }

        input:focus {
          box-shadow: inset 0 0 4px 1px rgba(0, 0, 0, 0.35), 0 0 10px 0 #99C8C9;
        }
      }

      .unchangable {
        // color: #B3B3B3;
      }
    }
  }
}
</style>
