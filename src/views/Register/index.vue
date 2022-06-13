<template>
<div class="login-outer">
    <div class="nameDiv">
        <input type="text" placeholder="输入用户名" v-model="username">
    </div>
    <div class="passDiv">
        <input type="password" placeholder="输入密码" v-model="password">
    </div>
    <div class="funDiv">
        <button @click="registerAfter">注册</button>
        <button @click="toLogin">去登陆</button>
    </div>
</div>
    
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default {
    name:'Register',
    setup(){
        const router = useRouter()
        const store = useStore()
        let username = ref('')
        let password = ref('')
        function registerAfter(){
            if(username.value.trim()){
                let result =store.dispatch('Register',{username:username.value,password:password.value})
                result.then(data=>{
                    if(data.code==200){
                         router.push({
                            name:'login'
                        })
                    }else{
                        alert(data.message)
                    }
                })
            }else{
                alert('不能为空')
            }
            
        }

        function toLogin(){
            router.push({
                name:'login'
            })
        }

        return {
            username,
            password,
            registerAfter,
            toLogin
        }
    }
}
</script>

<style lang="less">
.registe-outer{
    text-align: center;
}
</style>