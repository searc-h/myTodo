import { 
    reqGetAllOpenItem,
    reqGetDetail
} from '../../api/index'

const state = {
    name:'allopen',
    allopenitem:[],
    opentodoInfo:{
        userinfo:{},
        content:''
    }
}
const actions = {
    // 获得所有 optodo
    async getallopenitem(context,sortTag){
        let result = await reqGetAllOpenItem(sortTag)
        if(result.errno==0){
            context.commit('GETALLOPENITEM',result.data)
        }else{
            return {message:result.message}
        }
    },

    // 获得 一个 optodo的详情
    async getDetail(context,todoid){
        let result = await reqGetDetail(todoid)
        if(result.errno==0){
            context.commit('GETDETAIL',result.data)
            return {code:200}
        }else{
            return {message:result.message}
        }
    }
}
const mutations = {
    GETALLOPENITEM(state, value){
        state.allopenitem = value
    },
    GETDETAIL(state , value){
        state.opentodoInfo = value
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