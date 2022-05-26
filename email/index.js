
let nodemailer = require('nodemailer');   // 引入nodemailer模块

const transporter = nodemailer.createTransport({
    host: "smtp.qq.com",
    port: 465,
    secure: false,
    service:"qq",
    auth: {
        user: "dhomain321@qq.com", // 用户账号
        pass: "kqjjenakupybecad", //授权码,通过QQ获取
},
});

async function sendMail(text,receive) {
    await transporter.sendMail({
        from: '测试node发送邮箱验证码<dhomain321@qq.com>', // sender address
        to: `测试验证码<${receive}@qq.com>`, // list of receivers
        subject: "验证码", // Subject line
        text: text, // plain text body
        html:"<div>hello</div>"
    },(error,info)=>{
        if(error){
            console.log(error)
            return info
        }
        console.log('yes')
    });
}

module.exports ={
    sendMail
}
