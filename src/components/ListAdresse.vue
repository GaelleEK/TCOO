<template>
<div class="panel mt-5" id="list-adresse" v-if="getAdresses.length">
    <div class="panel-heading">
        <h3 class="subtitle level-item">
            Adresses enregistrées
        </h3>
        <div class="level-right">
            <div class="buttons are-small">
                <adresse-button-file/>
                <button class="button" @click="updateAdressesCoos">Demander toutes les coordonnées</button>
            </div>
        </div>
    </div>
    
    <div class="panel-block" v-for="adresse in getAdresses" :key="adresse.id" :adresse="adresse">
        <base-adresse :key="adresse.id" :adresse="adresse"/>
    </div>
    
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import AdresseButtonFile from './AdresseButtonFile.vue'
import BaseAdresse from './BaseAdresse.vue'

export default {
  name: 'ListAdresse',
  components: {
    BaseAdresse,
    AdresseButtonFile
  },
    data() {
        return {
            result: null,
            reponse:null
        }
    },
    methods: {
        deleteAdresse(adresse) {
            this.$store.dispatch("deleteAdresse", adresse)
        },
        updateAdressesCoos() {
            this.$store.dispatch('updateAdresses')
        }
    },
    computed: {
    ...mapGetters(["getAdresses"])
  }
}

</script>
