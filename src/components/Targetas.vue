<template>
    <div class="recetas">
        
        <div class="cardrecetas" 
            v-for="(item, index) of receta" 
            :key="index" 
                >
            <!-- <button @click="pruebas" >asdf</button> -->
            <div class="img-receta" @click="devolverReceta(index)">
                <img :src="receta[index].strMealThumb" :alt="receta[index].strMeal">
            </div>
            <div class="pie-receta">
                <h4 @click="devolverReceta(index)">{{ receta[index].strMeal }} </h4>
                <button
                    class="button"
                    :class="[receta[index].fav ? 'active' : '']" role="alert"

                    @click="ActualizaLS(receta[index].idMeal), receta[index].fav=!receta[index].fav"
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
            lista: [],
            activee: true,
        };
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

        devolverReceta(index){
            this.$emit('recetaIn', this.receta[index]);
            this.$emit('instrucciones', true);
            
        },

        pruebas(){
            console.log(this.receta);
        },

        ActualizaLS (recetaid){
                                    
            let datosLS = JSON.parse(localStorage.getItem('idrecetas')  );
            if (datosLS === null) {
                datosLS = []
            }
            if (!datosLS.includes(''+recetaid)) {                
                datosLS.push(recetaid)
                const todosJ = JSON.stringify(datosLS)
                this.lista = datosLS
                this.$store.dispatch('llenarLista', datosLS);
                localStorage.setItem('idrecetas', todosJ)
            }else{
                this.$store.dispatch('ACborradoLS', recetaid);
                this.lista = this.$store.state.listaFavStore.filter((id) => id !== recetaid)
            }

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
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    flex-wrap: wrap;
    border-radius: 4em;
    justify-content: center;
}

.cardrecetas{
    height: 350px;
    width: 300px;
    background-color: #fff;
    margin: 2em;
    border-radius: 10px;
    box-shadow:  0px 10px 10px rgba(71, 71, 71, 0.5);
}

.cardrecetas:hover{
    transform: scale(1.02);
}

.cardrecetas img{
    height: 250px;
    object-fit: cover;
    border-radius: 10px 10px 0px 0px;
    width: 100%;    
    cursor: pointer;
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
    cursor: pointer;
}

.button{
    border: none;
    background: transparent;
    font-size: 2em;
    color: rgb(80, 80, 80);
    cursor: pointer;
}

.active{
    color: rgb(218, 0, 0);
}
</style>