import Vue from 'vue'
import Router from 'vue-router'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path:"/login",
      name:"login",
      component:()=>import ("@/views/login/login"),
      meta:{
        title:"登录页面"
      }
    },
    {
      path: '/index',
      name:"index",
      redirect:"/index/home",
      component:()=> import ("@/views/layout/index"),
      meta:{
        title:"首页"
      },
      children:[
        {
          path:"home",
          name:'home',
          component:()=> import ("@/views/home/index"),
          meta:{
            title:"首页"
          }
        },
        //管理员列表
        {
          path: "adminList",
          name: "adminList",
          component: () => import("@/views/admain/adminList"),
          meta: {
            title: "管理员列表"
          }

        },
        //添加管理员
        {
          path:"adminAdd",
          name:"adminAdd",
          component: () => import("@/views/admain/admain"),
          meta:{
            title:"添加管理员"
          }
        },
        //编辑管理员
        {
          path:"admainEdit/:id",
          name:"admainEdit",
          component: () => import("@/views/admain/admain"),
          meta:{
            title:"编辑管理员"
          }
        },
        //管理员详情
        {
          path:"admainDetail/:id",
          name:"admainDetail",
          component:()=>import ("@/views/admain/admainDetail"),
          meta:{
            title:"管理员详情"
          }
        },
        //新闻列表
        {
          path:"newsList",
          name:"newsList",
          component: () => import("@/views/news/newsList"),
          meta:{
            title:"新闻列表"
          }
        },
        //添加新闻
        {
          path:"newsAdd",
          name:"newsAdd",
          component: () => import("@/views/news/newsAdd"),
          meta:{
            title:"添加新闻"
          }
        },
        //编辑新闻
        {
          path:"newsEdit/:id",
          name:"newsEdit",
          component: () => import("@/views/news/newsAdd"),
          meta:{
            title:"编辑新闻"
          }
        },
        //新闻详情
        {
          path:"newsDetail/:id",
          name:"newsDetail",
          component: () => import("@/views/news/newsDetail"),
          meta:{
            title:"新闻详情"
          }
        },
        //轮播图列表
        {
          path:"swiperList",
          name:"swiperList",
          component:()=>import ("@/views/swiper/swiperList"),
          meta:{
            title:"轮播图列表"
          }
        },
        //添加轮播图
        {
          path:"swiperAdd",
          name:"swiperAdd",
          component:()=>import("@/views/swiper/swiper"),
          meta:{
            title:'添加轮播图'
          }
        },
        //编辑轮播图
        {
          path:'swiperEdit/:id',
          name:"swiperEdit",
          component:()=>import ("@/views/swiper/swiper"),
          meta:{
            title:"编辑轮播图"
          }
        },
        //轮播图详情
        {
          path:"swiperDetail/:id",
          name:"swiperDetail",
          component: () => import("@/views/swiper/swiperDetail"),
          meta:{
            title:"轮播图详情"

          }
        },
        //说说列表
        {
          path:"topicList",
          name:"topicList",
          component: () => import("@/views/topic/topicList"),
          meta:{
            title:"回复列表"
          }
        },
        //说说详情
        // {
        //   path:"topicDetail/:id",
        //   name:"topicDetail",
        //   component: () => import("@/views/topic/topicDetail"),
        //   meta:{
        //     title:"话题详情"
        //   }
        // }
     ]
    }
  ]
})
