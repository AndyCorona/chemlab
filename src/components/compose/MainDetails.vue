<template>
  <div class="main-details">
    <div class="left-container">
      <label class="title">基本信息</label>
      <div class="basic-details">
        <div class="wrapper">
          <label>邮箱：</label>
          <input type="text" readonly :placeholder="this.email">
        </div>
        <div class="wrapper">
          <label>用户名：</label>
          <input @change="ValidateUsername" :class="this.BasicToggle ? 'unchangable' : 'changable'" type="text"
            :readonly="BasicToggle" v-model="username" :placeholder="this.username">
        </div>
        <div class="wrapper">
          <label>密码：</label>
          <input @change="ValidatePassword" :class="this.BasicToggle ? 'unchangable' : 'changable'" type="password"
            :readonly="BasicToggle" v-model="password" :placeholder="this.password">
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
        <div class="wrapper">
          <label>学校：</label>
          <input @change="ValidateSchool" :class="this.PersonalToggle ? 'unchangable' : 'changable'" type="text"
            :readonly="PersonalToggle" v-model="school" :placeholder="this.school">
        </div>
        <div class="wrapper">
          <label>专业：</label>
          <input @change="ValidateMajor" :class="this.PersonalToggle ? 'unchangable' : 'changable'" type="text"
            :readonly="PersonalToggle" v-model="major" :placeholder="this.major">
        </div>
        <div class="wrapper">
          <label>研究领域：</label>
          <input @change="ValidateField" :class="this.PersonalToggle ? 'unchangable' : 'changable'" type="text"
            :readonly="PersonalToggle" v-model="field" :placeholder="this.field">
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
      password: '',
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
        this.$emit('toast', true, '请输入有效的用户名', 1)
      } else {
        return true
      }
    },
    ValidatePassword() {
      if (!this.validate(/^[A-Za-z0-9\u4e00-\u9fa5@#$%^&*]{6,20}$/, this.password)) {
        this.$emit('toast', true, '请输入有效的密码', 1)
      } else {
        return true
      }
    },
    ValidateSchool() {
      if (!this.validate(/^[A-Za-z\u4e00-\u9fa5]{0,20}$/, this.school)) {
        this.$emit('toast', true, '请输入有效的学校名称', 1)
      } else {
        return true
      }
    },
    ValidateMajor() {
      if (!this.validate(/^[A-Za-z\u4e00-\u9fa5]{0,20}$/, this.major)) {
        this.$emit('toast', true, '请输入有效的专业名', 1)
      } else {
        return true
      }
    },
    ValidateField() {
      if (!this.validate(/^[A-Za-z\u4e00-\u9fa5]{0,20}$/, this.field)) {
        this.$emit('toast', true, '请输入有效的研究方向', 1)
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
      // 可以不用修改密码，当不修改密码时，密码一栏放空
      if (this.ValidateUsername() && (this.password === '' || this.ValidatePassword())) {
        this.axios.post('/main/update-basic', {
          username: this.username,
          password: this.password
        }).then(() => {
          this.$emit('toast', true, '修改成功', 0)
        }).catch((resp) => {
          this.$emit('toast', true, resp.msg, 1)
        })
      }
    },
    SavePersonal() {
      if (this.ValidateSchool() && this.ValidateMajor && this.ValidateField()) {
        this.axios.post('/main/update-me', {
          school: this.school,
          major: this.major,
          field: this.field
        }).then(() => {
          this.$emit('toast', true, '修改成功', 0)
        }).catch((resp) => {
          this.$emit('toast', true, resp.msg, 1)
        })
      }
    }
  },
  mounted() {
    // 获取基本信息和个人信息
    this.axios.get('/main/info').then((data) => {
      this.init(data)
    }).catch((resp) => {
      this.$emit('toast', true, resp.msg, 1)
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
        margin: 55px 130px 55px 90px;
        width: 400px;
        height: 40px;
        justify-content: space-around;

        label {
          font-size: 16px;
          font-weight: bold;
        }

        input {
          background: #E0E6E3;
          border-radius: 5px;
          border: none;
          font-size: 14px;
          width: 300px;
          height: 40px;
          line-height: 40px;
          padding: 6px 10px;
          box-sizing: border-box;
          box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
        }

        .changable {
          color: #000000;
        }

        .unchangable {
          color: #B3B3B3;
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

        .save {
          background-color: #638271;
          border: 1px solid #638271;
        }

        .toggle {
          background-color: #D7D7D7;
          border: 1px solid #AAAAAA;
        }
      }
    }
  }
}
</style>
