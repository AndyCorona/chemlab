<template>
  <div class="main-left-bar-list">
    <div class="wrapper" v-show="isJoinGroup">
      <div class="left-wrapper" @click="createGroup">
        <img src="/imgs/左边栏/创建.svg">
        <span>创建课题组</span>
      </div>
    </div>
    <div class="wrapper" v-show="isJoinGroup">
      <div class="left-wrapper" @click="joinGroup">
        <img src="/imgs/左边栏/加入.svg">
        <span>加入课题组</span>
      </div>
    </div>
    <div class="wrapper" v-show="!isJoinGroup" v-for="(item, index) in groupMemberList" :key="index">
      <div class="left-wrapper">
        <img :src="item.logo">
        <span>{{ item.name }}</span>
      </div>
      <div class="right-wrapper">
        <img src="/imgs/左边栏/组长.svg" v-show="item.isAdmin">
        <img src="/imgs/左边栏/成员.svg" v-show="!item.isAdmin">
        <!-- 群主不能删除自己 -->
        <img @click="deleteMember(item.name)" src="/imgs/左边栏/删除成员.svg" v-show="isAdmin && !item.isAdmin">
      </div>
    </div>
    <div class="wrapper" v-show="(!isJoinGroup && isAdmin)">
      <div class="left-wrapper" @click="addMember">
        <img src="/imgs/左边栏/添加成员.svg">
        <span>添加成员</span>
      </div>
    </div>
    <div class="wrapper" v-show="(!isJoinGroup && isAdmin)">
      <div class="left-wrapper" @click="quit(1)">
        <img src="/imgs/左边栏/解散群组.svg">
        <span>解散课题组</span>
      </div>
    </div>
    <div class="wrapper" v-show="(!isJoinGroup && !isAdmin)">
      <div class="left-wrapper" @click="quit(0)">
        <img src="/imgs/左边栏/解散群组.svg">
        <span>退出课题组</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainLeftBarList',
  emits: ['create', 'join', 'addMember'],
  data() {
    return {
      deleteUserName: ''
    }
  },
  methods: {
    // state 标识是解散还是退出，0 代表退出， 1 代表解散
    quit(state = 0) {
      this.$store.commit('dialog', { text: `是否${state === 0 ? '退出' : '解散'}当前课题组?`, title: `${state === 0 ? '退出' : '解散'}提醒` })
      this.$store.commit('bindOkEvent', this.confirmQuit)
    },
    confirmQuit() {
      this.axios.delete('/group/quit').then(() => {
        this.$store.dispatch('toast', { text: '操作成功', state: 0 })
        // 清空 vuex 中的群组信息
        this.$store.dispatch('saveGroupInfo', {})
        // 用户可以在任何地方选择退出群组，所以退出后跳转到用户个人空间
        this.$router.push('/main')
      }).catch((resp) => {
        this.$store.dispatch('toast', { text: resp.msg })
      })
    },
    deleteMember(name) {
      this.$store.commit('dialog', { text: `是否将${name}移除？`, title: '删除提醒' })
      this.deleteUserName = name
      this.$store.commit('bindOkEvent', this.confirmDeleteMember)
    },
    confirmDeleteMember() {
      this.axios.delete('/group', {
        deleteUserName: this.deleteUserName
      }).then((data) => {
        this.$store.dispatch('toast', { text: '移除成功', state: 0 })
        this.$store.dispatch('saveGroupInfo', data)
      }).catch((resp) => {
        this.$store.dispatch('toast', { text: resp.msg })
      })
    },
    createGroup() {
      this.$emit('create')
    },
    joinGroup() {
      this.$emit('join')
    },
    addMember() {
      this.$emit('addMember')
    },
    confirmAddMember() {
    }
  },
  computed: {
    // 是否出现 "创建课题组" 和 "加入课题组"
    isJoinGroup() {
      return !this.$store.state.groupInfo.groupUUID
    },
    groupMemberList() {
      return this.$store.state.groupInfo.members
    },
    // 当前用户是否为群主
    isAdmin() {
      return this.$store.state.groupInfo.isAdmin
    }
  }
}
</script>

<style lang="scss">
.main-left-bar-list {
  margin: 0 50px;

  .wrapper {
    margin-bottom: 13px;
    display: flex;
    align-items: center;

    &:hover .right-wrapper img {
      transition: opacity 1s;
      opacity: 100%;
    }

    .left-wrapper {
      cursor: pointer;
      display: flex;
      align-items: center;

      span {
        display: inline-block;
        font-size: 16px;
        margin: 0 10px;
        min-width: 130px;
      }

      img {
        width: 16px;
        height: 16px;
      }
    }

    .right-wrapper {
      display: flex;
      align-items: center;

      img {
        cursor: pointer;
        margin: 1px;
        opacity: 0;
        width: 16px;
        height: 16px;
      }
    }
  }

}
</style>
