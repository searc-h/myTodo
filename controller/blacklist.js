const {exec} = require('../db/mysql')

const addToBlack = ({userid,blackid})=>{

    let sql = 
    `select userid, blackid from mytodo.blacklist where userid=${userid} and blackid=${blackid}`
    return exec(sql).then(res=>{
        if(res.length>0)
        {
            sql = 
            `UPDATE \`mytodo\`.\`blacklist\` SET deleted = '0' WHERE (userid = '${userid}') and (blackid = '${blackid}');`
        }else{
            sql = 
            `insert into \`mytodo\`.\`blacklist\` (userid , blackid) values ('${userid}' , '${blackid}');`
        }
        return exec(sql).then((data)=>{
            return {data,code:200}
        }).catch(error=>{
            return error
        })
    }).catch(error=>{
        return error
    })
    
    
    
}

const remFromBlack = ({userid,blackid})=>{
    let sql = 
    `UPDATE \`mytodo\`.\`blacklist\` SET deleted = '1' WHERE (userid = '${userid}') and (blackid = '${blackid}');`


    return exec(sql).then((data)=>{
        return {data,code:200}
    }).catch(error=>{
        return error
    })
}

module.exports ={
    addToBlack,
    remFromBlack
}