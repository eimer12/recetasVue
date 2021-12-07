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
  /* @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700&display=swap'); */
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  text-align: center;
  overflow: hidden;

}
</style>
