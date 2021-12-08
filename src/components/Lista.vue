<template>
    <div>
        <div class="header">
            <input type="text" v-model="busqueda" @keydown.enter="getBusquedaReceta(busqueda)" >
            <button @click="getBusquedaReceta(busqueda)"><i class="fas fa-search" /></button>
        </div>
        <!-- <button @click="pruebas" >jeje</button> -->
        <listaFav :receta="this.$store.state.recetasFavStore" @ListaFavorita="listafavo=$event"></listaFav>
        <targetas :receta="receta" @ListaFavorita="listafavo=$event" ></targetas>        
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
            listafavo: Array,
            receta: [],
            busqueda: '',
        };
    },

    methods:{       
        
        pruebas(){
            
        },

        async getRandomReceta(){
            let resp = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
                let respData = await resp.json();
                let randomReceta = respData.meals[0];
                randomReceta['fav']=false
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

        async recorrelsrecetas(){
            let ListaMeals = []
            for (let i = 0; i < this.$store.state.listaFavStore.length; i++) {
                ListaMeals.push( await this.getRecetabyId(this.$store.state.listaFavStore[i]) )
            }
                this.$store.dispatch('llenarRecetas', ListaMeals);
        },

        ...mapState(['recetasFavStore']),

    },

    watch:{
        listafavo:function(){
            if (this.listafavo !== undefined ) {                
                this.recorrelsrecetas()
            }
        }
    },

    async created() {

        
        let datosLS = JSON.parse(localStorage.getItem('idrecetas')) || [];
        if (datosLS != null) {            
            this.$store.dispatch('llenarLista', datosLS);
        }

        this.recorrelsrecetas()
        
        for (let i = 0; i < 4; i++) {
            let recetain = await this.getRandomReceta()
            this.receta.push(recetain)            
        }

        
    },

}
</script>

<style scoped>

.header{    
    justify-content: center;    
    margin-top: 20px;
    margin-bottom: 0px;
}

.header input{
    border: solid #eee;
    text-align: center;
    width: 50%;
    border-radius: 100px;
    margin-bottom: 20px;
    font-size: 2em;
    padding-left: 15px;
}

.header input:focus{
    outline:none;
}

.header button{
    border: none;
    background: transparent;
    font-size: 2em;
    color: #fff;
}

.header button:hover{
    cursor: pointer;
    transform: scale(1.1);
}

</style>

