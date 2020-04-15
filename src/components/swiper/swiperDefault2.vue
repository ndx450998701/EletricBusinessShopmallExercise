<template>
    <div class='swiperDefault'>
        <swiper class='swiper' :options='swipeOption'>
            <swiper-slide class='swiper-slide' v-for=' (item,index) in arr' :key='index.id'>
                Slide{{item}}
            </swiper-slide>
            <div class='swipe-pagination' slot="pagination"></div>
        </swiper>
    </div>
</template>

<script>
    import 'swiper/css/swiper.css' 
    import { Swiper, SwiperSlide} from 'vue-awesome-swiper'  
    export default {
        data() {
            return {
                arr : [1,2,3,4,5,6],
                swipeOption: {
                    loop:true,
                    pagination:{
                        el:'.swipe-pagination',
                        clickable:true
                    }
                }
            }
        },
        components:{ Swiper, SwiperSlide }
    }
</script>

<style scoped>
.swiper-slide{
    height:4rem;text-align: center;background-color: #eee;
}
.swipe-pagination{
    border-bottom: 1px solid #ccc;text-align: center;background-color: #eee;
}
</style>