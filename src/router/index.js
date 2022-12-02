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
import MainDetails from '../components/compose/MainDetails.vue'
import MainUserAndGroup from '../components/compose/MainUserAndGroup.vue'
import MainProject from '../components/compose/MainProject.vue'
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

export default router
