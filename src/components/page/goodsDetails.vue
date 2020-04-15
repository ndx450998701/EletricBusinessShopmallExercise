<template>
    <div class='goodsDetailsComponent'>
        <van-nav-bar
        title="商品详情"
        left-text="返回"
        left-arrow
        @click-left="onclickleft"
        />
        <div>
            <div class="topImg">
                <img :src="goodsData.IMAGE1" width='100%' :onerror='errImg' >
            </div>
            <div class="goodsInfo">
                <div class="price">
                    <span class="presentPrice">￥{{goodsData.PRESENT_PRICE | moneyFilters}}</span>
                    <span class="oriPrice"><s>原价￥{{goodsData.ORI_PRICE | moneyFilters}}</s></span>
                </div>
                <div class="goodsName">
                    <span><b>{{goodsData.NAME}}</b></span>
                </div>
            </div>
            <div class='goodsContext'>
                <van-tabs swipeable sticky>
                    <van-tab title="商品详情" class='goodsDetails' v-html='goodsData.DETAIL'></van-tab>
                    <van-tab title="商品评论" class='goodsComments'>商品评论制作中</van-tab>
                </van-tabs>
            </div>
            <div class="bottom">
                <div>
                    <van-button type="primary" size="large" @click="addGoodsToCart">加入购物车</van-button>
                </div>
                <div>
                    <van-button type="danger" size="large">直接购买</van-button>
                </div>   
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import {Toast} from 'vant'
    import { numToMoney } from '@/components/filter/numToMoney.js' 
    import url from '@/servicesAPI.config.js'
    export default {
        data() {
            return {
                goodsId:'',
                goodsData:{},
                errImg:'this.src="'+require('@/assets/image/errorimg.png')+'"'
            }
        },
        created(){
            this.goodsId = this.$route.query.goodsId
            this.getGoodDetail()
        },
        methods: {
            getGoodDetail () {
                axios({
                    url:url.getGoodsDetails,
                    method:'post',
                    data:{goodsId:this.goodsId}
                })
                .then(response => {
                    if(response.data.code==200 && response.data.message){
                        this.goodsData = response.data.message
                        console.log(this.goodsData)
                    }else{
                        Toast.fail('未请求到商品数据，服务器连接异常')
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            },
            onclickleft () {
                this.$router.go(-1)
            },
            addGoodsToCart () {
                //清空数据的方法
                //localStorage.removeItem(cartInfo)
                //取得本地存储中购物车中的数据，若无数据则赋予空数组
                let cartInfo = localStorage.cartInfo ? JSON.parse(localStorage.cartInfo) : []
                //使用数组find方法判断本地购物车数据中是否存在该商品
                let isHaveThisGood = cartInfo.find(good => good.goodsId == this.goodsId)
                console.log(isHaveThisGood)
                if(!isHaveThisGood){
                    //如果不存在，将本商品的属性打包成一个对象
                    let newGood = {
                        goodsId : this.goodsData.ID,
                        goodsName : this.goodsData.NAME,
                        goodsPrice : this.goodsData.PRESENT_PRICE,
                        goodsImg : this.goodsData.IMAGE1,
                        goodsAmount : 1,
                    }
                    //将该商品的信息加入到购物车信息中
                    cartInfo.push(newGood)
                    //操作本地存储
                    localStorage.cartInfo = JSON.stringify(cartInfo)
                    Toast.success('已成功添加！')
                }else{
                    Toast.success('商品已存在！')
                }
                this.$router.push({name:'cart'})
            }
        },
        filters:{
            moneyFilters(money){
                return numToMoney(money)
            }
        },
    }
</script>

<style scoped>
.goodsDetailsComponent{background-color: #eee;}
.price{height:2rem;margin-left:8px;}
.presentPrice{
    color:red;font-size:24px;
}
.oriPrice{
    color:grey;font-size:18px;
}
.goodsInfo{
    margin-bottom: 10px;
}
.goodsName{
    font-size:18px;margin-left:8px;
}
.goodsDetails{
    font-size:0px;
}
.goodsComments{
    /* 这里设置字体大小为0的原因是，接受到的图片数据img中间有空格，导致页面中两张图片中间有缝隙
    又因为是纯图片布局，因此直接设置字体大小0即可解决问题。
    如果工作中遇到这种问题，一种办法是和后端协商解决该问题，一个是自己写过滤。 */
    font-size:18px;
}
.bottom{
    width:100%;background-color: white;
    position:fixed;bottom: 0;left: 0;
    display:flex;flex-direction: row;
}
.bottom>div{
    flex:1;padding:5px;
}
.goodsContext{
    padding-bottom:60px;
}
</style>