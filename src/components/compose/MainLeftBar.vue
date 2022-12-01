<template>
  <div class="main-left-bar" style="font-size:50px">
    <left-side-modal :show="ShowModal" :ShowTitle="ShowTitle[state]" :TitleImg="TitleImg[state]" @ok="OkEvent"
      @no="this.ShowModal = false" :type="SlotType[state]" :ClickClose="false">
      <template v-slot:join>
        <label class="title">课题组ID</label>
        <div class="join-wrapper">
          <input @change="ValidateGroupUUID" type="text" class="name" placeholder="请输入群组ID" v-model="GroupUUID">
          <button @click.stop="ConfirmJoinGroup">加入</button>
        </div>
      </template>
      <template v-slot:create>
        <label class="title">课题组信息</label>
        <div class="create-wrapper">
          <label>名称</label>
          <input @change="ValidateGroupName" type="text" class="name" placeholder="请输入文本" v-model="GroupName">
        </div>
        <div class="create-wrapper">
          <label>简介</label>
          <textarea @change="ValidateGroupSlogon" placeholder="请输入文本" v-model="GroupSlogon"></textarea>
        </div>
      </template>
      <template v-slot:addMember>
        <label class="title">邮箱/用户名</label>
        <div class="addMember-wrapper1">
          <input type="text" class="name" placeholder="请输入文本" v-model="UsernameOrEmail">
          <button @click.stop="ConfirmAddMember(false)">添加</button>
        </div>
        <label class="title">课题组ID</label>
        <div class="addMember-wrapper2">
          <span>ID:{{ this.$store.state.GroupInfo.groupUUID }}</span>
          <img src="/imgs/左边栏/复制.svg">
        </div>
      </template>
    </left-side-modal>
    <main-left-bar-button @click="this.$router.push('/main/user')" img="/imgs/左边栏/我的实验.svg" text="我的实验"
      ClassType="button"></main-left-bar-button>
    <main-left-bar-button @click="this.$router.push('/main/group')" img="/imgs/左边栏/我的课题组.svg" text="我的课题组"
      ClassType="button"></main-left-bar-button>
    <main-left-bar-title></main-left-bar-title>
    <main-left-bar-list @create="this.state = 0; this.ShowModal = true" @join="this.state = 1; this.ShowModal = true"
      @addMember="this.state = 2; this.ShowModal = true"></main-left-bar-list>
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
      ShowModal: false,
      ShowTitle: ['创建课题组', '加入课题组', '添加成员'],
      TitleImg: ['/imgs/左边栏/创建.svg', '/imgs/左边栏/加入.svg', '/imgs/左边栏/添加成员.svg'],
      // 代表要显示的创建状态，0 代表创建，1 代表加入，2 代表添加成员
      state: 0,
      SlotType: ['create', 'join', 'addMember'],
      // 根据状态决定要调用的方法
      methods: [this.ConfirmCreateGroup, this.ConfirmJoinGroup, this.ConfirmAddMember],
      GroupName: '',
      GroupSlogon: '',
      GroupUUID: '',
      UsernameOrEmail: ''
    }
  },
  mounted() {
    this.init()
  },
  updated() {
    const height = document.body.clientHeight
    this.$store.dispatch('SaveHeight', height)
  },
  methods: {
    ValidateGroupName() {
      if (!/^[A-Za-z0-9\u4e00-\u9fa5]{2,20}$/.test(this.GroupName)) {
        this.$store.commit('toast', { ShowModal: true, text: '请输入有效的群名' })
        return false
      } else {
        return true
      }
    },
    ValidateGroupSlogon() {
      if (!/^[A-Za-z0-9\u4e00-\u9fa5]{0,80}$/.test(this.GroupSlogon)) {
        this.$store.commit('toast', { ShowModal: true, text: '请输入有效的简介' })
        return false
      } else {
        return true
      }
    },
    ValidateGroupUUID() {
      if (!/^\d{10}$/.test(this.GroupUUID)) {
        this.$store.commit('toast', { ShowModal: true, text: '请输入有效的群组ID' })
        return false
      } else {
        return true
      }
    },
    ValidateUsername() {
      if (!/^[A-Za-z0-9\u4e00-\u9fa5]{2,20}$/.test(this.UsernameOrEmail)) {
        this.$store.commit('toast', { ShowModal: true, text: '请输入有效的用户名' })
        return false
      } else {
        return true
      }
    },
    ValidateEmail() {
      if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this.UsernameOrEmail)) {
        this.$store.commit('toast', { ShowModal: true, text: '请输入有效的邮箱' })
        return false
      } else {
        return true
      }
    },
    OkEvent() {
      // 点击对话框的确认按钮，调用不同的方法
      this.methods[this.state]()
    },
    init() {
      this.axios.get('/group').then((data) => {
        this.$store.dispatch('SaveGroupInfo', data)
      }).catch((resp) => {
        this.$store.dispatch('toast', { ShowModal: true, text: resp.msg })
      })
    },
    // 创建课题组接口
    ConfirmCreateGroup() {
      // 对群组名进行校验
      if (!this.ValidateGroupName()) {
        this.$store.commit('toast', { ShowModal: true, text: '请输入有效的群名' })
        return
      }
      // 对群组简介进行校验
      if (!this.ValidateGroupSlogon()) {
        this.$store.commit('toast', { ShowModal: true, text: '请输入有效的简介' })
        return
      }
      this.axios.post('/group', {
        groupName: this.GroupName,
        // 群组简介默认为欢迎你的加入
        groupSlogon: this.GroupSlogon === '' ? '欢迎你的加入' : this.GroupSlogon
      }).then((data) => {
        this.$store.dispatch('SaveGroupInfo', data)
        this.$store.dispatch('toast', { ShowModal: true, text: '创建成功', state: 0 })
        // 将表单中的数据重制
        this.GroupName = ''
        this.GroupSlogon = ''
        // 需要手动关闭对话框
        this.ShowModal = false
      }).catch((resp) => {
        this.$store.dispatch('toast', { ShowModal: true, text: resp.msg })
      })
    },
    // 加入课题组接口
    ConfirmJoinGroup() {
      if (!this.ValidateGroupUUID()) {
        this.$store.commit('toast', { ShowModal: true, text: '请输入有效的群组ID' })
        return
      }
      this.axios.put('/group', {
        groupUUDI: this.GroupUUID
      }).then((data) => {
        this.$store.dispatch('SaveGroupInfo', data)
        this.$store.dispatch('toast', { ShowModal: true, text: '加入成功', state: 0 })
        this.GroupUUID = ''
        // 需要手动关闭对话框
        this.ShowModal = false
      }).catch((resp) => {
        this.$store.dispatch('toast', { ShowModal: true, text: resp.msg })
      })
    },
    // 添加成员接口
    ConfirmAddMember(autoClose = true) {
      // 如果不是用户名，则检查是否为邮箱
      const isUsername = this.ValidateUsername()
      let isEmail
      if (!isUsername) {
        isEmail = this.ValidateEmail()
      }
      // 不是邮箱也不是用户名
      if (!isUsername && !isEmail) {
        this.$store.commit('toast', { ShowModal: true, text: '请输入有效信息' })
        return
      }
      this.axios.put('/group/addMember', {
        usernameOrEmail: this.UsernameOrEmail,
        isUsername: isUsername && !isEmail
      }).then((data) => {
        this.$store.dispatch('SaveGroupInfo', data)
        this.$store.dispatch('toast', { ShowModal: true, text: '添加成功', state: 0 })
        this.UsernameOrEmail = ''
        // 需要手动关闭对话框
        if (autoClose) {
          this.ShowModal = false
        }
      }).catch((resp) => {
        this.$store.dispatch('toast', { ShowModal: true, text: resp.msg })
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
  border-right: 1px solid #D7D7D7;
}
</style>
