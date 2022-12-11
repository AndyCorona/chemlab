<template>
  <div class="main-left-bar-list">
    <div class="wrapper" v-if="!members.length">
      <div class="left-wrapper" @click="createGroup">
        <img draggable="false" src="/imgs/左边栏/创建.svg">
        <span>创建课题组</span>
      </div>
    </div>
    <div class="wrapper" v-if="!members.length">
      <div class="left-wrapper" @click="joinGroup">
        <img draggable="false" src="/imgs/左边栏/加入.svg">
        <span>加入课题组</span>
      </div>
    </div>
    <div class="wrapper" v-show="!!members.length" v-for="(item, index) in members" :key="index">
      <div class="left-wrapper">
        <img draggable="false" :src="item.logo">
        <span>{{ item.name }}</span>
      </div>
      <div class="right-wrapper">
        <img draggable="false" src="/imgs/左边栏/组长.svg" v-if="item.isAdmin" title="这是组长">
        <img draggable="false" src="/imgs/左边栏/成员.svg" v-if="!item.isAdmin" title="这是成员">
        <!-- 群主不能删除自己 -->
        <img draggable="false" @click="deleteMember(item.name, index)" src="/imgs/左边栏/删除成员.svg" v-if="isAdmin && !item.isAdmin">
      </div>
    </div>
    <div class="wrapper" v-if="(!!members.length && isAdmin && members.length < 20)">
      <div class="left-wrapper" @click="addMember">
        <img draggable="false" src="/imgs/左边栏/添加成员.svg">
        <span>添加成员</span>
      </div>
    </div>
    <div class="wrapper" v-if="(!!members.length && isAdmin)">
      <div class="left-wrapper" @click="quit(1)">
        <img draggable="false" src="/imgs/左边栏/解散群组.svg">
        <span>解散课题组</span>
      </div>
    </div>
    <div class="wrapper" v-if="(!!members.length && !isAdmin)">
      <div class="left-wrapper" @click="quit(0)">
        <img draggable="false" src="/imgs/左边栏/解散群组.svg">
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
      deleteUserName: '',
      deleteIndex: 0
    }
  },
  methods: {
    // 校验类型[群名、群简介、群UUID、用户名、邮箱]
    validate(type) {
      if (type === 0) {
        if (!this.usernameExp.test(this.name)) {
          this.$store.commit('toast', { text: '请输入有效的群名' })
          return false
        }
        return true
      } else if (type === 1) {
        if (!/^[A-Za-z0-9\u4e00-\u9fa5]{0,80}$/.test(this.slogon)) {
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
        throw new Error('the type is between 0 - 4')
      }
    },
    // state 标识是解散还是退出，0 代表退出， 1 代表解散
    quit(state = 0) {
      this.$store.commit('modal', { text: `是否${state === 0 ? '退出' : '解散'}当前课题组?`, title: `${state === 0 ? '退出' : '解散'}提醒`, slotType: 0 })
      this.$store.commit('bindOkEvent', this.confirmQuit)
    },
    confirmQuit() {
      this.axios.delete('/group/quit').then(() => {
        // 清空 vuex 中的群组信息
        this.$store.dispatch('clearGroupInfo')
        this.$store.dispatch('toast', { text: '操作成功', state: 0 })
        this.$router.push('/main')
      }).catch((resp) => {
        this.$store.dispatch('toast', { text: resp.msg })
      })
    },
    deleteMember(name, index) {
      this.$store.commit('modal', { text: `是否将${name}移除？`, title: '删除提醒', slotType: 0 })
      this.deleteUserName = name
      this.deleteIndex = index
      this.$store.commit('bindOkEvent', this.confirmDeleteMember)
    },
    confirmDeleteMember() {
      this.axios.delete('/group', {
        deleteUserName: this.deleteUserName
      }).then(() => {
        this.members.splice(this.deleteIndex, 1)
        this.$store.dispatch('toast', { text: '移除成功', state: 0 })
      }).catch((resp) => {
        this.$store.dispatch('toast', { text: resp.msg })
      })
    },
    createGroup() {
      this.$store.commit('modal', { slotType: 2 })
      this.$store.commit('clearCreateGroup')
      this.$store.commit('bindOkEvent', this.confirmCreateGroup)
    },

    confirmCreateGroup() {
      // 对群组名进行校验
      if (this.validate(0) && this.validate(1)) {
        this.axios.post('/group', {
          name: this.name,
          slogon: this.slogon
        }).then((data) => {
          this.$store.dispatch('saveGroupInfo', data)
          // 创建成功后手动关闭模态框
          this.$store.dispatch('modal', { showModal: false })
          this.$store.dispatch('toast', { text: '创建成功', state: 0 })
        }).catch((resp) => {
          this.$store.dispatch('toast', { text: resp.msg })
        })
      }
    },
    joinGroup() {
      this.$store.commit('modal', { slotType: 1 })
      this.$store.commit('clearGroupInfo')
      this.$store.commit('bindOkEvent', this.confirmJoinGroup)
    },
    confirmJoinGroup() {
      if (this.validate(2)) {
        this.axios.put('/group', {
          groupUUID: this.groupUUID
        }).then((data) => {
          this.$store.dispatch('saveGroupInfo', data)
          // 加入成功后手动关闭模态框
          this.$store.dispatch('modal', { showModal: false })
          this.$store.dispatch('toast', { text: '加入成功', state: 0 })
        }).catch((resp) => {
          this.$store.dispatch('toast', { text: resp.msg })
        })
      }
    },
    addMember() {
      this.$store.commit('modal', { slotType: 3 })
      this.$store.dispatch('clearLoginInfo')
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
        this.members.push(data)
        // 添加成功后手动关闭模态框
        if (autoClose) {
          this.$store.dispatch('modal', { showModal: false })
        }
        this.$store.dispatch('toast', { text: '添加成功', state: 0 })
      }).catch((resp) => {
        this.$store.dispatch('toast', { text: resp.msg })
      })
    }
  },
  computed: {
    // 是否出现 "创建课题组" 和 "加入课题组"
    members: {
      get() {
        return this.$store.state.groupInfo.members
      },
      set(newVal) {
        this.$store.commit('saveGroupInfo', newVal)
      }
    },
    // 当前用户是否为群主
    isAdmin() {
      return this.$store.state.groupInfo.isAdmin
    },
    name() {
      return this.$store.state.createGroup.name
    },
    slogon() {
      return this.$store.state.createGroup.slogon
    },
    groupUUID() {
      return this.$store.state.groupInfo.UUID
    },
    usernameOrEmail() {
      return this.$store.state.loginInfo.username
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
