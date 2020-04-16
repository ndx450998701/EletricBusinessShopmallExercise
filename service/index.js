const Koa = require('koa')
const app = new Koa()
const { connect,initSchemas } = require('./database/init.js')
const mongoose = require('mongoose')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
app.use(bodyParser())
app.use(cors())
const router = new Router()

//配置子路由
let User = require('./controler/user.js')
let test = require('./controler/test.js')
let goods = require('./controler/goods')
router.use('/user',User.routes())
router.use('/test',test.routes())
router.use('/goods',goods.routes())
//加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())

;(async()=>{
    await connect()
    initSchemas()   //在连接之后 执行绝对路径初始化

    // const user = mongoose.model('user')  //引入mongoose模型user
    // let userone = new user ({userName:'ndx231',password:'111111'}) //模型的实例化
    // userone.save().then(() => { //存储该实例，并在此之后在控制台提醒
    //     console.log('**************用户数据插入成功************')
    // }) 
    // let userSearch = await user.findOne({})
    // console.log('-------------------------')
    // console.log(userSearch)
    // console.log('-------------------------')
})()



// app.use(async(ctx)=>{
//     ctx.body = 'Hello Koa2!'
// })

app.listen(3000,()=>{
    console.log('[Server] strating at port 3000')
})