import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    listaFavStore:[],
    recetasFavStore:[]
  },

  mutations: {
    aggLista(state, id){
      state.listaFavStore = id
    },

    aggReceta(state, id){
      state.recetasFavStore.push(id)
    }
  },

  actions: {
    llenarLista(contex, id){
      contex.commit('aggLista', id)
    },

    llenarRecetas(contex, id){
      contex.commit('aggReceta', id)
    },
  },

  modules: {
  },

})
