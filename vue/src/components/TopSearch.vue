<template>
  <div class="topSearch">
    <!-- S 头部搜索框 -->
    <div class="searchCon">
      <router-link to="/search">
        <input type="text" class="search" placeholder="搜索你想要的食物"><button class="searchBt"></button>
      </router-link>
    </div>
    <!-- E 头部搜索框 -->
  </div>
</template>

<script>
export default {
  name: 'TopSearch',
  data () {
    return {
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
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
</style>
