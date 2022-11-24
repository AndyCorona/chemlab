<template>
  <div class="reaction-module-title">
    <input type="text" :name='name' :placeholder='placeholder' v-model="title">
    <img class="delete-reaction" src="/imgs/用户主页/删除项目.svg">
  </div>
</template>

<script>
export default {
  name: 'ReactionModuleTitle',
  props: {
    placeholder: String,
    name: String
  },
  data() {
    return {
      title: ''
    }
  }
}
</script>
<style lang="scss">
.reaction-module-title {
  position: relative;
  width: 1200px;
  box-sizing: border-box;
  padding-top: 20px;

  &:hover img {
    transition: opacity 1s;
    opacity: 100%;
  }

  .delete-reaction {
    opacity: 0;
    cursor: pointer;
    position: absolute;
    top: 20px;
    right: 0px;
    width: 20px;
    height: 20px;
  }

  input {
    width: 1150px;
    border: none;
    font-size: 20px;
    line-height: 20px;
    font-weight: bold;
    margin-bottom: 10px;
  }
}
</style>
