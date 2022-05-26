const {exec} = require('../db/mysql')
const  { nanoid } =  require('nanoid')
const xss = require('xss')
function getData(n) {
    let now = new Date(n),
      y = now.getFullYear(),
      m = now.getMonth() + 1,
      d = now.getDate();
    return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8);
  }

// 查询全部todo
const getAllOpentodo = (sortTag)=>{
    
    let sql =
    `select  content , todoid ,  \`name\`,\`qqemail\` from \`mytodo\`.\`users\`  Users , \`mytodo\`.\`opentodo\` Opentodo 
    where Users.userid = Opentodo.userid and finished = 0 and deleted = 0 order by createtime ${sortTag};`
    
    return exec(sql).then((data)=>{
        return {data,code:200}
    }).catch(error=>{
        console.log('error',error)
        return null
    })
}

// 查询自己的opentodo
const getMyOpentodo = (userid)=>{
    let sql =
    `select  content , todoid  ,  \`name\`,\`qqemail\` ,deleted , finished from \`mytodo\`.\`users\`  Users , \`mytodo\`.\`opentodo\` Opentodo 
    where Users.userid ='${userid}' and Opentodo.userid = '${userid}' and deleted='0' order by createtime desc;`
    
    return exec(sql).then((data)=>{
        return {data,code:200}
    }).catch(error=>{
        console.log('error',error)
        return null
    })
    
}
// 添加todo
const addOpentodo = (userid,content)=>{
    
    let data = Date.now()
    let currenttime = getData(data)

    let id = nanoid()
    content = xss(content)
    const sql = 
    `INSERT INTO \`mytodo\`.\`opentodo\` (todoid, userid, content  , createtime) VALUES ('${id}', '${userid}', '${content}','${currenttime}');`
    
    return exec(sql).then((data)=>{
        return {data,code:200}
    }).catch(error=>{
        console.log('error',error)
        return null
    })
}

// 完成todo
const finishedOpentodo = (todoid,finished)=>{
    console.log(todoid)
    const  sql = 
    `UPDATE \`mytodo\`.\`opentodo\` SET finished = '${finished}' WHERE (todoid = '${todoid}');`

    return exec(sql).then((data)=>{
        return {data,code:200}
    }).catch(error=>{
        console.log('error',error)
        return null
    })
}

// 删除todo
const deleteOpentodo = (todoid)=>{
    const  sql = 
    `UPDATE \`mytodo\`.\`opentodo\` SET deleted = 1 WHERE (todoid = '${todoid}');`

    return exec(sql).then((data)=>{
        return {data,code:200}
    }).catch(error=>{
        console.log('error',error)
        return null
    })
}

// 获取某个todo的详情页
const getOpDetail = (todoid)=>{
    let sql = 
    `select Users.\`name\` , Users.qqemail , Opentodo.*  from \`mytodo\`.\`users\` Users , \`mytodo\`.\`opentodo\` Opentodo
    where Users.userid=Opentodo.userid and Opentodo.todoid='${todoid}';`

    let opInfo = {}
    return exec(sql).then(data=>{
        opInfo.todoid = data[0].todoid
        opInfo.content = data[0].content
        opInfo.finished = data[0].finished
        opInfo.deleted = data[0].deleted
        opInfo.meslist = JSON.parse(data[0].messages)
        opInfo.userinfo = {name:data[0].name,qqemail:data[0].qqemail}
        return {data:opInfo,code:200}
    })
    .catch(error=>{
        console.log('error',error)
        return error
    })
}

module.exports = {
    getAllOpentodo ,
    addOpentodo,
    finishedOpentodo,
    deleteOpentodo,
    getOpDetail,
    getMyOpentodo
}