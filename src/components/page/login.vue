<template>
    <div class="register">
        <van-nav-bar
            title="登录页面"
            left-text="返回"
            left-arrow
            @click-left='goBack'
        />
        <div class="register-body">
            <van-field
            v-model="username"
            label="用户名"
            placeholder="请输入用户名"
            required
            clearable
            />
            <van-field
            v-model="password"
            label="密码"
            placeholder="请输入密码"
            required
            clearable
            type='password'
            />
            <div class='register-btn'>
                <van-button type="primary" size='large' @click="axiosUserLogin" :loading="onloading">
                    登录
                </van-button>
            </div>
            <div class='toRegister' @click="goRegister">
                <p>还没有账号？点击注册账号</p>
            </div>
        </div>
    </div> 
</template>

<script>
    import axios from 'axios'
    import { Toast } from 'vant'
    import URL from '@/servicesAPI.config.js'
    export default {
        data() {
            return {
                username:'',
                password:'',
                onloading:false
            }
        },
        created(){
            if(localStorage.userInfo){
                Toast.success('您已经登录，接下来为您自动跳转到用户首页')
                this.$router.push({name:'shopmall'})
            }
        },
        methods:{
            goBack () {
                this.$router.go(-1)
            },
            axiosUserLogin () {
                this.onloading=true
                axios({
                    url:URL.userLogin,
                    method:'post',
                    data:{
                        userName:this.username,
                        password:this.password
                    }
                })
                .then(response => {
                    if(response.data.code==200 && response.data.message==true){
                        new Promise((resolve,reject) =>{
                            localStorage.userInfo={userName:this.username}
                            setTimeout(()=>resolve(),500)
                        })
                        .then(()=>{
                            Toast.success('恭喜您，登录成功')
                            location.reload()
                            //this.$router.push({name:'shopmall'})                            
                        })
                        .catch(error=>{
                            console.log(error)
                            Toast.fail('登录状态保存失败')
                        })
                    }else if(response.data.message=='用户名不存在'){
                        Toast.fail(response.data.message)
                        this.onloading=false
                    }else if(response.data.message==false){
                        Toast.fail('密码错误！')
                        this.onloading=false
                    }
                })
                .catch((error) => {
                    Toast.fail('登录失败，未连接到服务器')
                    this.onloading=false
                })
            },
            goRegister(){
                this.$router.push({name:'register'})
            }
        }
    }
</script>

<style scoped>
.register{
    background-color: #eee;
}
.register-body{
    margin:20px auto;padding-bottom: 80px;border-radius: 5px;width:95%;
}
.register-btn{
    margin-top: 20px;
}
</style>