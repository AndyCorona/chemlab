<template>
  <div class="reaction-right-bar-history">
    <a draggable="false" @click="toVersion(item.id)" href="javascript:;" v-for="(item, index) in this.$store.state.reactionInfo.versions"
      :key="index" :class="(item.id === $store.state.versionId ? 'nowVersion' : '')">{{
    item.updateDate
      }}</a>
  </div>
</template>

<script>
export default {
  name: 'ReactionRightBarHistory',
  data() {
    return {
      id: null
    }
  },
  methods: {
    toVersion(id) {
      // 如果用户点击到当前版本，提醒用户已经处于当前本班了，无需进行切换
      if (id === this.$store.state.versionId) {
        this.$store.commit('toast', { text: '已经处于当前版本', state: 2 })
        return
      }
      this.id = id
      // 用户点击版本切换时，计算 hash 值，若 hash 值和上一次保存的值不同，则提醒用户应该先进行保存，否则直接进行版本切换
      const thisReactionHash = this.$md5(JSON.stringify(this.$store.state.reactionInfo))
      // 有实验内容还没保存，弹窗提醒用户先进行保存
      if (thisReactionHash !== this.$store.state.lastReactionHash) {
        this.$store.commit('modal', { text: '是否丢弃尚未保存的实验数据', title: '版本切换提醒', slotType: 0 })
        // 绑定点击确认按钮事件
        this.$store.commit('bindOkEvent', this.confirmToVersion)
      } else {
        this.confirmToVersion()
      }
    },
    confirmToVersion() {
      const reactionId = this.$store.state.reactionInfo.id
      this.axios.get('/version', {
        params: {
          reactionId: reactionId,
          versionId: this.id
        }
      }).then((data) => {
        this.$store.dispatch('saveVersoinId', data.vid)
        data.unSaveReactionName = data.name
        this.$store.dispatch('saveReactionInfo', data)
        // 计算本次获取的实验内容的 hash 值
        this.$store.dispatch('saveLastReactionHash', this.$md5(JSON.stringify(this.$store.state.reactionInfo)))
        this.$store.dispatch('saveUncheckLeaveReaction', true)
      }).catch((resp) => {
        this.$store.dispatch('toast', { text: resp.msg })
      })
    }
  }
}
</script>

<style lang="scss" >
.reaction-right-bar-history {
  height: 375px;

  .nowVersion {
    font-weight: bold;
  }

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
