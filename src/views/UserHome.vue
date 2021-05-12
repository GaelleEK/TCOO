<template>
<section class="section is-medium">
    <div></div>
    <h1>Home</h1>
    <p>Votre profil</p>
    <p>Login : {{ userInfo['login'] }}</p>
    <p>Nom : {{ userInfo['nom'] }}</p>
    <p>Prénom : {{ userInfo['prenom'] }}</p>
    <p>Mail : {{ userInfo['email'] }}</p>
    <!-- <p>info: {{ userInfo }}</p> -->
</section>
</template>

<script>
import { mapState } from 'vuex'

export default {
    data() {
        return {
            
        }
    },
    computed: {
       ...mapState(['token', 'userInfo'])
    },  
    
}
</script>
