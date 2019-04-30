<template>
  <v-dialog v-model="dialog" max-width="1600px">
    <template v-slot:activator="{ on }">
      <v-btn flat v-on="on">Show Ports</v-btn>
    </template>
    <v-card color="white" hide-overlay>
      <v-toolbar dark color="primary">
        <v-toolbar-title>Ports</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon dark @click="dialog = false">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-subheader class="px-3 text-md-center align-center">
        <v-flex xs12 md6>Port Number</v-flex>
        <v-flex xs12 md6>Device plugged</v-flex>
        <v-flex xs12 md8>Port number on the other element</v-flex>
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
        <v-flex xs12 md6>Update Port</v-flex>
        <v-flex xs12 md6>Delete Port</v-flex>
      </v-subheader>

      <v-flex
        lg12
        v-if="!filteredPorts.length"
        class="pa-3 text-md-center align-center title grey--text"
      >No ports (change filterng)</v-flex>

      <v-list flat xl2 v-for="port in filteredPorts" :key="port.id">
        <v-divider></v-divider>

        <v-layout row class="px-3 text-md-center align-center">
          <v-flex xs12 md6>
            <div>{{port.portNumber}}</div>
          </v-flex>

          <v-flex xs12 md6>
            <div>{{displayDevicePlugged(port.devicePlugged)}}</div>
          </v-flex>

          <v-flex xs12 md8>
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
                <v-list-tile
                  v-if="port.connections === null"
                  @click="makeConnections(port, 'Switch')"
                >
                  <v-list-tile-title>Make connection to Switch</v-list-tile-title>
                </v-list-tile>

                <v-list-tile v-if="port.connections" @click="disconnectPort(port)">
                  <v-list-tile-title>Disconnect Port</v-list-tile-title>
                </v-list-tile>

                <ConnectedDeviceDialog :port="port"/>
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

          <v-flex xs12 md6>
            <UpdatePortDialog
              :deviceId="deviceId"
              :deviceType="deviceType"
              :portId="port.id"
              :port="port"
            />
          </v-flex>

          <v-flex xs12 md6>
            <v-btn @click="deletePort(deviceId, port.id)" @click.native.stop flat>DELETE</v-btn>
          </v-flex>
        </v-layout>
      </v-list>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import _ from "lodash";
import UpdatePortDialog from "@/components/addForms/UpdatePortDialog.vue";
import ConnectedDeviceDialog from "@/components/connectionDevices/ConnectedDeviceDialog.vue";

export default {
  props: {
    ports: {
      default: []
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
    UpdatePortDialog,
    ConnectedDeviceDialog
  },
  data() {
    return {
      dialog: false,
      activeFilter: "All",
      connectedDeviceDialog: false
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
      getUrlByType: "getUrlByType",
      getDeviceConnected: "moduleConnections/getDeviceConnected"
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
      this.connectedDeviceDialog = true;
    },

    disconnectPort(port) {},

    deletePort(deviceId, portId) {
      this.$store.dispatch("moduleData/deletePort", {
        deviceId: deviceId,
        portId: portId,
        type: this.deviceType
      });
    },

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
