import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    listaFav:[]
  },

  mutations: {
    getLS (state){
      console.log('hello');
      state.listaFav = JSON.parse(localStorage.getItem('idrecetas')) || [];
    },
    
  },

  actions: {
  },

  modules: {
  },

})
