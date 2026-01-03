import CheckGmailCode from '@/components/CheckGmailCode.vue'
import ForgotPasswordPage from '@/components/ForgotPasswordPage.vue'
import ResetCode from '@/components/ResetCode.vue'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/forgot-password',
      name: 'forgotPassword',
      component: ForgotPasswordPage
    },
    {
      path: '/check-code',
      name: 'checkCode',
      component: CheckGmailCode
    },
    {
      path: '/reset-code',
      name: 'resetCode',
      component: ResetCode
    }
  ],
})

export default router
