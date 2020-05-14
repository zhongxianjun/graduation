<template>
  <div class="register">
    <!-- S 提示框 -->
    <div class="tips">
        <el-alert
            title="注册成功"
            type="success"
            show-icon
            center
            v-if="status">
        </el-alert>

        <el-alert
            title="该账号已被注册"
            type="warning"
            show-icon
            center
            v-if="warningStatus">
        </el-alert>
    </div>  
    <!-- E 提示框 -->

    <!-- S 注册 -->
    <div class="container">
        <div class="title">
            注册
        </div>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="账号" prop="user">
                <el-input v-model.number="ruleForm.user" minlength="6" maxlength="6" @blur="userRepeat()"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="ruleForm.pass" autocomplete="off" maxlength="16"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" maxlength="16"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
    <!-- E 注册 -->
    
  </div>
</template>

<script>
// utils.js
import gloab from '@/utils.js'

export default {
  name: 'Register',
  data () {
    var checkAge = (rule, value, callback) => {
        if (!value) {
            return callback(new Error('账号不能为空'));
        }else{
            if (!Number.isInteger(value)) {
                callback(new Error('请输入数字值'));
            }else{
                if(value.toString().length < 6 ){
                    callback(new Error('账号必须是六位数'));
                }else{
                    callback();
                }
            }
        }
    };
    var validatePass = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('请输入密码'));
        } else {
            if (this.ruleForm.checkPass !== '') {
                this.$refs.ruleForm.validateField('checkPass');
            }
            callback();
        }
    };
    var validatePass2 = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
            callback(new Error('两次输入密码不一致!'));
        } else {
            callback();
        }
    };
    return {
        ruleForm: {
          user: '',
          pass: '',
          checkPass: ''
        },
        rules: {
            user: [
                { validator: checkAge, trigger: 'blur' }
            ],
            pass: [
                { validator: validatePass, trigger: 'blur' }
            ],
            checkPass: [
                { validator: validatePass2, trigger: 'blur' }
            ]
        },
        status: false,
        warningStatus: false

    }
  },
  methods: {
    submitForm(formName) {
        const _this = this;
        this.$refs[formName].validate((valid) => {
            if (valid && this.userRepeat()) {
                gloab.user.push({
                    userName: _this.ruleForm.user,
                    pwd:  _this.ruleForm.pass
                })

                _this.status = true;
                _this.$router.push('/login');

                let timeout = setTimeout(() => {
                    _this.status = false;
                    clearTimeout(timeout);
                }, 1500);
            } else {
                return false;
            }
        });
    },
    resetForm(formName) {
        this.$refs[formName].resetFields();
    },
    userRepeat(){
        let user = this.ruleForm.user;
        let len = gloab.user.length;

        for(let i = 0; i < len; i++){
            if(user == gloab.user[i].userName){
                this.warningStatus = true;

                let timeout = setTimeout(() => {
                    this.warningStatus = false;
                    clearTimeout(timeout);
                }, 1500);
                return false
            }
        }

        return true
    }
  },
  mounted(){
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
.register{
    width: 100%;
    height: 100%;
    position: relative;
    .tips{
        position: fixed;
        top: 30px;
        left: 50%;
        margin-left: -25%;
        width: 200px;
    }
    .container{
        width: 320px;
        min-height: 200px;
        margin: 50% auto;
        .title{
            width: 50px;
            margin: 10px auto;
        }
    }
}
</style>
