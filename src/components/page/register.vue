<template>
    <div class="register">
        <van-nav-bar
            title="用户注册页面"
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
            :error-message="usernameErrorMsg"
            clearable
            />
            <van-field
            v-model="password"
            label="密码"
            placeholder="请输入密码"
            required
            clearable
            :error-message="passwordErrorMsg"
            type='password'
            />
            <div class='register-btn'>
                <van-button type="primary" size='large' @click="registerAction" :loading="onloading">
                    马上注册
                </van-button>
            </div>
            <div class='toLogin' @click="toLogin">
                <p>已有账号？点击前往登录页面</p>
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
                onloading:false,
                usernameErrorMsg:'',
                passwordErrorMsg:''
            }
        },
        methods:{
            goBack () {
                this.$router.go(-1)
            },
            registerAction () {
                this.checkForm() && this.axiosUserRegister()
            },
            checkForm () {
                let isOK = true
                if(this.username.length<5){
                    isOK=false
                    this.usernameErrorMsg='用户名不能小于5位'
                }else if(this.password.length<6){
                    isOK=false
                    this.passwordErrorMsg='密码不能小于6位'
                }
                return isOK
            },
            axiosUserRegister () {
                this.onloading=true
                axios({
                    url:URL.userRegister,
                    method:'post',
                    data:{
                        userName:this.username,
                        password:this.password
                    }
                })
                .then(response => {
                    //console.log(response)
                    if(response.data.code==200){
                        Toast.success('恭喜您，账号注册成功！')
                        this.$router.push({name:'login'})
                    }else{
                        this.onloading=false
                        console.log(response.data.message)
                        Toast.fail('注册失败')
                    }
                    console.log(response.data.code)
                })
                .catch((error) => {
                    this.onloading=false
                    Toast.fail('注册失败')
                })
            },
            toLogin(){
                this.$router.push({name:'login'})
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
.toLogin{
    font-size: 14px;color:blue;
}
</style>