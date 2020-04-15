const mongoose = require('mongoose')
const db = 'mongodb://localhost/eb-test'
const glob = require('glob') //引入glob
const { resolve } = require('path') //引入resolve方法

exports.initSchemas = () => {
    glob.sync(resolve(__dirname,'./schema','**/*.js')).forEach(require)
    //作用是将所有schema里头的图标的相对路径变成绝对路径的初始化。
    //并把改方法暴露出去，在index。js里头使用。
}

let reconnectTimes = 0;

return new Promise((resolve,reject) => {
    exports.connect = () => {
        //连接服务器
        mongoose.connect(db)
        //监听事件-丢失连接
        mongoose.connection.on('disconnected',() => {
            console.log('**************数据库未连接************')
            if(reconnectTimes<3){
                reconnectTimes++
                console.log(`尝试重连数据库中，第${reconnectTimes}次重连`)
                mongoose.connect(db)
            }else{
                reject()
                throw new Error('数据库连接出现问题，请进行人工操作处理。')
            }  
        })
        //监听事件-连接错误
        mongoose.connection.on('error',err => {
            console.log('**************数据库链接错误************')
            if(reconnectTimes<3){
                reconnectTimes++
                console.log(`尝试重连数据库中，第${reconnectTimes}次重连`)
                mongoose.connect(db)
            }else{
                reject(err)
                throw new Error('数据库连接出现问题，请进行人工操作处理。')
            }  
        })
        //监听事件-单次事件-连接成功
        mongoose.connection.once('open',() => {
            console.log('***************MongoDB has been connected')
            resolve()
        })
    }
})

