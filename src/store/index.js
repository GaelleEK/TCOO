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

async function getUserInfos(token) {
  const reponse = await axios.get(`https://api.torop.net/user/me`, { headers: { Authorization: 'Bearer' + token }})
    return reponse
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
    errors: [],
    token: '',
    user: {},
    userInfo: {}
  },
  getters: {
    getAdresses: state => {
      return state.adresses
    },
    getErrors: state =>  {
      return state.errors
    },
    getToken: state => {
      return state.token
    },
    
  },
  //************** MUTATIONS *************************/
  mutations: {
    //**********ADRESSE****************//
    ADD_ADRESSE(state, item) {
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
          .catch(error => state.errors.push(error))
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
    //**********ERRORS****************//
    DELETE_ERRORS(state) {
      state.errors = []
    },
    ADD_ERROR(state, item) {
      state.errors.push(item)
    },
    //**********TOKEN****************//
    GET_TOKEN(state, item) {
      getAuth(item)
        .then(reponse => { 
          //console.log(reponse)
          state.token = reponse.data.data.token
          state.user = reponse.config.data
        }) 
        .catch(error => {
          state.errors.push(error)
        }) 
    },
    REMOVE_TOKEN(state) {
      state.token = {}
    },
   //**********USER****************//
    GET_USER_INFO(state) {
      if(state.token!= '') {
        getUserInfos(state.token) 
          .then(reponse => {
            console.log(reponse)
            state.userInfos = reponse
          })
          .catch(error => {
            state.errors.push(error)
          }) 
            }

      }
  },
  //************** ACTIONS *************************/
  actions: {
    //**********ADRESSE****************//
    addAdresse(context, adresse) {
      context.commit('ADD_ADRESSE', adresse)
    },
    //**********ERRORS****************//
    addError(context, error) {
      context.commit('ADD_ERROR', error)
    },
    deleteError(context) {
      context.commit('DELETE_ERRORS')
    },
    //**********TOKEN****************//
    getToken(context, item) {
      context.commit('GET_TOKEN', item)
    },
    removeToken(context) {
      context.commit('REMOVE_TOKEN')
    },
    //**********USER****************//
    getUserInfo(context) {
      context.commit('GET_USER_INFO')
    }

  }
})
