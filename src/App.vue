<template>
  <div id="app">        
    <Lista></Lista>
  </div>
</template>

<script>
import Lista from './components/Lista.vue';

export default {
  name: 'App',

  data() {
    return {
      array: [1,2,3,4,5],
    };
  },

  components: {
    Lista,
  }
}
</script>

<style>

::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-thumb {
  background-image: linear-gradient(120deg, #ca92ff 0%, #52a9ff 100%);
  border-radius: 10px;  
}
::-webkit-scrollbar-track{
  background-image: linear-gradient(120deg, #e9d7fa 0%, #c7e3ff 100%);
}
::-webkit-scrollbar-thumb:hover {
  background: #858dff
}
::-webkit-scrollbar-thumb:active {
  background: #7982ff
}

#app {
  /* @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700&display=swap'); */
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  text-align: center;
  overflow: hidden;

}
</style>
