<template>
  <div class="main-left-bar" style="font-size:50px">
    <left-side-modal :show="showModal" :showTitle="showTitle[state]" :titleImg="titleImg[state]" @ok="okEvent"
      @no="this.showModal = false" :type="slotType[state]" :clickClose="false">
      <template v-slot:join>
        <label class="title">课题组ID</label>
        <div class="join-wrapper">
          <input @change="validateGroupUUID" type="text" class="name" placeholder="请输入群组ID" v-model="groupUUID">
          <button @click.stop="confirmJoinGroup">加入</button>
        </div>
      </template>
      <template v-slot:create>
        <label class="title">课题组信息</label>
        <div class="create-wrapper">
          <label>名称</label>
          <input @change="validateGroupName" type="text" class="name" placeholder="请输入文本" v-model="groupName">
        </div>
        <div class="create-wrapper">
          <label>简介</label>
          <textarea @change="validateGroupSlogon" placeholder="请输入文本" v-model="groupSlogon"></textarea>
        </div>
      </template>
      <template v-slot:addMember>
        <label class="title">邮箱/用户名</label>
        <div class="addMember-wrapper1">
          <input type="text" class="name" placeholder="请输入文本" v-model="usernameOrEmail">
          <button @click.stop="confirmAddMember(false)">添加</button>
        </div>
        <label class="title">课题组ID</label>
        <div class="addMember-wrapper2">
          <span>ID:{{ this.$store.state.groupInfo.groupUUID }}</span>
          <img src="/imgs/左边栏/复制.svg">
        </div>
      </template>
    </left-side-modal>
    <main-left-bar-button @click="this.$router.push('/main/user')" img="/imgs/左边栏/我的实验.svg" text="我的实验"
      classType="button"></main-left-bar-button>
    <main-left-bar-button @click="this.$router.push('/main/group')" img="/imgs/左边栏/我的课题组.svg" text="我的课题组"
      classType="button"></main-left-bar-button>
    <main-left-bar-title></main-left-bar-title>
    <main-left-bar-list @create="this.state = 0; this.showModal = true" @join="this.state = 1; this.showModal = true"
      @addMember="this.state = 2; this.showModal = true"></main-left-bar-list>
  </div>
</template>

<script>
import MainLeftBarButton from '../basic/MainLeftBarButton.vue'
import MainLeftBarTitle from '../basic/MainLeftBarTitle.vue'
import MainLeftBarList from '../basic/MainLeftBarList.vue'
import LeftSideModal from '../basic/LeftSideModal.vue'
export default {
  name: 'MainLeftBar',
  components: {
    MainLeftBarButton,
    MainLeftBarTitle,
    MainLeftBarList,
    LeftSideModal
  },
  data() {
    return {
      showModal: false,
      showTitle: ['创建课题组', '加入课题组', '添加成员'],
      titleImg: ['/imgs/左边栏/创建.svg', '/imgs/左边栏/加入.svg', '/imgs/左边栏/添加成员.svg'],
      // 代表要显示的创建状态，0 代表创建，1 代表加入，2 代表添加成员
      state: 0,
      slotType: ['create', 'join', 'addMember'],
      // 根据状态决定要调用的方法
      methods: [this.confirmCreateGroup, this.confirmJoinGroup, this.confirmAddMember],
      groupName: '',
      groupSlogon: '',
      groupUUID: '',
      usernameOrEmail: ''
    }
  },
  mounted() {
    this.init()
  },
  updated() {
    const height = document.body.clientHeight
    this.$store.dispatch('saveHeight', height)
  },
  methods: {
    validateGroupName() {
      if (!/^[A-Za-z0-9\u4e00-\u9fa5]{2,20}$/.test(this.groupName)) {
        this.$store.commit('toast', { text: '请输入有效的群名' })
        return false
      } else {
        return true
      }
    },
    validateGroupSlogon() {
      if (!/^[A-Za-z0-9\u4e00-\u9fa5]{0,80}$/.test(this.groupSlogon)) {
        this.$store.commit('toast', { text: '请输入有效的简介' })
        return false
      } else {
        return true
      }
    },
    validateGroupUUID() {
      if (!/^\d{10}$/.test(this.groupUUID)) {
        this.$store.commit('toast', { text: '请输入有效的群组ID' })
        return false
      } else {
        return true
      }
    },
    validateUsername() {
      if (!/^[A-Za-z0-9\u4e00-\u9fa5]{2,20}$/.test(this.usernameOrEmail)) {
        this.$store.commit('toast', { text: '请输入有效的用户名' })
        return false
      } else {
        return true
      }
    },
    validateEmail() {
      if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this.usernameOrEmail)) {
        this.$store.commit('toast', { text: '请输入有效的邮箱' })
        return false
      } else {
        return true
      }
    },
    okEvent() {
      // 点击对话框的确认按钮，调用不同的方法
      this.methods[this.state]()
    },
    init() {
      this.axios.get('/group').then((data) => {
        this.$store.dispatch('saveGroupInfo', data)
      }).catch((resp) => {
        this.$store.dispatch('toast', { text: resp.msg })
      })
    },
    // 创建课题组接口
    confirmCreateGroup() {
      // 对群组名进行校验
      if (!this.validateGroupName()) {
        this.$store.commit('toast', { text: '请输入有效的群名' })
        return
      }
      // 对群组简介进行校验
      if (!this.validateGroupSlogon()) {
        this.$store.commit('toast', { text: '请输入有效的简介' })
        return
      }
      this.axios.post('/group', {
        groupName: this.groupName,
        // 群组简介默认为欢迎你的加入
        groupSlogon: this.groupSlogon === '' ? '欢迎你的加入' : this.groupSlogon
      }).then((data) => {
        this.$store.dispatch('saveGroupInfo', data)
        this.$store.dispatch('toast', { text: '创建成功', state: 0 })
        // 将表单中的数据重制
        this.groupName = ''
        this.groupSlogon = ''
        // 需要手动关闭对话框
        this.showModal = false
      }).catch((resp) => {
        this.$store.dispatch('toast', { text: resp.msg })
      })
    },
    // 加入课题组接口
    confirmJoinGroup() {
      if (!this.validateGroupUUID()) {
        this.$store.commit('toast', { text: '请输入有效的群组ID' })
        return
      }
      this.axios.put('/group', {
        groupUUDI: this.groupUUID
      }).then((data) => {
        this.$store.dispatch('saveGroupInfo', data)
        this.$store.dispatch('toast', { text: '加入成功', state: 0 })
        this.groupUUID = ''
        // 需要手动关闭对话框
        this.showModal = false
      }).catch((resp) => {
        this.$store.dispatch('toast', { text: resp.msg })
      })
    },
    // 添加成员接口
    confirmAddMember(autoClose = true) {
      // 如果不是用户名，则检查是否为邮箱
      const isUsername = this.validateUsername()
      let isEmail
      if (!isUsername) {
        isEmail = this.validateEmail()
      }
      // 不是邮箱也不是用户名
      if (!isUsername && !isEmail) {
        this.$store.commit('toast', { text: '请输入有效信息' })
        return
      }
      this.axios.put('/group/addMember', {
        usernameOrEmail: this.usernameOrEmail,
        isUsername: isUsername && !isEmail
      }).then((data) => {
        this.$store.dispatch('saveGroupInfo', data)
        this.$store.dispatch('toast', { text: '添加成功', state: 0 })
        this.usernameOrEmail = ''
        // 需要手动关闭对话框
        if (autoClose) {
          this.showModal = false
        }
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
