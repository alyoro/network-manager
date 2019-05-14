import Vue from 'vue'
import Vuex from 'vuex'
import NetworkManagerBackend from '@/services/api/NetworkManagerBackend'
import { EventBus } from "@/main";

Vue.use(Vuex)

const moduleSpeedPorts = {
  namespaced: true,
  state: {
    portSpeedNames: []
  },
  getters: {
    getPortSpeedNames: (state) => {
      return state.portSpeedNames
    }
  },
  mutations: {
    setPortSpeedNames: (state, payload) => {
      state.portSpeedNames = payload
    }
  },
  actions: {
    fetchPortSpeedNames: (context) => {
      const url = "/portspeednames"
      NetworkManagerBackend.get(url)
        .then(response => {
          context.commit("setPortSpeedNames", response)
        })
        .catch(error => {
          console.log(error)
        })
    },
    updatePortSpeedNames: (context, payload) => {
      const url = "/portspeednames/" + payload.name
      NetworkManagerBackend.patch(url)
        .then(response => {
          context.commit("setPortSpeedNames", response)
          EventBus.$emit('snackbar-alert', { message: 'Port Speed Names successfuly updated', color: 'success' })
        })
        .catch(error => {
          EventBus.$emit('snackbar-alert', { message: error.response.data.message, color: 'error' })
          console.log(error)
        })
    },

    deleteNameFromPortSpeedNames: (context, payload) => {
      const url = "/portspeednames/" + payload.name
      NetworkManagerBackend.delete(url)
        .then(response => {
          context.commit("setPortSpeedNames", response)
          EventBus.$emit('snackbar-alert', { message: 'Port Speed Names successfuly deleted', color: 'success' })
        })
        .catch(error => {
          EventBus.$emit('snackbar-alert', { message: error.response.data.message, color: 'error' })
          console.log(error)
        })
    }
  }
}

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
      },

      {
        type: 'RoomSocket',
        building: '',
        room: '',
        identifier: '',
        description: '',
        numberOfPorts: 0
      },

      {
        type: 'Switch',
        identifier: '',
        localization: '',
        dateOfPurchase: '',
        managementIP: '',
        numberOfPorts: 0
      },

      {
        type: 'Server',
        localization: '',
        ip: '',
        numberOfPorts: 0
      },

      {
        type: 'Printer',
        localization: '',
        ip: '',
        numberOfPorts: 0
      },

      {
        type: 'AccessPoint',
        localization: '',
        ip: '',
        numberOfPorts: 0
      },

      {
        type: 'IPPhone',
        localization: '',
        ip: '',
        numberOfPorts: 0
      },

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
      let url = "/" + context.rootGetters.getUrlByType(payload.type)
      let clone = Object.assign({}, item);
      delete clone.type;
      NetworkManagerBackend.post(url, clone)
        .then(response => {
          if (response) {
            EventBus.$emit('snackbar-alert', { message: 'Device successfuly added', color: 'success' })
          }
        })
        .catch(error => {
          EventBus.$emit('snackbar-alert', { message: error.response.data.message, color: 'error' })
          console.log('Error: ' + error)
        })
    },

    savePortToServer: (context, payload) => {
      NetworkManagerBackend.post(payload.url, payload.port)
        .then(response => {
          var newPort = {
            id: payload.deviceID,
            port: response,
            type: payload.deviceType
          }
          context.commit('moduleData/addCreatedPort', newPort, { root: true })
          if (response) {
            EventBus.$emit('snackbar-alert', { message: 'Port successfuly added', color: 'success' })
          }
        })
        .catch(error => {
          EventBus.$emit('snackbar-alert', { message: error.response.data.message, color: 'error' })
          console.log('Error: ' + error)
        })
    }
  }
}

const moduleData = {
  namespaced: true,
  state: {
    selectedType: '',
    insertedIdentifier: '',
    data: [
      { type: 'PatchPanel', devices: [] },
      { type: 'Switch', devices: [] },
      { type: 'Server', devices: [] },
      { type: 'Printer', devices: [] },
      { type: 'AccessPoint', devices: [] },
      { type: 'IPPhone', devices: [] }
    ],

    countedDevices: [],
  },
  getters: {
    getData: (state) => (payload) => {
      let resultArr = state.data.find(item => item.type == payload)
      return resultArr.devices
    },
    getCountedDevices: (state) => {
      return state.countedDevices
    },
    getDeviceByPortId: (state) => (payload) => {
      for (let dataIndex of state.data) {
        for (let deviceIndex of dataIndex.devices) {
          for (let portIndex of deviceIndex.ports) {
            if (portIndex.id === payload.id) {
              Vue.set(deviceIndex, "deviceType", dataIndex.type)
              return deviceIndex;
            }
          }
        }
      }
    },
    getDeviceTypeByPortId: (state) => (payload) => {
      for (let dataIndex of state.data) {
        for (let deviceIndex of dataIndex.devices) {
          for (let portIndex of deviceIndex.ports) {
            if (portIndex.id === payload.id) {
              return dataIndex.type;
            }
          }
        }
      }
    }
  },
  mutations: {
    setSearchConditions: (state, payload) => {
      state.insertedIdentifier = payload
    },
    setData: (state, payload) => {
      const index = state.data.findIndex(item => item.type == payload.type)
      if (index > -1) {
        state.data[index].devices = payload.reciviedData.filter(item => { return item })
      }


    },
    addCreatedPort: (state, payload) => {
      const indexType = state.data.findIndex(item => item.type == payload.type)
      if (indexType > -1) {
        const indexDevice = state.data[indexType].devices.findIndex(item => item.id == payload.id)
        if (indexDevice > -1) {
          if (state.data[indexType].devices[indexDevice].ports !== null) {
            state.data[indexType].devices[indexDevice].ports.push(payload.port)
          } else {
            state.data[indexType].devices[indexDevice].ports = [payload.port]
          }
        }
      }
    },
    deleteDeviceFromStore: (state, payload) => {
      const indexType = state.data.findIndex(item => item.type == payload.type)
      if (indexType > -1) {
        const indexDevice = state.data[indexType].devices.findIndex(item => item.id == payload.id)
        if (indexDevice > -1) {
          state.data[indexType].devices.splice(indexDevice, 1)
        }
      }
    },
    updateDeviceInStore: (state, payload) => {
      const indexType = state.data.findIndex(item => item.type == payload.type)
      if (indexType > -1) {
        const indexDevice = state.data[indexType].devices.findIndex(item => item.id == payload.response.id)
        if (indexDevice > -1) {
          Vue.set(state.data[indexType].devices, indexDevice, payload.response)
        }
      }
    },
    deletePortFromStore: (state, payload) => {
      const indexType = state.data.findIndex(item => item.type == payload.type)
      if (indexType > -1) {
        const indexDevice = state.data[indexType].devices.findIndex(item => item.id == payload.deviceId)
        if (indexDevice > -1) {
          const indexPort = state.data[indexType].devices[indexDevice].ports.findIndex(item => item.id == payload.portId)
          if (indexPort > -1) {
            state.data[indexType].devices[indexDevice].ports.splice(indexPort, 1)
          }
        }
      }
    },

    updatePortInStore: (state, payload) => {
      const indexType = state.data.findIndex(item => item.type == payload.type)
      if (indexType > -1) {
        const indexDevice = state.data[indexType].devices.findIndex(item => item.id == payload.deviceId)
        if (indexDevice > -1) {
          const indexPort = state.data[indexType].devices[indexDevice].ports.findIndex(item => item.id == payload.portId)
          if (indexPort > -1) {
            Vue.set(state.data[indexType].devices[indexDevice].ports, indexPort, payload.port)
          }
        }
      }
    },

    updatePortConnection: (state, payload) => {
      for (let dataIndex of state.data) {
        for (let deviceIndex of dataIndex.devices) {
          for (let portIndex of deviceIndex.ports) {
            if (portIndex.id === payload.id) {
              portIndex.connections = []
              portIndex.connections.push(payload.connection)
            }
          }
        }
      }
    },

    updatePortAfterDisconnect: (state, payload) => {
      for (let dataIndex of state.data) {
        for (let deviceIndex of dataIndex.devices) {
          for (let portIndex of deviceIndex.ports) {
            if (portIndex.id === payload.id) {
              portIndex.connections = null
              portIndex.devicePlugged = "None"
              portIndex.portOnTheOtherElement = "None"
            }
          }
        }
      }
    },

    setCountedDevices: (state, payload) => {
      state.countedDevices = payload
    }
  },

  actions: {
    getAll: (context, payload) => {
      NetworkManagerBackend.get(payload.url)
        .then(data => {
          var setData = {
            type: context.rootGetters.getTypeByUrl(payload.url.split("/")[1]),
            reciviedData: data
          }
          context.commit('setData', setData)
        })
        .catch(error => console.log(error))
    },
    deleteDevice: (context, payload) => {
      let url = "/" + context.rootGetters.getUrlByType(payload.type) + "/" + payload.id
      NetworkManagerBackend.delete(url)
        .then(response => {
          context.commit("deleteDeviceFromStore", payload)
          if (response.status < 400) {
            EventBus.$emit('snackbar-alert', { message: 'Device successfuly deleted', color: 'success' })
          }
        })
        .catch(error => {
          EventBus.$emit('snackbar-alert', { message: error.response.data.message, color: 'error' })
          console.log('Error: ' + error)
        })
    },
    deletePort: (context, payload) => {
      let url = "/" + context.rootGetters.getUrlByType(payload.type) + "/" + payload.deviceId + "/ports/" + payload.portId
      NetworkManagerBackend.delete(url)
        .then(response => {
          context.commit("deletePortFromStore", payload)
          if (response.status < 400) {
            EventBus.$emit('snackbar-alert', { message: 'Port successfuly deleted', color: 'success' })
          }
        })
        .catch(error => {
          EventBus.$emit('snackbar-alert', { message: error.response.data.message, color: 'error' })
          console.log('Error: ' + error)
        })
    },
    updatePortToServer: (context, payload) => {
      NetworkManagerBackend.put(payload.url, payload.port)
        .then(response => {
          console.log(response)
          if (response) {
            EventBus.$emit('snackbar-alert', { message: 'Port successfuly updated', color: 'success' })
          }
        })
        .catch(error => {
          EventBus.$emit('snackbar-alert', { message: error.response.data.message, color: 'error' })
          console.log('Error: ' + error)
        })
    },
    getCountedDevices: (context) => {
      return new Promise((resolve, reject) => {
        const url = "/countingdevices"
        NetworkManagerBackend.get(url)
          .then(response => {
            context.commit("setCountedDevices", response)
            resolve()
          })
          .catch(error => {
            console.log('Error: ' + error)
            reject()
          });
      })
    },
    changePortStatus: (context, payload) => {
      const url = "/ports/" + payload.portId
      NetworkManagerBackend.patch(url)
        .then(response => {
          const updatePort = {
            type: payload.type,
            deviceId: payload.deviceId,
            portId: payload.portId,
            port: response
          }
          context.commit("updatePortInStore", updatePort);
          context.commit('moduleConnections/updatePort', updatePort, { root: true })
        })
        .catch(error => {
          console.log('Error: ' + error)
          alert(error.response.data.message)
        });
    },

    updateDevice: (context, payload) => {
      const url = "/" + context.rootGetters.getUrlByType(payload.deviceType) + "/" + payload.device.id
      NetworkManagerBackend.put(url, payload.device)
        .then(response => {
          const updateDevice = {
            type: payload.type,
            response: response
          }
          context.commit("updateDeviceInStore", updateDevice);
          EventBus.$emit('snackbar-alert', { message: 'Device successfuly updated', color: 'success' })
        })
        .catch(error => {
          EventBus.$emit('snackbar-alert', { message: error.response.data.message, color: 'error' })
          console.log('Error: ' + error)
        })
    }
  },
}

const moduleConnections = {
  namespaced: true,
  state: {
    device: {},
    deviceConnected: {}
  },
  getters: {
    getDevice: (state) => {
      return state.device
    },
    getDeviceConnected: (state) => {
      return state.deviceConnected
    }
  },
  mutations: {
    setDevice: (state, payload) => {
      Vue.set(state.device, 0, payload)
    },
    setDeviceConnected: (state, payload) => {
      state.deviceConnected = payload
    },
    updatePort: (state, payload) => {
      const indexPort = state.deviceConnected.ports.findIndex(item => item.id == payload.portId)
      Vue.set(state.deviceConnected.ports, indexPort, payload.port)
    }
  },
  actions: {
    fetchConnectedDeviceByPortId: (context, payload) => {
      const url = "/connecteddevice/" + payload.id
      NetworkManagerBackend.get(url)
        .then(response => {
          context.commit("setDeviceConnected", response)
        })
        .catch(error => {
          console.log('Error: ' + error)
        })
    },
    makeConnection: (context, ports) => {
      const url = "/connections"
      NetworkManagerBackend.post(url, ports)
        .then(response => {
          context.commit("moduleData/updatePortConnection", { id: ports[0].id, connection: response }, { root: true })
          context.commit("moduleData/updatePortConnection", { id: ports[1].id, connection: response }, { root: true })
          if (response) {
            EventBus.$emit('snackbar-alert', { message: 'Connection successfuly created', color: 'success' })
          }
        })
        .catch(error => {
          EventBus.$emit('snackbar-alert', { message: error.response.data.message, color: 'error' })
          console.log('Error: ' + error)
        })
    },
    deleteConnection: (context, payload) => {
      var url = "/connections/" + payload.connection.id
      NetworkManagerBackend.delete(url)
        .then(response => {
          context.commit("moduleData/updatePortAfterDisconnect", { id: payload.connection.portIdStart }, { root: true })
          context.commit("moduleData/updatePortAfterDisconnect", { id: payload.connection.portIdEnd }, { root: true })
          if (response) {
            EventBus.$emit('snackbar-alert', { message: 'Connection successfuly deleted', color: 'success' })
          }
        })
        .catch(error => {
          EventBus.$emit('snackbar-alert', { message: error.response.data.message, color: 'error' })
          console.log('Error: ' + error)
        })
    }
  }
}

export default new Vuex.Store({
  modules: {
    moduleSpeedPorts: moduleSpeedPorts,
    moduleAdding: moduleAdding,
    moduleData: moduleData,
    moduleConnections: moduleConnections
  },
  state: {
    deviceTypes: [
      { name: 'Patch Panel', idType: 'PatchPanel', apiUrl: 'patchpanels' },
      { name: 'Switch', idType: 'Switch', apiUrl: 'switches' },
      { name: 'Server', idType: 'Server', apiUrl: 'servers' },
      { name: 'Printer', idType: 'Printer', apiUrl: 'printers' },
      { name: 'Access Point', idType: 'AccessPoint', apiUrl: 'accesspoints' },
      // { name: 'IP Phone', idType: 'IPPhone', apiUrl: 'ipphones' },
      { name: 'None', idType: 'None' },
    ],
  },
  getters: {
    getDeviceTypes: (state) => {
      return state.deviceTypes.slice(0, -1)
    },

    getNameByType: (state) => {
      return (payload) => state.deviceTypes.find(item => item.idType === payload).name
    },

    getUrlByType: (state) => {
      return (payload) => state.deviceTypes.find(item => item.idType === payload).apiUrl
    },

    getTypeByUrl: (state) => {
      return (payload) => state.deviceTypes.find(item => item.apiUrl === payload).idType
    }
  }
})
