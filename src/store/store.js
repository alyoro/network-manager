import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    deviceTypes: [
      {name: 'Patch Panel', idType: 'PatchPanel'},
      {name: 'Room Socket', idType: 'RoomSocket'},
      {name: 'Switch', idType: 'Switch'},
      {name: 'Router', idType: 'Router'},
      {name: 'Server', idType: 'Server'},
      {name: 'Printer', idType: 'Printer'},
      {name: 'Access Point', idType: 'AccessPoint'},
      {name: 'IP Phone', idType: 'IPPhone'},

    ],

    deviceInfo:{
      building: '',
      room: '',
      identifier: '',
      localization: '',
      description: '',
      numberOfPorts: 0
    }
  },
  getters: {
    getDeviceTypes: (state) => {
      return state.deviceTypes
    },

    getDeviceInfo: (state) => {
      return state.deviceInfo
    }
  },
  mutations: {
    saveDeviceInfo: (state, payload) => {
      state.deviceInfo = payload
    }
  },
  actions: {

  }
})
