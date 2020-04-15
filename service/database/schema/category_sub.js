const mongoose = require('mongoose') //引入mongoose
const Schema = mongoose.Schema //声明Schema

//创建用户schema
const categorySubSchema = new Schema({
    ID:{unique:true,type:String},
    MALL_CATEGORY_ID:String,
    MALL_SUB_NAME:String,
    COMMENTS:String,
    SORT:Number
})

//发布模型
mongoose.model('categorySub',categorySubSchema)