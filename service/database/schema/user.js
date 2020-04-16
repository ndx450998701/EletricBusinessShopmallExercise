const mongoose = require('mongoose') //引入mongoose
const Schema = mongoose.Schema //声明Schema
let ObjectId = Schema.Types.ObjectId //声明Object类型
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10;

//创建用户schema
const userSchema = new Schema({
    userID : {type:ObjectId},
    userName : {unique:true,type:String},
    password : {type:String},
    createDate : {type:Date,default:Date.now()},
    lastLogin : {type:Date,default:Date.now()},
})
//用户密码的加盐处理
userSchema.pre('save',function(next){
    bcrypt.genSalt(SALT_WORK_FACTOR,(err,salt) => {
        if(err) return next(err)
        bcrypt.hash(this.password,salt,(err,hash) => {
            if(err) return next(err)
            this.password = hash
            next()
        }) 
    })
})
//对比密码的方法
userSchema.methods = {
    comparePassword:(_password,password) => {
        return new Promise((resolve,reject) => {
            bcrypt.compare(_password,password,(err,isMatch) => {
                if(!err) resolve(isMatch)
                else reject(err)
            })
        })
    }
}
//发布模型
mongoose.model('user',userSchema)