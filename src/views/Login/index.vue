<template>
<div class="login-outer">
    <div class="nameDiv">
        <input type="text" placeholder="输入用户名" v-model="username">
    </div>
    <div class="passDiv">
        <input type="password" placeholder="输入密码" v-model="password">
    </div>
    <div class="funDiv">
        <button @click="loginAfter" class="login">登录</button>
        <button @click="toRegister" class="registe">去注册</button>
    </div>
</div>
    
        
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default {
    name:'Login',
    setup(){
        const router = useRouter()
        const store = useStore()
        let username = ref('')
        let password = ref('')
        // 点击登录后触发的事件
        function loginAfter(){
            if(username.value.trim()){
                let result = store.dispatch('Login',{username:username.value,password:password.value})
                result.then(data=>{
                    if(data.code){
                        sessionStorage.setItem('userid',data.userid)
                         router.push({
                            name:'myinfo'
                        })
                    }else{
                        alert('密码或者用户名错误')
                    }
                })
            }else{
                alert('不能为空')
            }
        }

        function toRegister(){
            router.push({
                name:'register'
            })
        }
       
    
        return {
            loginAfter,
            username,
            password,
            toRegister
        }
    },
}
</script>

<style lang='less'>
.login-outer{
    height: 80vh;
    background-color: rgb(213, 224, 220);
    padding-top: 40px;

    .nameDiv,.passDiv{
        input{
            line-height: 40px;
            width: 220px;
            outline: none;
            border: none;
            padding-left: 10px;
            border: 1px solid transparent;
            border-radius: 10px;
            transition: all 0.3s;
            font-size: 17px;
        }
        input:focus{
            width: 250px;
            border: 1px solid rgb(68, 66, 66);
        }
    }

    .nameDiv{
        margin-bottom: 10px;
    }
    .passDiv{
        margin-top: 10pxx;
    }

    text-align: center;

    .funDiv{
        margin: 10px auto;
        display: flex;
        justify-content: space-around;
        line-height: 40px;
        width: 200px;

        button{
            width: 40%;
            background-color: rgb(190, 197, 195);
            border-radius: 10px;
            line-height: 30px;
            border: 1px solid transparent;
            outline: none;
            font-size: 15px;
            font-weight: 555;
            transition: all 0.3s;
            cursor: pointer;
            &:hover{
                background-color: rgb(110, 114, 113);
            }
        }
    }
}

</style>