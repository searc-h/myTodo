const {ErrorModel} = require("../resmodel/resModel")

function checkLogin(req ,res ,next){
    if(req.session.name){
        next()
        return
    }

    res.json(
        new ErrorModel('暂未登录哦')
    )
}

module.exports = {checkLogin}