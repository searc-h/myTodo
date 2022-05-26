var express = require('express');
var router = express.Router();
let { deleteOpentodo,getAllOpentodo,finishedOpentodo,addOpentodo,getOpDetail,getMyOpentodo} = require('../controller/optodo');
const { SuccessModel ,ErrorModel} = require('../resmodel/resModel');
const {checkLogin} = require('../middleware/checkLogin')
// 获取全部
router.get('/getallop', function(req, res, next) {
  let{ sortTag }= req.query
  let result = getAllOpentodo(sortTag);
  result.then((result) => {

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

router.post('/getmyop' ,function(req, res ,next){
  let {userid} = req.body
  let result = getMyOpentodo(userid);
  result.then((result) => {
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
})

// 增加todo
router.post('/addop',checkLogin,function(req,res, next){
  let {userid, content} = req.body

  let result = addOpentodo(userid,content);
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
router.post('/finishedop',checkLogin,function(req,res,next){
  let {todoid ,finished} = req.body

  let result = finishedOpentodo(todoid,finished);
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
router.post('/deletedop', checkLogin, function(req,res,next){
  let {todoid} = req.body

  let result = deleteOpentodo(todoid);
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

// 获取todo详情页
router.post('/getopdetail',function(req,res , next){
  let {todoid} = req.body
  let result  = getOpDetail(todoid)

  result.then(result=>{
    if(result.code==200){
      res.json(
        new SuccessModel(result.data, '获取成功')
      )
      return
    }
    res.json(
      new ErrorModel('获取失败')
    )
  })
})

module.exports = router;
