import {
    reqGetMyPrivate,
    reqDeletedPrivate,
    reqFinishedPrivate,
    reqAddPrivate
} from '@/api/index'

const state = {
    myPrivateList : []
}
const actions = {
    // 获取我的 pirvate
    async getMyPrivate(context , userid){
        let result = await reqGetMyPrivate(userid)
        if(result.errno == 0){
            context.commit('GETMYPRIVATE',result.data)
            return {code:200}
        }else return {message:result.message}
    },

    // 删除private
    async deletedPrivate(_,todoid){
        let result = await reqDeletedPrivate(todoid)
        if(result.errno == 0){
            // context.commit('GETMYPRIVATE',result.data)
            return {code:200}
        }else return {message:result.message}
    },

    // 完成private
    async finishedPrivate(_,{todoid,finished}){
        let result = await reqFinishedPrivate({todoid,finished})
        if(result.errno == 0){
            // context.commit('GETMYPRIVATE',result.data)
            return {code:200}
        }else return {message:result.message}
    },

    // 新增
    async addPrivate(_, {userid,content}){
        let result = await reqAddPrivate({userid,content})
        if(result.errno == 0){
            // context.commit('GETMYPRIVATE',result.data)
            return {code:200}
        }else return {message:result.message}
    }

}
const mutations = {
    GETMYPRIVATE(state , value){
        state.myPrivateList = value
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