import _ from "lodash";

const connectedMixin = {
  props: {
    deviceType: {
      type: String,
      required: true
    },
    deviceId: {
      type: Number,
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

    disconnectPort(port) { },

    changePortStatus(id) {
      this.$store.dispatch("moduleData/changePortStatus", {
        deviceId: this.deviceId,
        portId: id,
        type: this.deviceType
      });
    }
  }
};


export default connectedMixin;