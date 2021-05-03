<template>
<div class="panel mt-5" v-if="getAdresses.length">
    <transition name="bounce" appear>
      <div class="panel-heading has-background-grey-invert">
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
    </transition>
    <transition-group name="slice" key="adresse" appear>
        <div class="panel-block has-background-grey-light" v-for="adresse in getAdresses" :key="adresse.id" :adresse="adresse">
            <base-adresse :key="adresse.id" :adresse="adresse"/>
        </div>
    </transition-group>
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
            
        }
    },
    methods: {
        deleteAdresse(adresse) {
            this.$store.dispatch("deleteAdresse", adresse)
        },
        updateAdressesCoos() {
            this.$store.dispatch('updateAdresses')
        },
        
    },
    computed: {
    ...mapGetters(["getAdresses"])
  }
}

</script>
<style lang="scss">



</style>
