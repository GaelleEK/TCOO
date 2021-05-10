<template>
<section class="section is-medium">
    <div></div>
    <h1>Home</h1>
    <p>user: {{ user }}</p>
    <p>token: {{ token }}</p>
    <p>info: {{ userInfo }}</p>
</section>
</template>

<script>
const axios = require('axios')
async function getUserInfos(token) {
  const reponse = await axios.get(`https://api.torop.net/user/me`, { headers: { Authorization: 'Bearer ' + token }})
  return reponse
}
import { mapState } from 'vuex'

export default {
    data() {
        return {
            query: ''
        }
    },
    methods: {
  
    },
    // watch: {
        // token: function() {
        //     if(this.token != '') {
        //         this.$router.replace('/userHome')
        //         localStorage.setItem('auth-token', this.token)
        //     }
    // },
    computed: {
       ...mapState(['user', 'token', 'userInfo']),

    },
       
    
}
</script>
