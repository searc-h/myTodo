<template>
    <div>
        <div class="detail-outer">
            <div @click="back" class="back">◁</div>
            <div class="main">
                <div class="userinfo">
                    <div class="name"><span>Name:</span>{{todoInfo.userinfo.name}}</div>
                    <div class="email"><span>Email:</span>{{todoInfo.userinfo.qqemail}}</div>
                </div>
                
                <div class="title">content:</div>
                <div class="content">
                    {{todoInfo.content||''}}
                </div>
            </div>
            <div class="mesbar">
                <div class="title">留言板：</div>
                <div class="btn" @click="addMes">留言鼓励ta</div>
            </div>
            <div class="message" v-if="mesList.length==0">
                还没有留言哦，赶紧留言鼓励ta吧！
            </div>
            <div class="message" v-else>
                <div v-for="mesitem in mesList" :key="mesitem.index">
                    <div class="user">用户:{{mesitem.name}}</div>
                    <li >
                        {{mesitem.content}}--{{mesitem.author}}

                        <span v-if="todoInfo.userinfo.name==myname" @click="remOneMes({todoid:todoInfo.todoid,index:mesitem.index})">删除</span>
                    </li>
                </div>
                
            </div>

            <div class="addpannel" ref="addpannel">
                <div @click="addMes" class="addbar">————————</div>
                <span class="getnew" @click="getFiveMes">刷新</span>
                <div v-for="(mesitem) in fiveMesList" :key="mesitem.mesid" class="mesitem">
                    {{mesitem.content}}--{{mesitem.author}}
                    
                    <div class="addbtn" @click="addMesItem({todoid:todoInfo.todoid,mesid:mesitem.mesid})">留言</div>
                </div>
            </div>
        </div>


    </div>

</template>

<script>
import { useStore } from 'vuex'
import { computed, onMounted, reactive  ,ref} from 'vue'
import { useRouter } from 'vue-router'
export default {
    name:'OpDetail',
    setup(){
        let myname = ref(sessionStorage.getItem('myname'))
        const store = useStore()
        let mesList = computed(()=>{
            return store.state.message.mesList
        })
        let todoInfo = computed(()=>{
            return store.state.allopen.opentodoInfo
        })

        

        const router = useRouter()
        function back(){
            router.back()
        }


        let {todoid} = reactive(JSON.parse(localStorage.getItem('detailitem')))

        async function getDetail(){
            let result =  await store.dispatch('getDetail',todoid)
            if(result.code==200){
                await store.dispatch('getOpMes',{mesobj:todoInfo.value.meslist})
            }
        }

        let addpannel = ref(null)
        function addMes(){
            if(addpannel.value.style.transform ==''){
                addpannel.value.style.transform  = 'translateY(-220px)'
                getFiveMes()
            }
            else
                addpannel.value.style.transform = ''
        }

        let fiveMesList = ref(null)
        async function getFiveMes(){
            let result = await store.dispatch('getMessages')
            if(result.code==200){
                fiveMesList.value = result.fiveMesList
            }
        }

        let userid = ref(sessionStorage.getItem('userid'))
        async function addMesItem({todoid, mesid}){
            let result = await store.dispatch('addMessage',{todoid , mesid, userid:userid.value})
            if(result.code==200){
                addMes()
                // 刷新留言面板
                getDetail()
                
            }else{
                alert('暂未登录哦')
            }
        }

        async function remOneMes({todoid , index}){
            let result = await store.dispatch('remAllMes',{todoid , index})
            console.log(result)
            if(result.code==200){
                getDetail()
            }
        }

        onMounted(()=>{
            getDetail()
        })
        

        return{
            back,
            mesList,
            todoInfo,
            addMes,
            addpannel,
            getFiveMes,
            fiveMesList,
            addMesItem,
            myname,
            remOneMes
        }
    }

    
}
</script>

<style lang="less" scoped>
.detail-outer{
    background-color: white;
    position: relative;
    height: 100vh;
    // max-height: 500px;
    // overflow-x: hidden;
    // overflow-y: scroll;
    .back{
        background-color: rgb(219, 219, 219);
        line-height: 30px;
        font-size: 16px;
        font-weight: 999;
        padding-left: 20px;

    }

    .main{
        height: 220px;
        border: 1px solid rgb(175, 173, 173);
        .userinfo{
            display: flex;
            justify-content: space-between;
            padding: 10px;
            font-size: 17px;
            font-weight: 777;
            .name span,
            .email span
            {
                padding-right: 10px;
                font-size: 15px;
            }
        }
        .title{
            text-decoration: underline;
            font-size: 14px;
            padding-left: 10px;
        }

        .content{
            margin: 10px auto;
            height: 100px;
            width: 90%;
            border: 1px solid black;
            padding: 10px;
            font-size: 20px;
            font-weight: 444;
            line-height: 30px;

        }
    }

    .mesbar{
        
        line-height: 30px;
        text-decoration: underline;
        font-size: 14px;
        padding: 10px;
        display: flex;
        justify-content: space-between;
        .btn{
            background-color: rgb(168, 164, 172);
            border-radius: 10px;
            cursor: pointer;
            &:hover{
                background-color: rgb(223, 223, 223);
            }
        }
    }

    .message{
        height: 40vh;
        overflow-y: scroll;
        overflow-x: hidden;
        >div{
            margin-top: 5px;
        }
        .user{
            padding-left: 10px;
            font-size: 14px;
            color: rgb(133, 133, 133);
        }
        li{
            padding: 5px 10px;
            line-height: 20px;
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid rgb(184, 174, 174);
            span{
                font-size: 14px;
                text-decoration: underline;
                cursor: pointer;
            }
        }
    }
    .addpannel{
        text-align: center;
        height: 300px;
        width: 100%;
        padding: 0px 10px;
        background-color: rgb(224, 233, 233);
        position: absolute;
        transition: all 0.3s;
        transform: translateY(200px);
        box-sizing: border-box;

        .addbar{
            font-weight: 777;
        }
        .getnew{
            position: absolute;
            top: 0px;
            right: 10px;
            background-color: rgb(179, 169, 169);
            font-size: 15px;
            text-decoration: underline;
            cursor: pointer;
            &:hover{
                background-color: rgb(202, 198, 206);
            }   
        }
        .mesitem{
            line-height: 40px;
            border-bottom: 1px solid rgb(209, 207, 211);
            transition: all 0.3s;
            display: flex;
            justify-content: space-between;
            padding: 0px 10px;
            &:hover{
                background-color: rgb(175, 173, 173);
                cursor: pointer;
                .addbtn{
                    display: block;
                }
            }


            .addbtn{
                font-size: 14px;
                background-color: rgb(248, 161, 161);
                border-radius: 10px;
                display: none;
                &:hover{
                    background-color: rgb(240, 102, 102);
                }
            }
        }
    }

}
</style>