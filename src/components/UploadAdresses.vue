<template>
<!-- titre input upload -->
  <div class="is-centered">
    <p class="pb-4">Déposez un fichier d'adresses au format .txt</p>
<!-- input upload -->
    <div class="field has-addons has-addons-centered pb-5">
      <form class="file has-name">
        <label class="file-label">
          <input
            class="file-input has-background-grey-light"
            id="file"
            ref="filesList"
            type="file"
            @change="handleFileUpload"
          />
          <span class="file-cta has-background-grey-invert">
            <span class="file-icon">
              <i class="fas fa-upload"></i>
            </span>
            <span class="file-label"> Choisissez un fichier </span>
          </span>
          <span :class="placeholderInputFileAdresse">
            {{ placeholderInputFileAdresse.text }}
          </span>
        </label>
      </form>
    </div>
<!-- affichage erreur extension file upload-->
    <div class="control">
      <p class="help is-danger mt-4" v-if="error">{{ error }}</p>
<!-- bouton enregistrer -->
      <button class="button" @click="submitFile">Enregistrer</button>
    </div>
<!-- Affichage des adresses non-enregistrées car doublon ou vide -->
    <transition
      enter-active-class="bounceInLeft"
      leave-to-class="bounceOutRight"
    >
      <div class="message help is-danger mt-4" v-if="getErrors.length">
        <div class="message-header">
          <p>Liste des adresses invalides :</p>
          <button class="delete is-small" @click="deleteErrors"></button>
        </div>
      
        <transition-group
          enter-active-class="bounceInLeft"
          leave-active-class="bounceOutRight"
        >
          <!-- index+0 dans key permet de supprimer le warning dans la console -->
          <!-- Module Warning (from ./node_modules/vue-loader/lib/loaders/templateLoader.js):
(Emitted value instead of an instance of Error) Do not use v-for index as key on <transition-group> children, this is the same as not using keys. -->
          <div v-for="(error, index) in getErrors" :key="index + 0">
            {{ error.item }}
          </div>
        </transition-group>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "UploadAdresses",
  props: {
    adresses: [],
  },
  data() {
    return {
      filesList: {},
      file: "",
      target: null,
      error: "",
    };
  },
  methods: {
    handleFileUpload() {
      this.error = "";
      this.filesList = this.$refs.filesList.files;
      var files = this.filesList;
      var nbfiles = this.$refs.filesList.files.length;
      for (var i = 0; i < nbfiles; i++) {
        this.file = files[i];
      }
      this.$refs.filesList.value = "";
    },
    submitFile() {
      if (this.verifFile(this.file)) {
        this.readFile();
      } else {
        if (this.file == "") {
          this.error = "ce fichier n'est pas valide";
        } else {
          this.error = "ce fichier n'a pas une extension valide";
        }
      }
      this.file = "";
    },
    readFile() {
      var file = this.file;
      const reader = new FileReader();
      reader.onload = ($event) => {
        this.target = $event.target.result;
        this.extractAdresse(this.target);
      };
      reader.readAsText(file);
    },
    verifFile(file) {
      let hasSize = file.size > 0 ? true : false;
      if (hasSize) {
        let extension = file.name.split(".").pop();
        let hasExtensionTxt = extension === "txt" ? true : false;
        if (hasExtensionTxt) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    extractAdresse(fileAdresses) {
      let texts = fileAdresses;
      // je découpe texts en text séparé aux sauts de ligne
      texts = texts.split("\n");
      // je boucle sur texts
      for (let i = 0; i < texts.length; i++) {
        // si text vide on retire de texts
        if (texts[i] != "") {
          this.$store.dispatch("addAdresse", texts[i]);
        }
      }
    },
    deleteErrors() {
      this.$store.dispatch("deleteErrors");
    },
    enterErrors: function (el, done) {},
  },
  computed: {
    placeholderInputFileAdresse() {
      if (this.file != "") {
        return {
          text: this.file.name,
          "file-name": true,
          "has-background-grey-light": true,
        };
      } else {
        return {
          text: "Ex : fichier.txt",
          "has-background-grey-light": true,
          "file-name": true,
        };
      }
    },
    ...mapGetters(["getAdresses", "getErrors"]),
  },
  watch: {
      getErrors() {
          if(this.getErrors.length > 0) {
              setTimeout(function() {
                  this.deleteErrors()
              }.bind(this), 3000);
          }
      }
  }
};
</script>

