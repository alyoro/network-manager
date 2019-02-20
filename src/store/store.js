import Vue from 'vue'
import Vuex from 'vuex'

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
    testData: [
          {
              type: 'PatchPanel',
              building: 'test1',
              room: 'test1',
              identifier: 'test1',
              localization: 'test1',
              description: 'test1',
              numberOfPorts: 12
          },

          {
              type: 'PatchPanel',
              building: 'test2',
              room: 'test2',
              identifier: 'test2',
              localization: 'test2',
              description: 'test2',
              numberOfPorts: 12
          },
          {
              type: 'Server',
              localization: 'Stest1',
              ip: 'Stest1',
          },

          {
              type: 'Server',
              localization: 'Stest2',
              ip: 'Stest2',
          },

      ]
  },
  getters:{
    getTestData: (state) => {
      return state.testData.filter(item => item.type === state.selectedType && item.identifier === state.insertedIdentifier)
    },
  },
  mutations:{
    search: (state, payload) => {
      state.selectedType = payload.devType;
      state.insertedIdentifier = payload.identifier;
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
