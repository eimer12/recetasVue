<template>
  <div class="favoritos">
      <div class="favcont">
        <ul id="ul-fav"  v-if="receta.length > 0">
          <li class="li-fav" v-for="(item, index) of receta " :key="index">
              <img :src="receta[index].strMealThumb" :alt="receta[index].strMeal">
              <br><span>{{ receta[index].strMeal }}</span>              
              <button class="clos" @click="borrarIDLS(receta[index].idMeal)"><i class="far fa-times-circle"></i></button>
          </li>
        </ul>  
      </div> 
  </div>
</template>

<script>
    export default {
        name: 'ListaFav',

        data() {
            return {
                lista: [],
            };
        },

        watch:{
            lista:function(){
                this.$emit('ListaFavorita', this.lista);                
            },
        },

        props:{
            receta: Array
        },

        methods:{
            borrarIDLS(IDreceta){
                this.$store.dispatch('ACborradoLS', IDreceta);
                this.lista = this.$store.state.listaFavStore.filter((id) => id !== IDreceta)                
            }
        }
    }
</script>

<style scoped>

.favoritos{
    background-image: url("https://image.freepik.com/vector-gratis/patron-fisuras-comida-vegetariana_73378-545.jpg");
    margin: 0px;
    width: 100vw;
    max-width: 100vw;
    overflow: auto;
    box-shadow: 
    inset 0px 11px 8px -10px rgb(112, 112, 112),
    inset 0px -11px 8px -10px rgb(112, 112, 112); 
}

.favcont{
    background-color: #7face0ad;
    min-width: 100vw;
    width: max-content;
    padding: 20px;    
    margin: 20px 0px;
}

.favoritos ul{    
    display: flex;
    justify-content: center;
    text-align: center;
    padding: 0px;
}

.favoritos li{
    position: relative;
    background-color: #fff;
    max-width: 200px;
    box-shadow:  0px 10px 10px rgba(71, 71, 71, 0.5);
    border-radius: 10px;
    list-style: none;
    margin: 0px 10px 0px 10px;
    padding: 10px;    
}

.li-fav:hover{
    transform: scale(1.05);
}

.favoritos li img{
    width: 180px;
    border-radius: 50%;
}

.li-fav:hover .clos{
    opacity: 1;
}

.clos{
    font-size: 1.1em;
    background: transparent;
    border: none;
    color: #353ec7;
    position: absolute;
    top: 2%;
    left: 85%;
    cursor: pointer;
    opacity: 0;
}

.clos:hover{
    transform: scale(1.2);
}

</style>