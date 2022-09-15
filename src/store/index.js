import Vue from 'vue'
import Vuex from 'vuex'
import $cookies from 'vue-cookies'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')): {
    walletAddress: '',
    assetsLMT:'',
    assetsLMG:'',
    assets:'',
    audio:'',
    Sound:$cookies.get('Sound') == undefined || $cookies.get('Sound') == '' || $cookies.get('Sound') == null?true:$cookies.get('Sound'),
    Music:$cookies.get('Music') == undefined || $cookies.get('Music') == '' || $cookies.get('Music') == null?true:$cookies.get('Music'),
    environment:process.env.NODE_ENV,
  }
})
export default store
