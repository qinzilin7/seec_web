import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index",
    redirect: "login",
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../views/HomeView.vue"),
    meta: { homemate: true },
    redirect:"/home/index",
    children:[
      {
        path:"index",
        name:"index",
        component:()=>import("../views/Index.vue")
      },
      {
        path:"document",
        name:"document",
        component:()=>import("../views/Document.vue")
      },
      {
        path:"lead",
        name:"lead",
        component:()=>import("../views/Lead.vue")
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login.vue"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/AboutView.vue"),
  },
];

const router = new VueRouter({
  routes,
});
router.beforeEach((to, from, next) => {
  // 路由守卫中不要使用for循环
  let token = localStorage.getItem("token")
  if (to.meta.homemate) {
    if (token) {
      // token说明登录成功有权限
      next()
    } else {
      //没有登录，没有权限
      next({ path: "/login" })
    }
  }else{
    next()//中间件
  }
})
export default router;
