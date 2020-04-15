<template>
    <div>
        <div class='navbar'>
            <van-nav-bar 
            title="会员中心" 
            left-text="注销账号"
            @click-left="clickLogoff()"
            />
        </div>
        <div class="avatar">
            <img :src="avatarURL" class='avatar-img'>
        </div>
        <div class='loginButton'>
            <div>
                <van-button type="info" size='large' @click="goLogin">我要登录</van-button>
            </div>
            <div>
                <van-button type='primary' size='large' @click="goRegister">我要注册</van-button>
            </div>
        </div>
        <div class='cells'>
            <van-cell-group>
                <van-cell title="会员卡" is-link />
                <van-cell title="地址管理" is-link />
                <van-cell title="我的订单" is-link />
                <van-cell title="会员权益" is-link />
                <van-cell title="联系我们" is-link />
            </van-cell-group>
        </div>
    </div>
</template>

<script>
import { Toast } from 'vant'
    export default {
        data() {
            return {
                avatarURL:require('@/assets/image/touxiang.jpg')
            }
        },
        methods:{
            goLogin(){
                this.$router.push({name:'login'})
            },
            goRegister(){
                this.$router.push({name:'register'})
            },
            clickLogoff(){
                localStorage.removeItem('userInfo')
                Toast.success('您已经成功注销账号')
                location.reload()
            }
        }
    }
</script>

<style scoped>
.avatar{
    text-align: center;background-color: #ff60b7;padding-top:2rem;
    padding-bottom: 1.2rem;border-bottom: 1px solid #ccc;
}
.avatar-img{
    width:70px;border-radius: 50px;border:1px solid #ccc;
}
.loginButton{
    display: flex;flex-direction: row;flex-wrap: nowrap;border-bottom: 1px solid #ddd;
}
.loginButton div{
    flex:1;text-align: center;padding:15px 30px 15px 30px;
}
</style>