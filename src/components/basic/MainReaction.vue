<template>
  <div class="main-reaction">
    <div class="wrapper" v-for="(item, i) in $store.state.projectInfo.reactions" :key="i" @click="toReaction(item.id)">
      <p class="word-wrap">{{ item.name }}</p>
      <p>{{ item.updateDate }}</p>
      <p>
        <span class="word-wrap" v-for="(tag, j) in item.tags" :key="j">{{ tag }}</span>
      </p>
      <main-check-box v-if="show" @change="(checked) => { selection(checked, item.id) }"></main-check-box>
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
      selectedReactions: []
    }
  },
  methods: {
    selection(checked, id) {
      if (checked) {
        this.selectedReactions.push(id)
      } else {
        // 遍历数组，找到该 id 对应的下标，然后进行删除
        this.selectedReactions.forEach((item, index) => {
          if (item === id) {
            this.selectedReactions.splice(index, 1)
          }
        })
      }
      this.$emit('change', this.selectedReactions)
    },
    toReaction(id) {
      sessionStorage.setItem('reactionId', id)
      this.$router.push(`/main/${this.$store.state.isGroup ? 'group' : 'user'}/project/reaction`)
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/scss/base.scss';

.main-reaction {
  padding-bottom: 200px;
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
      width: 540px;
      text-align: left;
    }

    p:nth-child(2) {
      width: 140px;
      text-align: center;
    }

    p:nth-child(3) {
      text-align: center;
      width: 574px;
      display: flex;
      align-items: center;

      span {
        max-width: 160px;
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

  .wrapper:hover {
    background-color: rgb(236, 235, 235);
  }
}
</style>
