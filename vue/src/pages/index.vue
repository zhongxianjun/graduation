<template>
  <div class="index">

    <!-- S 头部搜索框 -->
    <TopSearch></TopSearch>
    <!-- E 头部搜索框 -->

    <!-- S 疾病种类 -->
    <div class="illness">
      <p>当前病症：</p>痛风
    </div>
    <!-- E 疾病种类 -->

    <!-- S 食物种类 -->
    <div class="variety">
      <ul class="container">
        <router-link v-for="(item, i) in foodKind" :key="i" :to="{path: '/foodKind/'+item.EnglishName, query: { name: item.name }}" class="li">
          <img :src="item.img" alt="">
          <p>{{item.name}}</p>
        </router-link>
      </ul>
    </div>
    <!-- E 食物种类 -->

    <!-- S 每日推荐 -->
    <div class="recommend">
      <div class="title"><p></p>每日推荐</div>
      <div class="container">
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
            <div class="foodStatus">
              <p>{{item.foodStatus}}</p>
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <!-- E 每日推荐 -->

    <!-- S 底部导航 -->
    <Bottom :title="title"></Bottom>
    <!-- E 底部导航 -->

  </div>
</template>

<script>
// 组件路径
import TopSearch from '@/components/TopSearch.vue'
import Bottom from '@/components/bottom'
// 图片路径
  //种类图片
import staple_food from '@/assets/images/staple_food.png'
import meat from '@/assets/images/meat.png'
import seafood from '@/assets/images/seafood.png'
import vegetables from '@/assets/images/vegetables.png'
import dairy_products from '@/assets/images/dairy_products.png'
import beans from '@/assets/images/beans.png'
import dried_fruit from '@/assets/images/dried_fruit.png'
import fruit from '@/assets/images/fruit.png'
import other from '@/assets/images/other.png'
// json文件
import Json from '@/data.json'
// gloab from utils.js
import gloab from '@/utils.js'


export default {
  name: 'Index',
  data () {
    return {
      title: '首页',
      foodKind: [  //食物种类
        {name: "主食类", EnglishName: "staple_food", img: staple_food},
        {name: "肉/蛋类", EnglishName: "meat", img: meat},
        {name: "海产品", EnglishName: "seafood", img: seafood},
        {name: "蔬菜", EnglishName: "vegetables", img: vegetables},
        {name: "乳制品", EnglishName: "dairy_products", img: dairy_products},
        {name: "豆类", EnglishName: "beans", img: beans},
        {name: "干果", EnglishName: "dried_fruit", img: dried_fruit},
        {name: "水果", EnglishName: "fruit", img: fruit},
        {name: "其他", EnglishName: "other", img: other}
      ],
      foodInfo: []  //食物信息
    }
  },
  methods: {
    
  },
  created(){
    
  },
  mounted(){
    this.foodInfo = Json.greenFoodInfo.slice(0, 6);
    
    if(this.$route.query.userInfo){
      gloab.userInfo = this.$route.query.userInfo;
    }
    
  },
  components: {
    TopSearch,
    Bottom
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
.index{
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin-top: 70px;
  margin-bottom: 53px;
  .illness{
    width: 120px;
    display: flex;
    line-height: 16px;
    font-size: 16px;
    margin: 10px auto 10px;
    p{
      font-size: 14px;
      color: #999;
    }
  }
  .variety{
    width: 70%;
    min-height: 150px;
    margin: 0 auto;
    border: 1px solid #ccc;
    .container{
      display: flex;
      width: 100%;
      flex-flow: wrap;
      padding-top: 5px;
      .li{
        width: 30%;
        min-height: 30px;
        line-height: 30px;
        border-radius: 2em;
        margin: 5px 4px;
        text-align: center;
        color: #000;
        img{
          width: 36px;
          height: 36px;
        }
        p{
          font-size: 14px;

        }
      }
    }
  }
  .recommend{
    margin: 20px 0;
    .title{
      width: 100%;
      min-height: 28px;
      line-height: 28px;
      display: flex;
      font-size: 18px;
      p{
        width: 3px;
        height: 22px;
        background: #ccc;
        margin: 2px 10px;
        font-size: 14px;
      }
    }
    .container{
      margin: 10px 10px;
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
          background: green;
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
      }
    }
  }
}
</style>