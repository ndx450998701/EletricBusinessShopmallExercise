const Router = require('koa-router')
const router = new Router()
const mongoose = require('mongoose')

router.get('/',async(ctx) => {
    ctx.body='用户操作首页'
})

router.post('/register',async(ctx) => {
    const user = mongoose.model('user')
    let newUser = new user(ctx.request.body)
    await newUser.save().then(() => {
        ctx.body={
            code:200,
            message:'注册成功'
        }    
    })
    .catch(error => {
        ctx.body={
            code:500,
            message:error
        }
    })
})

router.post('/login',async(ctx) => {
    //接受前端传过来的数据
    let loginUser = ctx.request.body
    let userName = loginUser.userName
    let password = loginUser.password
    //读取user模型
    const user = mongoose.model('user') 
    //
    await user.findOne({userName:userName}).then(async(result) =>{
        console.log(result)
        if(result){
            //result为true说明查到匹配项，说明用户名存在
            let compareUser = new user()
            await compareUser.comparePassword(password,result.password)
            .then(isMatch => {
                //返回比较结果
                ctx.body = {code:200,message:isMatch}
            })
            .catch(error => {
                //查询失败，返回异常 
                ctx.body={code:500,message:error}
            })
        }else{
            //result为false说明用户名不存在
            ctx.body={code:200,message:'用户名不存在'}
        }
    })
    .catch(error => {
        ctx.body={code:500,message:error}
    })

    // try{
    //     //接受前端传过来的数据
    //     let loginUser = ctx.request.body
    //     let userName = loginUser.userName
    //     let password = loginUser.password
    //     //读取user模型
    //     const user = mongoose.model('user') 
    //     let result = await user.findOne({userName:userName})
    //     if(result){
    //         //result为true说明查到匹配项，说明用户名存在
    //         let compareUser = new user()
    //         await compareUser.comparePassword(password,result.password)
    //         .then(isMatch => {
    //             //返回比较结果
    //             ctx.body = {code:200,message:isMatch}
    //         })
    //         .catch(error => {
    //             //查询失败，返回异常
    //             ctx.body={code:500,message:error}
    //         })
    //     }else{
    //         //result为false说明用户名不存在
    //         ctx.body={code:200,message:'用户名不存在'}
    //     }
    // }catch(err){
    //     ctx.body={code:500,message:error}
    // }
})

module.exports=router