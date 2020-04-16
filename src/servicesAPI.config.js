const baseURL = 'http://mock.studyinghome.com/mock/5e7b6e14ef619e1977e29c4f/elebus/';
const koaURL = 'http://localhost:3000/'
const URL = {
    shoppingMall:baseURL+'index',
    userRegister:koaURL+'user/register',
    userLogin:koaURL+'user/login',
    getGoodsDetails:koaURL+'goods/getGoodsDetails',//从数据库中获取商品对应详情信息
    getCategoryList:koaURL+'goods/getCategoryList',//获取商品大类信息
    getCategorySubList:koaURL+'goods/getCategorySubList',//利用商品大类ID获取商品小类信息
    getGoodsByCategorySubList:koaURL+'goods/getGoodsByCategorySubList',//利用商品大类ID获取商品小类信息

}
module.exports = URL 