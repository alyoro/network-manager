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
        <v-flex xs12 md8>Port number on the other side of connection</v-flex>
        <v-flex xs12 md6>
          <v-menu offset-y auto>
            <template v-slot:activator="{ on }">
              <button flat v-on="on" @click.native.stop>Connection Status</button>
            </template>
            <v-list>
              <v-list-tile @click="changeFilter('all')">
                <v-list-tile-title>Show All</v-list-tile-title>
              </v-list-tile>
              <v-list-tile @click="changeFilter('free')">
                <v-list-tile-title>Only Free</v-list-tile-title>
              </v-list-tile>
              <v-list-tile @click="changeFilter('connected')">
                <v-list-tile-title>Only Connected</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </v-flex>
        <v-flex xs12 md6>Port status</v-flex>
        <v-flex xs12 md6>Update Port</v-flex>
        <v-flex xs12 md6>Delete Port</v-flex>
      </v-subheader>

      <v-flex lg12 v-if="!filteredPorts.length" class="pa-3 text-md-center align-center title grey--text">No ports (change filterng)</v-flex>

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
                <v-btn v-else color="pink accent-2" flat v-on="on" @click.native.stop>Occupied</v-btn>
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
                <v-list-tile v-else @click="disconnectPort(port.id)">
                  <v-list-tile-title>Disconnect Port</v-list-tile-title>
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
    UpdatePortDialog
  },
  data() {
    return {
      dialog: false,
      activeFilter: "all"
    };
  },
  computed: {
    orderedPorts() {
      return _.orderBy(this.ports, "portNumber");
    },
    filteredPorts() {
      if (this.activeFilter === "all") {
        return this.orderedPorts;
      } else if (this.activeFilter === "connected") {
        return this.orderedPorts.filter(port => {
          if (port.connections !== null) return port;
        });
      } else if (this.activeFilter === "free") {
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
      this.activeFilter = filter
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

    disconnectPort(id) {},

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
