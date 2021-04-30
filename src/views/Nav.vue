<template>
<!-- <div id="nav"> -->
    <nav class="navbar is-transparent" >
        <div class="navbar-brand">
            <router-link class="navbar-item" to="/">
                H<img src="../assets/compass1.svg">ME
            </router-link> 
            <div id="logout" class="navbar-item is-hidden-desktop">
                <router-link to="/" class="button is-small is-outlined" v-if="isAuthenticated" @click="logout">Logout</router-link>
                <router-link to="/login" class="button is-small is-outlined" v-else @click="logout">Login</router-link>
                <a role="button" :class="navbarBurger" @click="toggleMenu" >
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
        </div>
        <div :class="navbarMenu">
            <div class="navbar-start">
                <div class="navbar-item">
                    <router-link to="/adresse" @click="toggleMenu" exact-active-path replace>Adresse</router-link>
                </div>
                <div class="navbar-item">
                    <router-link to="/about" @click="toggleMenu" exact-path>About</router-link> 
                </div>
            </div>
            <div class="navbar-end is-hidden-touch">
                <div class="navbar-item">
                    <router-link to="/" class="button is-small is-outlined" v-if="isAuthenticated" @click="logout">Logout</router-link>
                    <router-link to="/login" class="button is-small is-outlined" v-else @click="logout">Login</router-link>
                </div>
            </div>
        </div>
    </nav>
        <!-- <p>route courante: {{ $route.name }}</p>
        <p>localStorage auth : {{ localStorage }}</p>
        <p>isAuthenticated : {{ isAuthenticated }}</p> -->
        
<!-- </div> -->
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'navigation',
    data() {
        return {
            errorMessage: '',
            localStorage: localStorage.getItem('auth'),
            navbarBurger: {
                'navbar-burger': true,
                'is-active': false
            },
            navbarMenu: {
                'navbar-menu': true,
                'has-background-transparent': true,
                'is-active': false
            }
        }
    },
    methods: {
        logout() {
            this.$store.dispatch("setAuthenticated", false)
            localStorage.setItem('auth', false)
        },
        toggleMenu() {
            if(!this.navbarBurger['is-active'] && !this.navbarMenu['is-active']) {
                this.navbarBurger['is-active'] = true
                this.navbarMenu['is-active'] = true
            } else {
                this.navbarBurger['is-active'] = false
                this.navbarMenu['is-active'] = false
            }
        }
    },
    computed: {
        ...mapGetters(['isAuthenticated']),
    }
}
</script>
<style lang="scss">

</style>
