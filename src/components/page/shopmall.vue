<template>
    <div class="shopmall">
        <!-- 头部搜索部分 -->
        <van-row class="search-bar">
            <van-col span='3'>
                <img :src="location" alt="" width='60%' class='location-icon'>
            </van-col>
            <van-col span='16'>
                <input type="text" class="search-text">
            </van-col>
            <van-col span='5'>
                <van-button size='mini' class="search-button">查 找</van-button>
            </van-col>
        </van-row>
        <!--图片轮播部分-->
        <div class="swipeArea">
            <van-swipe :autoplay="swipeTime">
                <van-swipe-item v-for='(img,index) in swipeImg' :key='index.id'>
                    <img v-lazy="img.image" class='swipeImg' @click='goGoodsDetails(img.goodsId)'>
                </van-swipe-item>
            </van-swipe>
        </div>
        <!--产品分类入口-->
        <div class="typeBar">
            <div v-for='goodType in mallCategory' :key='goodType.id' @click='goCategoryList(goodType.mallCategoryId)'>
                <img v-lazy="goodType.image">
                <span>{{goodType.mallCategoryName}}</span>
            </div>
        </div>
        <!--广告图片-->
        <div class="adver">
            <img v-lazy="adverPic" width="100%">
        </div>
        <!--商品推荐-->
        <div class="recommend">
            <div class="recommendTitle">
                商品推荐
            </div>
            <div class="recommendBody">
                <swiper :options='swiperOption'>
                    <swiper-slide v-for='(recommend,index) in recommendGood' :key='index.id' class="recommendItem">
                        <div  @click='goGoodsDetails(recommend.goodsId)'>
                            <img v-lazy="recommend.image" width='90%'>
                            <div>{{recommend.goodsName}}</div>
                            <div>￥{{recommend.price | moneyFilters }}(￥{{recommend.mallPrice | moneyFilters }})</div>
                        </div>    
                    </swiper-slide>
                </swiper>   
            </div>
        </div>
        <!--各种awesomeSwiper的属性和应用练习-->
        <!-- <swiperDefault></swiperDefault>
        <swiperDefault2></swiperDefault2>
        <swiperDefault3></swiperDefault3>
        <swiperText></swiperText> -->
        <!--楼层设计-->
        <floorComponent :floorData='floor1' :floorTitle='floorTitle.floor1' :floor='f1'></floorComponent>
        <floorComponent :floorData='floor2' :floorTitle='floorTitle.floor2' :floor='f2'></floorComponent>
        <floorComponent :floorData='floor3' :floorTitle='floorTitle.floor3' :floor='f3'></floorComponent>
        <!--热卖商品-->
        <div class="hotgood">
        <div class="hotgood-Title">
            热卖商品
        </div>
        <div>
            <van-list>
                <van-row class='hotgood-body'>
                    <van-col span='12' v-for='(item,index) in hotGoods' :key='index.id' class='hotgood-item'>
                        <hotgoodComponent :goodsId='item.goodsId' :goodimage='item.image' :goodname='item.name' :goodprice='item.price' :mallprice='item.mallPrice'>
                        </hotgoodComponent>
                    </van-col>
                </van-row>
            </van-list>
        </div>
    </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import URL from '@/servicesAPI.config.js'
    import { Swiper, SwiperSlide} from 'vue-awesome-swiper'
    import floorComponent from '../component/floorComponent'
    import hotgoodComponent from '../component/hotgoodComponent'
    import { numToMoney } from '@/components/filter/numToMoney.js'
    //!唠叨一局，非export default的文件，引入要加{}，非则会报错。
    import 'swiper/css/swiper.css' 
    export default {
        filters:{
            moneyFilters(money){
                return numToMoney(money)
            }
        },
        components:{ Swiper, SwiperSlide, floorComponent, hotgoodComponent},
        data() {
            return {
                location: require('../../assets/image/location.png'),
                swipeTime:1000,
                swipeImg:[],
                mallCategory:[],
                adverPic:{},
                recommendGood:{},
                swiperOption:{
                    slidesPerView:3
                },
                floor1:[],
                floor2:[],
                floor3:[],
                f1:'1F',
                f2:'2F',
                f3:'3F',
                floorTitle:{},
                hotGoods:[]
            }
        },
        created () {
            axios({
                url:URL.shoppingMall,
                methods: 'get',
            })
            .then(response => {
                console.log(response)
                if(response.status==200){
                    this.swipeImg = response.data.data.slides
                    this.mallCategory = response.data.data.category
                    this.adverPic = response.data.data.advertesPicture.PICTURE_ADDRESS
                    this.recommendGood = response.data.data.recommend
                    this.floor1 = response.data.data.floor1
                    this.floor2 = response.data.data.floor2
                    this.floor3 = response.data.data.floor3
                    this.floorTitle = response.data.data.floorName
                    this.hotGoods = response.data.data.hotGoods
                    console.log(this.mallCategory)
                }
            })
            .catch(error => {
                //console.log(error)
                alert('网络错误，未能请求到数据')
            })
        },
        methods:{
            goGoodsDetails (ID) {
                this.$router.push({name:'goodsDetails',query:{goodsId:ID}})
            },
            goCategoryList (ID) {
                this.$router.push({name:'categoryList',query:{CategoryIndex:ID-1}})
            }
        },
    }
</script>

<style scoped>
.shopmall{
    background-color:lightgrey;
}
.search-bar{
    height:2.2rem;background-color: #e5017d;line-height: 2.2rem;overflow: hidden;
}
.location-icon{
    padding-top:.3rem;padding-left:.5rem;
}
.search-text{
    width:100%;height:1.3rem;
    border-top:0px;border-left:0px;border-right:0px;border-bottom:1px white solid !important;
    background-color: #e5017d;color:white;
}
.search-button{
    width:80%;margin-left:.4rem;
}
.swipeArea{
    clear:both;max-height:10rem;
}
.swipeImg{
    width:100%;
}
.typeBar{
    background-color: #fff;margin:0 .3rem .3rem .3rem;border-radius: .3rem;
    font-size:14px;display: flex;flex-direction:row;flex-wrap:nowrap;
}
.typeBar div{
    padding:.4rem;font-size:12px;text-align: center;padding-top:.8rem;flex:1;
}
.typeBar img{
    width: 80%;
}
.recommend{
    background-color: #fff;margin-top: .3rem;
}
.recommendTitle{
    border-bottom: 1px solid #eee;font-size: 12px;color: #e5017d;padding: .3rem;
}
.recommendBody{
    font-size:12px;border-bottom: 1px solid #eee;padding: .2rem;
}
.recommendItem{
    border-right: 1px solid #eee;padding: .1rem;
}
.hotgood{
    background-color: white;
}
.hotgood-Title{
    width:100%;background-color:#eee;height: 2rem;line-height: 2rem;
    font-size: 20px;text-align: center;font-weight: bold;border-bottom: 1px solid #ccc;
}
.hotgood-item{
    border-bottom: 1px solid #ccc;box-sizing: border-box;
}
.hotgood-body>div:nth-child(2n-1){
    border-right: 1px solid #ccc;
}
</style>