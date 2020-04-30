<template>
  <div class="index">

    <!-- S 头部搜索框 -->
    <div class="topSearch">
        <div class="searchCon">
        <router-link to="/search">
            <input type="text" class="search" placeholder="搜索你想要的食物" v-model="text">
            <button class="searchBt" @click="search"></button>
        </router-link>
        </div>
    </div>
    <!-- E 头部搜索框 -->

    <!-- S 历史记录 -->
    <div class="history" v-if="status">
        <div class="title">
            <a>历史记录</a>
            <img src="@/assets/images/delete.png" @click="del">
        </div>
        <div class="content">
            <p v-for="(item, i) in history" :key="i" @click="searchHistory(item)">
                {{item}}
            </p>
        </div>
    </div>
    <!-- E 历史记录 -->

    <div class="list" v-else-if="!status">
        <div class="container">
            <div class="foodList">
                <scroller>
                    <router-link v-for="(item, i) in foodInfo" :key="i" :to="{path: '/details/'+item.EnglishName, query: { name: item.name, foodStatus: item.foodStatus, img: item.img }}">
                        <div class="food">
                            <div class="img"><img :src="item.img" :alt="item.name"></div>
                            <div class="foodInfo">
                                <h1>{{item.name}}</h1>
                                <div class="purine">
                                    嘌呤：{{item.nutrients[1].data}}
                                </div>
                                <div class="heat">
                                    热量：{{item.nutrients[2].data}}
                                </div>
                            </div>
                            <div class="foodStatus" :class="item.foodStatus == '放心吃'?'green': item.foodStatus == '少量吃'?'yellow': item.foodStatus == '谨慎吃'?'red': ''">
                                <p>{{item.foodStatus}}</p>
                            </div>
                        </div>
                    </router-link>
                    <div class="noAvailable">
                        暂无更多数据...
                    </div>
                </scroller>
            </div>
        </div>
    </div>

    <!-- S 底部导航 -->
    <Bottom></Bottom>
    <!-- E 底部导航 -->

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
  name: 'Index',
  data () {
    return {
      text: '',
      history: [],
      status: true,
      foodInfo: []
    }
  },
  watch: {
    text: function (newText, oldText) {
      if(!newText){
          this.status = true;
      }
    }
  },
  methods: {
    search(){
        if(this.text.trim()){
            this.status = false;
            this.history.unshift(this.text.trim());
            this.history = Array.from(new Set(this.history));
            gloab.gloab = this.history;

            this.getJson(this.text);   
        }

        if(this.history.length > 9){
            this.history.pop();
            gloab.gloab = this.history
        }
    },
    del(){
        this.history = [];
        gloab.gloab = this.history
    },
    searchHistory(text){
        this.text = text;
        this.search();
    },
    getJson(text){
        this.foodInfo = [];
        const _this = this;
        Json.greenFoodInfo.map((item, i) => {
            if(item.name.indexOf(text) >= 0){
              _this.foodInfo.push(item);
            }else if(item.foodStatus.indexOf(text) >= 0){
              _this.foodInfo.push(item);
            }
        })

        Json.yellowFoodInfo.map((item, i) => {
            if(item.name.indexOf(text) >= 0){
              _this.foodInfo.push(item);
            }else if(item.foodStatus.indexOf(text) >= 0){
              _this.foodInfo.push(item);
            }
        })

        Json.redFoodInfo.map((item, i) => {
            if(item.name.indexOf(text) >= 0){
              _this.foodInfo.push(item);
            }else if(item.foodStatus.indexOf(text) >= 0){
              _this.foodInfo.push(item);
            }
        })
    }
  },
  created(){
    
  },
  mounted(){
    this.history = gloab.gloab;
  },
  components: {
    Bottom
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
$greenColor: #2fa548;
.topSearch{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 70px;
  background: #fff;
  .searchCon{
    position: relative;
    width: 70%;
    margin: 20px auto;
    flex-flow: row nowrap;
    justify-content: space-between;
    .search{
      min-height: 28px;
      line-height: 28px;
    }
    .searchBt{
      width: 36px;  
      min-height: 30px;
      line-height: 30px;
      background: url(./../assets/images/search.png) no-repeat center center;
      position: absolute;
      right: 0;
      top: 0;
    }
  }
}
.history{
    margin: 80px 10px 10px;
    font-size: 14px;
    .title{
        width: 100%;
        line-height: 20px;
        display: flex;
        justify-content: space-between;
        img{
            width: 16px;
            height: 16px;
            margin-top: 2px;
        }
    }
    .content{
        width: 100%;
        display: flex;
        margin-top: 10px;
        flex-flow: row wrap;
        p{
            width: 30%;
            line-height: 30px;
            text-align: center;
            margin: 5px 1.6%;
            background: rgba(224, 224, 224, .6);
            border-radius: 20px;
        }
    }
}
.list{
    margin: 80px 10px 10px 10px;
    .container{
       width: 99%;
       margin: 0 0 60px;
       .nav{
            width: 100%;
            display: flex;
            border-top: 1px solid #ccc;
            border-bottom: 1px solid #ccc;
            .content{
                width: 33%;
                line-height: 40px;
                text-align: center;
            }
            .active{
              background: #ccc;
            }
       }
       .foodList{
        width: 90%;
        position: absolute;
        height: 530px;
        top: 80px;
        left: 5%;
        .food{
          display: flex;
          width: 100%;
          height: 70px;
          margin: 10px 0;
          .img{
            img{
              width: 70px;
              height: 70px;
            }
          }
          .foodInfo{
            width: 100%;
            min-height: 70px;
            margin: 0 10px;
            h1{
              font-size: 20px;
              font-weight: normal;
              color: #000;
            }
            .purine{
              width: 100%;
              line-height: 22px;
              font-size: 16px;
              color: #999;
            }
            .heat{
              width: 100%;
              line-height: 22px;
              font-size: 16px;
              color: #999;
            }
          }
          .foodStatus{
            width: 50px;
            height: 60px;
            border-radius: 50px 0 0 50px;
            p{
              width: 20px;
              display: flex;
              flex-wrap: column wrap;
              font-size: 12px;
              color: #fff;
              padding: 4px 50%;
            }
          }
          .green{
            background: green;
          }
          .yellow{
            background: rgb(241, 241, 6);
          }
          .red{
            background: red;
          }
        }
        .noAvailable{
          width: 100%;
          min-height: 18px;
          line-height: 18px;
          font-size: 12px;
          color: $greenColor;
          text-align: center;
          margin: 10px auto;
          padding-bottom: 16px;
        }
      }
   }
}
</style>