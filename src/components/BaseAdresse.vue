<template>
    <section class="tile is-ancestor box" :key="adresse.id" :adresse="adresse">
       
        <div class="tile is-parent level">
            
            <div class="tile is-1 level-item">{{ adresse.id }}</div>
            
            <div class="tile is-4 level-item">{{ adresse.text }}</div>

            <div class="tile is-4 level-item" :key="adresse.id" v-if="adresse.lat && adresse.lng">{{ adresse.lat }}/{{ adresse.lng }}</div>

            <div class="tile is-1 level-item" v-else>
                <adresse-button-coos></adresse-button-coos>
            </div>

            <div class="tile is-1 level-item">
                <button class="delete has-background-grey level-item" :adresse="adresse" @click="deleteAdresse"></button>
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
    }
}
</script>