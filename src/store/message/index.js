import {
    reqGetOpMes ,
    reqGetMessages,
    reqAddMessage,
    rqeRemAllMessage
} from '@/api/index'

const state ={
    mesList : []
}

const actions = {
    // 获取 todo 的留言
    async getOpMes(context , {mesobj}){
        let result = await reqGetOpMes(mesobj)
        if(result.errno == 0){
            context.commit('GETOPMES',result.data)
            return {code:200}
        }
        else{
            context.commit('GETOPMES',[])
            return {message:result.message}
        }
    },


    // 获取 五条留言
    async getMessages(){
        let result = await reqGetMessages()
        if(result.errno == 0){
            return {code:200 , fiveMesList:result.data}
        }else{
            return {message:result.message}
        }
    },

    // 增加 一条留言
    async addMessage(_,{userid , mesid , todoid}){
        let result = await reqAddMessage({userid , mesid , todoid})
        if(result.errno == 0){
            return {code:200}
        }else{
            return {message:result.message}
        }
    },

    // 删除全部留言
    async remAllMes(_,{todoid,index}){
    let result = await rqeRemAllMessage({todoid,index})
        if(result.errno == 0){
            return {code:200}
        }else{
            return {message:result.message}
        }
    }
}

const mutations = {
    GETOPMES(state , list){
        state.mesList = list
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