<template>
  <div class="userCenter">
    <div class="title">
        用户中心
    </div>

    <div class="container">
        <div class="radius"></div>
        <p>{{this.userInfo.userName}}</p>
        <div class="changePwd" @click="changePwd">
          修改密码
        </div>
    </div>

    <router-link to="/login">
        <div class="toLogin">
            退出登录
        </div>
    </router-link>

    <ChangePwd :changeStatus="changeStatus" @off="off"></ChangePwd>

    <!-- S 底部导航 -->
    <Bottom :title="title"></Bottom>
    <!-- E 底部导航 -->

  </div>
</template>

<script>
// 组件路径
import Bottom from '@/components/bottom'
import ChangePwd from '@/components/changePwd'
// json文件
import Json from '@/data.json'
// utils.js文件
import gloab from '@/utils.js'

export default {
  name: 'UserCenter',
  data () {
    return {
      title: '用户中心',
      userInfo: {
          userName: '',
          pwd: ''
      },
      changeStatus: false
    }
  },
  watch: {
    
  },
  methods: {
    changePwd(){
      this.changeStatus = true;
    },
    off(changeStatus){
      this.changeStatus = changeStatus;
    }
  },
  created(){
    
  },
  mounted(){
    this.userInfo = gloab.userInfo;
  },
  components: {
    Bottom,
    ChangePwd
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
$greenColor: #2fa548;

.userCenter{
    width: 100%;
    position: relative;
    .title{
        text-align: center;
        width: 300px;
        margin: 20px auto;
    }
    .container{
        width: 300px;
        margin: 40px auto;  
        .radius{
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background: #000;
            margin: 0 auto;
        }
        p{
            width: 80px;
            text-align: center;
            margin: 20px auto;
            font-size: 14px;
        }
        .changePwd{
          text-align: center;
        }
    }
    .toLogin{
        width: 80px;
        position: fixed;
        bottom: 120px;
        left: 50%;
        margin-left: -10%;
        color: #000;
    }
}
</style>