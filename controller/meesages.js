const {exec} = require('../db/mysql')

const getMes = ()=>{
    let idArr = [0,1,2,3,4]
    for(let i =0;i<5;i++){
        idArr[i] = Math.round(Math.random()*10) 

        for(var j = 0; j < i; j++){
            if(idArr[i] == idArr[j]){
                i--
            }
        }
    }

    let sql =
    `select * from \`mytodo\`.\`messages\` where (mesid=${idArr[0]} or mesid=${idArr[1]} or mesid=${idArr[2]} or mesid=${idArr[3]} or mesid=${idArr[4]});`

    return exec(sql).then(data=>{
        return {data,code:200}
    }).catch(error=>{
        return error
    })
}

// 前端按把mesid与todoid传给服务器
// 后端把mesid 写入 oepntodo表的 messages列中

// 首先去查询是否为空，如果为空，就直接update语句，
// 如果不为空，就先去拿出messages ，再追加 留言，最后update
const addMesOpen = ({userid , mesid, todoid})=>{

    let arrstr = ''
    let sql = `select messages from \`mytodo\`.\`opentodo\` where todoid='${todoid}'`
    
    return exec(sql).then(res=>{
        let arrobj = JSON.parse(res[0]['messages'])
        let newobj = {index:arrobj.length,userid:userid,mesid:mesid}

        if(arrobj){
            arrobj.push(newobj)
            arrstr = JSON.stringify(arrobj)
            sql = 
            'UPDATE \`mytodo\`.\`opentodo\` SET \`messages\` '+ "="+ `'${arrstr}'` + 'WHERE (todoid = '+ `'${todoid}'` +')';
            
        }else{
            let arrobj = []
            arrobj.push(newobj)
            arrstr = JSON.stringify(arrobj)
            sql = 
            'UPDATE \`mytodo\`.\`opentodo\` SET \`messages\` '+ "="+ `'${arrstr}'` + 'WHERE (todoid = '+ `'${todoid}'` +')';
        }

        return exec(sql).then(data=>{
            return {data,code:200}
        }).catch(error=>{
            return error
        })   

    }).catch(error=>{
        console.log(error)
        return error
    })

}

const remOneMes = (todoid,index)=>{
    let arrstr = ''
    let sql = `select messages from \`mytodo\`.\`opentodo\` where todoid='${todoid}'`
    
    return exec(sql).then(res=>{
        let arrobj = JSON.parse(res[0]['messages'])
        let newobj = arrobj.filter((item)=>{
            return item.index!= index
        })

        console.log('newobj',newobj)

        arrstr = JSON.stringify(newobj)
        sql = 
        'UPDATE \`mytodo\`.\`opentodo\` SET \`messages\` '+ "="+ `'${arrstr}'` + 'WHERE (todoid = '+ `'${todoid}'` +')';
    

        return exec(sql).then(data=>{
            return {data,code:200}
        }).catch(error=>{
            return error
        })   

    }).catch(error=>{
        console.log(error)
        return error
    })

}

const getOpMes = (mesobj)=>{

    let sql = 
    `select * from \`mytodo\`.\`messages\`  where mesid='-1' `

    mesobj.forEach(mesitem => {
        sql += ` or mesid ='${mesitem.mesid}' `
    });

    return exec(sql).then(data=>{
    
        for(let i =0;i<mesobj.length;i++){
            for(let j=0;j<data.length;j++){
                if(mesobj[i].mesid == data[j].mesid)
                {
                    mesobj[i].content = data[j].content
                    mesobj[i].author = data[j].author
                    mesobj[i].mesid = data[j].mesid
                    break;
                }
            }
        }
        return mesobj

    }).then(mesobj=>{
        let sql = 
        `select \`name\`, userid from \`mytodo\`.\`users\` where userid='-1' `

        mesobj.forEach((mesitem)=>{
            sql += ` or userid = '${mesitem.userid}' `
        })

        return exec(sql).then(data=>{

            for(let i =0;i<mesobj.length;i++){
                for(let j=0;j<data.length;j++){
                    if(mesobj[i].userid == data[j].userid)
                    {
                        mesobj[i].name = data[j].name
                        break;
                    }
                }
            }

            return {data:mesobj,code:200}
        })
    })
    .catch(error=>{
        console.log(error)
        return error
    })
} 

module.exports = {
    getMes,
    addMesOpen,
    remOneMes,
    getOpMes
}