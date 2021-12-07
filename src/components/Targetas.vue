<template>
    <div class="recetas">

        <div class="card-recetas" v-for="(item, index) of receta" :key="index" >
                        
            <div class="img-receta">
                <img :src="receta[index].strMealThumb" :alt="receta[index].strMeal">
            </div>
            <div class="pie-receta">
                <h4>{{ receta[index].strMeal }} </h4>
                <button 
                    class="fav-btn"
                    @click="ActualizaLS(receta[index].idMeal)"
                    >
                    <i class="fas fa-heart"></i>
                </button>
            </div>
        
        </div>

    </div>
</template>

<script>

import { mapState, mapMutations } from 'vuex'

export default {
    name: 'Targetas',
    
    data() {
        return {
            lista: []
        };
    },

    mounted(){
        this.lista = this.listaFav
    },

    watch:{
        lista:function(){
            this.$emit('ListaFavorita', this.lista);
        }
    },

    props:{
        receta: Array,
    },

    methods:{        
        ...mapMutations(['getLs']),

        ActualizaLS (recetaid){
                        
            // this.listaFav.push(recetaid)
            let datosLS = JSON.parse(localStorage.getItem('idrecetas')  );
            if (datosLS === null) {
                datosLS = []
            }
            datosLS.push(recetaid)
            const todosJ = JSON.stringify(datosLS)
            this.lista = datosLS
            this.$store.dispatch('llenarLista', datosLS);
            localStorage.setItem('idrecetas', todosJ)

        },

        borrarLS (recetaid){            
            localStorage.setItem("idrecetas", JSON.stringify(this.listaFav.filter((id) => id !== recetaid)));
        },

        
    },

    computed:{        
        ...mapState(['listaFav']),
    },

}
</script>

<style scoped>

.recetas{
    display: flex;
    width: 100%;
    margin: auto;
    margin-left: 0px;
    margin-right: 0px;
    margin-top: 20px;
    flex-wrap: wrap;
    border-radius: 4em;
    justify-content: center;
}

.card-recetas{
    height: 350px;
    width: 300px;
    background-color: #fff;
    margin: 2em;
    border-radius: 10px;
    box-shadow:  0px 10px 10px rgba(71, 71, 71, 0.5);
}

.card-recetas:hover{
    transform: scale(1.02);
    cursor: pointer;
}

.card-recetas img{
    height: 250px;
    object-fit: cover;
    border-radius: 10px 10px 0px 0px;
    width: 100%;    
}

.pie-receta{
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    padding: 10px;
}

.pie-receta h4{
    overflow: hidden;
    align-self: center;
    margin: 0;
}

.pie-receta button{
    border: none;
    background: transparent;
    font-size: 2em;
    color: rgb(80, 80, 80);
    cursor: pointer;
}

.fav-btn.active{
    color: rgb(218, 0, 0);
}
</style>