import {
    reqGetMyOpenItem,
    reqAddOpenItem ,
    reqFinishedOpenItem,
    reqDeletedOpenItem
} from '../../api/index'

const state = {
    myOpenList : []
}
const actions = {
    // 获取我的 全部 opentodo
    async getMyOpenItem(context,userid){
        let result = await reqGetMyOpenItem(userid)
        if(result.errno==0){
            context.commit('GETMYOPENITEM',result.data)
            console.log(result.data)
        }
        else{
            return {message:result.message}
        }
    },

    // 增加  opentodo
    async addOpenItem(_ , newobj){
        let result = await reqAddOpenItem(newobj)
        if(result.errno==0){
            return {code:200,message:result.message}
        }else{
            return {code:500,message:result.message}
        }
    },

    // 完成
    async finishedOpenItem(_ ,{todoid,finished}){
        let result = await reqFinishedOpenItem({todoid,finished})
        if(result.errno==0){
            return {code:200,message:result.message}
        }else{
            return {code:500,message:result.message}
        }
    },

    // 删除
    async deletedOpenItem(_ ,todoid){
        let result = await reqDeletedOpenItem(todoid)
        if(result.errno==0){
            return {code:200,message:result.message}
        }else{
            return {code:500,message:result.message}
        }
    }
}
const mutations = {
    GETMYOPENITEM(state, value){
        state.myOpenList = value
    }
}
const getters = {
    haveDoneList(state){
        return state.myOpenList.filter((item)=>{
            return item.finished=='1' || item.deleted=='1'
        })
    },

    notDoneList(state){
        return state.myOpenList.filter((item)=>{
            return item.finished =='0' &&  item.deleted=='0'
        })
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}