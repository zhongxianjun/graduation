<template>
  <div class="mesBoard">
    <div class="container">
      <el-tabs v-model="activeName" @tab-click="handleClick">

        <el-tab-pane label="留言板" name="first">
          <el-input
            type="textarea"
            :rows="8"
            placeholder="请输入内容"
            v-model="textarea">
          </el-input>
          <div class="btnCon">
            <el-checkbox v-model="checked">
              他人可见
            </el-checkbox>
            <el-button type="primary" class="mesBtn" @click="upDate">留  言</el-button>
          </div>
        </el-tab-pane>

        <el-tab-pane label="历史留言" name="second">
          <div class="content" v-for="(item, i) in mesArr" :key="i">
            <div class="ques text">
                <p>您的提问</p>
                <el-input
                    type="textarea"
                    :rows="2"
                    v-model="item.question"
                    :readonly="true"
                >
                </el-input>
            </div>
            <div class="ans text">
                <p>回答</p>
                <el-input
                    type="textarea"
                    :rows="6"
                    v-model="item.answer"
                    placeholder="正在等待回答..."
                    :readonly="true"
                >
                </el-input>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane label="查看所有人留言" name="third">
          <div class="content" v-for="(item, i) in otherMesArr" :key="i">
            <div class="ques text">
                <p>提问</p>
                <el-input
                    type="textarea"
                    :rows="2"
                    v-model="item.question"
                    :readonly="true"
                >
                </el-input>
            </div>
            <div class="ans text">
                <p>回答</p>
                <el-input
                    type="textarea"
                    :rows="6"
                    v-model="item.answer"
                    placeholder="正在等待回答..."
                    :readonly="true"
                >
                </el-input>
            </div>
          </div>
        </el-tab-pane>

      </el-tabs>
    </div>

    <!-- S 底部导航 -->
    <Bottom :title="title"></Bottom>
    <!-- E 底部导航 -->

  </div>
</template>

<script>
// 组件路径
import Bottom from '@/components/bottom'
// json文件
import Json from '@/data.json'
// utils.js
import gloab from '@/utils.js'

export default {
  name: 'MesBoard',
  data () {
    return {
      title: '留言板',
      activeName: 'first',
      textarea: '',
      checked: true,
      mesArr: [],
      otherMesArr: []
    }
  },
  methods: {
    handleClick(tab, e) {
      // console.log(tab);
    },
    upDate(){
      if(this.checked && this.textarea.trim() != ""){
        this.mesArr.push({
          "question": this.textarea.trim(),
          "answer": ""
        });
        this.otherMesArr.push({
          "question": this.textarea.trim(),
          "answer": ""
        });
      }else if(this.checked == false && this.textarea.trim() != ""){
        this.mesArr.push({
          "question": this.textarea.trim(),
          "answer": ""
        });
      }

      gloab.mesArr = gloab.unique(this.mesArr);
      gloab.otherMesArr = gloab.unique(this.otherMesArr);
      gloab.allMesArr = gloab.unique(this.otherMesArr.concat(this.mesArr));

      this.textarea = "";
      
    },
    getMesArr(){
      this.mesArr = gloab.mesArr;
      let all = gloab.allMesArr;

      for(var i=0; i < this.mesArr.length; i++){
        for(var j=0; j < all.length; j++){
          if(this.mesArr[i].question == all[j].question){
              this.mesArr[i].answer = all[j].answer;
          }
        }
      }
    }

  },
  created(){
    
  },
  mounted(){
    this.getMesArr();
    this.otherMesArr = gloab.otherMesArr;
  },
  components: {
    Bottom
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>

.btnCon{
  text-align: right;
}
.container{
  margin-bottom: 30px;
  .content{
    margin: 10px 10px 40px 10px;
      .text{
          display: flex;
          align-items: center;
          margin: 10px 0;
          p{
              width: 75px;
              font-size: 12px;
          }
      }
  }
}
</style>