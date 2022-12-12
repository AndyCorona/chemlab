<template>
  <div class="main-view" :style="`pointer-events:${pointerEvent ? 'none' : 'all'}`">
    <toast-props :show="$store.state.showToast" :text="$store.state.toastText" :state="$store.state.toastState"
      :durationTime="$store.state.toastDurationTime">
    </toast-props>
    <common-modal @ok="$store.commit('modalStateChange', true)" @no="$store.commit('modalStateChange', false)"
      :hasImg='hasImg[state]' :imgPath='imgPath[state]' :name='slotName[state]'
      :showTitle='state === 0 ? $store.state.modalTitle : showTitle[state]' :hasBorder='hasBorder[state]'
      :show='$store.state.showModal' :buttonOk='buttonOk[state]' :buttonNo='buttonNo[state]'
      :autoClose='autoClose[state]' :buttonWidth="buttonWidth[state]" :showNoButton="(state !== 4)"
      :prevent="(state !== 4)">
      <template v-slot:inform>
        <div class="inform-wrapper">{{ $store.state.modalText }}</div>
      </template>
      <template v-slot:joinGroup>
        <label class="label">课题组ID</label>
        <div class="join-group-wrapper">
          <input type="text" class="input" placeholder="请输入群组ID" v-model="groupUUID">
          <button class="greenButton" @click.stop="$store.commit('modalStateChange', true)">加入</button>
        </div>
      </template>
      <template v-slot:createGroup>
        <label class="label">课题组信息</label>
        <div class="create-group-wrapper">
          <label>名称</label>
          <input type="text" class="input" placeholder="请输入文本" v-model="createName">
        </div>
        <div class="create-group-wrapper">
          <label>简介</label>
          <textarea class="input" placeholder="请输入文本" v-model="createSlogon"></textarea>
        </div>
      </template>
      <template v-slot:addMember>
        <label class="label">邮箱/用户名</label>
        <div class="addMember-wrapper1">
          <input type="text" class="input" placeholder="请输入文本" v-model="usernameOrEmail">
          <button class="greenButton" @click.stop="$store.state.okEvent(false)">添加</button>
        </div>
        <label class="label">课题组ID</label>
        <div class="addMember-wrapper2">
          <span>ID:{{ $store.state.groupInfo.UUID }}</span>
          <img draggable="false" src="/imgs/左边栏/复制.svg">
        </div>
      </template>
      <template v-slot:share>
        <div class="share-title">我的实验</div>
        <div class="share-wrapper">
          <div>
            <input class="input" type="text" readonly placeholder="请选择要分享到的群组项目" v-model="dropdownTitle">
            <img draggable="false" src="/imgs/实验列表/分享下拉箭头.svg" @click="(showDropdown = true)">
          </div>
          <div class="share-dropdown" v-if="showDropdown">
            <div @click="shareReaction(item)" class="word-wrap" v-for="(item, index) in projectList" :key="index">{{
                item.name
            }}</div>
          </div>
        </div>
      </template>
      <template v-slot:save-template>
        <div class="save-template-title">模版名称</div>
        <input class="input save-template-input" type="text" placeholder="请输入文本" v-model="templateName">
      </template>
      <template v-slot:select-template>
        <div class="label" style="margin: 30px 50px;">内置模板</div>
        <div class="template-container">
          <button class="builtin" @click="toTemplate(item.data)" v-for="(item, index) in templateBuiltin"
            :key="index">{{
                item.name
            }}</button>
        </div>
        <div class="label" style="margin: 30px 50px;">自定义</div>
        <div class="template-container">
          <div class="wrapper" v-for="(item, index) in templateDefine" :key="index">
            <button class="define" @click="toTemplate(item.data)">{{
                item.name
            }}</button>
            <img draggable="false" src="/imgs/左边栏/删除成员.svg" @click.stop="deleteTemplate(index, item.id)">
          </div>
          <button class="newTemplate" @click="flushTemplate" v-if="templateDefine.length < 5">+</button>
        </div>
      </template>
    </common-modal>
    <div class="left-container">
      <main-left-bar></main-left-bar>
    </div>
    <div class="right-container">
      <main-top-bar :topBarLeftImg="topBarLeftImg" :topBarSettingImg="topBarSettingImg"
        :topBarLogoutImg="topBarLogoutImg" :navPath="navPath"></main-top-bar>
      <main-slot
        :name="this.$route.fullPath === `/main/${this.isGroup ? 'group' : 'user'}/project/reaction` ? 'reaction' : 'main'">
        <template v-slot:main>
          <main-background-and-profile :background="background" :logo="logo"></main-background-and-profile>
          <router-view></router-view>
        </template>
        <template v-slot:reaction>
          <div class="reaction-wrapper">
            <reaction-form></reaction-form>
            <reaction-right-bar></reaction-right-bar>
          </div>
        </template>
      </main-slot>
    </div>
  </div>
</template>

<script>
import MainLeftBar from '../components/compose/MainLeftBar.vue'
import MainTopBar from '../components/basic/MainTopBar.vue'
import MainBackgroundAndProfile from '../components/basic/MainBackGroundAndProfile.vue'
import ReactionForm from '../components/compose/ReactionForm.vue'
import ReactionRightBar from '../components/compose/ReactionRightBar.vue'
import MainSlot from '../components/basic/MainSlot.vue'
import CommonModal from '../components/basic/CommonModal.vue'
export default {
  name: 'MainView',
  components: {
    MainLeftBar,
    MainTopBar,
    ReactionForm,
    ReactionRightBar,
    MainBackgroundAndProfile,
    MainSlot,
    CommonModal
  },
  data() {
    return {
      // 选择要插入的插槽名
      slotName: ['inform', 'joinGroup', 'createGroup', 'addMember', 'share', 'save-template', 'select-template'],
      // 是否要插入的模态框头部图片
      hasImg: [true, true, true, true, false, false, false],
      // 要插入的模态框头部图片
      imgPath: ['/imgs/弹窗/提醒.svg', '/imgs/左边栏/加入.svg', '/imgs/左边栏/创建.svg', '/imgs/左边栏/添加成员.svg', '', '', ''],
      // 模态框头部文字
      showTitle: ['提醒', '加入课题组', '创建课题组', '添加成员', '同步到群组', '保存模版', '实验模版'],
      // 模态框头部边框样式
      hasBorder: [false, true, true, true, true, true, true],
      // 模态框尾部的按钮文字
      buttonOk: ['是', '确认', '确认', '确认', '确认', '保存', '确认'],
      // 模态框尾部的按钮文字
      buttonNo: ['否', '取消', '取消', '取消', '取消', '取消', '取消'],
      // 无论模态框绑定的事件是否正确执行，都会自动关闭模态框
      autoClose: [true, false, false, false, false, false, false],
      // 模态框尾部按钮的大小
      buttonWidth: ['60px', '160px', '160px', '160px', '295px', '80px', '160px'],
      data: [],
      topBarSettingImg: this.$config.topBarSettingImg,
      topBarLogoutImg: this.$config.topBarLogoutImg
    }
  },
  methods: {
    checkIsGroup() {
      const path = this.$route.fullPath
      if (path.startsWith('/main/group')) {
        this.$store.commit('saveIsGroup', true)
      } else {
        this.$store.commit('saveIsGroup', false)
      }
    },
    // 根据输入的模块名称，输入空白模块数组
    moduleNameToContent(moduleName = '', retArr = []) {
      if (moduleName === 'scheme' || moduleName === 'text') {
        retArr.push({ type: moduleName, title: '', content: [] })
      } else if (moduleName === 'table') {
        retArr.push({ type: moduleName, title: '', content: [['1120'], ['默认'], []] })
      } else if (moduleName === 'data' || moduleName === 'reference') {
        retArr.push({ type: moduleName, title: '', content: [[], []] })
      } else {
        throw new Error('no such module name!')
      }
      return retArr
    },
    countTemplateType(templateArr = []) {
      // 5 个元素分别代表图片、文字、表格、数据、引用模块数量
      const arr = [0, 0, 0, 0, 0]
      templateArr.forEach(item => {
        if (item === 'scheme') {
          arr[0]++
        } else if (item === 'text') {
          arr[1]++
        } else if (item === 'table') {
          arr[2]++
        } else if (item === 'data') {
          arr[3]++
        } else if (item === 'reference') {
          arr[4]++
        }
      })
      return arr
    },
    combineTemplateAndReaction(template = [], modules = []) {
      const retArr = []
      template.forEach(item => {
        let isExist = false
        for (let i = 0; i < modules.length; i++) {
          if (modules[i] && modules[i].type === item) {
            isExist = true
            retArr.push(modules[i])
            modules[i] = null
            break
          }
        }
        if (!isExist) {
          this.moduleNameToContent(item, retArr)
        }
      })
      let leftCount = 15 - retArr.length
      for (let i = 0; i < modules.length; i++) {
        if (leftCount <= 0) {
          break
        }
        if (modules[i]) {
          retArr.push(modules[i])
          leftCount--
        }
      }
      console.log(retArr)
      return retArr
    },
    toTemplate(data) {
      this.data = data
      const templateArr = this.countTemplateType(data)
      const module = []
      this.modules.forEach((item) => {
        module.push(item.type)
      })
      const moduleArr = this.countTemplateType(module)
      let totalModule = 0
      for (let i = 0; i < moduleArr.length; i++) {
        totalModule += Math.max(templateArr[i], moduleArr[i])
      }
      if (totalModule > 15) {
        this.$store.commit('modal', { text: '切换该模版将舍弃部分数据，是否继续?', title: '切换模版提醒', slotType: 0 })
        // 绑定点击确认按钮事件
        this.$store.commit('bindOkEvent', this.confirmToTemplate)
      } else {
        this.confirmToTemplate()
      }
    },
    confirmToTemplate() {
      const retArr = this.combineTemplateAndReaction(this.data, this.modules)
      console.log(retArr)
      this.$store.commit('saveReactionInfo', { data: retArr })
      // 重新计算 hash 值
      this.$store.commit('saveLastReactionHash', this.$md5(JSON.stringify(this.reactionInfo)))
      this.$store.commit('modal', { showModal: false })
    },
    flushTemplate() {
      // 用户点击添加模版时，计算 hash 值，若 hash 值和上一次保存的值不同，则提醒用户应该先进行保存，否则直接进行模版跳转
      const thisReactionHash = this.$md5(JSON.stringify(this.reactionInfo))
      // 有实验内容还没保存，弹窗提醒用户先进行保存
      if (thisReactionHash !== this.$store.state.lastReactionHash) {
        this.$store.commit('modal', { text: '是否丢弃尚未保存的实验数据', title: '新建模版提醒', slotType: 0 })
        // 绑定点击确认按钮事件
        this.$store.commit('bindOkEvent', () => {
          this.$store.commit('saveReactionInfo', { data: [] })
        })
      } else {
        this.$store.commit('saveReactionInfo', { data: [] })
        this.$store.commit('saveLastReactionHash', this.$md5(JSON.stringify(this.reactionInfo)))
        this.$store.commit('modal', { showModal: false })
      }
    },
    deleteTemplate(index, id) {
      this.axios.delete('/template', {
        templateId: id
      }).then(() => {
        this.templateDefine.splice(index, 1)
        this.$store.dispatch('toast', { text: '删除成功', state: 0 })
      }).catch((resp) => {
        this.$store.dispatch('toast', { text: resp.msg })
      })
    },
    shareReaction(item) {
      if (item.id === -1) {
        return
      }
      this.$store.commit('saveShareProjectInfo', { id: item.id, showDropdown: false, dropdownTitle: item.name })
    }
  },
  computed: {
    background() {
      return this.isGroup ? '/imgs/群组主页/背景图片.png' : '/imgs/用户主页/用户背景.png'
    },
    logo() {
      return this.isGroup ? '/imgs/群组主页/群组头像.svg' : '/imgs/用户主页/头像.svg'
    },
    topBarLeftImg() {
      if (this.$route.fullPath === '/main/details') {
        return '/imgs/顶部栏/个人中心.svg'
      } else {
        if (this.isGroup) {
          return '/imgs/顶部栏/群组.svg'
        } else {
          return '/imgs/顶部栏/烧瓶.svg'
        }
      }
    },
    navPath() {
      const path = this.$route.fullPath
      if (path === '/main/details') {
        return [{ name: '个人中心', path: '/#/main/details', disabled: true }]
      } else if (path === '/main/user') {
        return [{ name: '我的实验', path: '/#/main/user', disabled: true }]
      } else if (path === '/main/group') {
        return [{ name: `${this.name}`, path: '/#/main/group', disabled: true }]
      } else if (path === '/main/group/project') {
        return [{ name: `${this.name}`, path: '/#/main/group', disabled: this.pointerEvent }, { name: this.projectName, path: '/#/main/group/project', disabled: true }]
      } else if (path === '/main/user/project') {
        return [{ name: '我的实验', path: '/#/main/user', disabled: this.pointerEvent }, { name: this.projectName, path: '/#/main/user/project', disabled: true }]
      } else {
        let projectName = sessionStorage.getItem('projectName')
        if (projectName === null) {
          projectName = '下次不敢这样了哦'
        }
        if (path === '/main/group/project/reaction') {
          return [{ name: `${this.name}`, path: '/#/main/group', disabled: false }, { name: `${projectName}`, path: '/#/main/group/project', disabled: false }, { name: `${this.reactionName}`, path: '/#/main/group/project/reaction', disabled: true }]
        } else if (path === '/main/user/project/reaction') {
          return [{ name: '我的实验', path: '/#/main/user', disabled: false }, { name: `${projectName}`, path: '/#/main/user/project', disabled: false }, { name: `${this.reactionName}`, path: '/#/main/user/project/reaction', disabled: true }]
        } else {
          throw new Error('no such router')
        }
      }
    },
    createName: {
      get() {
        return this.$store.state.createGroup.name
      },
      set(newVal) {
        this.$store.commit('saveCreateGroup', { name: newVal })
      }
    },
    createSlogon: {
      get() {
        return this.$store.state.createGroup.slogon
      },
      set(newVal) {
        this.$store.commit('saveCreateGroup', { slogon: newVal })
      }
    },
    name() {
      return !this.$store.state.groupInfo.name ? '暂未加入' : this.$store.state.groupInfo.name
    },
    slogon() {
      return this.$store.state.groupInfo.slogon
    },
    groupUUID: {
      get() {
        return this.$store.state.groupInfo.UUID
      },
      set(newVal) {
        this.$store.commit('saveGroupInfo', { UUID: newVal })
      }
    },
    usernameOrEmail: {
      get() {
        return this.$store.state.loginInfo.username
      },
      set(newVal) {
        this.$store.commit('saveLoginInfo', { username: newVal })
      }
    },
    templateDefine: {
      get() {
        return this.$store.state.templateDefine
      },
      set(newVal) {
        this.$store.commit('saveTemplateDefine', newVal)
      }
    },
    templateBuiltin() {
      return this.$store.state.templateBuiltin
    },
    templateName: {
      get() {
        return this.$store.state.templateName
      },
      set(newVal) {
        this.$store.commit('saveTemplateName', newVal)
      }
    },
    projectName() {
      return this.$store.state.projectInfo.name
    },
    isGroup() {
      return this.$store.state.isGroup
    },
    reactionName() {
      return this.$store.state.reactionInfo.name
    },
    projectList() {
      const retArr = this.$store.state.projectList
      retArr.push({ id: -1, name: '--------------------到底了--------------------' })
      return retArr
    },
    state() {
      return this.$store.state.slotType
    },
    showDropdown: {
      get() {
        return this.$store.state.shareProjectInfo.showDropdown
      },
      set(newVal) {
        this.$store.commit('saveShareProjectInfo', { showDropdown: newVal })
      }
    },
    dropdownTitle() {
      return this.$store.state.shareProjectInfo.dropdownTitle
    },
    pointerEvent() {
      return this.$store.state.pointerEvent
    },
    reactionInfo() {
      return this.$store.state.reactionInfo
    },
    modules: {
      get() { return this.$store.state.reactionInfo.data },
      set(newVal) {
        this.$store.commit('saveReactionInfo', { data: newVal })
      }
    }
  },
  mounted() {
    window.addEventListener('keyup', () => {
      if (event.keyCode === 27) {
        this.$store.dispatch('modalStateChange', false)
        this.$store.dispatch('modal', { showModal: false })
      }
    })
    this.checkIsGroup()
  },
  updated() {
    this.checkIsGroup()
  }
}
</script>

<style lang="scss">
@import '../assets/scss/config.scss';

.main-view {
  width: $min-width;
  margin: 0 auto;
  position: relative;
  display: flex;
  justify-content: space-around;

  .inform-wrapper {
    margin-top: 12px;
    margin-bottom: 30px;
    text-align: center;
    font-size: 18px;
    padding: 0 20px;
    width: 280px;
  }

  .label {
    display: block;
    font-size: 18px;
    font-weight: bold;
    border-bottom: 1px solid #555555;
    padding: 3px 20px;
    margin: 40px 50px;
    width: 660px;
  }

  .join-group-wrapper,
  .addMember-wrapper1 {
    margin: 0 70px;
    margin-bottom: 160px;
    display: flex;

    input {
      width: 540px;
      height: 40px;
      margin-right: 40px;
    }

    button {
      width: 80px;
    }
  }

  .create-group-wrapper {
    margin: 0 165px;
    display: flex;

    label {
      font-size: 18px;
      font-weight: bold;
    }

    input {
      width: 400px;
      margin-bottom: 15px;
    }

    textarea {
      width: 400px;
      line-height: 20px;
      height: 100px;
      resize: none;
      margin-bottom: 50px;
    }

    label {
      margin-right: 35px;
    }
  }

  .addMember-wrapper1 {
    margin-bottom: 0;
  }

  .addMember-wrapper2 {
    margin: 0 70px 20px 70px;
    height: 30px;
    line-height: 30px;
    display: flex;
    align-items: center;

    span {
      font-size: 16px;
      margin-right: 20px;
    }

    img {
      cursor: pointer;
      width: 16px;
      height: 16px;
    }
  }

  .template-container {
    display: flex;
    margin: 0 70px;

    button {
      width: 150px;
      height: 70px;
      border: none;
      font-size: 16px;
      padding: 10px;
    }

    .builtin {
      background-color: #00BFBF;
      margin-right: 15px;
    }

    .wrapper {
      display: flex;
      justify-content: space-between;
      position: relative;
      margin-right: 15px;

      .define {
        background-color: #ede9ec;
        margin-bottom: 70px;
      }

      img {
        cursor: pointer;
        width: 15px;
        height: 15px;
        position: absolute;
        top: 0;
        right: 0;
        opacity: 0;
      }
    }

    .wrapper:hover {
      img {
        transition: opacity .3s;
        opacity: 100%;
      }
    }

    .newTemplate {
      background-color: #FFFFFF;
      border: 1px dashed #555555;
      font-size: 16px;
      font-weight: bold;
      box-shadow: none;
      margin-bottom: 30px;
    }
  }

  .save-template-title {
    font-size: 18px;
    margin: 30px 0 10px 30px;
  }

  .save-template-input {
    margin: 0 30px 25px 30px;
  }

  .share-title {
    font-size: 18px;
    font-weight: bold;
    margin: 30px 0 15px 30px;
  }

  .share-wrapper {
    display: flex;
    align-items: center;
    position: relative;

    .share-dropdown {
      padding: 0 10px;
      border-top: none;
      font-size: 16px;
      line-height: 30px;
      background-color: #FFFFFF;
      position: absolute;
      top: 40px;
      left: 30px;
      width: 300px;
      max-height: 300px;
      overflow-y: scroll;

      div {
        cursor: pointer;
      }

      div:hover {
        background-color: #e9e9e9;
      }
    }

    input {
      margin: 0 30px 40px 30px;
    }

    img {
      cursor: pointer;
      position: absolute;
      top: 0;
      right: 30px;
      background-color: #638271;
      width: 40px;
      height: 40px;
      border-radius: 5px;
    }
  }

  .left-container {
    z-index: 200;
    position: relative;
    width: 300px;
  }

  .right-container {
    z-index: 100;
    position: relative;
    width: 1620px;

    .main-slot {
      border-left: 1px solid #D7D7D7;
    }

    .reaction-wrapper {
      display: flex;
    }
  }
}
</style>
