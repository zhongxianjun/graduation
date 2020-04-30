<template>
  <div class="details">
    <!-- S 头部 -->
    <div class="headImg">
      <img :src="img" :alt="msg">
      <div class="container">
        <div class="foodTitle">
          {{msg}}
        </div>
        <div class="foodStatus">
          <p :class="foodStatusColor"></p>
          <a>{{foodStatus}}</a>
        </div>
      </div>
    </div>
    <!-- E 头部 -->

    <!-- S 营养成分 -->
    <div class="nutrients">
      <div class="title">
        营养成分（100毫克含量）
      </div>
      <div class="content">
        <div class="ul" v-for="(item, i) in nutrients" :key="i">
          <div class="nutrientsName">
            {{item.name}}
          </div>
          <div class="nutrientsData">
            {{item.data}}
          </div>
        </div>
      </div>
    </div>
    <!-- E 营养成分 -->

    <!-- S 食物评价 -->
    <div class="evaluate">
      <div class="title">
        食物评价
      </div>
      <div class="content">
        {{evaluate}}
      </div>
    </div>
    <!-- E 食物评价 -->

    <!-- S 患者怎么吃 -->
    <div class="howEat">
      <div class="title">
        痛风患者怎么吃
      </div>
      <div class="content">
        {{howEat}}
      </div>
    </div>
    <!-- E 患者怎么吃 -->

    <!-- S 食用忌宜 -->
    <div class="EdibleTaboo">
      <div class="title">
        食用忌宜
      </div>
      <div class="content">
        <div class="fit">
          <p class="fitBg">宜</p>
          <a>{{EdibleTaboo[0]}}</a>
        </div>   
        <div class="avoid">
          <p class="avoidBg">忌</p>
          <a>{{EdibleTaboo[1]}}</a>
        </div>
      </div>
    </div>
    <!-- E 食用忌宜 -->

    <!-- S 底部导航 -->
    <Bottom></Bottom>
    <!-- E 底部导航 -->

  </div>
</template>

<script>
import Button from 'element-ui'
// 组件路径
import Bottom from '@/components/bottom'
// json文件
import Json from '@/data.json'

export default {
  name: 'Details',
  data () {
    return {
        img: '',  //食物图片路径
        msg: '',  //食物名字
        foodStatus: '',   //食物状态
        foodStatusColor: '',  //食物状态颜色
        nutrients: [],    //食物营养成分数组
        evaluate: "",   //食物评价
        howEat: "",     //患者如何吃
        EdibleTaboo: ""   //食用忌宜
    }
  },
  methods: {
    gainInfo(){   //获取router-link传参信息
      this.msg = this.$route.query.name;
      this.foodStatus = this.$route.query.foodStatus;
      this.img = this.$route.query.img;

      switch (this.foodStatus) {
        case '放心吃':
          this.foodStatusColor = 'green'
          this.getJson(Json.greenFoodInfo);
          break;
        case '少量吃':
          this.foodStatusColor = 'yellow'
          this.getJson(Json.yellowFoodInfo);
          break;
        case '谨慎吃':
          this.foodStatusColor = 'red'
          this.getJson(Json.redFoodInfo);
          break;
      
        default:
          break;
      }
    },
    getJson(info){  //获取Json文件数据
      this.nutrients = [];  //初始化营养成分
      info.map((item, i)=>{  //遍历json文件的各个foodInfo
        if(this.msg == item.name){  //判断与传参msg统一
          this.nutrients = item.nutrients;  //赋值 nutrients
          this.evaluate = item.evaluate;    //赋值 evaluate
          this.howEat = item.howEat;        //赋值 howEat
          this.EdibleTaboo = item.EdibleTaboo;  //赋值 EdibleTaboo
        }
      })
    }
  },
  created(){
    
  },
  mounted(){
    this.gainInfo();  //调用router-link传参信息
  },
  components: {
    Bottom
  },
  filters: {
    capitalize: function (value) {
      // const statusMap = {
      //   1: "成功",
      //   2: "危险"
      // }
      // return statusMap[value]
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
.details{
  width: 90%;
  margin: 0 auto;
  margin-bottom: 60px;
  // 头部样式
  .headImg{
    width: 100%;
    margin: 20px auto;
    img{
      width: 100%;
      height: 200px;
      display: block;
    }
    .container{
      width: 100%;
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      .foodTitle{
        width: 100px;
        line-height: 50px;
        font-size: 24px;
      }
      .foodStatus{
        width: 60px;
        text-align: center;
        p{
          width: 30px;
          height: 30px;
          border-radius: 50%;
          margin: 0 auto;
        }
        .green{
          background: green;
        }
        .yellow{
          background: #e9ec10;
        }
        .red{
          background: red;
        }
        a{
          width: 30px;
          font-size: 12px;

        }
      }
    }
  }

  //营养成分样式
  $greenColor: #2fa548;

  .title{
    font-size: 12px;
    color: $greenColor;
  }

  .nutrients{
    .content{
      display: flex;
      flex-flow: wrap;
      justify-content: space-between;
      .ul{
        width: 33%;
        text-align: center;
        margin: 5px 0;
        .nutrientsName{
          margin: 5px 0;
        }
        .nutrientsData{
          margin: 10px 0;
          color: $greenColor;
        }
      }
    }
  }

  //食物评价  //患者怎么吃
  .evaluate, .howEat{
    .content{
      font-size: 12px;
      margin: 10px 0;
    }
  }

  //食用忌宜
  .EdibleTaboo{
    .content{
      font-size: 12px;
      margin: 10px 0;
      .fit, .avoid{
        width: 100%;
        display: flex;
        flex-flow: row wrap;
        justify-content: flex-start;
        align-items: center;
        margin: 5px 0;
        p{
          width: 20px;
          height: 20px;
          line-height: 20px;
          text-align: center;
          border-radius: 50%;
        }
        .fitBg{
          background: rgba(47, 165, 72, .8);
        }
        .avoidBg{
          background: rgba(0, 0, 0, .4);
        }
        a{
          display: block;
          width: 310px;
          margin-left: 6px;
        }
      }
    }
  }
}
</style>