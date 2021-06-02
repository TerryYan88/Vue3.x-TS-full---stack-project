import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'


const routes: Array<RouteRecordRaw> = [
  //找不到路有转跳
  {
    path: "/:catchAll(.*)",
    redirect: "/home",
  },
  //默认进入
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/",
    name: "Contain",
    component: () => import(/* webpackChunkName: "Contain"*/"@/views/Contain/Contain.vue"),
    children: [
      {
        path: '/home',
        name: "Home",
        component: () => import(/* webpackChunkName: "Home"*/ "@/views/main/Home/Home.vue")
      },
      {
        path: '/discovered',
        name: "Discovered",
        component: () => import(/* webpackChunkName: "Discovered"*/ "@/views/main/Discovered/Discovered.vue")
      },
      {
        path: '/order',
        name: "Order",
        component: () => import(/* webpackChunkName: "Order"*/ "@/views/main/Order/Order.vue")
      },
      {
        path: '/mine',
        name: "Mine",
        component: () => import( /* webpackChunkName: "Mine"*/"@/views/main/Mine/Mine.vue")
      }
    ]
  },
  {
    path: "/detail",
    name: "Details",
    component: () => import( /* webpackChunkName: "Detail"*/"@/components/Detail/Details.vue"),
    children: [
      {
        path: 'menu',
        name: "Menu",
        component: () => import(/* webpackChunkName: "Menu"*/ "@/components/Detail/Menu/Menu.vue")
      },
      {
        path: 'evaluate',
        name: "Evaluate",
        component: () => import(/* webpackChunkName: "Evaluate"*/ "@/components/Detail/Evaluate/Evaluate.vue")
      },
      {
        path: 'merchant',
        name: "Merchant",
        component: () => import(/* webpackChunkName: "Merchant"*/ "@/components/Detail/Merchant/Merchant.vue")
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
