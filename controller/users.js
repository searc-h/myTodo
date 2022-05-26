const {exec,escape} = require('../db/mysql')
const {genPassword} = require('../utils/cryp')
const  { nanoid } =  require('nanoid')

const Register = (username,password)=>{
    // 加密
    password = genPassword(password)

    // 防止sql注入
    username = escape(username)
    
    let sql = `select * from \`mytodo\`.\`users\` where name = ${username}`
    return exec(sql).then(data=>{
        if(data.length>0){
            return {message:'用户名已存在'}
        }else{
            password = escape(password)
            let id = nanoid()
            sql =
           `INSERT INTO \`mytodo\`.\`users\` (name, userid, password, qqemail) VALUES (${username}, '${id}', ${password}, '123');`
        
            return exec(sql).then((data)=>{
                console.log('data',data)
                return {code:200}
            }).catch(error=>{
                console.log('error',error)
                return error
            })
        }
    })  
    
}

const Login = (username, password)=>{
    // 加密
    password = genPassword(password)

    // 防止sql注入
    username = escape(username)
    password = escape(password)
    const sql = `select name , userid , qqemail from users where name=${username} and password=${password};`
    
    return exec(sql).then((data)=>{
        console.log('data',data)
        return data[0] || {}
    }).catch(error=>{
        console.log('error',error)
        return null
    })
}

const getUserDetail = (uerid)=>{

}
module.exports = {
    Login,
    Register,
    getUserDetail
}