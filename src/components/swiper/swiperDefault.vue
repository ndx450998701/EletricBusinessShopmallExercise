<template>
    <div class='swiperDefault'>
        <swiper class='swiper'>
            <swiper-slide class='swiper-slide' v-for=' (item,index) in arr' :key='index.id'>
                Slide{{item}}
            </swiper-slide>
        </swiper>
    </div>
</template>

<script>
    import 'swiper/css/swiper.css' 
    import { Swiper, SwiperSlide} from 'vue-awesome-swiper'  
    export default {
        data() {
            return {
                arr : [1,2,3,4,5,6]
            }
        },
        components:{ Swiper, SwiperSlide }
    }
</script>

<style scoped>
.swiper-slide{
    border-bottom: 1px solid #ccc;height:4rem;text-align: center;
    background-color: #eee;
}
</style>