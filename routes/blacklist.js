var express = require('express');
var router = express.Router();
const {addToBlack,remFromBlack} = require('../controller/blacklist')
const { SuccessModel ,ErrorModel} = require('../resmodel/resModel');
const {checkLogin} = require('../middleware/checkLogin')

router.post('/addtoblack' , checkLogin,function(req,res ,next){
    let {userid , blackid} = req.body

    let result = addToBlack({userid, blackid})
    result.then(result=>{
        if(result.code==200){
            res.json(
                new SuccessModel('增加到黑名单成功')
            )
            return
        }

        res.json(
            new ErrorModel('增加到黑名单失败')
        ) 
    })
})

router.post('/remfromblack' , checkLogin, function(req , res , next){
    let {userid , blackid} = req.body

    let result = remFromBlack({userid, blackid})
    result.then(result=>{
        if(result.code==200){
            res.json(
                new SuccessModel('从黑名单移除成功')
            )
            return
        }

        res.json(
            new ErrorModel('从黑名单移除失败')
        ) 
    })
})

module.exports = router;