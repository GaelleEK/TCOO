import Vue from 'vue'
import Vuex, { Store } from 'vuex'

Vue.use(Vuex)

let id = 1

function createAdresse(text) {
  text.toString().replace(/\n|\r/g, '')
  return {
    id: id++,
    text,
    lat: null,
    lng: null
  }
}

const axios = require('axios')

async function getCoo(text) {
  const reponse = await axios.get(`https://api.torop.net/cartographie/geocode?adresse=${text}`)
  return reponse.data
}
async function getAuth(item) {
  const reponse = await axios.post('https://api.torop.net/auth/login', { login: item.username, password: item.password })
    return reponse
}

function addCooToAdresse(lat, lng, adresse) {
  adresse.lat = lat
  adresse.lng = lng
  return adresse
}

export default new Vuex.Store({
  name: 'store',
  state: {
    adresses: [],
    authenticated: false,
    errors: [],
    rep: {}
  },
  getters: {
    getAdresses: state => {
      return state.adresses
    },
    isAuthenticated: state => {
      return state.authenticated
    },
    getErrors: state =>  {
      return state.errors
    },
    getRep: state => {
      return state.rep
    }
  },
  mutations: {
    ADD_ADRESSE(state, item) {
      // TODO: voir comment gérer l'emission d'erreur pour adresse valide ou invalide
      let adresse 
      //si state adresses vide alors j enregistre adresse
      if(state.adresses.length == 0) {
        adresse = createAdresse(item)
        state.adresses.push(adresse)
      } else {
        // si state adresses a des adresses
        if(state.adresses.length > 0) {
          //variable q filtre les adresses identiques
          let q = state.adresses.filter(adresse => adresse.text == item)
          if(q.length == 0) {
            //console.log('adresse valide')
            adresse = createAdresse(item)
            state.adresses.push(adresse)
          } else {
            //console.log('adresse invalide')
            let error = { type: 'adresse invalide', item }
            state.errors.push(error)
          }
        }
      }
    },
    REMOVE_ADRESSE(state, item) {
      state.adresses = state.adresses.filter(adresse => adresse.id !== item.id)
    },
    UPDATE_ADRESSES(state, item) {
      if(item) {
        getCoo(item.text)
          .then(reponse => {
            addCooToAdresse(reponse.data.infos.lat, reponse.data.infos.lng, item)
        })
      } else {
        const adresses = state.adresses
        for(let i = 0; i < adresses.length; i++) {
          getCoo(adresses[i].text)
            .then(reponse => {
              addCooToAdresse(reponse.data.infos.lat, reponse.data.infos.lng, adresses[i])
          })
        }
      }
    },
    DELETE_ERRORS(state) {
      state.errors = []
    },
    SET_AUTHENTICATED(state, item) {
        if (item == false) {
          state.authenticated = false
        } else {
          state.authenticated = true
        }
    },
    GET_AUTHENTICATED(state, item) {
      console.log('1')
        getAuth(item).then((reponse) => { 
          if(state.rep.success) {
            state.authenticated = true
            localStorage.setItem('auth-token', reponse.token)
          } else {
            state.authenticated = false
          }
          state.rep = reponse.data 
          console.log('2')
        })
        console.log('3')
      
      //console.log(state.authenticated, state.rep)
              
    },
    ADD_ERROR(state, item) {
      state.errors.push(item)
    }
  },
  actions: {
    addAdresse(context, adresse) {
      context.commit('ADD_ADRESSE', adresse)
    },
    deleteAdresse(context, adresse) {
      context.commit('REMOVE_ADRESSE', adresse) 
    },
    updateAdresses(context, adresse) {
      context.commit('UPDATE_ADRESSES', adresse)
    },
    setAuthenticated(context, authenticated) {
      context.commit('SET_AUTHENTICATED', authenticated)
    }, 
    deleteErrors(context) {
      context.commit('DELETE_ERRORS')
    },
    getAuthenticated(context, item) {
      context.commit('GET_AUTHENTICATED', item)
    },
    addError(context, error) {
      context.commit('ADD_ERROR', error)
    }
  }
})
