<template>
    <div class='cart'>
        <div class='navBarDiv'>
            <van-nav-bar
            title="购物车"
            />
        </div>
        <div v-if='isEmpty' class='empty'>
            购物车空空如也~
        </div>
        <div class="cartlist">
            <div v-for='(item,index) in cartInfo' :key='index' class="cartlist-item">
                <div class='cartlist-img'>
                    <img :src="item.goodsImg" width='100%'>
                </div>
                <div class='cartlist-info'>
                    <div class='cartlist-info-name'>{{item.goodsName}}</div>
                    <div class='cartlist-info-money'>
                        <div class='cartlist-info-price'><b>￥{{ item.goodsPrice | moneyFilters }}</b></div>
                        <div class='cartlist-info-amount'>
                            <van-stepper v-model='item.goodsAmount'></van-stepper>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
        <div class='clearcart'>
            <van-button type='danger' size='small' @click="clearCart" class="clearcart-button">清空购物车</van-button>
            <span class='totalMoney-context'>合计：￥{{ totalMoney | moneyFilters }}</span>
        </div>
    </div>
</template>

<script>
    import { numToMoney } from '@/components/filter/numToMoney.js'
    export default {
        data() {
            return {
                cartInfo:[],
                isEmpty:false
            }
        },
        computed:{
            totalMoney(){
                let totalprice = 0
                this.cartInfo.forEach((item,index)=>{
                    totalprice += item.goodsAmount * item.goodsPrice
                })
                localStorage.cartInfo = JSON.stringify(this.cartInfo)
                return totalprice
            }
        },
        created(){
            this.getCartInfo()
        },
        methods: {
            getCartInfo() { 
                if(localStorage.cartInfo){
                    this.cartInfo = JSON.parse(localStorage.cartInfo)
                }
                this.isEmpty = this.cartInfo.length>0 ? false : true
                console.log(this.cartInfo)
                console.log(this.isEmpty)
            },
            clearCart(){
                localStorage.removeItem('cartInfo')
                this.cartInfo=[]
                location.reload()
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
.cart{
    background-color: #eee;
}
.clearcart{
    position: fixed;bottom: 50px;border-top:1px solid #ccc;
    background-color: white;padding:5px;width:100%;
}
/* .clearcart-button{
    margin-right:12px;
} */
.cartlist{
    padding:10px 10px 90px 10px;
} 
.cartlist-item{
    display: flex;flex-direction: row;flex-wrap: nowrap;border-bottom: 1px solid #ccc;
    background-color: white;padding:10px;margin-bottom: 10px;
}
.cartlist-img{
    flex:8;margin-left:5px;
}
.cartlist-info{
    flex:16;margin-left:10px;font-size:16px;
}
.cartlist-info-name{
    margin-top:10px;height:2rem;line-height: 1rem;
}
.cartlist-info-money{
    display: flex;flex-direction: row;flex-wrap: nowrap;margin-top:1.5rem;
}
.cartlist-info-price{
    font-size:20px;color:red;
}
.cartlist-info-amount{
    position: absolute;right:30px;
}
.totalMoney-context{
    position: absolute;right:20px;font-size:20px;color:red;font-weight: bold;
}
.empty{
    text-align: center;margin-top: 30px;
}
</style>