const Router = require('koa-router')
const router = new Router()

router.get('/',async(ctx)=>{
    ctx.body='测试页面'
})

module.exports=router
