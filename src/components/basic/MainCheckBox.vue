<template>
  <div class="main-check-box">
    <!-- 防止点击复选框之后跳转页面 -->
    <div class="active" @click.stop="">
      <input type="checkbox" :id="`checkbox${RandomNum}`">
      <label :for="`checkbox${RandomNum}`"></label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainCheckBox',
  data () {
    return {
      RandomNum: 1
    }
  },
  mounted () {
    this.RandomNum = Math.random()
  }
}
</script>

<style lang="scss">
.main-check-box {
  .active {
    margin: 0px;
    padding: 0px;
    width: 16px;
    height: 16px;
    border: 3px solid #000000;
    border-radius: 1px;
  }

  input {
    display: none;
  }

  label {
    display: block;
    margin: 2px;
    padding: 0px;
    width: 12px;
    height: 12px;
    background-color: #19546f;
    border-radius: 1px;
    opacity: 0;
  }

  input:checked+label {
    opacity: 1;
  }
}
</style>
