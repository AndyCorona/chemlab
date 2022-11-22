<template>
  <div class="reaction-right-bar-title">
    <img :src="img">
    <span>{{title}}</span>
  </div>
</template>
<script>
export default {
  name: 'ReactionRightBarTitle',
  props: {
    title: String,
    img: String
  }
}
</script>

<style lang="scss">
.reaction-right-bar-title {
  margin: 25px 10px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #000000;
  padding: 4px 10px;

  img {
    width: 24px;
    height: 24px;
  }

  span {
    line-height: 30px;
    margin-left: 10px;
    font-size: 24px;
    font-weight: bold;
  }
}
</style>
