import { mapGetters } from "vuex";
import _ from "lodash";

const connectedMixin = {
  props: {
    ports: {
      type: Array
    },
    deviceType: {
      type: String,
      required: true
    },
    deviceId: {
      required: true
    }
  },
  data() {
    return {
      activeFilter: "All"
    }
  },
  computed: {
    orderedPorts() {
      return _.orderBy(this.ports, "portNumber");
    },
    filteredPorts() {
      if (this.activeFilter === "All") {
        return this.orderedPorts;
      } else if (this.activeFilter === "Connected") {
        return this.orderedPorts.filter(port => {
          if (port.connections !== null) return port;
        });
      } else if (this.activeFilter === "Free") {
        return this.orderedPorts.filter(port => {
          if (port.connections === null) return port;
        });
      }
    },
    ...mapGetters({
      getNameByType: "getNameByType",
      getUrlByType: "getUrlByType",
    })
  },
  methods: {
    changeFilter(filter) {
      this.activeFilter = filter;
    },

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

    disconnectPort(port) {},

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