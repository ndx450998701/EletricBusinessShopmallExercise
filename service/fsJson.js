const fs = require('fs')

fs.readFile('./data_json/goods.json','utf8',(err,data)=>{
    let originData = JSON.parse(data)
    let pushData = []
    let amount = 0
    originData.RECORDS.map((value,index)=>{ 
        if(value.IMAGE1!=null){
            amount++
            pushData.push(value)
            console.log(value.NAME)
        }
    })
    console.log(amount)
    
    fs.writeFile('./data_json/pureGoods.json',JSON.stringify(pushData),err=>{
        if(err) console.log('提纯数据文件写入失败')
        else console.log('提纯数据文件写入成功')
    })
})

