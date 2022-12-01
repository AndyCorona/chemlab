<template>
  <div class="main-reaction">
    <div class="wrapper" v-for="(item, i) in ReactionList" :key="i"
      @click="this.$router.push('/main/project/reaction')">
      <p class="word-wrap">{{ item.name }}</p>
      <p>{{ item.updateDate }}</p>
      <p>
        <span class="word-wrap" v-for="(tag, j) in item.tags" :key="j">{{ tag }}</span>
      </p>
      <main-check-box></main-check-box>
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
  data() {
    return {
    }
  },
  computed: {
    ReactionList() {
      return this.$store.state.ProjectInfo.reactions
    }
  },
  methods: {
    init() {

    }
  },
  mounted() {
    this.init()
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
