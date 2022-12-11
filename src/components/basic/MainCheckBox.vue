<template>
  <div class="main-check-box">
    <!-- 防止点击复选框之后跳转页面 -->
    <div class="active" @click.stop="">
      <input :checked="this.checked" type="checkbox" :id="`checkbox${randomNum}`" @change="changeFunc">
      <label :for="`checkbox${randomNum}`"></label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainCheckBox',
  emits: ['change'],
  data() {
    return {
      checked: false,
      randomNum: Math.random()
    }
  },
  methods: {
    changeFunc(event) {
      this.$emit('change', event.target.checked)
    }
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
    border: 2px solid #FFFFFF;
    display: block;
    margin: 0px;
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
