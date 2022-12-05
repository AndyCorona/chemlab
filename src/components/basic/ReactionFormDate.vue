<template>
  <div class="reaction-form-date">
    <input type="date" name="date" v-model="date">
    <div class="tags">
      <div class="tag" v-for="(item, index) in this.$store.state.reactionInfo.tags" :key="index">
        <span title="没有文字的标签不会被保存" :ref="`tag${index}`" contenteditable="true" :id="`tag${index + 1}`"
          @input="this.tags[index] = $event.target.innerHTML" @focusout="validateTag($event, index)">{{
              item
          }}
        </span>
        <img src="/imgs/左边栏/删除成员.svg" @click.stop="deleteTag(index)">
      </div>
      <span id="addTag" v-show="(this.tags.length < 3)" @click="addTag">+</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReactionFormDate',
  inject: ['isSubmit'],
  emits: ['success', 'fail'],
  data() {
    return {
      date: this.$store.state.reactionInfo.date,
      tags: !this.$store.state.reactionInfo.tags ? [] : this.$store.state.reactionInfo.tags,
      isAddTag: false
    }
  },
  updated() {
    const index = this.tags.length
    if (this.isAddTag && this.$refs[`tag${index - 1}`]) {
      this.$refs[`tag${index - 1}`][0].focus()
      this.isAddTag = false
    }
  },
  methods: {
    addTag() {
      this.isAddTag = true
      this.tags.forEach(item => {
        if (item.trim() === '') {
          this.$store.commit('toast', { text: '没有内容的标签将不会被保存', state: 2, durationTime: 3000 })
        }
      })
      this.tags.push('')
    },
    deleteTag(index) {
      this.tags.splice(index, 1)
    },
    validateTag(event, index) {
      if (!/^.{0,10}$/.test(event.target.innerHTML)) {
        this.$store.commit('toast', { text: `标签${index + 1}的字数超过 10 个`, state: 2, durationTime: 3000 })
      }
      if (event.target.innerHTML.trim() === '') {
        this.$store.commit('toast', { text: '没有内容的标签将不会被保存', state: 2, durationTime: 3000 })
      }
    },
    serialize() {
      let isValid = true
      this.tags.forEach((item, index) => {
        if (!/^.{0,10}$/.test(item)) {
          this.$store.commit('toast', { text: `标签${index}的字数超过 10 个`, state: 2, durationTime: 3000 })
          isValid = false
        }
      })
      if (isValid) {
        this.$emit('success', this.date, this.tags)
      } else {
        this.$emit('fail')
      }
    }
  },
  computed: {
    readonlyDate() {
      return this.$store.state.reactionInfo.date
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
    },
    isSubmit(newVal) {
      if (newVal) {
        this.serialize()
      }
    }
  }
}
</script>

<style lang="scss" >
.reaction-form-date {
  display: flex;
  margin: 30px 60px;
  height: 36px;

  input {
    display: inline;
    font-size: 16px;
    border: 0;
    margin-right: 20px;
  }

  .tags {
    display: flex;

    .tag {
      position: relative;

      img {
        cursor: pointer;
        position: absolute;
        top: 0;
        right: 0;
        width: 10px;
        height: 10px;
      }
    }

    span {
      box-sizing: border-box;
      overflow: hidden;
      white-space: nowrap;
      padding: 4px 10px;
      border-radius: 5px;
      font-size: 16px;
      height: 36px;
      line-height: 28px;
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
