<template>
<div id="nav">
    <nav class="navbar pb-4">
        <div class="navbar-menu">
            <router-link class="navbar-item" to="/">
                <p class="level-item">H<img src="../assets/compass1.svg">ME</p>
            </router-link> 

            <div class="navbar-item">
                <router-link to="/about" class="navbar-item" exact-path>About</router-link> 
            </div>

            <div class="navbar-item">
                <router-link to="/adresse" exact-active-path replace>Adresse</router-link>
            </div>

            <div class="navbar-item navbar-end">
                <button  class="button is-small is-outlined " v-if="isAuthenticated" @click="logout">Logout</button>
            </div>
        </div>
    </nav>
        <!-- <p>route courante: {{ $route.name }}</p>
        <p>localStorage auth : {{ localStorage }}</p>
        <p>isAuthenticated : {{ isAuthenticated }}</p> -->
        <router-view class="container has-text-centered"/>
</div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'navigation',
    data() {
        return {
            errorMessage: '',
            localStorage: localStorage.getItem('auth'),
        }
    },
    methods: {
        logout() {
            this.$store.dispatch("setAuthenticated", false)
            localStorage.setItem('auth', false)
        }
    },
    computed: {
        ...mapGetters(['isAuthenticated']),
    } 
}
</script>
<style lang="scss">

</style>
