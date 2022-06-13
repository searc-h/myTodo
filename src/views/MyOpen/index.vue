<template>
    <div>
        <div class="myopen-outer" v-if="userid">
            <div class="havedone">
                <div class="done">未完成：</div>
                <transition-group name="item" appear>
                    <div v-for="item in notDoneList" :key="item.todoid">
                            <MyItem :item='item'/>
                    </div>
                </transition-group>
            </div>

            <div class="notdone">
                <div class="not" style="margin-top:10px">已完成：</div>
                <transition-group name="item" appear>
                    <div v-for="item in haveDoneList" :key="item.todoid">
                            <MyItem :item='item' />
                    </div>
                </transition-group>
            </div>
        </div>

        <div v-else class="outer">暂未登录,请跳转到个人信息页进行登录</div>
    </div>

</template>

<script>
import MyItem from '@/components/MyItem'
import { onMounted , computed,ref } from 'vue'
import { useStore } from 'vuex'
export default {
    name:'MyOpen',
    components:{
        MyItem,
    },
    setup(){
        const userid = ref(sessionStorage.getItem('userid') || '')
        const store = useStore() 
        let myOpenList = computed(()=>{
            return store.state.myopen.myOpenList
        })

        let haveDoneList = computed(()=>{
            return store.getters.haveDoneList
        })

        let notDoneList = computed(()=>{
            return store.getters.notDoneList || []
        })


        onMounted(async ()=>{
            if(userid.value.trim()){
                await store.dispatch('getMyOpenItem',userid.value)
            }
        })
        return {
            myOpenList,
            haveDoneList,
            notDoneList ,
            userid
        }
    }
}
</script>

<style lang="less" scoped>
.myopen-outer{
    width: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    max-height: 70vh;
    overflow-y: scroll;
    overflow-x: hidden;
}
.outer{
    padding-top: 30px;
    min-height: 90vh;
    text-align: center;
    font-size: 17px;
    color: rgb(65, 66, 66);
    background-color: rgb(229, 234, 238);
}
.done , .not{
    font-size: 14px;
    color: rgb(119, 117, 117);
    padding-left: 10px;
    margin-bottom: 10px;
    text-decoration: underline;
}

.item-enter-active,.item-leave-active{
    transition: all 0.3s linear;
}
/* 进入的起点 */
.item-enter-from{
  transform: translateX(-100%);
}
/* 进入的终点 */
.item-enter-to{
  transform: translateX(0px);
}
/* 离开的起点 */
.item-leave-from{
  transform: translateX(0px);
}
/* 离开的终点 */
.item-leave-to{
  transform: translateX(-100%);
}
</style>