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
// 查询todo
const getAllPritodo = (userid)=>{
    let sql = `select * from \`mytodo\`.\`privatetodo\` where deleted=0 and userid='${userid}' order by createtime desc`

    return exec(sql).then((data)=>{
        console.log('data',data)
        return {data,code:200}
    }).catch(error=>{
        console.log('error',error)
        return null
    })
}
// 添加todo
const addPritodo = (userid,content)=>{

    let data = Date.now()
    let currenttime = getData(data)

    let id = nanoid()
    content = xss(content)
    const sql = 
    `INSERT INTO \`mytodo\`.\`privatetodo\` (todoid, userid, content , createtime) VALUES ('${id}', '${userid}', '${content}','${currenttime}');`
    
    return exec(sql).then((data)=>{
        return {data,code:200}
    }).catch(error=>{
        console.log('error',error)
        return null
    })
}

// 完成todo
const finishedPritodo = (todoid,finished)=>{
    const  sql = 
    `UPDATE \`mytodo\`.\`privatetodo\` SET finished = '${finished}' WHERE (todoid = '${todoid}');`

    return exec(sql).then((data)=>{
        console.log('data',data)
        return {data,code:200}
    }).catch(error=>{
        console.log('error',error)
        return null
    })
}

// 删除todo
const deletePritodo = (todoid)=>{
    const  sql = 
    `UPDATE \`mytodo\`.\`privatetodo\` SET deleted = 1 WHERE (todoid = '${todoid}');`

    return exec(sql).then((data)=>{
        return {data,code:200}
    }).catch(error=>{
        console.log('error',error)
        return null
    })
}

module.exports = {
    getAllPritodo ,
    addPritodo,
    finishedPritodo,
    deletePritodo
}