<template>
  <div class="reaction-form-title">
    <img src="/imgs/实验内容/实验标题.svg">
    <input type="text" name="title" v-model="FormData.title">
  </div>
</template>

<script>
export default {
  name: 'ReactionFormTitle',
  data () {
    return {
      FormData: {
        title: '未命名'
      }
    }
  }
}
</script>
<style lang="scss">
.reaction-form-title {
  display: flex;
  margin: 0 40px;
  border-bottom: 1px solid #000000;

  img {
    width: 32px;
    height: 32px;
    margin: 15px;
  }

  input {
    border: none;
    font-weight: bold;
    font-size: 36px;
    width: 1000px;
  }
}
</style>
