<template>
  <div class="reaction-right-bar-record">
    <div class="wrapper">
      <img src="/imgs/实验内容/模块-图片.svg">
      <span>图片</span>
    </div>
    <div class="wrapper">
      <img src="/imgs/实验内容/模块-表格.svg">
      <span>表格</span>
    </div>
    <div class="wrapper">
      <img src="/imgs/实验内容/模块-文本.svg">
      <span>文本</span>
    </div>
    <div class="wrapper">
      <img src="/imgs/实验内容/模块-数据.svg">
      <span>数据</span>
    </div>
    <div class="wrapper">
      <img src="/imgs/实验内容/模块-引文.svg">
      <span>引文</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReactionRightBarRecord'
}
</script>

<style lang="scss" >
.reaction-right-bar-record {
  .wrapper {
    width: 240px;
    height: 50px;
    margin: 0 30px 15px 30px;
    background-color: #F1EDDF;
    border-radius: 5px;
    display: flex;
    align-items: center;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.35);

    img {
      margin: 12px;
      width: 24px;
      height: 24px;
    }
    span {
      font-size: 16px;
      font-weight: bold;
    }
  }
}
</style>
