import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
Vue.use(Vuex)

let id = 1

function createAdresse(text) {
  //text.toString().replace(/\n|\r/g, '')
  return {
    id: id++,
    text,
    lat: null,
    lng: null
  }
}

async function getCoo(text) {
  const reponse = await axios.get(`https://api.torop.net/cartographie/geocode?adresse=${text}`)
  return reponse.data
}

async function getUserInfos(item) {
  const http = axios.create({
    baseURL: 'https://api.torop.net',
    headers: {
      Authorization: `Bearer ${item}`
    }
  })
  http.interceptors.request.use(function(headers) { 
    headers['Authorization'] = `Bearer ${item}`
    return headers
  })
  const reponse = http.get('/users/me')
  //console.log(reponse)
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
    userInfo: {},
    errorsAxios: [],
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
    }
  },
  //************** MUTATIONS *************************/
  mutations: {
    //**********ADRESSE****************//
    ADD_ADRESSE(state, adresse) {
      //console.log('mutation add_adresse', state, adresse)
      state.adresses.push(adresse)
    },
    REMOVE_ADRESSE(state, item) {
      state.adresses = state.adresses.filter(adresse => adresse.id !== item.id)
    },
    UPDATE_ADRESSES(state, adresseUpdated) {
      //console.log(adresseUpdated)
      //state.adresses.filter(adresse => adresse.id == adresseUpdated.id)
      state.adresses.filter(adresse => adresse.id === adresseUpdated.id)
      //console.log(adresse)
      //state.adresses.push(adresseUpdated)
    },
    //**********ERRORS****************//
    DELETE_ERRORS(state) {
      state.errors = []
    },
    ADD_ERROR(state, item) {
      state.errors.push(item)
    },
    ADD_ERROR_AXIOS(state, item) {
      state.errorsAxios.push(item)
    },
    //**********TOKEN****************//
    REMOVE_TOKEN(state) {
      state.token = {}
    },
    SET_TOKEN(state, token) {
      state.token = token
    },
   //**********USER****************//
    SET_USER_INFO(state, item) {
      state.userInfo = item
    }
  },
  //************** ACTIONS *************************/
  actions: {
    //**********ADRESSE****************//
    async addAdresse({ state, commit}, item) {
      let adresse
      //si state adresses vide alors j enregistre adresse
      if(state.adresses.length == 0) {
        adresse = createAdresse(item)
        commit('ADD_ADRESSE', adresse)
      } else {
        // si state adresses a des adresses
        if(state.adresses.length > 0) {
          //variable q filtre les adresses identiques
          let q = state.adresses.filter(adresse => adresse.text == item)
          if(q.length == 0) {
            //console.log('adresse valide')
            adresse = createAdresse(item)
            commit('ADD_ADRESSE', adresse)
          } else {
            //console.log('adresse invalide')
            let error = { type: 'adresse invalide', item }
            commit('ADD_ERROR', error)
          }
        }
      }
    },
    async updateAdresses({ state, commit, dispatch }, item) {
      //await dispatch('addAdresse')
      const adresses = state.adresses
      if(item) {
        getCoo(item.text)
          .then(reponse => {
            let adresse = addCooToAdresse(reponse.data.infos.lat, reponse.data.infos.lng, item)
            commit('UPDATE_ADRESSES', adresse)
        })
          //.catch(error => state.errors.push(error))
      } else {
        for(let i = 0; i < adresses.length; i++) {
          //const adresse = adresses[i]
          getCoo(adresses[i].text)
            .then(reponse => {
              let adresse = addCooToAdresse(reponse.data.infos.lat, reponse.data.infos.lng, adresses[i])
              commit('UPDATE_ADRESSES', adresse)
          })
        }
      }
    },
    deleteAdresse(context, adresse) {
      context.commit('REMOVE_ADRESSE', adresse)
    },
    //**********ERRORS****************//
    addError(context, error) {
      context.commit('ADD_ERROR', error)
    },
    deleteErrors(context) {
      context.commit('DELETE_ERRORS')
    },
    //**********TOKEN/USER****************//
    async getAuthS({ commit }, item) {
      if(item.username && item.password) {
        getAuth(item)
            .then(reponse => { 
              //console.log(reponse)
              commit('SET_TOKEN', reponse.data.data.token)
            }) 
            .catch(error => {
              commit('ADD_ERROR_AXIOS', error)
              //state.errors.push(error)
            })

      }
    },
    async login({ commit, dispatch, state }) {
        await dispatch('getAuthS')
        getUserInfos(state.token)
          .then(reponse => {
            //console.log(reponse)
            commit('SET_USER_INFO', reponse.data.data)
          })
          .catch(error => {
            commit('ADD_ERROR_AXIOS', error)
            //state.errors.push(error)
          })
    },
  }
})
