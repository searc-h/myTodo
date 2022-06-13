<template>
    <div class="allopen-outer">
        <div class="timesort">
            <div class="first">时间排序</div>
            <div class="second" @click="timeSort('asc')" ref="Asc">↑</div>
            <div class="third" @click="timeSort('desc')" ref="Desc">↓</div>
        </div>
        <div>
            <div v-for="item in allopenitems" :key="item.id">
                <OpenItem :item='item'/>
            </div>
        </div>
    </div>
</template>

<script>
import OpenItem from '@/components/OpenItem'
import { onMounted ,computed, ref} from 'vue'
import { useStore } from 'vuex'
export default {
    name: 'AllOpen',
    components:{OpenItem },
    setup() {
        const store = useStore()

        // 在vue2 中我们是使用 mapstate或者mapgetter来拿到响应式的vuex里的数据
        // 这里也一样，通过计算机属性拿到响应式 vuex数据
        let allopenitems = computed(()=>{
            return store.state.allopen.allopenitem || []
        })
        let Asc = ref(null)
        let Desc = ref(null)
        let sortTag = ref('')
        async function timeSort(value){
            if(value == sortTag.value){
                console.log('顺序没变，不更新页面')
                return
            }
            else{
                sortTag.value = value
                if(sortTag.value=='desc'){
                    Desc.value.style.backgroundColor = 'rgb(155, 195, 233)'
                    Asc.value.style.backgroundColor = ''
                    await store.dispatch('getallopenitem','desc')
                }
                else if(sortTag.value=='asc'){
                    Asc.value.style.backgroundColor = 'rgb(155, 195, 233)'
                    Desc.value.style.backgroundColor = ''
                    await store.dispatch('getallopenitem','asc')
                }
                return
            }
        }

        onMounted(()=>{
            timeSort('desc')
        })

        return {
            allopenitems,
            timeSort,
            sortTag,
            Asc ,
            Desc
        }
    },

}
</script>

<style lang="less" scoped>
.allopen-outer {
    overflow-x: hidden;
    overflow-y: scroll;
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: rgb(255, 255, 255);
    top: 0px;
    left: 0px;
    
    .timesort{
        margin-top: 3px;
        display: flex;
        line-height: 20px;
        .first{
            padding-left: 10px;
            font-size: 14px;
            color: rgb(100, 95, 95);
        }

        .second , .third{
            width: 20px;
            text-align: center;
            cursor: pointer;
        }
    }
}
</style>