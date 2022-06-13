<template>
    <div class="addfun-outer" v-show="showAdd">
        <div class="circle" v-show="addShow" @click="changeAddShow">+</div>


        <div class="input-outer" ref="inputouter">
            <div class="topbar" @click="changeAddShow">——————</div>
            <div>
                <div><input type="text" placeholder="输入内容" v-model="content" ref="input" @keyup.enter="addTodo"></div>
                <div><button @click="addTodo">添加</button></div>
            </div>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed,ref } from 'vue'
import { useRoute } from 'vue-router'
export default {
    name:'AddFun',
    setup(){
        const route = useRoute()
        const store = useStore()
        let inputouter = ref(null)
        let input = ref(null)
        let addShow = ref(true)
        function changeAddShow(){
            console.log('test',addShow.value)
            addShow.value = !addShow.value
            if(addShow.value){
                inputouter.value.style.transform = 'translateY(50vh)'
            }else{
                inputouter.value.style.transform = 'translateY(0vh)'
                
                // nextTick(()=>{
                //     input.value.focus()
                // })
            }
        }
        let showAdd = computed(()=>{
            if(route.name=='myprivate' || route.name=='myopen'){
                return true
            }else{
                return false
            }
        })


        let content = ref('')
        async function addTodo(){
            let userid = ref(sessionStorage.getItem('userid'))
            if(content.value.trim()==''){
                alert('内容不能为空')
                return
            }
            if(route.name == 'myprivate' && userid.value){
                let result = await store.dispatch('addPrivate',{content:content.value , userid:userid.value})
                if(result.code == 200){
                    content.value = ''
                    await store.dispatch('getMyPrivate',userid.value)
                }
            }
            else if(route.name == 'myopen' && userid.value){
                let result = await store.dispatch('addOpenItem',{content:content.value ,userid:userid.value})
                if(result.code == 200){
                    content.value = ''
                    await store.dispatch('getMyOpenItem',userid.value)
                }
            }else{
                alert('请先登录哦')
            }
        }

        return {
            route,
            showAdd,
            addShow,
            changeAddShow,
            inputouter,
            addTodo,
            content,
            input
        }
    }
}
</script>

<style lang="less" scoped>
.addfun-outer{
    position: absolute;
    bottom: 0px;
    // background-color: rgb(252, 252, 252);
    overflow: hidden;
    .circle{
        position: absolute;
        bottom: 30px;
        left: 50%;
        width: 50px;
        line-height: 50px;
        background-color: yellow;
        border-radius: 50%;
        text-align: center;
        font-size: 30px;
    }

    .input-outer {
        height: 25vh;
        width: 375px;
        transform: translateY(50vh);
        transition: all 0.3s;
        text-align: center;
        font-size: 16px;
        background-color: rgba(184, 179, 179, 0.9);

        .topbar{
            text-align: center;
            line-height: 40px;
            font-size: 30px;
            font-weight: 777;
        }

        input{
            width: 80%;
            line-height: 40px;
            border-radius: 20px;
            padding-left: 10px;
            outline: none;
            border: none;
            margin-bottom: 20px;
        }

        button{
            width: 20%;
            line-height: 30px;
            border-radius: 10px;
            background-color: rgb(216, 216, 216);
            border: 1px solid rgb(184, 179, 170);
            &:hover{
                background-color: rgb(240, 240, 240);
            }
        }
    }
}
</style>