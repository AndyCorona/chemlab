<template>
  <div class="home-update-password">
    <home-input class="username" type="password" placeholder="yeyangzhi" label="用户名" name="username"></home-input>
    <home-input class="email" type="password" placeholder="yeyzh@shanghaitech.edu.cn" label="邮箱" name="email">
    </home-input>
    <home-input type="password" placeholder="请输入6-20个字符的英文、数字或特殊字符" label="密码" name="password"></home-input>
    <home-input type="password" placeholder="请再次确认密码" label="二次确认" name="password-confirm"></home-input>
    <home-button @click="ConfirmUpdate($event)" buttonText="确认修改" buttonStyle="green"></home-button>
  </div>
</template>

<script>
import HomeInput from '../components/HomeInput.vue'
import HomeButton from '../components/HomeButton.vue'
export default {
  name: 'HomeUpdatePassword',
  components: {
    HomeInput,
    HomeButton
  },
  methods: {
    ConfirmUpdate (event) {
      // 校验后修改密码
      event.preventDefault()
    }
  }
}
</script>

<style lang="scss">
.home-update-password {
  .username, .email {
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
