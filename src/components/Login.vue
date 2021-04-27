<template>
    <div class="block">
        <div class="box">
            <h1 class="title is-2">Connexion</h1>
            
            <div class="field">
                <div class="control has-icons-left has-icons-right">
                    <input class="input" type="text" name="username" v-model="input.username" placeholder="Entrez votre nom">
                    <span class="icon is-small is-left">
                        <i class="fas fa-user"></i>
                    </span>
                </div>
            </div>
            <div class="field">
                <div class="control has-icons-left has-icons-right">
                    <input type="password" class="input" name="password" v-model="input.password" placeholder="Entrez votre mot de passe" @keyup.enter="login">
                    <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                    </span>
                </div>
            </div>
            <div class="field">
                <button type="button" class="button is-light" @click="login">Login</button>
                <p v-if="errorMessage" class="help is-danger">{{ errorMessage }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Login',
    //* initialisation des variables utilisées par le composant login récupérés par l'input et le message d'erreur vide *//
    data() {
        return {
            input: {
                username: '',
                password: ''
            },
            errorMessage: '',
            account: {
                username: 'test',
                password: 'password'
            }
        }
    },
    methods: {
        //* méthode appelé lors du click sur le bouton login vérifie si le mot de passe correspond aux variables en fonction on modif le message d'erreur *//
        login() {
            // vérification de localstorage pour auth auto mais ne fonctionne pas :'-( 
            if (localStorage.getItem('auth')) {
                this.$store.dispatch("setAuthenticated", true)
                this.$router.replace({ path: '/adresse' })
                //localStorage.setItem('auth', true)
            } else {
                if (this.input.username != '' && this.input.password != '') {
                    if (this.input.username === this.account.username && this.input.password === this.account.password) {
                        this.$store.dispatch("setAuthenticated", true)
                        localStorage.setItem('auth', true)
                        this.$router.replace({ path: '/adresse' })
                    } else {
                        this.errorMessage = "Le nom et/ou le mot de passe sont incorrects"
                    }
                } else {
                    this.errorMessage = "Vous n'êtes pas enregistré"
                }
            }
        }
        
    }
}
</script>
<style lang="scss">
</style>
