<template>
    <div>
        <input type="text" v-model="busqueda" @keydown.enter="getBusquedaReceta(busqueda)" >
        <button @click="getBusquedaReceta(busqueda)">Buscar</button>        
        <targetas :receta="receta" ></targetas>
    </div>
</template>


<script>
import Targetas from './Targetas.vue'

export default {
    components: { Targetas },
    name: 'Lista',

    data() {
        return {
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
        }
    },

    async created() {
        for (let i = 0; i < 4; i++) {
            let recetain = await this.getRandomReceta()
            this.receta.push(recetain)
        }        
    },

}
</script>

