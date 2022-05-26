用户注册  register              POST   /api/user/register  (username, password)
用户登录 login                  POST  /api/user/login    (username, password)


用户获得全部 opendtodo           GET    /api/optd/getallop  

用户发布 opentodo               POST    /api/optd/addop    (userid , content)
用户完成 opentodo               POST    /api/optd/finishedop   (todoid)
用户删除 opentodo               POST    /api/optd/deletedop    (todoid)
用户获得自己的 opentodo         POST    /api/optd/getmyop   (userid)

用户查询某个opentodo的详情页：   POST     /api/optd/getopdetail   (todoid)


用户发布 privatetodo            POST      /api/pritd/addpri   (userid,  content)
用户完成 privatetodo            POST     /api/pritd/finishedpri   (todoid)
用户删除 privatetodo            POST     /api/pritd/deletedpri    (todoid) 
用户获得全部 privatetodo        POST    /api/pritd/getmypri   (userid)


用户添加 到黑名单               POST     /api/black/addtoblack     (userid, blackid)
用户 从黑名单中删除             POST     /api/black/remfromblack   (userid, blackid) 


用户查询随机5条message          GET         /api/mes/getmes   
用户留言                        POST        /api/mes/addmes    (totoid)
删除全部留言                    POST          /api/mes/remmes   (totoid)






