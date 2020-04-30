<template>
  <div class="foodKind">
    <!-- S 顶部标题 -->
    <div class="title">
        {{msg}}
    </div>
    <!-- E 顶部标题 -->

    <!-- S 头部搜索框 -->
    <TopSearch class="topSearch"></TopSearch>
    <!-- E 头部搜索框 -->

    <!-- S 中间内容 -->
    <div class="container">
        <div class="nav">
            <div class="content" v-for="(item, i) in nav" :key="i" @click="navClick" :class="{'active': status == i}">{{item}}</div>
        </div>
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
                <div class="foodStatus" :class="foodStatusColor">
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
    <!-- E 中间内容 -->

    <!-- S 底部导航 -->
    <Bottom></Bottom>
    <!-- E 底部导航 -->
  </div>
</template>

<script>
// 组件路径
import TopSearch from '@/components/TopSearch.vue'
import Bottom from '@/components/bottom'

// json文件
import Json from '@/data.json'

export default {
  name: 'FoodKind',
  data () {
    return {
        msg: '',
        nav: ['放心吃', '少量吃', '谨慎吃'],
        status: 0,
        foodInfo: [],
        foodStatusColor: ''
    }
  },
  methods: {
    foodStatusFun(text){  //食物状态函数
      switch (text) {
        case "放心吃":
          this.status = 0;
          this.foodStatusColor = 'green';
          this.foodInfo = [];
          Json.greenFoodInfo.map((item, i)=>{   //遍历Json文件greenFoodInfo数据
            if(this.msg == item.foodKind){
              this.foodInfo.push(item);
            }
          });
          break;
        case "少量吃":
          this.status = 1;
          this.foodStatusColor = 'yellow';
          this.foodInfo = [];
          Json.yellowFoodInfo.map((item, i)=>{   //遍历Json文件yellowFoodInfo数据
            if(this.msg == item.foodKind){
              this.foodInfo.push(item);
            }
          });
          break;
        case "谨慎吃":
          this.status = 2;
          this.foodStatusColor = 'red';
          this.foodInfo = [];
          Json.redFoodInfo.map((item, i)=>{   //遍历Json文件redFoodInfo数据
            if(this.msg == item.foodKind){
              this.foodInfo.push(item);
            }
          });
          break;
      
        default:
          break;
      }
    },

    navClick(e){  //tab选项卡点击事件
      let tempText = e.target.innerText;
      this.foodStatusFun(tempText);
    },

    startGetJson(){  //获取初始化Json数据
      this.status = 0;
      this.foodStatusColor = 'green';

      Json.greenFoodInfo.map((item, i)=>{
        if(this.msg == item.foodKind){
          this.foodInfo.push(item);
        }
      });
    }
  },
  created(){
    this.msg = this.$route.query.name;  //获取title
  },
  mounted(){
    this.startGetJson();   //初始化食物种类页面数据
  },
  components: {
    TopSearch,
    Bottom
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
$greenColor: #2fa548;

.foodKind{
   width: 100%;
   position: relative;
   .title{
       position: absolute;
       top: -90px;
       left: calc(50% - 30px);
       z-index: 99;
   }
   .topSearch{
       position: fixed;
       top: 30px;
   }
   .container{
       width: 99%;
       margin: 104px 0 60px 2px;
       position: relative;
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
        height: 460px;
        top: 50px;
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
          margin: 0 auto;
          padding-bottom: 16px;
        }
      }
   }
}
</style>
