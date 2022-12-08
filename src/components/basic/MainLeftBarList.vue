<template>
  <div class="main-left-bar-list">
    <div class="wrapper" v-show="noGroup">
      <div class="left-wrapper" @click="createGroup">
        <img src="/imgs/左边栏/创建.svg">
        <span>创建课题组</span>
      </div>
    </div>
    <div class="wrapper" v-show="noGroup">
      <div class="left-wrapper" @click="joinGroup">
        <img src="/imgs/左边栏/加入.svg">
        <span>加入课题组</span>
      </div>
    </div>
    <div class="wrapper" v-show="!noGroup" v-for="(item, index) in this.$store.state.groupInfo.members" :key="index">
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
    <div class="wrapper" v-show="(!noGroup && isAdmin && this.$store.state.groupInfo.members.length < 20)">
      <div class="left-wrapper" @click="addMember">
        <img src="/imgs/左边栏/添加成员.svg">
        <span>添加成员</span>
      </div>
    </div>
    <div class="wrapper" v-show="(!noGroup && isAdmin)">
      <div class="left-wrapper" @click="quit(1)">
        <img src="/imgs/左边栏/解散群组.svg">
        <span>解散课题组</span>
      </div>
    </div>
    <div class="wrapper" v-show="(!noGroup && !isAdmin)">
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
  data() {
    return {
      usernameExp: /^[A-Za-z0-9\u4e00-\u9fa5]{2,20}$/,
      emailExp: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
      deleteUserName: ''
    }
  },
  methods: {
    // 校验类型[群名、群简介、群UUID、用户名、邮箱]
    validate(type) {
      if (type === 0) {
        if (!this.usernameExp.test(this.groupName)) {
          this.$store.commit('toast', { text: '请输入有效的群名' })
          return false
        }
        return true
      } else if (type === 1) {
        if (!/^[A-Za-z0-9\u4e00-\u9fa5]{0,80}$/.test(this.groupSlogon)) {
          this.$store.commit('toast', { text: '请输入有效的简介' })
          return false
        }
        return true
      } else if (type === 2) {
        if (!/^\d{10}$/.test(this.groupUUID)) {
          this.$store.commit('toast', { text: '请输入有效的群组ID' })
          return false
        }
        return true
      } else if (type === 3) {
        if (!this.usernameExp.test(this.usernameOrEmail)) {
          this.$store.commit('toast', { text: '请输入有效的用户名' })
          return false
        }
        return true
      } else if (type === 4) {
        if (!this.emailExp.test(this.usernameOrEmail)) {
          this.$store.commit('toast', { text: '请输入有效的邮箱' })
          return false
        }
        return true
      } else {
        return false
      }
    },
    // state 标识是解散还是退出，0 代表退出， 1 代表解散
    quit(state = 0) {
      this.$store.commit('modal', { text: `是否${state === 0 ? '退出' : '解散'}当前课题组?`, title: `${state === 0 ? '退出' : '解散'}提醒`, slotType: 0 })
      this.$store.commit('bindOkEvent', this.confirmQuit)
    },
    confirmQuit() {
      this.axios.delete('/group/quit').then(() => {
        this.$store.dispatch('toast', { text: '操作成功', state: 0 })
        // 清空 vuex 中的群组信息
        this.$store.dispatch('clearGroupInfo')
        // 用户可以在任何地方选择退出群组，所以退出后跳转到用户个人空间
        this.$router.push('/main')
      }).catch((resp) => {
        this.$store.dispatch('toast', { text: resp.msg })
      })
    },
    deleteMember(name) {
      this.$store.commit('modal', { text: `是否将${name}移除？`, title: '删除提醒', slotType: 0 })
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
      this.$store.commit('modal', { slotType: 2 })
      this.$store.commit('bindOkEvent', this.confirmCreateGroup)
    },

    confirmCreateGroup() {
      // 对群组名进行校验
      if (this.validate(0) && this.validate(1)) {
        if (this.groupSlogon === '') {
          this.groupSlogon = '可以申请加入一个群组'
        }
        this.axios.post('/group', {
          groupName: this.groupName,
          groupSlogon: this.groupSlogon
        }).then((data) => {
          console.log(data)
          this.$store.dispatch('toast', { text: '创建成功', state: 0 })
          this.$store.dispatch('saveGroupInfo', data)
          // 创建成功后手动关闭模态框
          this.$store.dispatch('modal', { showModal: false })
        }).catch((resp) => {
          this.$store.dispatch('toast', { text: resp.msg })
        })
      }
    },
    joinGroup() {
      this.$store.commit('modal', { slotType: 1 })
      this.$store.commit('bindOkEvent', this.confirmJoinGroup)
    },
    confirmJoinGroup() {
      if (this.validate(2)) {
        this.axios.put('/group', {
          groupUUID: this.groupUUID
        }).then((data) => {
          this.$store.dispatch('toast', { text: '加入成功', state: 0 })
          this.$store.dispatch('saveGroupInfo', data)
          // 加入成功后手动关闭模态框
          this.$store.dispatch('modal', { showModal: false })
        }).catch((resp) => {
          this.$store.dispatch('toast', { text: resp.msg })
        })
      }
    },
    addMember() {
      this.$store.commit('modal', { slotType: 3 })
      this.$store.commit('bindOkEvent', this.confirmAddMember)
    },
    confirmAddMember(autoClose = true) {
      let isUsername = true
      // 如果不是用户名也不是邮箱
      if (!this.usernameExp.test(this.usernameOrEmail) && !this.emailExp.test(this.usernameOrEmail)) {
        this.$store.commit('toast', { text: '请输入有效的信息' })
        return
      }
      if (this.emailExp.test(this.usernameOrEmail)) {
        isUsername = false
      }
      this.axios.put('/group/addMember', {
        UsernameOrEmail: this.usernameOrEmail,
        isUsername: isUsername
      }).then((data) => {
        this.$store.dispatch('toast', { text: '添加成功', state: 0 })
        this.$store.dispatch('saveGroupInfo', data)
        this.usernameOrEmail = ''
        // 添加成功后手动关闭模态框
        if (autoClose) {
          this.$store.dispatch('modal', { showModal: false })
        }
      }).catch((resp) => {
        this.$store.dispatch('toast', { text: resp.msg })
      })
    }
  },
  computed: {
    // 是否出现 "创建课题组" 和 "加入课题组"
    noGroup() {
      return !this.$store.state.groupInfo.members.length
    },
    // 当前用户是否为群主
    isAdmin() {
      return this.$store.state.groupInfo.isAdmin
    },
    groupName() {
      return this.$store.state.groupInfo.groupName
    },
    groupSlogon() {
      return this.$store.state.groupInfo.groupSlogon
    },
    groupUUID() {
      return this.$store.state.groupInfo.groupUUID
    },
    usernameOrEmail: {
      get() {
        return this.$store.state.loginInfo[0]
      },
      set(newVal) {
        this.$store.commit('saveLoginInfo', { index: 0, content: newVal })
      }
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
