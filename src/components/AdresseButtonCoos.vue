<template>
    <div>
        <slot name="showCoo" v-if="adresse.lat && adresse.lng">
            {{ adresse.lng | formatLatLng }} / {{ adresse.lng | formatLatLng }}
        </slot>

        <slot name="loading" v-if="loading"><progress class="progress is-small is-dark"></progress></slot>

        <slot name="default" v-if="!adresse.lat">
            <button class="button" @click="() => updateAdresseCoos(this.adresse)">
                Demander coordonnées
            </button>
        </slot>
    </div>
</template>

<script>
export default {
    name: 'AdresseButtonCoos',
    data() {
        return {
            loading: false,
        }
    },
    // PROVIDE: pour recevoir des propriétés spécifiques que nous avons listé dans composant parent
    inject:['adresse'],
    methods: {
        updateAdresseCoos() {
            //console.log(this.adresse, 'buttonadresse')
            this.$store.dispatch('updateAdresses', this.adresse)
        }
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

<style>
</style>