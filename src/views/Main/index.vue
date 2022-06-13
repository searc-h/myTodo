<template>
    <div class="main-outer">
        <my-header></my-header>
        <router-view></router-view>
        <AddFun/>
    </div>
</template>

<script>
import AddFun from '@/components/AddFun'
import MyHeader from '@/components/MyHeader'
export default {
    name:'Main',
    components:{
        MyHeader,
        AddFun
    },
    setup(){
        
    }
}
</script>

<style lang="less" scoped>
.main-outer{
    height: 100vh;
    background-color: rgb(205, 206, 201);
    box-sizing: border-box;
    position: relative;
}

</style>