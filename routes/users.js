var express = require('express');
var router = express.Router();
const {sendMail} = require('../email/index')
const {Login,Register} = require('../controller/users')
const {SuccessModel, ErrorModel} = require('../resmodel/resModel')
/* GET users listing. */
router.post('/login', function(req, res, next) {
  const {username,password} = req.body
  // const {username,password} = req.query
  let result = Login(username,password)
  result.then(data=>{
    if(data.name){
      req.session.name = data.name
      req.session.id = data.id
      req.session.qqemail = data.qqemail
      // 这里session会同步到redis里面，不需要自己操作
      // 服务端存储session,客户端是看不到的，只能看到cookie,
      // 所以登录成功之后，我们只需要把username,realname放进session里面，再验证登录时拿出来检验即可实现登录检验
      res.json(
        new SuccessModel(data,'登陆成功')
      )
      return
    }

    res.json(
      new ErrorModel('登陆失败')
    )
  })
})

router.post('/registe', function(req, res, next) {
  const {username,password} = req.body
  // const {username,password} = req.query
  let result = Register(username,password)
  result.then(data=>{
    if(data.code==200){
      res.json(
        new SuccessModel(data,'注册成功')
      )
      return
    }
    else if(data.message){
      res.json(
        new ErrorModel(data.message)
      )
      return 
    }

    res.json(
      new ErrorModel('注册失败')
    )
  })
})

// 发送邮件 获取验证码
router.use('/emails', function (req, res, next) {
  let qqEmail= req.body.email;
  var obj = {
      code:Math.ceil(Math.random()*1000)
  };
  let text=`验证码：${obj.code}.您正在使用登录功能，验证码提供他人可能导致账号被盗，请勿转发或泄漏`
  sendMail(text,qqEmail)
  res.json(obj)
  return
})
module.exports = router;
