<template>
  <div class="home-footer">
    <div class="wrapper">
      <p>登录或完成注册即代表你同意
        <a href="/#/user-agreement">用户协议</a>
        和
        <a href="/#/privacy-policy">隐私政策</a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeFooter'
}
</script>

<style lang="scss">
.home-footer {
  .wrapper {
    width: 300px;
    padding: 0 75px;
    margin: 30px auto;

    p {
      color: #797979;

      a {
        font-size: 12px;
        color: #797979;
        text-decoration: underline;
        font-weight: 600;
      }
    }
  }
}
</style>
