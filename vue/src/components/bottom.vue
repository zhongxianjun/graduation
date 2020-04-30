<template>
  <div class="bottom">
    <!-- S 底部导航 -->
    <div class="container">
      <router-link v-for="(item, i) in navArr" :key="i" :to="'/'+item.EnglishName" class="router">
        <div class="content" @click="target" :class="{'current': activeNum == i}">
            <img :src="item.img">
            <p>{{item.name}}</p>
        </div>
      </router-link>
    </div>
    <!-- E 底部导航 -->
  </div>
</template>

<script>
import index from '@/assets/images/index.png'
import video from '@/assets/images/video.png'
import message_board from '@/assets/images/message_board.png'
import user_center from '@/assets/images/user_center.png'
export default {
  name: 'Bottom',
  props: ['title'],
  data () {
    return {
      navArr: [
        {EnglishName: 'index', name: "首页", img: index},
        {EnglishName: 'video', name: "视频", img: video},
        {EnglishName: 'mesBoard', name: "留言板", img: message_board},
        {EnglishName: 'userCenter', name: "用户中心", img: user_center}
      ],
      activeNum: 0
    }
  },
  methods: {
    target(index){
      this.activeNum = index;
    }
  },
  mounted(){
    this.navArr.map((item, i)=>{
      if(this.title == item.name){
        this.activeNum = i;
      }
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
.bottom{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #fff;
    border-top: 1px solid #ccc;
    .container{
        width: 100%;
        height: 48px;
        display: flex;
        justify-content: space-between;
        .router{
          width: 33%;
            .content{
              img{
                  width: 24px;
                  height: 24px;
                  display: block;
                  margin: 0 auto;
                  padding-top: 4px;
              }
              p{
                  width: 100%;
                  color: #000;
                  min-height: 24px;
                  text-align: center;
                  font-size: 12px;
                  padding-top: 2px;
              }
            }
            .current{
              background: #ccc;
            }
        }
    }
}
</style>
