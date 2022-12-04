<template>
  <div class="reaction-form-date">
    <input type="date" name="date" v-model="date">
    <div class="tags">
      <span title="没有文字的标签不会被保存" :ref="`tag${index}`" v-for="(item, index) in this.$store.state.reactionInfo.tags"
        :key="index" contenteditable="true" :id="`tag${index + 1}`" @input.prevent=""
        @focusout="validateTag($event, index)">{{
            item
        }}</span>
      <span id="addTag" v-show="(this.tags.length < 3)" @click="addTag">+</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReactionFormDate',
  data() {
    return {
      date: this.$store.state.reactionInfo.updateDate,
      tags: []
    }
  },
  updated() {
    const index = this.tags.length
    if (this.$refs[`tag${index - 1}`]) {
      this.$refs[`tag${index - 1}`][0].focus()
    }
  },
  methods: {
    addTag() {
      this.tags.forEach(item => {
        if (item.trim() === '') {
          this.$store.commit('toast', { text: '没有内容的标签将不会被保存', state: 2, durationTime: 3000 })
        }
      })
      this.tags.push('')
    },
    validateTag(event, index) {
      if (!/^.{0,10}$/.test(event.target.innerHTML)) {
        this.$store.commit('toast', { text: `标签${index + 1}的字数超过 10 个`, state: 2, durationTime: 3000 })
      }
      if (event.target.innerHTML.trim() === '') {
        this.$store.commit('toast', { text: '没有内容的标签将不会被保存', state: 2, durationTime: 3000 })
      }
    }
  },
  computed: {
    readonlyDate() {
      return this.$store.state.reactionInfo.updateDate
    },
    readonlyTags() {
      return this.$store.state.reactionInfo.tags
    }
  },
  watch: {
    readonlyDate: {
      handler(newVal) {
        this.date = newVal
      }
    },
    readonlyTags(newVal) {
      this.tags = newVal
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
      box-sizing: border-box;
      overflow: hidden;
      white-space: nowrap;
      padding: 4px 10px;
      border-radius: 5px;
      font-size: 16px;
      height: 30px;
      outline: none;
      display: inline-block;
      color: #FFFFFF;
      min-width: 20px;
      max-width: 180px;
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
