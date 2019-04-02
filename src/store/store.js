import Vue from 'vue'
import Vuex from 'vuex'
import NetworkManagerBackend from '@/services/api/NetworkManagerBackend'

Vue.use(Vuex)

const moduleAdding = {
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
    sendDataToServer: (context, payload) => {
      const item = context.state.deviceInfo.find(item => item.type === payload.type);
      var clone = Object.assign({}, item);
      delete clone.type;
      NetworkManagerBackend.post(payload.url, clone)
        .then(response => console.log(response))
        .catch(error => console.log('Error: ' + error))
    },

    savePortToServer: (context, payload) => {
      NetworkManagerBackend.post(payload.url, payload.port)
        .then(response => {
          var newPort = {
            id: payload.deviceID,
            port: response,
            type: payload.url.split("/")[1]
          }
          context.commit('moduleData/addCreatedPort', newPort, { root: true })
        })
        .catch(error => console.log('Error: ' + error))
    }
  }
}

const moduleData = {
  namespaced: true,
  state: {
    selectedType: '',
    insertedIdentifier: '',
    data: [
      { type: 'patchpanels', devices: [] },
      { type: 'switches', devices: [] }
    ]
  },
  getters: {
    getData: (state) => (payload) => {
      let resultArr = state.data.find(item => item.type == payload)
      return resultArr.devices
    },
  },
  mutations: {
    setSearchConditions: (state, payload) => {
      state.insertedIdentifier = payload
    },
    setData: (state, payload) => {
      const index = state.data.findIndex(item => item.type == payload.type)
      if (index > -1) {
        state.data[index].type = payload.type
        state.data[index].devices = payload.reciviedData
      }
    },
    addCreatedPort: (state, payload) => {
      const indexType = state.data.findIndex(item => item.type == payload.type)
      if (indexType > -1) {
        const indexDevice = state.data[indexType].devices.findIndex(item => item.id == payload.id)
        if (indexDevice > -1) {
          state.data[indexType].devices[indexDevice].ports.push(payload.port)
        }
      }
    }
  },
  actions: {
    getAll: (context, payload) => {
      NetworkManagerBackend.get(payload.url)
        .then(data => {
          var setData = {
            type: payload.url.substring(1),
            reciviedData: data
          }
          // context.commit('setSearchConditions', payload.identifier)
          context.commit('setData', setData)
        })
        .catch(error => console.log(error))
    }
  },
}

const moduleConnectionsToMakeCart = {
  namespaced: true,
  state: {
    deviceList: [],
    portMaster: {},
    portSlave: {}
  },
  getters: {
    getDeviceList: (state) => {
      return state.deviceList;
    },
    getSlave: (state) => {
      return state.deviceList.filter(item => item.deviceSlave === true)
    },
    getMaster: (state) => {
      return state.deviceList.filter(item => item.deviceMaster === true)
    },
    getPortMaster: (state) => {
      return state.portMaster
    },
    getPortSlave: (state) => {
      return state.portSlave
    },
    getDeviceById: (state) => {
      return (id) => state.deviceList.filter(item => item.device.id === id)
    }
  },
  mutations: {
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
      state.deviceList.forEach(item => { if (item.device.id !== payload.device.id) item.deviceMaster = false });
      const index = state.deviceList.findIndex(item => item.device.id === payload.device.id && item.deviceSlave === false)
      if (index > -1) {
        state.deviceList[index].deviceMaster = !state.deviceList[index].deviceMaster;
      }
    },
    setSlave: (state, payload) => {
      state.deviceList.forEach(item => { if (item.device.id !== payload.device.id) item.deviceSlave = false });
      const index = state.deviceList.findIndex(item => item.device.id === payload.device.id && item.deviceMaster === false)
      if (index > -1) {
        state.deviceList[index].deviceSlave = !state.deviceList[index].deviceSlave;
      }
    },
    setPortMaster: (state, payload) => {
      if (state.portMaster === payload) {
        state.portMaster = {}
      } else {
        state.portMaster = payload
      }

    },
    setPortSlave: (state, payload) => {
      if (state.portSlave === payload) {
        state.portSlave = {}
      } else {
        state.portSlave = payload
      }
    }
  },
  actions: {
    makeConnection: (context) => {
      const url = '/connections'
      if (context.portMaster !== {} && context.portSlave !== {}) {
        var payload = []
        payload.push(context.state.portMaster, context.state.portSlave)
        console.log(payload)
        NetworkManagerBackend.post(url, payload)
          .then(response => {
            console.log(response)
            context.state.deviceList.forEach(item => { item.deviceSlave = false; item.deviceMaster = false });
            context.state.portMaster = {}
            context.state.portSlave = {}
          })
          .catch(error => console.log('Error: ' + error))
      }
    }
  }
}



export default new Vuex.Store({
  modules: {
    moduleAdding: moduleAdding,
    moduleData: moduleData,
    moduleConnectionsToMakeCart, moduleConnectionsToMakeCart,
  },
  state: {
    deviceTypes: [
      { name: 'Patch Panel', idType: 'PatchPanel', apiUrl: 'patchpanels' },
      { name: 'Room Socket', idType: 'RoomSocket', apiUrl: 'roomsockets' },
      { name: 'Switch', idType: 'Switch', apiUrl: 'switches' },
      { name: 'Router', idType: 'Router' },
      { name: 'Server', idType: 'Server' },
      { name: 'Printer', idType: 'Printer' },
      { name: 'Access Point', idType: 'AccessPoint' },
      { name: 'IP Phone', idType: 'IPPhone' },
      { name: 'None', idType: 'None' },

    ],
  },
  getters: {
    getDeviceTypes: (state) => {
      return state.deviceTypes
    },

    getTypeName: (state) => {
      return (payload) => state.deviceTypes.find(item => item.idType === payload).name
    },

    getUrlByType: (state) => {
      return (payload) => state.deviceTypes.find(item => item.idType === payload).apiUrl
    }
  }
})
