<template>
    <div class=" is-fluid">
        <h1 class="title">GEOC<span><img src="../assets/logo.svg" class="icon"></span>DE</h1>
        <input-adresse />
        <upload-adresses />
        <list-adresse />
        
    </div>
</template>

<script>
import InputAdresse from './InputAdresse.vue'
import ListAdresse from './ListAdresse.vue'
import UploadAdresses from './UploadAdresses.vue'

export default {
    name: 'HomeAdresse',
    components: { InputAdresse, ListAdresse, UploadAdresses }
}
</script>