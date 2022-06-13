<template>
  <div class="header-box">
    <div class="header-title" @click="toAllOpen" :class="route.name=='allopen'?'bold':null">社区</div>
    <div class="header-title" @click="toMyPrivate"  :class="route.name=='myprivate'?'bold':null">私有记事</div>
    <div class="header-title" @click="toMyOpen"  :class="route.name=='myopen'?'bold':null">共享记事</div>
    <div class="header-title" @click="toMyInfo"  :class="route.name=='myinfo'?'bold':null">个人信息</div>
  </div>
</template>

<script>
import {  useRouter, useRoute } from 'vue-router'
export default {
    name:"MyHeader",
    setup(){
        const router = useRouter()
        const route = useRoute()

        function toAllOpen(){
          router.push({
            name:'allopen'
          })
        }

        function toMyOpen(){
          router.push({
            name:'myopen'
          })
        }

        function toMyPrivate(){
          router.push({
            name:'myprivate'
          })
        }

        function toMyInfo(){
          router.push({
            name:'myinfo'
          })
        }

      return {
        toAllOpen,
        toMyInfo,
        toMyOpen,
        toMyPrivate,
        route
      }
    }
}
</script>


<style lang='less' scoped>
.header-box{
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: 20px ;
  box-sizing: border-box;
  font-size: 20px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  border-bottom: 2px solid rgb(128, 124, 124);
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.4);
  .header-title{
    line-height: 30px;
    &:hover{
      cursor: pointer;
    }
  }
  .bold{
    font-weight: bold;
    font-size: 22px;
  }
}

</style>