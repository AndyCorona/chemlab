<template>
  <div class="main-reaction">
    <div class="wrapper" v-for="(item, i) in ReactionList" :key="i" @click="this.$router.push('/main/project/reaction')">
      <p class="word-wrap">{{ item.name }}</p>
      <p>{{ item.date }}</p>
      <p>
        <span class="word-wrap" v-for="(tag, j) in item.tags" :key="j">{{  tag  }}</span>
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
  data () {
    return {
      ReactionList: [
        { name: '我们得出两条不可争辩的真理：第一条是，具有决定性的机动越简单，就越有把握成功；第二条是，在战斗过程中随机应变采取突然的机动，往往比事先预定的计划容易获得成功。', date: '2022-12-12', tags: ['操作系统', '分布式系统', '基于linux内核的防御攻击系统的研究'] },
        { name: '银机冲雾指燕京，十一年来无此行。身健更应坚晚志，为民为党献余生。任凭脚下白云浮，欲上青天瞰九州。顷刻京华眼前见，心随机首共悠悠。', date: '2022-12-11', tags: ['操作系统', '随机汉字生成器', '基于linux内核的防御攻击系统的研究'] },
        { name: '实验、坚持不懈、试错、冒险', date: '2022-11-11', tags: ['这是第三组标签的第三个反应', '随机句子生气器的主要原理是', '基于linux内核的防御攻击系统的研究'] }
      ]
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
      width: 430px;
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
