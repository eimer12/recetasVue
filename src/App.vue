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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
