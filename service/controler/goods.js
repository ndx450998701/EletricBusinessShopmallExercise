const Router = require('koa-router')
const router = new Router()
const mongoose = require('mongoose')
const fs = require('fs')

//向数据库中导入所有商品数据
router.get('/insertAllGoodsInfo',async(ctx) => {
    fs.readFile('./data_json/pureGoods.json','utf8',(err,data)=>{
        let pureGoods = JSON.parse(data)
        const goods = mongoose.model('goods')
        let amount = 0 
        pureGoods.map((value,index)=>{
            let newGoods = new goods(value)
            newGoods.save().then(()=>{
                amount++
                console.log('成功'+amount)
            })
            .catch(err=>{
                console.log('失败'+err)
            })
        })
    })
    ctx.body='正在导入数据'
})
//向数据库中导入商品大类数据
router.get('/insertCategoryInfo',async(ctx) => {
    fs.readFile('./data_json/category.json','utf8',(err,data) => {
        let originCategory = JSON.parse(data)
        const category = mongoose.model('category')
        let categoryAmount = 0
        originCategory.RECORDS.map((value,index) => {
            let newCategory = new category(value)
            newCategory.save().then(() => {
                categoryAmount++
                console.log('插入商品大类数据成功'+categoryAmount)
            })
            .catch(err => {
                console.log('插入商品大类数据失败'+err)
            })
        })
    })
    ctx.body='正在插入商品大类数据'
})
//向数据库中导入商品小类数据
router.get('/insertCategorySubInfo',async(ctx) => {
    fs.readFile('./data_json/category_sub.json','utf8',(err,data) => {
        let categorySubData = JSON.parse(data)
        const categorySub = mongoose.model('categorySub')
        let categorySubAmont = 0
        categorySubData.RECORDS.map((value,index) => {
            let newcategorySub = new categorySub(value)
            newcategorySub.save().then(() => {
                categorySubAmont++
                console.log('插入商品分类数据成功'+categorySubAmont)
            })
            .catch(err => {
                console.log('插入商品分类数据失败'+err)
            })
        })
    })
    ctx.body='正在插入商品分类数据'
})
//从数据库中获取商品对应详情信息
router.post('/getGoodsDetails',async(ctx) =>{
    // let goodsId = ctx.request.body.goodsId
    // const goods = mongoose.model('goods')
    // await goods.findOne({ID:goodsId})
    // .then(async(result) => {
    //     ctx.body={code:200,message:result}
    // })
    // .catch(err =>{
    //     ctx.body={code:500,message:err}
    // })
    try{
        let goodsId = ctx.request.body.goodsId
        const goods = mongoose.model('goods')
        let result = await goods.findOne({ID:goodsId})
        ctx.body = {code:200,message:result}
    }catch(err){
        ctx.body = {code:500,message:err}
    }
})
//获取商品大类信息
router.get('/getCategoryList',async(ctx) => {
    try{
        const category = mongoose.model('category')
        let result = await category.find()
        ctx.body={code:200,message:result}
    }catch(error){
        ctx.body={code:500,message:error}
    }
})
//利用商品大类ID获取商品小类信息
router.post('/getCategorySubList',async(ctx) => {
    //测试固定写死ID并且采用get方法简化调试，后续会改回post
    try{
        let categoryID = ctx.request.body.categoryID
        //let categoryID = 1
        const categorySub = mongoose.model('categorySub')
        let result = await categorySub.find({MALL_CATEGORY_ID:categoryID})
        ctx.body={code:200,message:result}
    }catch(error){
        ctx.body={code:500,message:error}
    }
})
//利用商品小类ID获取所有该类下的产品
router.post('/getGoodsByCategorySubList',async(ctx) => {
    //测试固定写死ID并且采用get方法简化调试，后续会改回post
    try{
        //let categorySubId = "2c9f6c946016ea9b016016f79c8e0000"
        let categorySubId = ctx.request.body.categorySubId//从前端获取商品小类
        let presentPage = ctx.request.body.presentPage//从前端获取目前分页页数
        let itemPerPage = 10 //设置每页的商品数量
        let startPoint = (presentPage-1)*itemPerPage //计算本次获取商品信息的开始位置
        const goods = mongoose.model('goods')
        let result = await goods.find({SUB_ID:categorySubId})
        .skip(startPoint).limit(itemPerPage).exec()
        ctx.body={code:200,message:result}
    }catch(error){
        ctx.body={code:500,message:error}
    }
})
module.exports=router