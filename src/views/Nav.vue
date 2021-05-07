<template>
<!-- <div id="nav"> -->
    <nav id="nav" :class="navbarStyle" role="navigation" aria-label="main navigation" v-scroll="handleScroll">
        <div class="navbar-brand">
            <router-link class="navbar-item" to="/">
                <a id="logo">GEOC<span><img src="../assets/logo.svg" class="icon is-small"></span>DE</a>
            </router-link> 
            <div id="logout" class="navbar-item is-hidden-desktop">
                <router-link to="/" class="buttontest" v-if="isAuthenticated" @click="logout">Logout</router-link>
                <!-- <router-link to="/" class="button is-small is-outlined" v-if="isAuthenticated" @click="logout">Logout</router-link> -->
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
                'aria-label': 'menu',
                'aria-expanded': false,
                'data-target': '',
                'navbar-burger': true,
                'is-active': false,
            },
            navbarMenu: {
                'navbar-menu': true,
                'has-background-transparent': true,
                'is-active': false
            },
            navbarStyle: {
                'navbar': true,
                'is-transparent': true,
                'is-fixed-top': true
            }
        }
    },
    methods: {
        logout() {
            this.$store.dispatch("setAuthenticated", false)
            localStorage.setItem('auth-token', false)
        },
        toggleMenu() {
            if(!this.navbarBurger['is-active'] && !this.navbarMenu['is-active']) {
                this.navbarBurger['is-active'] = true
                this.navbarBurger['aria-expanded'] = true
                this.navbarMenu['is-active'] = true
                this.navbarStyle['is-fixed-top'] = false
                
            } else {
                this.navbarBurger['is-active'] = false
                this.navbarMenu['is-active'] = false
            }
        },
        handleScroll() {
            if (window.scrollY > 10) {
                this.navbarStyle = {
                    'navbar': true,
                    'is-transparent': true,
                    'is-fixed-top': true,
                    'slideOutUp': true
                }
            } 
            if(window.scrollY < 20) {
                this.navbarStyle = {
                    'navbar': true,
                    'is-transparent': true,
                    'is-fixed-top': false,
                    'slideInUp': true
                }  
            }
        }
    },
    computed: {
        ...mapGetters(['isAuthenticated']),
    },
    directives: {
        scroll: {
            inserted(el, binding) {
                let f = function (evt) {
                if (binding.value(evt, el)) {
                    window.removeEventListener('scroll', f)
                }
            }
            window.addEventListener('scroll', f)
            }
        }   
    }
}
</script>
<style lang="scss">

</style>
