import {
    reqLogin,
    reqRegiste,
    reqLoginOut
} from '@/api/index'
const state = {
    userinfo:{}
}
const actions = {
    async Login(context , {username, password}){
        let result = await reqLogin({username, password})
        if(result.errno == 0){
            context.commit('LOGIN',result.data)
            sessionStorage.setItem('myname',result.data.name)
            return {userid:result.data.userid, code:200}
        }else
            return {message:result.message}
    },

    async LoginOut(){
        let result = await reqLoginOut()
        if(result.errno == 0){
            return {code:200}
        }else{
            return {message:"退出登录失败"}
        }
    },

    async Register(_,{username, password}){
        let result = await reqRegiste({username, password})
        if(result.errno == 0){
            return {code:200}
        }else
            return {message:result.message}
    }
}
const mutations = {
    LOGIN(state , value){
        state.userinfo = value
    }

}
const getters = {
    
}

export default {
    state,
    actions,
    mutations,
    getters
}