<template>
    <div @click='goGoodsDetails()'>   
        <img v-lazy="goodimage" width='90%' class="goodsImage">
        <p class="goodsName">{{goodname}}</p>
        <p class="goodsPrice">￥{{goodprice | moneyFilters }}(￥{{mallprice | moneyFilters }})</p>
    </div>                
</template>

<script>
    import { numToMoney } from '@/components/filter/numToMoney.js'
    export default {
        props:['goodimage','goodname','goodprice','mallprice','goodsId'],
        filters:{
            moneyFilters(money){
                return numToMoney(money)
            }
        },
        methods: {
            goGoodsDetails () {
                this.$router.push({name:'goodsDetails',query:{goodsId:this.goodsId}})
            }
        },
    }
</script>

<style scoped>
.goodsName{
    padding: 0 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space:nowrap;
    font-size:14px;
}
.goodsPrice{
    font-size:14px;text-align: center;
}
</style>