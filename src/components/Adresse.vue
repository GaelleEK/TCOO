<template>
  <div id="adresse" class="container is-fluid">
    <div class="box">
      <h1 class="title is-1 is-spaced">Mes adresses</h1>
      <p class="text pb-5">Entrez une adresse valide, c'est à dire un nom de rue et un nom de ville au minimum</p>
      <div class="field">
          <div class="control has-addons has-addons-centered pb-3">
            <input type="text" class="input" v-model="newAdresse" @change="addAdresse" @keyup.enter="addAdresse" placeholder="Ex: 10 rue Georges Genoux Vesoul">
          </div>
          <div class="control">
            <p class="help is-danger" v-if="alert">{{ alert }}</p>
            <button class="button" @click="() => addAdresse(this.getAdresses)">Enregistrer</button>
        </div>
      </div>

      <upload-adresses/>

      <div>
    </div>
    </div>  
    <div v-if="getAdresses.length">
      <h3 class="title is-4 pt-3">Mes adresses enregistrées</h3>
      <table class="table">
        <tr>
          <th>#</th>
          <th>Adresses</th>
          <th>Actions</th>
          <th>
            <p>Coordonnées</p>
            <button class="button is-small" @click="getAllCoos" >Pour toutes les adresses</button>
          </th>
        </tr>
        <tr v-for="adresse in getAdresses" :key="adresse.id">
          <td>{{ adresse.id }}</td>
          <td>{{ adresse.text }}</td>
          <td>
            <div class="buttons are-small">
              <button class="button" @click="() => deleteAdresse(adresse)">Effacer</button>
              <button :class="classObjet" @click="() => queryCoo(adresse)">Demander coordonnées</button>
            </div>
          </td>
          <td>
            <div v-if="!loading && adresse.lat && adresse.lng" >
              <p>lat: {{ adresse.lat }}</p>
              <p>lng: {{ adresse.lng }}</p>
            </div>
            <div v-else><progress class="progress is-small is-dark"></progress></div>

          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import UploadAdresses from './UploadAdresses.vue'

const axios = require('axios')

export default {
  components: { UploadAdresses },
  name: "adresse",
  data() {
    return {
      newAdresse: "",
      alert: "",
      loading: null,
      classObjet: {
        'button': true,
        'is-loading': false
      }
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
    deleteAdresse(adresse) {
      this.$store.dispatch("deleteAdresse", adresse)
    },
    queryCoo(adresse) {
      this.loading = true
        this.getCoo(adresse.text)
          .then(reponse => {
                this.addCooToAdresse(reponse.data.infos.lat, reponse.data.infos.lng, adresse)
                this.loading = false
            })
    },
    addCooToAdresse(lat, lng, adresse) {
      adresse.lat = lat
      adresse.lng = lng
      return adresse
    },
    getAllCoos() {
      for (let i = 0; i < this.getAdresses.length; i++) {
        const adresse = this.getAdresses[i]
        this.queryCoo(adresse)
      }
    },
    async getCoo(text) {
      const reponse = await axios.get(`https://api.torop.net/cartographie/geocode?adresse=${text}`)
      return reponse.data
    },
  },
  computed: {
    ...mapGetters(["getAdresses"])
  }
};
</script>
<style>
/* table {
  width: 100%;
  display: table;
  border-spacing: 0;
  border-collapse: collapse;
}
th,
td {
  border: 1px solid black;
} */
</style>