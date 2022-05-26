var express = require('express');
var router = express.Router();
const { SuccessModel ,ErrorModel} = require('../resmodel/resModel');
const {
    getMes,
    addMesOpen,
    remOneMes,
    getOpMes
} = require('../controller/meesages')
const {checkLogin} = require('../middleware/checkLogin')

router.get('/getmes',function(req,res ,next){
    let result = getMes()
    result.then((result) => {
        if(result.code==200){
            res.json(
                new SuccessModel(result.data , '获取成功')
            )
            return
        }

        res.json(
            new ErrorModel('获取失败')
        )
    })

})

router.post('/addmes',checkLogin,function(req, res, next){
    let {userid , todoid , mesid} = req.body
    let result = addMesOpen({userid , todoid ,mesid})

    result.then(data=>{
        if(data.code==200){
            res.json(
                new SuccessModel(data.data,'成功')
            )
            return
        }
        res.json(
            new ErrorModel('失败')
        )
    })
})

router.post('/remmes', checkLogin, function(req,res,next){
    let {todoid , index}  = req.body
    let result = remOneMes(todoid,index) 
    result.then(result=>{
        if(result.code==200){
            res.json(
                new SuccessModel(result.data, '删除全部留言成功')
            )
            return
        }
        res.json(
            new ErrorModel('删除全部失败')
        )
    })
})

// 根据id获取留言
router.post('/getopmes',function(req,res, next){
    let {mesobj} = req.body
    console.log('mesobj',mesobj)
    if(mesobj.length > 0){
        let result = getOpMes(mesobj)
        result.then(result=>{
            console.log('mes',result)
            if(result.code==200){
                res.json(
                    new SuccessModel(result.data , '获取留言成功')
                )
                return
            }
            res.json(
                new ErrorModel('获取失败')
            )
        })
    }else res.json(
        new ErrorModel('还没有留言，赶紧留言鼓励ta吧')
    )
})

module.exports = router;
