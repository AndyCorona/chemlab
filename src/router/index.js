import { createRouter, createWebHashHistory } from 'vue-router'
import store from '@/store'
import HomeView from '../views/HomeView.vue'
import HomeProvacyPolicy from '../components/compose/HomePrivacyPolicy.vue'
import HomeUserAgreement from '../components/compose/HomeUserAgreement.vue'
import MainView from '../views/MainView.vue'
import MainDetails from '../components/compose/MainDetails.vue'
import MainUserAndGroup from '../components/compose/MainUserAndGroup.vue'
import MainProject from '../components/compose/MainProject.vue'
import ErrorView from '../views/ErrorView.vue'
import md5 from 'js-md5'
const routes = [
  {
    path: '/',
    name: 'home-view',
    component: HomeView,
    redirect: '/login',
    children: [
      {
        path: '/login',
        name: 'home-login',
        component: HomeView
      },
      {
        path: '/signup',
        name: 'home-signup',
        component: HomeView
      },
      {
        path: '/register-success',
        name: 'home-register-success',
        component: HomeView
      },
      {
        path: '/activate-success',
        name: 'home-activate-success',
        component: HomeView
      },
      {
        path: '/forgot-password',
        name: 'home-forgot-password',
        component: HomeView
      },
      {
        path: '/update-password',
        name: 'home-update-password',
        component: HomeView
      }
    ]
  },
  {
    path: '/privacy-policy',
    name: 'privacy-policy',
    component: HomeProvacyPolicy
  },
  {
    path: '/user-agreement',
    name: 'user-agreement',
    component: HomeUserAgreement
  },
  {
    path: '/main',
    name: 'main-view',
    component: MainView,
    redirect: '/main/user',
    children: [
      {
        path: 'user',
        name: 'main-user',
        component: MainUserAndGroup
      },
      {
        path: 'user/project',
        name: 'main-user-project',
        component: MainProject
      },
      {
        path: 'group',
        name: 'main-group',
        component: MainUserAndGroup
      },
      {
        path: 'group/project',
        name: 'main-group-project',
        component: MainProject
      },
      {
        path: 'details',
        name: 'main-details',
        component: MainDetails
      }
    ]
  },
  {
    path: '/main/user/project/reaction',
    name: 'main-user-reaction',
    component: MainView
  },
  {
    path: '/main/group/project/reaction',
    name: 'main-group-reaction',
    component: MainView
  },
  {
    path: '/error',
    name: 'error-view',
    component: ErrorView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from) => {
  console.log(from.fullPath)
  console.log(to.fullPath)
  // 更新密码页面需要从 sessionStorage 中获取用户名和邮箱
  if (to.fullPath === '/update-password') {
    store.dispatch('saveLoginInfo', { username: sessionStorage.getItem('username'), email: sessionStorage.getItem('email') })
  }
  // 从实验页面跳转
  if (from.fullPath === '/main/user/project/reaction') {
    // 计算 hash 值，相同则放行，不同则弹窗提醒
    const lastHash = store.state.lastReactionHash
    const thisHash = md5(JSON.stringify(store.state.reactionInfo))
    console.log(lastHash)
    console.log(thisHash)
    if (!store.state.leaveFromReaction && lastHash !== thisHash) {
      // 弹窗
      store.dispatch('modal', { text: '是否丢弃尚未保存的实验数据？', title: '退出实验页面提醒', slotType: 0 })
      // 绑定点击确认按钮事件
      store.dispatch('bindOkEvent', () => {
        store.dispatch('saveLeaveFromReaction', true)
        router.push(to)
      })
      return false
    }
  }
  return true
})

export default router
