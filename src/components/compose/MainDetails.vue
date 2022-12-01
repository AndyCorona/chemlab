<template>
  <div class="main-details">
    <div class="left-container">
      <label class="title">基本信息</label>
      <div class="basic-details">
        <div class="wrapper">
          <label>邮箱：</label>
          <input type="text" readonly :placeholder="this.email">
        </div>
        <div class="wrapper" :class="this.BasicToggle ? 'unchangable' : 'changable'">
          <label>用户名：</label>
          <input @change="ValidateUsername" type="text" :readonly="BasicToggle" v-model="username"
            :placeholder="this.username">
        </div>
        <div class="wrapper" :class="this.BasicToggle ? 'unchangable' : 'changable'">
          <label>密码：</label>
          <input @change="ValidatePassword" type="password" :readonly="BasicToggle" v-model="password"
            :placeholder="this.password">
        </div>
        <div class="wrapper" :class="this.BasicToggle ? 'unchangable' : 'changable'"
          :style="`opacity:${BasicToggle ? '0' : '100%'}`">
          <label>确认密码：</label>
          <input @change="ValidateConfirmPassword" type="password" :readonly="BasicToggle" v-model="ConfirmPassword"
            :placeholder="this.ConfirmPassword">
        </div>
        <div class="wrapper">
          <button class="save" @click.prevent="SaveBasic">保存</button>
          <button class="toggle" @click.prevent="this.BasicToggle = !BasicToggle">修改</button>
        </div>
      </div>
    </div>
    <div class="right-container">
      <label class="title">个人信息</label>
      <div class="personal-details">
        <div class="wrapper" :class="this.PersonalToggle ? 'unchangable' : 'changable'">
          <label>学校：</label>
          <input @change="ValidateSchool" type="text" :readonly="PersonalToggle" v-model="school"
            :placeholder="this.school">
        </div>
        <div class="wrapper" :class="this.PersonalToggle ? 'unchangable' : 'changable'">
          <label>专业：</label>
          <input @change="ValidateMajor" type="text" :readonly="PersonalToggle" v-model="major"
            :placeholder="this.major">
        </div>
        <div class="wrapper" :class="this.PersonalToggle ? 'unchangable' : 'changable'">
          <label>研究领域：</label>
          <input @change="ValidateField" type="text" :readonly="PersonalToggle" v-model="field"
            :placeholder="this.field">
        </div>
        <div class="wrapper">
          <button class="save" @click.prevent="SavePersonal">保存</button>
          <button class="toggle" @click.prevent="this.PersonalToggle = !PersonalToggle">修改</button>
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
      ConfirmPassword: '',
      school: '',
      major: '',
      field: '',
      // 个人信息不可修改
      PersonalToggle: true,
      // 基本信息不可修改
      BasicToggle: true
    }
  },
  methods: {
    ValidateUsername() {
      if (!this.validate(/^[A-Za-z0-9\u4e00-\u9fa5]{2,20}$/, this.username)) {
        this.$store.dispatch('toast', { ShowModal: true, text: '请输入有效的用户名' })
      } else {
        return true
      }
    },
    ValidatePassword() {
      if (!this.validate(/^[A-Za-z0-9\u4e00-\u9fa5@#$%^&*]{6,20}$/, this.password)) {
        this.$store.dispatch('toast', { ShowModal: true, text: '请输入有效的密码' })
      } else {
        return true
      }
    },
    ValidateConfirmPassword() {
      if (!this.validate(/^[A-Za-z0-9\u4e00-\u9fa5@#$%^&*]{6,20}$/, this.ConfirmPassword)) {
        this.$store.dispatch('toast', { ShowModal: true, text: '请输入有效的密码' })
      } else if (this.password !== this.ConfirmPassword) {
        this.$store.dispatch('toast', { ShowModal: true, text: '两次输入密码不一致' })
      } else {
        return true
      }
    },
    ValidateSchool() {
      if (!this.validate(/^[A-Za-z\u4e00-\u9fa5]{0,20}$/, this.school)) {
        this.$store.dispatch('toast', { ShowModal: true, text: '请输入有效的学校名称' })
      } else {
        return true
      }
    },
    ValidateMajor() {
      if (!this.validate(/^[A-Za-z\u4e00-\u9fa5]{0,20}$/, this.major)) {
        this.$store.dispatch('toast', { ShowModal: true, text: '请输入有效的专业名称' })
      } else {
        return true
      }
    },
    ValidateField() {
      if (!this.validate(/^[A-Za-z\u4e00-\u9fa5]{0,20}$/, this.field)) {
        this.$store.dispatch('toast', { ShowModal: true, text: '请输入有效的研究方向' })
      } else {
        return true
      }
    },
    validate(ValidateExpression, value) {
      return ValidateExpression.test(value)
    },
    init({ username, email, school, major, field }) {
      this.username = username
      this.email = email
      this.school = school
      this.major = major
      this.field = field
    },
    SaveBasic() {
      if (this.ValidateUsername() && this.ValidatePassword() && this.ValidateConfirmPassword()) {
        this.axios.post('/main/update-basic', {
          username: this.username,
          password: this.password
        }).then(() => {
          this.$store.dispatch('toast', { ShowModal: true, text: '修改成功', state: 0 })
        }).catch((resp) => {
          this.$store.dispatch('toast', { ShowModal: true, text: resp.msg })
        })
      }
    },
    SavePersonal() {
      if (this.ValidateSchool() && this.ValidateMajor() && this.ValidateField()) {
        this.axios.post('/main/update-me', {
          school: this.school === '' ? '门头沟大学' : this.school,
          major: this.major === '' ? '化学' : this.major,
          field: this.field === '' ? '有机' : this.field
        }).then(() => {
          this.$store.dispatch('toast', { ShowModal: true, text: '修改成功', state: 0 })
        }).catch((resp) => {
          this.$store.dispatch('toast', { ShowModal: true, text: resp.msg })
        })
      }
    }
  },
  mounted() {
    // 获取基本信息和个人信息
    this.axios.get('/main/info').then((data) => {
      this.init(data)
    }).catch((resp) => {
      this.$store.dispatch('toast', { ShowModal: true, text: resp.msg })
    })
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
