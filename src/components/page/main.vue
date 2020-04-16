<template>
    <div>
        <div>
            <keep-alive>
                <router-view/>
            </keep-alive>            
        </div>
        <div>
            <van-tabbar v-model='active' @change='changeTabbar(active)'>
                <van-tabbar-item icon='shop'> 首 页 </van-tabbar-item>
                <van-tabbar-item icon='bars'> 列 表 </van-tabbar-item>
                <van-tabbar-item icon='cart'>购 物 车</van-tabbar-item>
                <van-tabbar-item icon='manager'>个人中心</van-tabbar-item>
            </van-tabbar>
        </div>
    </div> 
</template>

<script>
    export default {
        data() {
            return {
                active:0,
                nowpath:''
            }
        },
        created(){
            this.changeTabbarActive()
        },
        updated(){
            this.changeTabbarActive()
        },
        methods:{
            changeTabbarActive(){
                this.nowpath = this.$route.name
                console.log(this.nowpath)
                if(this.nowpath =='cart'){
                    this.active = 2;
                }else if(this.nowpath =='categoryList'){
                    this.active = 1;
                }else if(this.nowpath =='shopmall'){
                    this.active = 0;
                }else if(this.nowpath =='member'){
                    this.active = 3;
                }
            },
            changeTabbar(active){
                console.log(active)
                switch(active){
                    case 0:
                        this.$router.push({name:'shopmall'})
                        break;
                    case 1:
                        this.$router.push({name:'categoryList'})
                        break;
                    case 2:
                        this.$router.push({name:'cart'})
                        break;
                    case 3:
                        this.$router.push({name:'member'})
                        break;
                }
            }
        }
    }
</script>

<style scoped>

</style>