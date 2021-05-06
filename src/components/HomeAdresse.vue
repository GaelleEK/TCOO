<template>
    <div class="hero p-5 has-text-centered">

        <h1 class="title">GEOC<span><img src="../assets/logo.svg" class="icon"></span>DE</h1>
        
        <div class="hero-body">
            <input-adresse />
            <upload-adresses />
            <list-adresse />

        </div>
    
    </div>
</template>

<script>
import InputAdresse from './InputAdresse.vue'
//import ListAdresse from './ListAdresse.vue'
import UploadAdresses from './UploadAdresses.vue'
const ListAdresse = () => import(/*webpackChunkName: "ListAdresse" */ './ListAdresse.vue')
export default {
    name: 'HomeAdresse',
    components: { InputAdresse, ListAdresse, UploadAdresses },
}
</script>
<style>


</style>
