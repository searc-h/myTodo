<template>
    <div class="content-outer">
        <router-view v-slot="{ Component}">
            <!-- Use any custom transition and fallback to `fade` -->
            <transition :name="animation">
                <component :is="Component" />
            </transition>
        </router-view>
    </div>  
</template>

<script>

import {onBeforeRouteUpdate } from 'vue-router';
import { ref } from 'vue';
export default {
    name:"Content",
    setup(){
        const animation = ref('slide');
        // 在vue3中 不再使用watch的方式监听路由变化，而是直接用onBeforeRouteUpdate(function(){})
        onBeforeRouteUpdate((to,form)=>{
            if(to.meta.index > form.meta.index){
                animation.value = 'slide-left'
            }else{
                animation.value = 'slide-right'
            }
        })
        return {
            animation
        }
    }
}
</script>

<style lang="less" scoped>
.content-outer{
    height: 90vh;
    width: 100%;
    position: relative;
    overflow: hidden;
    background-color: rgb(252, 252, 252);
}

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
	width: 100%;
    height: 100%;
    will-change: transform;
    transition: all 0.4s cubic-bezier(.55,0,.1,1);
    
}
.slide-right-enter-from{
    transform: translateX(-375px);
}
.slide-right-enter-to{
    transform: translateX(0px);
}
.slide-right-leave-from{
    transform: translateX(0px);
}
.slide-right-leave-to{
    transform: translateX(375px);
}

.slide-left-enter-from{
    transform: translateX(375px);
}
.slide-left-enter-to{
    transform: translateX(0px);
}
.slide-left-leave-from{
    transform: translateX(0px);
}

.slide-lfet-leave-to{
    transform: translateX(-375px);
}
</style>