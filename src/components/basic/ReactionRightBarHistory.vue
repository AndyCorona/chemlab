<template>
  <div class="reaction-right-bar-history">
    <a @click="func(item.id)" href="javascript:;" v-for="(item, index) in this.$store.state.reactionInfo.versions" :key="index">{{
        item.updateDate
    }}</a>
  </div>
</template>

<script>

export default {
  name: 'ReactionRightBarHistory'
}
</script>

<style lang="scss" >
.reaction-right-bar-history {
  height: 375px;

  a {
    padding-bottom: 10px;
    text-align: center;
    margin: 0 35px;
    display: block;
    font-size: 20px;
    color: #000000;
  }

  a:hover {
    color: gray;
  }

  a:before {
    margin: 10px;
    content: '•';
  }

  a:last-child {
    padding-bottom: 0;
  }
}
</style>
