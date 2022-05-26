const mysql = require('mysql')

const con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'520cyd',
    port:'3306',
    database:'mytodo'
})

// 开始连接
con.connect()

function exec(sql){
    const promise = new Promise((resolve , reject)=>{
        con.query(sql,(err,result)=>{
            if(err){
                reject(err)
            }else {
                resolve(result)
            }
        })
    })

    return promise
}

module.exports = {
    exec,
    escape:mysql.escape
    // mysql自带的方法，可以解决sql注入问题
}