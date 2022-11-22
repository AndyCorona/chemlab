<template>
  <div class="reaction-form-date">
    <input type="date" name="date" v-model="date">
    <div class="tags">
      <span class="word-wrap" contenteditable="true" id="tag1">{{ tags[0] }}</span>
      <span class="word-wrap" contenteditable="true" id="tag2">{{ tags[1] }}</span>
      <span class="word-wrap" contenteditable="true" id="tag3">{{ tags[2] }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReactionFormDate',
  data () {
    return {
      date: '2022-03-04',
      tags: ['你好', 'ddddd', '到啥地方厚爱哈佛i会收到粉丝的红爱豆']
    }
  }
}
</script>

<style lang="scss" >
.reaction-form-date {
  display: flex;
  margin: 30px 60px;

  input {
    display: inline;
    font-size: 16px;
    border: 0;
    margin-right: 20px;
  }

  .tags {
    span {
      padding: 4px;
      border-radius: 5px;
      font-size: 16px;
      height: 20px;
      line-height: 20px;
      outline: none;
      display: inline-block;
      color: #FFFFFF;
      min-width: 20px;
      max-width: 133px;
      margin-left: 20px;
    }

    #tag1 {
      background-color: #EC808D;
    }

    #tag2 {
      background-color: #02A7F0;
    }

    #tag3 {
      background-color: #8080FF;
    }
  }
}
</style>
