<template>
  <div class="main-left-bar-list">
    <div class="wrapper" v-show="IsJoinGroup">
      <div class="left-wrapper" @click="CreateGroup">
        <img src="/imgs/左边栏/创建.svg">
        <span>创建课题组</span>
      </div>
    </div>
    <div class="wrapper" v-show="IsJoinGroup">
      <div class="left-wrapper" @click="JoinGroup">
        <img src="/imgs/左边栏/加入.svg">
        <span>加入课题组</span>
      </div>
    </div>
    <div class="wrapper" v-show="!IsJoinGroup" v-for="(item, index) in GroupMemberList" :key="index">
      <div class="left-wrapper">
        <img :src="item.logo">
        <span>{{ item.name }}</span>
      </div>
      <div class="right-wrapper">
        <img src="/imgs/左边栏/组长.svg" v-show="item.isAdmin">
        <img src="/imgs/左边栏/成员.svg" v-show="!item.isAdmin">
        <!-- 群主不能删除自己 -->
        <img @click="DeleteMember(item.name)" src="/imgs/左边栏/删除成员.svg" v-show="IsAdmin && !item.isAdmin">
      </div>
    </div>
    <div class="wrapper" v-show="!IsJoinGroup && IsAdmin">
      <div class="left-wrapper" @click="AddMember">
        <img src="/imgs/左边栏/添加成员.svg">
        <span>添加成员</span>
      </div>
    </div>
    <div class="wrapper" v-show="!IsJoinGroup && IsAdmin">
      <div class="left-wrapper" @click="quit(1)">
        <img src="/imgs/左边栏/解散群组.svg">
        <span>解散课题组</span>
      </div>
    </div>
    <div class="wrapper" v-show="!IsJoinGroup && !IsAdmin">
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
      this.$store.commit('dialog', { ShowModal: true, text: `是否${state === 0 ? '退出' : '解散'}当前课题组?`, title: `${state === 0 ? '退出' : '解散'}提醒` })
      this.$store.commit('BindOkEvent', this.ConfirmQuit)
    },
    ConfirmQuit() {
      this.axios.delete('/group/quit').then(() => {
        this.$store.dispatch('toast', { ShowModal: true, text: '操作成功', state: 0 })
        // 清空 vuex 中的群组信息
        this.$store.dispatch('SaveGroupInfo', {})
        // 用户可以在任何地方选择退出群组，所以退出后跳转到用户个人空间
        this.$router.push('/main')
      }).catch((resp) => {
        this.$store.dispatch('toast', { ShowModal: true, text: resp.msg })
      })
    },
    DeleteMember(name) {
      this.$store.commit('dialog', { ShowModal: true, text: `是否将${name}移除？`, title: '删除提醒' })
      this.deleteUserName = name
      this.$store.commit('BindOkEvent', this.ConfirmDeleteMember)
    },
    ConfirmDeleteMember() {
      this.axios.delete('/group', {
        deleteUserName: this.deleteUserName
      }).then((data) => {
        this.$store.dispatch('toast', { ShowModal: true, text: '移除成功', state: 0 })
        this.$store.dispatch('SaveGroupInfo', data)
      }).catch((resp) => {
        this.$store.dispatch('toast', { ShowModal: true, text: resp.msg })
      })
    },
    CreateGroup() {
      this.$emit('create')
    },
    JoinGroup() {
      this.$emit('join')
    },
    AddMember() {
      this.$emit('addMember')
    },
    ConfirmAddMember() {
    }
  },
  computed: {
    // 是否出现 "创建课题组" 和 "加入课题组"
    IsJoinGroup() {
      return !this.$store.state.GroupInfo.groupUUID
    },
    GroupMemberList() {
      return this.$store.state.GroupInfo.members
    },
    // 当前用户是否为群主
    IsAdmin() {
      return this.$store.state.GroupInfo.isAdmin
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
