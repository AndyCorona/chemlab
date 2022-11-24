import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HomeLogin from '../components/compose/HomeLogin.vue'
import HomeProvacyPolicy from '../components/compose/HomePrivacyPolicy.vue'
import HomeUserAgreement from '../components/compose/HomeUserAgreement.vue'
import HomeForgotPassword from '../components/compose/HomeForgotPassword.vue'
import HomeRegisterSuccess from '../components/compose/HomeRegisterSuccess.vue'
import HomeActivateSuccess from '../components/compose/HomeActivateSuccess.vue'
import HomeUpdatepassword from '../components/compose/HomeUpdatePassword.vue'
import HomeSignup from '../components/compose/HomeSignup.vue'
import MainView from '../views/MainView.vue'
import MainUser from '../components/compose/MainUser.vue'
import MainGroup from '../components/compose/MainGroup.vue'
import MainProject from '../components/compose/MainProject.vue'
import ReactionView from '../views/ReactionView.vue'
import ErrorView from '../views/ErrorView.vue'
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
        component: HomeLogin
      },
      {
        path: '/signup',
        name: 'home-signup',
        component: HomeSignup
      },
      {
        path: '/register-success',
        name: 'home-register-success',
        component: HomeRegisterSuccess
      },
      {
        path: '/activate-success',
        name: 'home-activate-success',
        component: HomeActivateSuccess
      },
      {
        path: '/forgot-password',
        name: 'home-forgot-password',
        component: HomeForgotPassword
      },
      {
        path: '/update-password',
        name: 'home-update-password',
        component: HomeUpdatepassword
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/privacy-policy',
    name: 'privacyPolicy',
    component: HomeProvacyPolicy
  },
  {
    path: '/user-agreement',
    name: 'userAgreement',
    component: HomeUserAgreement
  },
  {
    path: '/main',
    name: 'main-view',
    component: MainView,
    redirect: '/main/user',
    children: [
      {
        path: 'project',
        name: 'MainProject',
        component: MainProject
      },
      {
        path: 'user',
        name: 'MainUser',
        component: MainUser
      },
      {
        path: 'group',
        name: 'MainGroup',
        component: MainGroup
      }
    ]
  },
  {
    path: '/main/project/reaction',
    name: 'ReactionView',
    component: ReactionView
  },
  {
    path: '/error',
    name: 'ErrorView',
    component: ErrorView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
