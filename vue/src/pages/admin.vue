<template>
  <div class="admin">
    <div class="top">
        <div class="toLogin" @click="toLogin">
            <i class="el-icon-arrow-left" style="margin-right: 10px;"></i>返回登录
        </div>
        <hr>
    </div>
    <div class="toAns">
        <scroller>
            <div class="content" v-for="(item, i) in allMesArr" :key="i">
                <div class="ques text">
                    <p>提问：</p>
                    <el-input
                        type="textarea"
                        :rows="2"
                        v-model="item.question"
                        :readonly="true">
                    </el-input>
                </div>
                <div class="ans text">
                    <p>回答:</p>
                    <el-input
                        type="textarea"
                        :rows="4"
                        v-model="item.answer"
                        placeholder="正在等待回答...">
                    </el-input>
                </div>
                <div class="btn">
                    <el-button type="primary" @click="upDate(item.question, item.answer, i)">提 交</el-button>
                </div>
            </div>
            <div class="tips">
                暂无更多问题...
            </div>
        </scroller>
    </div>
  </div>
</template>

<script>
// json文件
import Json from '@/data.json'
// utils.js文件
import gloab from '@/utils.js'

export default {
  name: 'Admin',
  data () {
    return {
        userInfo: {
            userName: '',
            pwd: ''
        },
        allMesArr: []
    }
  },
  methods: {
    toLogin(){
        this.$router.push('/login');
    },
    getGloab(){
        gloab.allMesArr.map((item, i)=>{
            if(!item.answer){
                this.allMesArr.push(item);
            }
        })
    },
    upDate(que, ans, num){
        gloab.allMesArr.map((item, i)=>{
            if(que == item.question){
                console.log(item);
                item.answer = ans;
                this.allMesArr.splice(num, 1);
            }
        })
    }
  },
  created(){
    
  },
  mounted(){
    this.userInfo = gloab.userInfo;
    this.getGloab();
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
$greenColor: #2fa548;

.admin{
    width: 100%;
    position: relative;
    .top{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        .toLogin{
            width: 100px;
            height: 40px;
            line-height: 40px;
        }
    }
    .toAns{
        position: absolute;
        top: 52px;
        left: 0;
        bottom: 20px;
        width: 100%;
        height: calc(100vh - 52px);
        .content{
            margin: 20px 10px 40px 10px;
            .text{
                display: flex;
                align-items: center;
                margin: 10px 0;
                p{
                    width: 60px;
                    font-size: 12px;
                }
            }
            .btn{
                text-align: right;
            }
        }
        .tips{
            width: 100%;
            min-height: 18px;
            line-height: 18px;
            font-size: 12px;
            color: $greenColor;
            text-align: center;
            margin: 0 auto;
            padding-bottom: 36px;
        }
    }
}
</style>