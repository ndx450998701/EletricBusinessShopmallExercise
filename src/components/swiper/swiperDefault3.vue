<template>
  <div >
      <swiper class="swiper" :options="swiperOption">
        <div class="swiper-pagination" slot="pagination"></div>
        <swiper-slide class="swiper-slide" v-for="(item, index) in slide" :key="index">
           Slide {{item}} 
        </swiper-slide>
      </swiper>
  </div>
</template>

<script>
    import 'swiper/css/swiper.css' 
    import {Swiper,SwiperSlide} from 'vue-awesome-swiper'  
    export default {
        data() {
            return {
                slide: [1,2,3,4,5,6],
                swiperOption: {
                    direction:'vertical',
                    pagination:{
                        el:'.swiper-pagination'
                    }
                }
            }
        },
        components:{Swiper,SwiperSlide}
    }
</script>

<style scoped>
.swiper-slide{
    height:4rem;
    text-align:center;
    line-height: 4rem;
}
.swiper{
    height: 7rem;
    border-bottom: 1px solid #ccc;
    border-top: 1px solid #ccc;
}
</style>