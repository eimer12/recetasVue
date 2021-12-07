<template>
    <div>
        <input type="text" v-model="busqueda" @keydown.enter="getBusquedaReceta(busqueda)" >
        <button @click="getBusquedaReceta(busqueda)">Buscar</button>        
        <listaFav :receta="this.$store.state.recetasFavStore"></listaFav>
        <targetas :receta="receta" ></targetas>
    </div>
</template>


<script>
import Targetas from './Targetas.vue'
import ListaFav from './ListaFav.vue';
import { mapState } from 'vuex'

export default {
    components: { 
        Targetas,
        ListaFav,
    },
    name: 'Lista',

    data() {
        return {
            lista: this.$store.state.listaFavStore,
            recetafav: this.$store.state.recetasFavStore,
            receta: [],
            busqueda: '',
        };
    },

    methods:{        

        async getRandomReceta(){
                let resp = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
                let respData = await resp.json();
                let randomReceta = respData.meals[0];  
                return randomReceta                            
        },

        async getBusquedaReceta(busqueda){
            let resp = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s="+busqueda);
            let respData = await resp.json();
            let receta = respData.meals;

            if (receta) {
                this.receta=[]                 
                receta.forEach((receta) => {   
                    this.receta.push(receta)
                });        
            }else{
                alert("No se encuentran resultados de "+busqueda)
            }
        },

        async getRecetabyId(idreceta){
            let resp = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i="+idreceta);
            let respData = await resp.json();
            let receta = respData.meals[0];
            return receta;
        },

        ...mapState(['recetasFavStore']),

    },

    watch:{
        lista:function(){
            alert('hello')
        }
    },

    async created() {

        
        let datosLS = JSON.parse(localStorage.getItem('idrecetas')) || [];
        // console.log(this.$store.state.listaFavStore);
        if (datosLS != null) {            
            this.$store.dispatch('llenarLista', datosLS);
        }

        for (let i = 0; i < this.$store.state.listaFavStore.length; i++) {
            let recetain = await this.getRecetabyId(this.$store.state.listaFavStore[i])
            //aqui po-------------------------------------------------------------------------------------------------------------------
            this.$store.dispatch('llenarRecetas', recetain);
            console.log(this.$store.state.recetasFavStore);
            //aqui po-------------------------------------------------------------------------------------------------------------------            
        }
        
        for (let i = 0; i < 4; i++) {
            let recetain = await this.getRandomReceta()
            this.receta.push(recetain)            
        }

        
    },

}
</script>

<style scoped>



</style>

