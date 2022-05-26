var express = require('express');
var router = express.Router();
let {getAllPritodo ,
  addPritodo,
  finishedPritodo,
  deletePritodo } = require('../controller/pritodo');
const { SuccessModel ,ErrorModel} = require('../resmodel/resModel');
const {checkLogin} = require('../middleware/checkLogin')

// 获取全部
router.post('/getmypri',checkLogin, function(req, res, next) {
  let {userid} = req.body
  let result = getAllPritodo(userid);
  result.then((result) => {
    console.log('res',result)

    if(result.code==200){
      res.json(
        new SuccessModel(result.data,'获取全部成功')
      )
      return
    }

    res.json(
      new ErrorModel(data,'获取失败')
    ) 
  })
});

// 增加todo
router.post('/addpri',checkLogin,function(req,res, next){
  let {userid, content} = req.body

  let result = addPritodo(userid,content);
  result.then((result) => {
    if(result.code==200){
      res.json(
        new SuccessModel(result.data,'增加成功')
      )
      return
    }
    res.json(
      new ErrorModel(data,'获取失败')
    ) 
  })
})

// 完成todo
router.post('/finishedpri',checkLogin,function(req,res,next){
  let {todoid,finished} = req.body
  let result = finishedPritodo(todoid,finished);
  result.then((result) => {
    if(result.code==200){
      res.json(
        new SuccessModel(result.data,'修改成功')
      )
      return
    }
    res.json(
      new ErrorModel('修改失败')
    )
  })
})

// 删除todo
router.post('/deletedpri',checkLogin,function(req,res,next){
  let {todoid} = req.body

  let result =  deletePritodo(todoid);
  result.then((result) => {
    if(result.code==200){
      res.json(
        new SuccessModel(result.data,'删除成功')
      )
      return
    }
    res.json(
      new ErrorModel('删除失败')
    )
  })
})

module.exports = router;
