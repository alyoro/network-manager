import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const moduleAdding ={
  namespaced: true,
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

    deviceInfo: [
        {
          type: 'PatchPanel',
          building: '',
          room: '',
          identifier: '',
          localization: '',
          description: '',
          numberOfPorts: 0
      }
    ],

  },

  getters: {
    getDeviceTypes: (state) => {
      return state.deviceTypes
    },

    getDeviceInfo: (state) => {
      return (payload) => state.deviceInfo.find(item => item.type === payload)
    }
  },

  mutations: {
    saveDeviceInfo: (state, payload) => {
      const item = state.deviceInfo.find(item => item.type === payload.type);
      Object.assign(item, payload);
    }
  },
  
  actions: {

  }
}

export default new Vuex.Store({
  modules:{
    moduleAdding: moduleAdding,
  }

})
