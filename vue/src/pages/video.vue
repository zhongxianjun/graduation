<template>
  <div class="video">
    <div class="container">
      <scroller>
        <div class="myVideo" v-for="(item, i) in videoUrl" :key="i">
          <div class="content">
            <video id="videoPlay" controls="controls" :src="item.url">您的浏览器不支持 video 视屏播放。</video>
          </div>
          <div class="text">
            {{item.name}}
          </div>
          <div class="evaluate">
            {{item.evaluate}}
          </div>
        </div>
        <div class="tips">
          暂无更多视频...
        </div>
      </scroller>
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

export default {
  name: 'Video',
  data () {
    return {
      title: '视频',
      videoUrl: []
    }
  },
  methods: {
    onOrOff(){
      var video = document.getElementsByTagName("videoPlay");

      if(video.pause()){
        video.paly();
      }else if(video.paly()){
        video.pause();
      }
    }
  },
  created(){
    
  },
  mounted(){
    this.videoUrl = Json.video;
  },
  components: {
    Bottom
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
$greenColor: #2fa548;

.video{
  width: 100%;
  position: relative;
  .container{
    width: 100%;
    height: calc(100vh - 50px);
    position: absolute;
    top: 0;
    left: 0;
    .myVideo{
      width: 100%;
      margin: 0 0 20px 0;
      video{
        width: 100%;
      }
      .text{
        color: #000;
        font-size: 18px;
        margin: 5px 0;
      }
      .evaluate{
        color: #000;
        font-size: 12px;
        margin: 5px 0;
      }
    }
    .tips{
      width: 100%;
      text-align: center;
      color: $greenColor;
    }
  }
}
</style>