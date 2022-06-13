import requests from "./request";
// 登录
const reqLogin = ({username , password})=>{
    return requests({
        url:'/user/login',
        method:'post',
        data:{username , password}
    })
}
// 退出登录
const reqLoginOut = ()=>{
    return requests({
        url:'/user/loginout',
        method:'get',
    })
}
// 注册
const reqRegiste = ({username, password})=>{
    return requests({
        url:'/user/registe',
        method:'post',
        data:{username,password}
    })
}

// 获取私有 记事
const reqGetMyPrivate = (userid)=>{
    return requests({
        url:'/pritd/getmypri',
        method:'POST',
        data:{userid}
    })
}
// 增加一条 私有 记事
const reqAddPrivate = ({userid,  content})=>{
    return requests({
        url:'/pritd/addpri',
        method:'POST',
        data:{userid,content}
    })
}
// 完成一条 私有 记事
const reqFinishedPrivate = ({todoid,finished})=>{
    return requests({
        url:'/pritd/finishedpri',
        method:'POST',
        data:{todoid,finished}
    })
}
// 删除一条 私有 记事
const reqDeletedPrivate = (todoid)=>{
    return requests({
        url:'/pritd/deletedpri',
        method:"POST",
        data:{todoid}
    })
}



// 获得全部 社区 记事
const reqGetAllOpenItem = (sortTag)=>{
    return requests({
        url:`/optd/getallop?sortTag=${sortTag}`,
        method:'get',
    })
}

// 获得我的 共享 记事
const reqGetMyOpenItem = (userid)=>{
    return requests({
        url:'/optd/getmyop',
        method:'POST',
        data:{userid}
    })
}
// 增加一条 共享 记事
const reqAddOpenItem = ({userid , content})=>{
    return requests({
        url:'/optd/addop',
        method:'post',
        data:{userid , content}
    })
}

// 完成一条 共享 记事本
const reqFinishedOpenItem = ({todoid,finished})=>{
    return requests({
        url:'/optd/finishedop',
        method:'post',
        data:{todoid,finished}
    })
}

// 删除一条 共享 记事
const reqDeletedOpenItem = (todoid)=>{
    return requests({
        url:'/optd/deletedop',
        method:'post',
        data:{todoid}
    })
}


// 查看opentodo详情
const reqGetDetail = (todoid)=>{
    return requests({
        url:'/optd/getopdetail',
        method:'POST',
        data:{todoid}
    })
}

const reqGetOpMes = (mesobj)=>{
    return requests({
        url:'/mes/getopmes',
        method:'POST',
        data:{mesobj}
    })
}

// 获取五条留言
const reqGetMessages = ()=>{
    return requests({
        url:'/mes/getmes',
        method:'GET'
    })
}

// 留言
const reqAddMessage = ({userid , mesid , todoid})=>{
    return requests({
        url:'/mes/addmes',
        method:'POST',
        data:{userid , mesid , todoid}
    })
}

// 删除一条留言
const rqeRemAllMessage = ({todoid,index})=>{
    return requests({
        url:'/mes/remmes',
        method:"POST",
        data:{todoid,index}
    })
}
export {
    reqLogin,
    reqLoginOut,
    reqRegiste,

    reqGetAllOpenItem,
    reqAddOpenItem ,
    reqFinishedOpenItem,
    reqDeletedOpenItem,
    reqGetMyOpenItem,



    reqGetMyPrivate,
    reqDeletedPrivate,
    reqFinishedPrivate,
    reqAddPrivate,


    reqGetOpMes ,
    reqGetDetail,
    reqGetMessages,
    reqAddMessage,
    rqeRemAllMessage
}