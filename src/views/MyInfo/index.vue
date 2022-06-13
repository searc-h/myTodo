<template>
    <div class="myinfo-outer">
        <div v-if="userid">
            <div class="userinfo">
                <div class="avater">这里是我的头像</div>
                <div class="name">Name : <span>{{name}}</span></div>
                <div class="email">eamil : <span>{{email}}</span></div>
            </div>
            <div class="loginout" @click="loginOut">退出登录</div>
        </div>


        <div v-else @click="toLogin" class="outer">去登陆</div>
    </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
    name:"MyInfo",
    setup(){
        const router = useRouter()
        const store = useStore()
        let userid = ref(sessionStorage.getItem('userid'))
        function toLogin(){
            router.push({
                name:'login',
            })
        }

        let name = computed(()=>{
            return store.state.myinfo.userinfo.name
        })

        let email =computed(()=>{
            return store.state.myinfo.userinfo.qqemail
        })

        function loginOut(){
            sessionStorage.setItem('userid','')
            sessionStorage.setItem('myname','')
            let result = store.dispatch('LoginOut')
            result.then(res=>{
                if(res.code==200){
                    router.push({
                        name:'myopen'
                    })
                }else{
                    alert('退出登录失败')
                }
            })
            
        }
        return {
            userid,
            toLogin,
            loginOut,
            name,
            email
        }
    }
}
</script>

<style lang="less" scoped>
.myinfo-outer{
    padding-top: 20px;
    width: 100%;
    
    height: 100vh;
    position: absolute;
    background-color: rgb(252, 252, 252);
    top: 0px;
    left: 0px;

    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;

    .avater{
        width: 200px;
        background-color: rgb(141, 177, 206);
        border-radius: 50%;
        line-height: 200px;
    }
    .name , .email{
        margin-top: 20px;
        span{
            font-weight: 777;
            font-size: 20px;
        }
    }

    .loginout{
        margin-top: 20px;
        background-color: royalblue;
        border-radius: 10px;
        line-height: 30px;
        color: white;
        cursor: pointer;
    }
}
.outer{
    margin-top: 30px;
    background-color: aquamarine;
    border-radius: 10px;
    width: 100px;
    line-height: 40px;
    transition: all 0.3s;
    
    cursor: pointer;
    &:hover{
        background-color: rgb(157, 221, 221);
    }
    text-align: center;
    font-size: 17px;
    color: rgb(65, 66, 66);
    background-color: rgb(229, 234, 238);
}
</style>