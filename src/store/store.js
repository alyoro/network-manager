import Vue from 'vue'
import Vuex from 'vuex'
import NetworkManagerBackend from '@/services/api/NetworkManagerBackend'

Vue.use(Vuex)

const moduleAdding ={
  namespaced: true,
  state: {

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

const moduleTestData = {
  namespaced: true,
  state: {
    selectedType: '',
    insertedIdentifier: '',
    testData: []
  },
  getters:{
    getTestData: (state) => {     
      // return state.testData.filter(item => item.identifier === state.insertedIdentifier)
      return state.testData
    },
  },
  mutations:{
    setSearchConditions: (state, payload) => {
      state.insertedIdentifier = payload
    },
    setTestData: (state, payload) => {
      state.testData = payload
    }
  },
  actions:{
    getAll: (context, payload) => {
      NetworkManagerBackend.getAll(payload.url)
      .then(data => {
        context.commit('setSearchConditions',payload.identifier)
        context.commit('setTestData',data)
      })
      .catch(error => console.log(error))
    }
  },
}


export default new Vuex.Store({
  modules:{
    moduleAdding: moduleAdding,
    moduleTestData: moduleTestData,
  },
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
  },
  getters:{
    getDeviceTypes: (state) => {
      return state.deviceTypes
    },
  }
  
})
