import Vue from 'vue'
import Vuex from 'vuex'
import NetworkManagerBackend from '@/services/api/NetworkManagerBackend'

Vue.use(Vuex)

const moduleAdding ={
  namespaced: true,
  state: {

    deviceInfo: [
        {
        type: 'PATCH_PANEL',
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
    sendDataToServer: (context, payload) => {
      const item = context.state.deviceInfo.find(item => item.type === payload.type);
      var clone = Object.assign({}, item);
      delete clone.type;
      NetworkManagerBackend.saveNewElement(payload.type, clone)
        .then(response => console.log(response))
        .catch(error => console.log('Error: '+error))
    },

    savePortToServer: (context, payload) => {
      const url = '/'+payload.url.deviceType+'/addPort?id='+payload.url.deviceID
      console.log(url)
      NetworkManagerBackend.addNewPort(url, payload.port)
      .then(response => console.log(response))
      .catch(error => console.log('Error: '+error))
    }
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

const moduleConnectionsToMakeCart = {
  namespaced: true,
  state: {
    deviceList: [],
  },
  getters:{
    getDeviceList: (state) => {
      return state.deviceList;
    }
  },
  mutations:{
    addNewDevice: (state, payload) => {
      state.deviceList.push(payload)
    },
    clearDeviceList: (state) => {
      state.deviceList.length = 0
    },
    deleteOneItem: (state, payload) => {
      state.deviceList = state.deviceList.filter(item => item.device.id !== payload.device.id)
    },
    setMaster: (state, payload) => {
      state.deviceList.forEach(item => item.deviceMaster = false);
      const index = state.deviceList.findIndex(item => item.device.id === payload.device.id)
      state.deviceList[index].deviceMaster = true;
    }
  }
}


export default new Vuex.Store({
  modules:{
    moduleAdding: moduleAdding,
    moduleTestData: moduleTestData,
    moduleConnectionsToMakeCart, moduleConnectionsToMakeCart,
  },
  state: {
    deviceTypes: [
      {name: 'Patch Panel', idType: 'PATCH_PANEL'},
      {name: 'Room Socket', idType: 'ROOM_SOCKET'},
      {name: 'Switch', idType: 'SWITCH'},
      {name: 'Router', idType: 'ROUTER'},
      {name: 'Server', idType: 'SERVER'},
      {name: 'Printer', idType: 'PRINTER'},
      {name: 'Access Point', idType: 'ACCESS_POINT'},
      {name: 'IP Phone', idType: 'IP_PHONE'},
      {name: 'None', idType: 'NONE'},

    ],
  },
  getters:{
    getDeviceTypes: (state) => {
      return state.deviceTypes
    },

    getTypeName: (state) => {
      return (payload) => state.deviceTypes.find(item => item.idType === payload).name
    }
  }

})
