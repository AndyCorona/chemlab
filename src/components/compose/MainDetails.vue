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
          <input @change="validateUsername" type="text" :readonly="basicToggle" v-model="username"
            :placeholder="username">
        </div>
        <div class="wrapper" :class="basitStyle">
          <label>密码：</label>
          <input @change="validatePassword" type="password" :readonly="basicToggle" v-model="password"
            :placeholder="password">
        </div>
        <div class="wrapper" :class="basitStyle" :style="`opacity:${basicToggle ? '0' : '100%'}`">
          <label>确认密码：</label>
          <input @change="validateConfirmPassword" type="password" :readonly="basicToggle" v-model="confirmPassword"
            :placeholder="confirmPassword">
        </div>
        <div class="wrapper">
          <button class="save" @click.prevent="saveBasic">保存</button>
          <button class="toggle" @click.prevent="basicToggle = !basicToggle">修改</button>
        </div>
      </div>
    </div>
    <div class="right-container">
      <label class="title">个人信息</label>
      <div class="personal-details">
        <div class="wrapper" :class="personalStyle">
          <label>学校：</label>
          <input @change="validateSchool" type="text" :readonly="personalToggle" v-model="school"
            :placeholder="school">
        </div>
        <div class="wrapper" :class="personalStyle">
          <label>专业：</label>
          <input @change="validateMajor" type="text" :readonly="personalToggle" v-model="major"
            :placeholder="major">
        </div>
        <div class="wrapper" :class="personalStyle">
          <label>研究领域：</label>
          <input @change="validateField" type="text" :readonly="personalToggle" v-model="field"
            :placeholder="field">
        </div>
        <div class="wrapper">
          <button class="save" @click.prevent="savePersonal">保存</button>
          <button class="toggle" @click.prevent="personalToggle = !personalToggle">修改</button>
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
    validateUsername() {
      if (!this.validate(/^[A-Za-z0-9\u4e00-\u9fa5]{2,20}$/, this.username)) {
        this.$store.commit('toast', { text: '请输入有效的用户名' })
      } else {
        return true
      }
    },
    validatePassword() {
      if (!this.validate(/^[A-Za-z0-9\u4e00-\u9fa5@#$%^&*]{6,20}$/, this.password)) {
        this.$store.commit('toast', { text: '请输入有效的密码' })
      } else {
        return true
      }
    },
    validateConfirmPassword() {
      if (!this.validate(/^[A-Za-z0-9\u4e00-\u9fa5@#$%^&*]{6,20}$/, this.confirmPassword)) {
        this.$store.commit('toast', { text: '请输入有效的密码' })
      } else if (this.password !== this.confirmPassword) {
        this.$store.commit('toast', { text: '两次输入密码不一致' })
      } else {
        return true
      }
    },
    validateSchool() {
      if (!this.validate(/^[A-Za-z\u4e00-\u9fa5]{0,20}$/, this.school)) {
        this.$store.commit('toast', { text: '请输入有效的学校名称' })
      } else {
        return true
      }
    },
    validateMajor() {
      if (!this.validate(/^[A-Za-z\u4e00-\u9fa5]{0,20}$/, this.major)) {
        this.$store.commit('toast', { text: '请输入有效的专业名称' })
      } else {
        return true
      }
    },
    validateField() {
      if (!this.validate(/^[A-Za-z\u4e00-\u9fa5]{0,20}$/, this.field)) {
        this.$store.commit('toast', { text: '请输入有效的研究方向' })
      } else {
        return true
      }
    },
    validate(validateExpression, value) {
      return validateExpression.test(value)
    },
    init({ username, email, school, major, field }) {
      this.username = username
      this.email = email
      this.school = school
      this.major = major
      this.field = field
    },
    saveBasic() {
      if (this.validateUsername() && this.validatePassword() && this.validateConfirmPassword()) {
        this.axios.post('/main/update-basic', {
          username: this.username,
          password: this.password
        }).then(() => {
          this.$store.dispatch('toast', { text: '修改成功', state: 0 })
        }).catch((resp) => {
          this.$store.dispatch('toast', { text: resp.msg })
        })
      }
    },
    savePersonal() {
      if (this.validateSchool() && this.validateMajor() && this.validateField()) {
        this.axios.post('/main/update-me', {
          school: this.school === '' ? '门头沟大学' : this.school,
          major: this.major === '' ? '化学' : this.major,
          field: this.field === '' ? '有机' : this.field
        }).then(() => {
          this.$store.dispatch('toast', { text: '修改成功', state: 0 })
        }).catch((resp) => {
          this.$store.dispatch('toast', { text: resp.msg })
        })
      }
    }
  },
  mounted() {
    // 获取基本信息和个人信息
    this.axios.get('/main/info').then((data) => {
      this.init(data)
    }).catch((resp) => {
      this.$store.dispatch('toast', { text: resp.msg })
    })
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
          font-size: 20px;
          font-weight: bold;
          width: 80px;
          height: 40px;
          border-radius: 5px;
          color: #FFFFFF;
          border: none;
          padding: 4px;
          box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.35);
          cursor: pointer;
        }

        button:first-child {
          margin-left: 100px;
        }

        .save {
          background-color: #638271;
          border: 1px solid #638271;
        }

        .toggle {
          background-color: #D7D7D7;
          border: 1px solid #AAAAAA;
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
