<template>
  <div class="reaction-right-bar-history">
    <a href="" v-for="(item, index) in HistoryList" :key="index">{{item.date}}</a>
  </div>
</template>

<script>

export default {
  name: 'ReactionRightBarHistory',
  data () {
    return {
      HistoryList: [
        { date: '2022-04-13 11:11:42' },
        { date: '2022-04-13 11:11:42' },
        { date: '2022-04-13 11:11:42' },
        { date: '2022-04-13 11:11:42' },
        { date: '2022-04-13 11:11:42' },
        { date: '2022-04-13 11:11:42' },
        { date: '2022-04-13 11:11:42' },
        { date: '2022-04-13 11:11:42' },
        { date: '2022-04-13 11:11:42' },
        { date: '2022-04-13 11:11:42' }
      ]
    }
  }
}
</script>

<style lang="scss" >
.reaction-right-bar-history{
  a {
    padding-bottom: 10px;
    text-align: center;
    margin: 0 35px ;
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
