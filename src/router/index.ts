import { createRouter, createWebHistory } from 'vue-router'
// import { auth } from '@/modules/core/firebase'
import { useUserStore } from '@/stores'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/modules/core/firebase'
import { Form } from '@/modules/core/components/form'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: () => import('@/modules/dashboard/DashboardModule.vue'),
      meta: { icon: 'bi-grid-fill' },
    },
    {
      path: '/finance',
      name: 'Finance',
      component: () => import('@/modules/finance/FinanceModule.vue'),
      meta: { icon: 'bi-wallet-fill' },
      children: [
        {
          path: 'account',
          component: () => import('@/modules/finance/component/account/Account.vue'),
          name: 'Account',
        },
        {
          path: 'income',
          component: () => import('@/modules/finance/component/income/Income.vue'),
          name: 'Income',
        },
        {
          path: 'expense',
          component: () => import('@/modules/finance/component/expense/Expense.vue'),
          name: 'Expense',
        },
        {
          path: 'transaction',
          component: () => import('@/modules/finance/component/transaction/Transaction.vue'),
          name: 'Transaction',
        },
        {
          path: 'report',
          component: () => import('@/modules/finance/component/report/Report.vue'),
          name: 'Report',
        },
        {
          path: 'analysis',
          component: () => import('@/modules/finance/component/analysis/Analysis.vue'),
          name: 'Analysis',
        },
      ],
    },
    {
      path: '/about',
      name: 'about',
      component: Form,
      meta: { icon: 'bi-wallet-fill' },
    },
    {
      path: '/auth',
      name: 'Auth',
      children: [
        {
          path: '/auth/register',
          name: 'Register',
          component: () => import('@/modules/core/auth/Register.vue'),
        },
        {
          path: '/auth/login',
          name: 'Login',
          component: () => import('@/modules/core/auth/Login.vue'),
        },
      ],
    },
  ],
})

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      auth,
      (usr) => {
        removeListener()
        resolve(usr)
      },
      reject,
    )
  })
}

router.beforeEach(async (to, from) => {
  const user = useUserStore()
  const authPages = ['/auth/login', '/auth/register']
  const authRequired = !authPages.includes(to.path)

  if (authRequired && to.name !== 'Login' && user.isAuthenticated == undefined) {
    console.log('router BE', user.isAuthenticated)
    if (!(await user.initUser())) {
      console.log('await getCurrent User else', user.isAuthenticated)
      return { name: 'Login' }
    } else {
      console.log('await getCurrent User', user.isAuthenticated)
    }
  }
})

export default router
