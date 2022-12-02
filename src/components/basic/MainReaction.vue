<template>
  <div class="main-reaction">
    <div class="wrapper" v-for="(item, i) in reactionList" :key="i"
      @click="this.$router.push(`/main/${this.$store.state.isGroup ? 'group' : 'user'}/project/reaction`)">
      <p class="word-wrap">{{ item.name }}</p>
      <p>{{ item.updateDate }}</p>
      <p>
        <span class="word-wrap" v-for="(tag, j) in item.tags" :key="j">{{ tag }}</span>
      </p>
      <main-check-box v-show="show" @change="selection" :ReactionId="item.id"></main-check-box>
    </div>
  </div>
</template>

<script>
import MainCheckBox from '../basic/MainCheckBox.vue'
export default {
  name: 'MainReaction',
  components: {
    MainCheckBox
  },
  props: {
    show: Boolean
  },
  emits: ['change'],
  data() {
    return {
      reactionIdList: []
    }
  },
  computed: {
    reactionList() {
      return this.$store.state.projectInfo.reactions
    }
  },
  methods: {
    selection(reactionId, checked) {
      if (checked) {
        this.reactionIdList.push(reactionId)
      } else {
        // 遍历数组，找到该 id 对应的下标，然后进行删除
        this.reactionIdList.forEach((item, index) => {
          if (item === reactionId) {
            this.reactionIdList.splice(index, 1)
          }
        })
      }
      this.$emit('change', this.reactionIdList)
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/scss/base.scss';

.main-reaction {
  margin-top: 20px;

  .wrapper {
    cursor: pointer;
    margin: 0 140px 0 170px;
    display: flex;
    align-items: center;

    p {
      padding: 5px 0;
      height: 20px;
      line-height: 20px;
      font-size: 16px;
      display: inline-block;
      margin-right: 10px;
    }

    p:first-child {
      width: 725px;
      text-align: left;
    }

    p:nth-child(2) {
      width: 100px;
      text-align: center;
    }

    p:nth-child(3) {
      text-align: center;
      width: 470px;
      display: flex;
      align-items: center;

      span {
        max-width: 133px;
        padding: 3px;
        font-size: 16px;
        margin-left: 10px;
        color: #FFFFFF;
        border-radius: 3px;
      }

      span:nth-child(1) {
        background-color: #EC808D;
      }

      span:nth-child(2) {
        background-color: #02A7F0;
      }

      span:nth-child(3) {
        background-color: #8080FF;
      }
    }
  }
}
</style>
