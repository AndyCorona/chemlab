import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HomeProvacyPolicy from '../components/compose/HomePrivacyPolicy.vue'
import HomeUserAgreement from '../components/compose/HomeUserAgreement.vue'
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

export default router
