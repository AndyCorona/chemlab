import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HomeLogin from '../components/HomeLogin.vue'
import HomeProvacyPolicy from '../components/HomePrivacyPolicy.vue'
import HomeUserAgreement from '../components/HomeUserAgreement.vue'
import HomeForgotPassword from '../components/HomeForgotPassword.vue'
import HomeRegisterSuccess from '../components/HomeRegisterSuccess.vue'
import HomeActivateSuccess from '../components/HomeActivateSuccess.vue'
import HomeUpdatepassword from '../components/HomeUpdatePassword.vue'
import HomeSignup from '../components/HomeSignup.vue'

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
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
