
import { createRouter, createWebHistory } from 'vue-router'
 
const routerHistory = createWebHistory()
const routes = [
    {
        path:'/',
        redirect:'/content/myopen',
        meta: { transition: 'slide-left' },
    },
    {
        path:'/content',
        name:'content',
        component:()=>import('../views/Content'),
        children:[
            
            {
                path:'allopen',
                name:'allopen',
                component:()=>import('../views/AllOpen'),
                 meta: { index:1 },
            },
            {
                path:'opdetail',
                name:'opdetail',
                component:()=>import("@/views/OpDetail"),
                meta: {index:5}
            },
            {
                path:'myprivate',
                name:'myprivate',
                component:()=>import('../views/MyPrivate'),
                meta: { index:2 },
            },
            
            {
                path:'myopen',
                name:'myopen',
                component:()=>import('../views/MyOpen'),
                meta: { index:3},
            },
            {
                path:'myinfo',
                name:'myinfo',
                component:()=>import('../views/MyInfo'),
                 meta: { index:4 },
            },
            {
                path:'login',
                name:'login',
                component:()=>import('@/views/Login'),
                meta:{index : 6}
            },
            {
                path:'register',
                name:'register',
                component:()=>import('@/views/Register'),
                meta:{index:7}

            }
        ]
            
        
    },
    
]
const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: routerHistory,
    routes, // short for `routes: routes`
})

// // 重写push 与 replace方法
// let originPush = VueRouter.prototype.push; // 备份原型上的push方法,但是此时的originPush的this 不再是指向VueRouter.prototype
// let originReplace = VueRouter.prototype.replace;
// // 重写push,replace方法
// VueRouter.prototype.push = function(location , resolve , reject){
//     if(resolve && reject){
//         // call与apply都可以修改函数的上下文一次 ，注意区别
//         // 这里的this是原型上的this ，我们需要把这个this传给originPush
//         originPush.call(this,location) // 让这个oringinPush 的 上下文是 原型上的 上下文
//     }else{
//         originPush.call(this,location,()=>{},()=>{})
//     }
// }
// VueRouter.prototype.replace = function(location , resolve , reject){
//     if(resolve && reject){
//         // call与apply都可以修改函数的上下文一次 ，注意区别
//         // 这里的this是原型上的this ，我们需要把这个this传给originPush
//         originReplace.call(this,location) // 让这个oringinPush 的 上下文是 原型上的 上下文
//     }else{
//         originReplace.call(this,location,()=>{},()=>{})
//     }
// }

export default router
