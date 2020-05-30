<template>
  <div class="admin">
    <div class="top">
        <div class="toLogin" @click="toLogin">
            <i class="el-icon-arrow-left" style="margin-right: 10px;"></i>返回登录
        </div>
        <hr>
    </div>
    <div class="nav">
        <div class="navList" :class="status==i?'active':''" v-for="(item,i) in navList" :key="i" @click="toAnsNav(i)">{{item.name}}</div>
    </div>
    <div class="toAns" v-if="status==0">
        <scroller>
            <div class="content" v-for="(item, i) in respondMesArr" :key="i">
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

    <div class="message" v-else-if="status==1">
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
                    <el-button type="danger" @click="delMes(i)">删除</el-button>
                </div>
            </div>
            <div class="tips">
                暂无更多问题...
            </div>
        </scroller>
    </div>
    
    <div class="user" v-else-if="status==2">
        <div class="find">
            <el-input v-model="input" placeholder="请输入用户名或者账号查找">
                <i slot="suffix" class="el-input__icon el-icon-search" @click="search"></i>
            </el-input>
        </div>
        <div class="userList">
            <el-table
            :data="userInfo"
            style="width: 100%">

                <el-table-column
                prop="userName"
                label="用户名"
                width="90">
                </el-table-column>

                <el-table-column
                prop="userName"
                label="账号"
                width="90">
                </el-table-column>

                <el-table-column
                prop="pwd"
                label="密码"
                width="90">
                </el-table-column>

                <el-table-column label="操作" width="90">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
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
        input: '',
        userInfo: {},
        allMesArr: [],
        respondMesArr: [],
        status: 0,
        navList: [
            {name: "留言回复"},
            {name: "留言管理"},
            {name: "用户管理"}
        ]
    }
  },
  methods: {
    toLogin(){
        this.$router.push('/login');
    },
    getGloab(){     //获取全局留言信息
        this.allMesArr = gloab.allMesArr;

        gloab.allMesArr.map((item, i)=>{
            if(!item.answer){
                this.respondMesArr.push(item);
            }
        })
    },
    upDate(que, ans, num){
        gloab.allMesArr.map((item, i)=>{
            if(que == item.question){
                item.answer = ans;
                this.respondMesArr.splice(num, 1);
            }
        })
    },
    toAnsNav(index){
        this.status = index;

        if(index == 1){
            this.allMesArr = gloab.allMesArr;
        }
    },
    delMes(num){
        this.$confirm('此操作将永久删除该留言, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
        }).then(() => {
            this.allMesArr.splice(num, 1);
            gloab.allMesArr = this.allMesArr;
            gloab.getPrivateArr(gloab.mesArr, gloab.otherMesArr);

            this.$message({
                type: 'success',
                message: '删除成功!'
            });
        }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
            });
        });
    },
    handleDelete(index, row) {
        if(row.userName == "admin"){
            alert("不允许删除管理员账号");
        }else{
            this.$confirm('此操作将删除该用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.userInfo.splice(index, 1);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });    
                }); 
        }

        gloab.user = this.userInfo;
    },
    search(e){
        this.userInfo = [];
        gloab.user.map((item, i) => {
            if(item.userName.toString().indexOf(this.input) >= 0){
                this.userInfo.push(item);
            }
        });
    }
  },
  created(){
    
  },
  mounted(){
    this.userInfo = gloab.user;
    this.getGloab();
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
$greenColor: #2fa548;
.el-message-box{
    width: 280px;
}
.admin{
    width: 100vw;
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
    .nav{
        position: absolute;
        top: 40px;
        left: 0;
        width: 100vw;
        display: flex;
        justify-content: space-between;
        text-align: center;
        border-bottom: 1px solid #ccc;
        .navList{
            width: 33%;
            line-height: 40px;
            border: 1px solid #ccc;
        }
        .active{
            background: #ccc;
        }
    }
    .toAns{
        position: absolute;
        top: 92px;
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
    .message{
        position: absolute;
        top: 92px;
        left: 0;
        bottom: 20px;
        width: 100%;
        height: calc(100vh - 82px);
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
    .user{
        width: 100%;
        position: absolute;
        top: 92px;
        left: 0;
    }
}
</style>