<template>
    <div>
        <div class="header">
            <input type="text" v-model="busqueda" @keydown.enter="getBusquedaReceta(busqueda)" >
            <button @click="getBusquedaReceta(busqueda)"><i class="fas fa-search" /></button>
        </div>
        <listaFav 
            :receta="this.$store.state.recetasFavStore" 
            @ListaFavorita="listafavo=$event"
            @recetaIn="recetaIn=$event" 
            @instrucciones="instrucciones=$event">
            >
        </listaFav>
        <targetas 
            :receta="receta" 
            @ListaFavorita="listafavo=$event" 
            @recetaIn="recetaIn=$event" 
            @instrucciones="instrucciones=$event">
        </targetas>
        <!-- <button @click="pruebas" >PRUEBAS</button> -->
        
        <div class="container" v-if="instrucciones">
            <button class="clos" @click="instruc()" ><i class="far fa-times-circle"></i></button>
            <div class="instrucciones">
                <img class="img" :src="recetaIn.strMealThumb" alt="recetaIn.strMeal">
                <div class="contenido">
                    <h1>{{ recetaIn.strMeal }}</h1>
                    <ul class="lista">
                    <h3>Ingredients</h3>
                        <div class="ingredients" v-for="(item, ind) of ingCanti" :key="ind">
                            <li>
                                {{ item }}
                            </li>
                        </div>
                    </ul>
                    <p>{{ recetaIn.strInstructions }}</p>
                    <lazyYoutube :src="recetaIn.strYoutube"></lazyYoutube>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import Targetas from './Targetas.vue'
import ListaFav from './ListaFav.vue';
import  {  LazyYoutube  }  from  "vue-lazytube" ;
import { mapState } from 'vuex'

export default {
    name: 'Lista',

    components: { 
        Targetas,
        ListaFav,
        LazyYoutube,
    },

    data() {
        return {            
            listafavo: Array,
            receta: [],
            busqueda: '',
            recetaIn: [],
            instrucciones: false,
            ingCanti: []
        };
    },

    methods:{       
        
        pruebas(item){
            console.log('hola');
            console.log(item);
        },
        
        instruc(){
            this.instrucciones = false
        },

        async getRandomReceta(){
            let resp = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
                let respData = await resp.json();
                let randomReceta = respData.meals[0];
                if (this.$store.state.listaFavStore.includes(''+randomReceta.idMeal)) {
                    randomReceta['fav']=true
                }else{
                    randomReceta['fav']=false
                }
                return randomReceta
        },

        async getBusquedaReceta(busqueda){
            let resp = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s="+busqueda);
            let respData = await resp.json();
            let receta = respData.meals;

            if (receta) {
                this.receta=[]                 
                receta.forEach((receta) => {
                    if (this.$store.state.listaFavStore.includes(''+receta.idMeal)) {
                        receta['fav']=true
                    }else{
                        receta['fav']=false
                    }
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

        verifica(){
            this.ingCanti=[]
            for (let i = 1; i <= 20; i++) {
                if (this.recetaIn['strIngredient'+i]) {
                    if (this.recetaIn['strMeasure'+i] != ' ') {
                        this.ingCanti.push( this.recetaIn['strIngredient'+i]+' - '+this.recetaIn['strMeasure'+i])
                    }else{
                        this.ingCanti.push( this.recetaIn['strIngredient'+i])
                    }
                }
            }
        },

        ...mapState(['recetasFavStore']),

    },

    watch:{
        listafavo:function(){
            if (this.listafavo !== undefined ) {                
                this.recorrelsrecetas()
            }
        },
        instrucciones:function(){
            if (this.instrucciones) {
                this.verifica()
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
    align-content: center;
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

.container{
    background: rgba(0, 0, 0, 0.4);    
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

}

.instrucciones{
    background: #fff;
    border-radius: 20px;
    box-shadow: 2px 2px 10px 1px;    
    width: 50%;
    height: 90%;
    position: relative;
    overflow: auto;
}

.clos{
    color: #fff;
    position: absolute;
    right: 2%;
    top: 1%;
    background: transparent;
    border: none;
    font-size: 2.5em;
}

.img{
    width: 100%;
    height: 400px;
    object-fit: cover;
}


.contenido{
    padding: 1.5em;
    padding-top: 0;
}

h1{
    margin: 0;
}

p{
    text-align: justify;
}

.lista{
    text-align: left;
}
.lista li{
    list-style-type: decimal;
}

@media screen and (max-width: 768px)  {
    .header input{
        width: 80%;
        font-size: 1.5em;
    }
    .instrucciones{
        width: 95%;
        margin-top: 50px;
    }
}

</style>

