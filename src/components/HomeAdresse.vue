<template>
    <section class="section is-medium">
        <div class="hero has-text-centered">
            <h1 class="title">GEOC<span><img src="../assets/logo.svg" class="icon"></span>DE</h1>
            
            <div class="hero-body">
                <input-adresse />
                <upload-adresses />
                <list-adresse />

            </div>

        </div>
    
    </section>
</template>

<script>
import InputAdresse from './InputAdresse.vue'
import UploadAdresses from './UploadAdresses.vue'
const ListAdresse = () => import(/*webpackChunkName: "ListAdresse" */ './ListAdresse.vue')

export default {
    name: 'HomeAdresse',
    components: { InputAdresse, ListAdresse, UploadAdresses },
    // beforeRouteEnter(to, from, next) {
    //     console.log(to, from, next)
    //     if (vm.$store.state.token) {
    //         next()
    //     } else {
    //         next('/login')
    //     }
    // }
}
</script>
<style>


</style>
