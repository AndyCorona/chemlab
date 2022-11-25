<template>
  <div class="main-left-bar" style="font-size:50px">
    <main-left-bar-button img="/imgs/左边栏/我的实验.svg" text="我的实验" ClassType="button"></main-left-bar-button>
    <main-left-bar-button img="/imgs/左边栏/我的课题组.svg" text="我的课题组" ClassType="button"></main-left-bar-button>
    <main-left-bar-title></main-left-bar-title>
    <main-left-bar-list></main-left-bar-list>
  </div>
</template>

<script>
import MainLeftBarButton from '../basic/MainLeftBarButton.vue'
import MainLeftBarTitle from '../basic/MainLeftBarTitle.vue'
import MainLeftBarList from '../basic/MainLeftBarList.vue'
export default {
  name: 'MainLeftBar',
  components: {
    MainLeftBarButton,
    MainLeftBarTitle,
    MainLeftBarList
  }
}
</script>

<style lang="scss">
.main-left-bar {
  position: sticky;
  top: 0;
  width: 300px;
  height: 1080px;
  background-color: rgb(255, 255, 255);
  border-right: 1px solid #D7D7D7;
}
</style>
