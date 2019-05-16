import _ from "lodash";

const connectedMixin = {
  props: {
    deviceType: {
      type: String,
      required: true
    },
    device: {
      type: Object,
      required: true
    }
  },
  methods: {
    showConnectedDevice(port) {
      if (port.id === port.connections[0].portIdStart) {
        this.$store.dispatch("moduleConnections/fetchConnectedDeviceByPortId", {
          id: port.connections[0].portIdEnd
        });
      } else {
        this.$store.dispatch("moduleConnections/fetchConnectedDeviceByPortId", {
          id: port.connections[0].portIdStart
        });
      }
    },
    disconnectPort(port) {
      var payload = {
        connection: port.connections[0]
      }
      this.$store.dispatch("moduleConnections/deleteConnection", payload)
    },

    changePortStatus(id) {
      this.$store.dispatch("moduleData/changePortStatus", {
        deviceId: this.device.id,
        portId: id,
        type: this.deviceType
      });
    }
  }
};


export default connectedMixin;