<template>
    <div class="floor1-body">
        <div >
            <div class="floor1-title">
                {{floor}}--{{floorTitle}}
            </div>
            <div class='floor1-uncommon'>
                <div class='floor1-uncommon-left' @click="goGoodsDetails(floorData_0.goodsId)">
                    <img :src="floorData_0.image" width='100%'>
                </div>
                <div class='floor1-uncommon-right' @click="goGoodsDetails(floorData_1.goodsId)">
                    <div class='floor1-uncommon-right-top'>
                        <img :src="floorData_1.image" width='100%'>
                    </div>
                    <div class='floor1-uncommon-right-bot' @click="goGoodsDetails(floorData_2.goodsId)">
                        <img :src="floorData_2.image" width='100%'>
                    </div>
                </div>
            </div>        
        </div>
        <div class="floor1-common">
            <div v-for='(item,index) in floorData.slice(3)' :key='index.id' @click="goGoodsDetails(item.goodsId)">
                <img :src="item.image" width='100%'>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['floorData','floorTitle','floor'],
        data() {
            return {
                floorData_0:{},
                floorData_1:{},
                floorData_2:{},
            }
        },
        watch:{
            floorData (val) {
                this.floorData_0 = this.floorData[0]
                this.floorData_1 = this.floorData[1]
                this.floorData_2 = this.floorData[2]
            }
        },
        methods: {
            goGoodsDetails (ID) { 
                this.$router.push({name:'goodsDetails',query:{goodsId:ID}})
            },
        },
    }
</script>

<style scoped>
.floor1-body{
    background-color: white;
}
.floor1-title{
    width:100%;background-color:#eee;height: 2rem;line-height: 2rem;
    font-size: 20px;text-align: center;font-weight: bold;border-bottom: 1px solid #ccc;
}
.floor1-uncommon{
    display: flex;flex-direction: row;border-bottom: 1px solid #ccc;
}
.floor1-uncommon div{
    box-sizing: border-box;-webkit-box-sizing: border-box;
    width:10rem;
}
.floor1-uncommon-left{
    border-right:1px solid #ccc;
}
.floor1-uncommon-right-top{
    border-bottom: 1px solid #ccc;
}
.floor1-common{
    display: flex;flex-direction: row;flex-wrap: wrap;
}
.floor1-common div{
    width:10rem;border-bottom:1px solid #ccc;
    box-sizing: border-box;-webkit-box-sizing: border-box;
}
.floor1-common div:nth-child(2n-1){
    border-right:1px solid #ccc;
}
</style>