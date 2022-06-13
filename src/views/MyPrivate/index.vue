<template>
    <div>
        <div class="myprivate-outer" v-if="userid">
            <div class="havedone">
                <div class="done">未完成：</div>
                <transition-group name="item" appear>
                    <div v-for="item in notDoneList" :key="item.todoid">
                            <MyItem :item='item' />
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

        <div class="outer" v-else>暂未登录,请跳转到个人信息页进行登录</div>
    </div>
    
</template>

<script>
import MyItem from '@/components/MyItem'
import { useStore } from 'vuex'
import { computed, onMounted, ref } from 'vue'
export default {
    name:'MyPrivate',
    components:{MyItem},
    setup(){
        let userid = ref(sessionStorage.getItem('userid')||'')
        const store = useStore()
        let privateList = computed(()=>{
            return store.state.myprivate.myPrivateList
        })

        let haveDoneList = computed(()=>{
            return privateList.value.filter((item)=>{
                return item.finished=='1'
            })
        })

        let notDoneList = computed(()=>{
            return privateList.value.filter((item)=>{
                return item.finished=='0'
            })
        })

        onMounted(()=>{
            console.log('123')
            if(userid.value.trim()){
                console.log('1213')
                getPrivateList()
            }
        })

        async function getPrivateList(){
            await store.dispatch('getMyPrivate',userid.value)
        }

        async function reqAddPrivate(){
            await store.dispatch()
        }


        return{
            userid,
            privateList,
            reqAddPrivate,
            haveDoneList,
            notDoneList
        }
    }
}
</script>

<style lang="less" scoped>
.myprivate-outer{
    width: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    max-height: 70vh;
    overflow-y: scroll;
    overflow-x: hidden;
}
.done , .not{
    font-size: 14px;
    color: rgb(119, 117, 117);
    padding-left: 10px; margin-bottom: 10px;
    text-decoration: underline;
}
.outer{
    padding-top: 30px;
    min-height: 90vh;
    text-align: center;
    font-size: 17px;
    color: rgb(65, 66, 66);
    background-color: rgb(229, 234, 238);
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