<template>
  <div class="reaction-view" ref="ReactionViewRef">
    <main-left-bar></main-left-bar>
    <div class="right-container">
      <main-top-bar :TopBarLeftImg="TopBarLeftImg" :TopBarSettingImg="TopBarSettingImg"
        :TopBarLogoutImg="TopBarLogoutImg" :NavPath="NavPath"></main-top-bar>
      <div class="wrapper">
        <reaction-form></reaction-form>
        <reaction-right-bar></reaction-right-bar>
      </div>
    </div>
  </div>
</template>

<script>
import MainLeftBar from '../components/compose/MainLeftBar.vue'
import MainTopBar from '../components/basic/MainTopBar.vue'
import ReactionForm from '../components/compose/ReactionForm.vue'
import ReactionRightBar from '../components/compose/ReactionRightBar.vue'
export default {
  name: 'ReactionView',
  components: {
    MainLeftBar,
    MainTopBar,
    ReactionForm,
    ReactionRightBar
  },
  data() {
    return {
      TopBarLeftImg: this.$config.TopBarLeftImg,
      TopBarSettingImg: this.$config.TopBarSettingImg,
      TopBarLogoutImg: this.$config.TopBarLogoutImg,
      NavPath: [{ name: '我的实验', path: '/#/main/user' }, { name: '项目', path: '/#/main/project' }, { name: '反应', path: '/#/main/project/reaction' }]
    }
  },
  mounted() {
    window.onbeforeunload = function () {
      return ''
    }
  }
}
</script>

<style lang="scss">
@import '../assets/scss/config.scss';

.reaction-view {
  width: $min-width;
  margin: 0 auto;
  display: flex;

  .wrapper {
    display: flex;
  }
}
</style>
