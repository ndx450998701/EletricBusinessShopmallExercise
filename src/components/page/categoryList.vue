<template>
    <div style='background:#eee;fontSize:18px;'>
        <div class='navBar'><van-nav-bar title='商品分类' /></div>
        <van-row>
            <van-col id='leftNav' span='6'>
                <div>
                    <ul>
                        <li :class='{categoryActive:CategoryIndex==index}' @click='categoryClicked(index,item.ID)' v-for='(item,index) in CategoryList' :key='index'>
                            {{item.MALL_CATEGORY_NAME}}
                        </li>
                    </ul>
                </div>    
            </van-col> 
            <van-col span='18' class='categorySubList'>
                <div>
                    <van-tabs v-model='active' @click='categorySubClicked'>
                        <van-tab v-for='(item,index) in categorySubList' :key='index' :title='item.MALL_SUB_NAME'>
                        </van-tab>
                    </van-tabs>
                </div>
                <div id='listDiv'>
                    <van-pull-refresh v-model='isRefresh' @refresh='onRefresh'>
                        <van-list 
                            v-model='loading' 
                            :finished="finished" 
                            @load="onload"
                            finished-text="已经没有数据了">
                            <div v-for='(item,index) in goodList' :key='index' class='listItem' @click='goGoodsDetails(item.ID)'> 
                                <div class="list-item-img">
                                    <img :src="item.IMAGE1" width='100%' :onerror='errImg' />
                                </div>
                                <div class="list-item-text">
                                    <div>{{item.NAME}}</div>
                                    <div>￥{{item.ORI_PRICE | moneyFilters }}</div>
                                </div>
                            </div>
                        </van-list>
                    </van-pull-refresh>
                </div>
            </van-col>
        </van-row>
    </div>
</template>

<script>
    import { numToMoney } from '@/components/filter/numToMoney.js'
    import axios from 'axios'
    import {Toast} from 'vant'
    import url from '@/servicesAPI.config.js'
    export default {
        data() {
            return {
                CategoryList:[],//商品大类信息
                CategoryIndex:0,
                categorySubList:[],//商品小类信息
                active:0,
                loading:false,//是否处于加载状态
                finished:false,//是否已经全部加载完毕
                isRefresh:false,//是否处于刷新状态
                presentPage:1,//当前分页页数，默认1
                categorySubId:'',//当然子类ID
                goodList:[],//子类商品信息
                errImg:'this.src="'+require('@/assets/image/errorimg.png')+'"'
            }
        },
        created(){
            this.getCategoryList()//获取商品大类数据
            this.getCategorySubList(1)//获取第一个大类的小类的数据
            if(this.$route.query.CategoryIndex){
                this.categoryClicked(this.$route.query.CategoryIndex,this.$route.query.CategoryIndex+1)
            }      
        },
        mounted(){
            let screenHeight = document.documentElement.clientHeight
            document.getElementById('leftNav').style.height=screenHeight -96 +'px'
            document.getElementById('listDiv').style.height=screenHeight -140 +'px'
        },
        methods: {
            //获取商品大类的方法，用于页面初始化时。
            getCategoryList () {
                axios({
                    url:url.getCategoryList,
                    method:'get'
                })
                .then(response => {
                    if(response.data.code==200 && response.data.message){
                        console.log(response.data.message)
                        this.CategoryList = response.data.message
                    }else{
                        Toast.fail('服务器异常，获取商品分类数据失败')
                    }
                })
                .catch(error => {
                    console.log(error)
                })
            },
            //获取商品目前大类的小类数据的方法，用于页面初始化和切换大类时
            getCategorySubList(categoryID){
                axios({
                    url:url.getCategorySubList,
                    method:'post',
                    data:{categoryID:categoryID}
                })
                .then(response => {
                    if(response.data.code==200 && response.data.message){
                        console.log(response.data.message)
                        this.active=0
                        this.categorySubList = response.data.message                 
                        this.categorySubId = this.categorySubList[0].ID
                        console.log(this.categorySubId)
                    }else{
                        Toast.fail('服务器异常，获取商品分类数据失败')
                    }
                })
                .catch(error => {
                    console.log(error)
                })
            },
            //点击商品大类触发的事件。1、将index变成被点击那项的索引，实现被点击反白效果
            //2、点击后获取被点击大类的商品小类信息 3、初始化子类商品页数和列表，能否加载
            categoryClicked(index,categoryID){
                this.CategoryIndex=index
                this.getCategorySubList(categoryID)
                this.presentPage=1
                this.finished=false
                this.goodList=[]
                this.onload()
            },
            //上拉加载事件
            onload(){
                setTimeout(()=>{
                    this.categorySubId = this.categorySubId?this.categorySubId:this.categorySubList[0].ID
                    this.getGoodsList()
                },1000)             
            },
            //下拉刷新事件
            onRefresh(){
                setTimeout(() => {
                    this.isRefresh=false
                    this.goodList=[]
                    this.presentPage=1
                    this.finished=false
                    this.onload()
                },1000)
            },
            //发送小类ID和页数获取商品信息的方法。
            getGoodsList(){
                axios({
                    url:url.getGoodsByCategorySubList,
                    method:'post',
                    data:{
                        presentPage:this.presentPage,
                        categorySubId:this.categorySubId
                    }
                })
                .then(response => {
                    if(response.data.code==200 && response.data.message.length>0){
                        this.presentPage++
                        this.goodList = this.goodList.concat(response.data.message)
                        console.log(response.data.message)
                    }else{
                        this.finished=true
                        console.log('已经没有数据了')
                    }
                    this.loading=false
                })
                .catch(error => {
                    console.log(error)
                })
            },
            //点击切换小类目录的方法。
            categorySubClicked(index,title){
                this.categorySubId = this.categorySubList[index].ID
                this.presentPage=1
                this.finished=false
                this.goodList=[]
                this.onload()                 
            },
            //点击商品能够前进到商品详情页的方法
            goGoodsDetails (ID) {
                this.$router.push({name:'goodsDetails',query:{goodsId:ID}})
            },
        },
        filters:{
            moneyFilters(money){
                return numToMoney(money)
            }
        },
    }
</script>

<style scoped>
.categoryActive{
    background-color: white;color:red;
}
#leftNav ul li{
    line-height:2rem;font-size:0.8rem;text-align: center;
    border-bottom: 1px solid #ccc;padding:8px 8px;   
}
.categorySubList{
    border-left:1px solid #ccc;
}
#listDiv{
    overflow: scroll;
}
.listItem{
    display: flex;
    flex-direction: row;
    font-size:0.8rem;
    border-bottom: 1px solid #f0f0f0;
    background-color: #fff;
    padding:5px;
}
.list-item-img{
    flex:8;
}
.list-item-text{
    flex:16;
    margin-top:10px;
    margin-left:10px;
}
</style>