<template>
<div class="block">
    <div id="input-adresse" class="field">
        <div class="control has-addons has-addons-centered pb-3">
            <input type="text" class="input has-background-grey-light" v-model="newAdresse" @change="deleteError" @keyup.enter="addAdresse" placeholder="Ex: 10 rue Georges Genoux Vesoul">
        </div>
        <div class="control">
            
            <p class="help is-danger pb-1" v-if="alert">{{ alert }}</p>
            
            <button class="button" @click="addAdresse">Enregistrer</button>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            newAdresse: '',
            alert: ''
        }
    },
    methods: {
        addAdresse() {
            
            const text = this.newAdresse
            if (text !== "") {
                this.newAdresse = ""
                this.$store.dispatch("addAdresse", text)
            } else {
                this.alert = "Veuillez vérifier votre saisie"
            }
        },
        deleteError() {
            this.alert = ''
        },

    }
}
</script>
<style lang="scss">



</style>