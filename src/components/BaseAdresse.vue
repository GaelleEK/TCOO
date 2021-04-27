<template>
    <section class="tile is-ancestor box" :key="adresse.id" :adresse="adresse">
       
        <div class="tile is-parent level">
            
            <p class="level-left">{{ adresse.id }}</p>

            <div class="tile is-child">
                <p class="level-item">{{ adresse.text }}</p>
            </div>

            <div class="tile is-child" :key="adresse.id" v-if="adresse.lat && adresse.lng">
                <p class="level-item">{{ adresse.lat | formatLatLng }}/{{ adresse.lng | formatLatLng }}</p>
            </div>

            <div class="tile is-child" v-else>
                <adresse-button-coos></adresse-button-coos>
            </div>

            <div class="level-right">
                <button class="delete has-background-grey" :adresse="adresse" @click="deleteAdresse"></button>
            </div>
            
            
        </div>
    </section>
</template>

<script>

import AdresseButtonCoos from './AdresseButtonCoos.vue'


export default {
    name: 'BaseAdresse',
    components: { AdresseButtonCoos },
    props: {
        adresse: {
           type: Object,
           required: true,
        }

    },
    // PROVIDE: permet de spécifier les données / méthodes que nous voulons fournir aux composants descendants
    provide() {
        return {
            adresse: this.adresse
        }
    },
    methods: {
        deleteAdresse() {
            this.$store.dispatch("deleteAdresse", this.adresse)
        },
    },
    filters: {
        formatLatLng: function(value) {
            if(!value) return null
            value = Number(value)
            return (value).toFixed(4) 
        }
    }
}
</script>