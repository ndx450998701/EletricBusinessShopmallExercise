const mongoose = require('mongoose') //引入mongoose
const Schema = mongoose.Schema //声明Schema

//创建用户schema
const categorySchema = new Schema({
    ID:{unique:true,type:String},
    MALL_CATEGORY_NAME:String,
    IMAGE:String,
    TYPE:Number,
    SORT:Number,
    COMMENTS:String
})

//发布模型
mongoose.model('category',categorySchema)