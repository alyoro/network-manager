<template>
  <div>
    <v-divider></v-divider>
    <v-subheader class="text-md-center align-center">
      <v-flex xs12 md6>Port Number</v-flex>
      <v-flex xs12 md6>Device plugged</v-flex>
      <v-flex xs12 md6>Port number on the other element</v-flex>
      <v-flex xs12 md6>
        <v-menu offset-y auto>
          <template v-slot:activator="{ on }">
            <button flat v-on="on" @click.native.stop>Connection Status ({{activeFilter}})</button>
          </template>
          <v-list>
            <v-list-tile @click="changeFilter('All')">
              <v-list-tile-title>Show All</v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="changeFilter('Free')">
              <v-list-tile-title>Free</v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="changeFilter('Connected')">
              <v-list-tile-title>Connected</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-flex>
      <v-flex xs12 md6>Port status</v-flex>
    </v-subheader>

    <v-layout row v-for="port in filteredPorts" :key="port.id" class="text-md-center align-center">
      <v-flex xs12 md6>
        <div>{{port.portNumber}}</div>
      </v-flex>

      <v-flex xs12 md6>
        <div>{{displayDevicePlugged(port.devicePlugged)}}</div>
      </v-flex>

      <v-flex xs12 md6>
        <div>{{port.portOnTheOtherElement}}</div>
      </v-flex>

      <v-flex xs12 md6>
        <v-menu offset-y auto>
          <template v-slot:activator="{ on }">
            <v-btn
              v-if="port.connections === null"
              color="cyan accent-3"
              flat
              v-on="on"
              @click.native.stop
            >Free</v-btn>
            <v-btn
              v-if="port.connections && port.id === port.connections[0].portIdStart"
              color="pink accent-2"
              flat
              v-on="on"
              @click.native.stop
            >Connected UP</v-btn>
            <v-btn
              v-if="port.connections && port.id === port.connections[0].portIdEnd"
              color="pink accent-2"
              flat
              v-on="on"
              @click.native.stop
            >Connected DOWN</v-btn>
          </template>
          <v-list>
            <v-list-tile
              v-if="port.connections === null"
              @click="makeConnections(port, 'PatchPanel')"
            >
              <v-list-tile-title>Make connection to Patch Panel</v-list-tile-title>
            </v-list-tile>
            <v-list-tile v-if="port.connections === null" @click="makeConnections(port, 'Switch')">
              <v-list-tile-title>Make connection to Switch</v-list-tile-title>
            </v-list-tile>

            <v-list-tile v-if="port.connections" @click="disconnectPort(port)">
              <v-list-tile-title>Disconnect Port</v-list-tile-title>
            </v-list-tile>

            <v-list-tile v-if="port.connections" @click="showConnectedDevice(port)">
              <v-list-tile-title>Show Connected Device</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-flex>

      <v-flex xs12 md6>
        <v-btn
          v-if="port.portStatus == 'UP'"
          color="success"
          flat
          @click="changePortStatus(port.id)"
        >{{port.portStatus}}</v-btn>
        <v-btn
          v-if="port.portStatus == 'DOWN'"
          color="error"
          flat
          @click="changePortStatus(port.id)"
        >{{port.portStatus}}</v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import UpdatePortDialog from "@/components/addForms/UpdatePortDialog.vue";
import ConnectedDeviceDialog from "@/components/connectionDevices/ConnectedDeviceDialog.vue";

export default {
  props: {
    ports: {
      required: true
    },
    deviceType: {
      type: String,
      required: true
    },
    deviceId: {
      required: true
    }
  },
  components: {
    UpdatePortDialog
  },
  data() {
    return {
      activeFilter: "All"
    };
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
      getUrlByType: "getUrlByType"
    })
  },
  methods: {
    changeFilter(filter) {
      this.activeFilter = filter;
    },
    displayDevicePlugged(devicePlugged) {
      return this.getNameByType(devicePlugged);
    },
    makeConnections(port, deviceType) {
      if (deviceType === "PatchPanel") {
        var payload = {
          devType: deviceType,
          url: "/" + this.getUrlByType(deviceType)
        };
        this.$store.dispatch("moduleData/getAll", payload);
      } else if (deviceType === "Switch") {
        var payload = {
          devType: deviceType,
          url: "/" + this.getUrlByType(deviceType)
        };
        this.$store.dispatch("moduleData/getAll", payload);
      }

      this.$router.push({
        name: "connecting",
        params: {
          type: deviceType,
          portSlave: port
        }
      });
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
</script>

<style>
</style>
