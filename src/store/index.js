import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    listaFavStore:[]
  },

  mutations: {
    aggLista(state, id){
      state.listaFavStore = id
    }    
    
  },

  actions: {
    llenarLista(contex, id){
      contex.commit('aggLista', id)
    }
  },

  modules: {
  },

})
