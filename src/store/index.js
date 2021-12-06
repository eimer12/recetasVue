import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    SaludoFav: ''
  },

  mutations: {
    addSaludo(state){      
      alert(state.SaludoFav)
    }
  },

  actions: {    
  },

  modules: {
  }
})
