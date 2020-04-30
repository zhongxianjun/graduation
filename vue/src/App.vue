<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss" type="text/css">

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
*{ 
  margin:0px; 
  padding:0px;
}
a {
  text-decoration: none;
  outline: none;
}
a:focus{ 
  outline: none;
  text-decoration: underline;
}
img{
  border:none;
}
ul li{
  list-style:none;
}
input{
  width:100%;
  box-sizing: border-box;
  border-radius:8px;
  border:1px solid #c8cccf;
  color:#6a6f77;
  -web-kit-appearance:none;
  -moz-appearance: none;
  display:block;
  outline:0;
  padding:0 1em;
  text-decoration:none;
}
input[type="text"]:focus{
  box-shadow: 2px 2px 2px #888888;
}
button{
  outline-style: none;
  border: 0px;
}
h1, h2, h3, h4, h5, h6{
  font-weight:normal; 
}
</style>
