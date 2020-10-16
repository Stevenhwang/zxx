import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'el-icon-office-building' }
    }]
  },
  {
    path: '/purchases',
    component: Layout,
    redirect: '/purchases/pay',
    name: 'purchases',
    meta: { title: '进货管理', icon: 'el-icon-shopping-cart-2' },
    children: [
      {
        path: 'material',
        name: 'material',
        component: () => import('@/views/purchases/material'),
        meta: { title: '材料类别', icon: 'el-icon-star-off' }
      },
      {
        path: 'pay',
        name: 'pay',
        component: () => import('@/views/purchases/pay'),
        meta: { title: '原材料', icon: 'el-icon-receiving' }
      },
      {
        path: 'change',
        name: 'change',
        component: () => import('@/views/purchases/change'),
        meta: { title: '退换货', icon: 'el-icon-s-help' }
      }
    ]
  },
  {
    path: '/shipment',
    component: Layout,
    redirect: '/shipment/sales',
    name: 'shipment',
    meta: { title: '出货管理', icon: 'el-icon-sold-out' },
    children: [
      {
        path: 'product',
        name: 'product',
        component: () => import('@/views/shipment/product'),
        meta: { title: '产品类别', icon: 'el-icon-star-on' }
      },
      {
        path: 'sales',
        name: 'sales',
        component: () => import('@/views/shipment/sales'),
        meta: { title: '销售', icon: 'el-icon-coin' }
      },
      {
        path: 'return',
        name: 'return',
        component: () => import('@/views/shipment/return'),
        meta: { title: '退换货', icon: 'el-icon-s-help' }
      }
    ]
  },
  {
    path: '/moneyflow',
    component: Layout,
    redirect: '/moneyflow/payment',
    name: 'moneyflow',
    meta: { title: '钱流管理', icon: 'el-icon-wallet' },
    children: [
      {
        path: 'payment',
        name: 'payment',
        component: () => import('@/views/moneyflow/payment'),
        meta: { title: '付款', icon: 'el-icon-bank-card' }
      },
      {
        path: 'respay',
        name: 'respay',
        component: () => import('@/views/moneyflow/respay'),
        meta: { title: '收款', icon: 'el-icon-suitcase' }
      }
    ]
  },
  {
    path: '/invoice',
    component: Layout,
    redirect: '/invoice/cancellation',
    name: 'invoice',
    meta: { title: '票据管理', icon: 'el-icon-money' },
    children: [
      {
        path: 'cancellation',
        name: 'cancellation',
        component: () => import('@/views/invoice/cancellation'),
        meta: { title: '销项票', icon: 'el-icon-notebook-1' }
      },
      {
        path: 'entryticket',
        name: 'entryticket',
        component: () => import('@/views/invoice/entryticket'),
        meta: { title: '进项票', icon: 'el-icon-notebook-2' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
