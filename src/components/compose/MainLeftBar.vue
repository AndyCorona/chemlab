<template>
  <div class="main-left-bar" style="font-size:50px">
    <main-left-bar-button @click="this.$router.push('/main/user')" img="/imgs/左边栏/我的实验.svg" text="我的实验"
      classType="button"></main-left-bar-button>
    <main-left-bar-button @click="this.$router.push('/main/group')" img="/imgs/左边栏/我的课题组.svg" text="我的课题组"
      classType="button"></main-left-bar-button>
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
  },
  mounted() {
    this.init()
  },
  updated() {
    const height = document.body.clientHeight
    this.$store.dispatch('saveHeight', height)
  },
  methods: {
    init() {
      this.axios.get('/group').then((data) => {
        this.$store.dispatch('saveGroupInfo', data)
      }).catch((resp) => {
        this.$store.dispatch('toast', { text: resp.msg })
      })
    }
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
}
</style>
