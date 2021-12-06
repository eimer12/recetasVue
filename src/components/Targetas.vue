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
                    >
                    <i class="fas fa-heart"></i>
                </button>
            </div>
        
        </div>

    </div>
</template>

<script>
export default {
    name: 'Targetas',

    props:{
        receta: Array,
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