<template>
  <div class="reaction-form-date">
    <input type="date" name="date" v-model="date">
    <div class="tags">
      <span v-for="(item, index) in tags" :key="index" class="word-wrap" contenteditable="true"
        :id="`tag${index + 1}`">{{
    item
        }}</span>
      <span id="addTag">+</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReactionFormDate',
  data() {
    return {
      showAddTag: false,
      date: '2022-03-04',
      tags: ['你好', 'ddddd']
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
    display: flex;

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

    #addTag {
      cursor: pointer;
      border: 1px dashed #555555;
      width: 80px;
      text-align: center;
      color: #000000;
    }
  }
}
</style>
