<template>
  <div class="login">
    <!-- S 提示框 -->
    <div class="tips">
        <el-alert
            title="密码错误"
            type="error"
            show-icon
            :closable="false"
            center
            v-if="errorStatus">
        </el-alert>

        <el-alert
            title="该账号尚未注册"
            type="warning"
            show-icon
            center
            :closable="false"
            v-if="warningStatus">
        </el-alert>

        <el-alert
            title="请输入账号"
            type="warning"
            show-icon
            center
            :closable="false"
            v-if="status">
        </el-alert>

        <el-alert
            title="账号有误，请重新输入"
            type="error"
            show-icon
            center
            :closable="false"
            v-if="userErrorStatus">
        </el-alert>
    </div>  
    <!-- E 提示框 -->

    
    <div class="allTitle">
        疾病食谱查询系统
    </div>

    <!-- S 登录 -->
    <div class="container">
        <div class="title">
            登 录
        </div>
        <div class="table">
            <div class="userName input">
                <a>账号：</a>
                <el-input placeholder="请输入账号" v-model="account" mimlength="6" maxlength="6" validate-event></el-input>
            </div>
            <div class="password input">
                <a>密码：</a>
                <el-input placeholder="请输入密码" v-model="pwd" show-password maxlength="16"></el-input>
            </div>
        </div>
        <div class="btn">
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="primary" @click="register">注册</el-button>
        </div>
    </div>
    <!-- E 登录 -->
    
  </div>
</template>

<script>
// utils.js
import gloab from '@/utils.js'

export default {
  name: 'Login',
  data () {
    return {
        user: {
            userName: '',
            pwd: ''
        },
        account: '',
        pwd: '',
        errorStatus: false,
        warningStatus: false,
        status: false,
        userErrorStatus: false
    }
  },
  methods: {
    login(){
        let _this = this;
        let len = gloab.user.length;
        let numLen = this.account.toString().length;

        if(numLen == 6 || this.account == 'admin'){
            
            for(let i = 0; i < len; i++){
                try {
                    switch (this.account) {
                        case gloab.user[0].userName.toString():
                            this.pwdStatus(this.account, this.pwd, 0);
                            break;
                        case gloab.user[1].userName.toString():
                            this.pwdStatus(this.account, this.pwd, 1);
                            break;
                        case gloab.user[2].userName.toString():
                            this.pwdStatus(this.account, this.pwd, 2);
                            break;
                        case gloab.user[3].userName.toString():
                            this.pwdStatus(this.account, this.pwd, 3);
                            break;
                        case gloab.user[4].userName.toString():
                            this.pwdStatus(this.account, this.pwd, 4);
                            break;
                        case gloab.user[5].userName.toString():
                            this.pwdStatus(this.account, this.pwd, 5);
                            break;
                        case gloab.user[6].userName.toString():
                            this.pwdStatus(this.account, this.pwd, 6);
                            break;
                        case gloab.user[7].userName.toString():
                            this.pwdStatus(this.account, this.pwd, 7);
                            break;
                        case gloab.user[8].userName.toString():
                            this.pwdStatus(this.account, this.pwd, 8);
                            break;
                    
                        default:
                            this.account = '';
                            this.warningStatus = true;
                            break;
                    }
                } catch (error) {
                    this.account = '';
                    this.warningStatus = true;
                }
                
            }
        }else if(numLen == 0){
            this.status = true;
        }else{
            this.userErrorStatus = true;
        }

        this.pwd = '';

        let timeout = setTimeout(() => {
            _this.warningStatus = false;
            _this.errorStatus = false;
            _this.status = false;
            _this.userErrorStatus = false;
            clearTimeout(timeout);
        }, 2000);
    },
    pwdStatus(account, pwd, num){
        if(pwd == gloab.user[num].pwd){
            let user = {
                userName: this.account,
                pwd: pwd
            };
            if(account == "admin"){
                this.$router.push({path: '/admin', query: {userInfo: user}}).catch(err => {
                    
                }); 
            }else{
                this.$router.push({path: '/index', query: {userInfo: user}}).catch(err => {
                   
                }); ;
            }

        }else{
            this.errorStatus = true;
        }
    },
    register(){
        this.$router.push('/register');
    }
  },
  mounted(){
    this.user = gloab.user;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
.login{
    width: 100%;
    position: relative;
    .tips{
        position: fixed;
        top: 30px;
        left: 50%;
        margin-left: -25%;
        width: 200px;
    }
    .allTitle{
        width: 320px;
        font-size: 24px;
        font-weight: bold;
        margin: 20% auto;
        text-align: center;
    }
    .container{
        width: 320px;
        min-height: 200px;
        margin: 30% auto;
        text-align: center;
        .title{
            font-size: 18px;
            color: #000;
        }
        .table{
            .input{
                display: flex;
                margin: 10px auto;
                a{
                    width: 60px;
                    line-height: 40px;
                }
            }
            
        }
    }
}
</style>
