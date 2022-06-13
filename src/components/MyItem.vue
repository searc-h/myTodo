<template>
    <div class="item-outer" ref="item" >
        <div class="left">
            <div class="check" >
                <input type="checkbox" @change="handleCheck($event,$attrs.item.todoid)" :checked="$attrs.item.finished=='1'">
            </div>
            <div class="content" :class="$attrs.item.finished=='1'?'finished':''">
                {{$attrs.item.content}}
            </div>
        </div>
        
        <div class="right"  @click="toMove">
            ◁
        </div>

        <div class='func'>
            <div @click="remTodo($attrs.item.todoid)">删除</div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter ,useRoute } from 'vue-router'
import { useStore } from 'vuex'
export default {
    name:'MyItem',
    setup(_,{attrs}){
        const item = ref(null)
        const router = useRouter()
        const route = useRoute()
        const store = useStore()
        function toOpenDetail(){
            console.log("attrs",attrs.item)
            router.push({
                name:'opdetail',
            })
        }

        function toMove(){
            if(item.value.style.transform.trim()=='')
                item.value.style.transform = "translateX(-32px)";
            else    
                item.value.style.transform = ''
            // console.log('item',item.value.style.transform)
        }
        
        let userid = ref(sessionStorage.getItem('userid'))
        async function handleCheck(e,todoid){
            let finished  = e.target.checked?1:0
            if(route.name=='myopen'){
                let result = await store.dispatch('finishedOpenItem',{todoid,finished})
                if(result.code==200){
                    await store.dispatch('getMyOpenItem', userid.value)
                }
                return
            }

            else if(route.name=='myprivate'){
                let result = await store.dispatch('finishedPrivate',{todoid,finished})
                if(result.code==200){
                    await store.dispatch('getMyPrivate', userid.value)
                }
                return
            }
        }

        async function remTodo(todoid){
            if(route.name=='myopen'){
                let result = await store.dispatch('deletedOpenItem',todoid)
                if(result.code==200){
                    await store.dispatch('getMyOpenItem', userid.value)
                }
                return
            }

            else if(route.name=='myprivate'){
                let result = await store.dispatch('deletedPrivate',todoid)
                if(result.code==200){
                    await store.dispatch('getMyPrivate', userid.value)
                }
                return
            }
        }

        return {
            item,
            toMove,
            toOpenDetail,
            remTodo,
            handleCheck
        }
    }
}
</script >

<style lang="less" scoped>
.item-outer{
    line-height: 40px;
    display: flex;
    justify-content: space-between;
    background-color: rgb(230, 233, 235);
    padding: 5px;
    margin-top: 5px;
    border-radius: 10px;
    transition: all 0.3s;
    position: relative;
    &:hover{
        background-color: rgb(168, 173, 177);
    }
    .left{
        padding-left: 10px;
        width: 85%;
        display: flex;
        .check{
            margin-right: 10px;
        }
        .content{
            font-weight: 777;
        }

        .finished{
            color: rgb(148, 150, 151);
            text-decoration: line-through;
        }
    }
    
    .right{
        text-align: center;
        width: 40px;
        cursor: pointer;
        position: absolute;
        right: 10px;
    }

    .func{
        font-weight: 777;
        background-color: rgb(233, 183, 183);
        transform: translateX(37px);
        border-radius: 5px;
        &:hover{
            background-color: rgb(231, 103, 103);
        }
    }

}
</style>