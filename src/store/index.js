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
      state.recetasFavStore = id
    },

    borrarLS (state, recetaid){
      localStorage.setItem("idrecetas", JSON.stringify(state.listaFavStore.filter((id) => id !== recetaid)));
      state.listaFavStore = state.listaFavStore.filter((id) => id !== recetaid)
    },
  },

  actions: {
    llenarLista(contex, id){
      contex.commit('aggLista', id)
    },

    llenarRecetas(contex, id){
      contex.commit('aggReceta', id)
    },

    ACborradoLS (contex, recetaid){
      contex.commit('borrarLS', recetaid)
    }
  },

  modules: {
  },

})
