<template>
  <div class="change">
    <!-- S 提示框 -->
    <div class="tips">
        <el-alert
            title="修改密码成功"
            type="success"
            show-icon
            center
            v-if="status">
        </el-alert>
    </div>  
    <!-- E 提示框 -->

    <div class="changePwd" v-if="changeStatus" @click="off">
      <!-- S 修改密码 -->
      <div class="container" @click.stop>
        <div class="title">
          修改密码
        </div>
        <div class="content">
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
            <el-form-item label="旧密码" prop="oldPwd">
              <el-input type="password" v-model="ruleForm.oldPwd" autocomplete="off" maxlength="16"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newPwd">
              <el-input type="password" v-model="ruleForm.newPwd" autocomplete="off" maxlength="16"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPwd">
              <el-input type="password" v-model="ruleForm.checkPwd" autocomplete="off" maxlength="16"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <!-- E 修改密码 -->
    </div>
  </div>
</template>

<script>
// 组件路径
import Bottom from '@/components/bottom'
// json文件
import Json from '@/data.json'
// utils.js文件
import gloab from '@/utils.js'

export default {
  name: 'ChangePwd',
  props: {
    changeStatus: {
      type: Boolean,
      default: false
    }
  },
  data () {
    var oldPwd = (rule, value, callback) => {
        if (!value) {
            return callback(new Error('旧密码不能为空'));
        }else if(value === gloab.userInfo.pwd){
            callback();
        }else{
            callback(new Error('旧密码错误，请重新输入'));
        }
    };
    var newPwd = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('请输入新密码'));
        } else {
            if (value === this.ruleForm.oldPwd) {
                callback(new Error('新密码不能与旧密码一致!'));
            }else{
              callback();
            }
        }
    };
    var checkPwd = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.newPwd) {
            callback(new Error('两次输入密码不一致!'));
        } else {
            callback();
        }
    };
    return {
      status: false,
      ruleForm: {
        oldPwd: '',
        newPwd: '',
        checkPwd: ''
      },
      rules: {
          oldPwd: [
              { validator: oldPwd, trigger: 'blur' }
          ],
          newPwd: [
              { validator: newPwd, trigger: 'blur' }
          ],
          checkPwd: [
              { validator: checkPwd, trigger: 'blur' }
          ]
      },
    }
  },
  methods: {
    submitForm(formName) {    //提交
        const _this = this;
        this.$refs[formName].validate((valid) => {
            if (valid) {
                gloab.userInfo.pwd = this.ruleForm.newPwd;
                this.changeGloabUser();
                this.status = true;
                this.off();
                this.$router.push({path: '/login'});

                let timeout = setTimeout(() => {
                    _this.status = false;
                    clearTimeout(timeout);
                }, 1500);
            } else {
                return false;
            }
        });
    },
    resetForm(formName) {   //重置
        this.$refs[formName].resetFields();
    },
    off(){  //传值回父组件  关闭弹窗
      this.$emit('off', false);
      this.ruleForm = {
        oldPwd: '',
        newPwd: '',
        checkPwd: ''
      }
    },
    changeGloabUser(){  //更改全局user密码
      gloab.user.map((item, i)=>{
        if(item.userName == gloab.userInfo.userName){
          item.pwd = gloab.userInfo.pwd
        }
      })
    }
  },
  created(){
    
  },
  mounted(){
    
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
.tips{
  position: fixed;
  top: 30px;
  left: 50%;
  margin-left: -25%;
  width: 200px;
}
.changePwd{
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  background: rgba(0,0,0,.6);
  .container{
    width: 94vw; 
    height:50Vh; 
    background: #fff; 
    margin: 30% auto;
    border-radius: 20px;
    .title{
      width: 100%;
      line-height: 50px;
      text-align:center;
    }
    .content{
      margin: 10px 10px;
    }
  }
}
</style>