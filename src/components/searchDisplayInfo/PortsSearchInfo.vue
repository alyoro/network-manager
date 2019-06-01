<template>
  <v-dialog v-model="dialog" max-width="1600px">
    <template v-slot:activator="{ on }">
      <v-btn flat v-on="on">Show Ports</v-btn>
    </template>
    <v-card color="white" hide-overlay>
      <v-toolbar dark color="primary">
        <v-toolbar-title>Ports{{displayedDeviceIdentifier}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon dark @click="dialog = false">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-subheader class="px-3 text-md-center align-center">
        <v-flex xs12 md6>Port Number</v-flex>
        <v-flex xs12 md6>Port Speed</v-flex>
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
        <v-flex xs12 md6 v-if="deviceType=='PatchPanel'">Connect Wire</v-flex>
        <v-flex xs12 md6>Port status</v-flex>
        <v-flex xs12 md6>Update Port</v-flex>
        <v-flex xs12 md6>Delete Port</v-flex>
      </v-subheader>

      <v-flex
        lg12
        v-if="!filteredPorts"
        class="pa-3 text-md-center align-center title grey--text"
      >No ports (change filterng)</v-flex>

      <v-list flat xl2>
        <v-divider></v-divider>

        <v-layout
          v-for="(port, index) in filteredPorts"
          :key="index"
          row
          class="px-3 text-md-center align-center"
        >
          <v-flex xs12 md6>
            <div>{{port.portNumber}}</div>
          </v-flex>

          <v-flex xs12 md6>
            <div>{{port.portSpeed}}</div>
          </v-flex>

          <v-flex xs12 md6>
            <div>{{port.devicePlugged}}</div>
          </v-flex>

          <v-flex xs12 md8>
            <div>{{port.portOnTheOtherElement}}</div>
          </v-flex>

          <v-flex xs12 md6 v-if="deviceType != 'PatchPanel'">
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
                  v-else-if="port.id === port.connections[0].portIdStart"
                  color="pink accent-2"
                  flat
                  v-on="on"
                  @click.native.stop
                >Connected UP</v-btn>
                <v-btn
                  v-else-if="port.id === port.connections[0].portIdEnd"
                  color="pink accent-2"
                  flat
                  v-on="on"
                  @click.native.stop
                >Connected DOWN</v-btn>
              </template>
              <v-list>
                <v-list-tile v-if="port.connections" @click="deleteConnection(port.connections[0])">
                  <v-list-tile-title>Disconnect Port</v-list-tile-title>
                </v-list-tile>

                <ConnectedDeviceDialog v-if="port.connections !== null" :port="port"/>

                <ConnectingDeviceDialog v-if="port.connections === null" :port="port"/>
              </v-list>
            </v-menu>
          </v-flex>

          <v-flex xs12 md6 v-if="deviceType == 'PatchPanel'">
            <v-menu offset-y auto>
              <template v-slot:activator="{ on }">
                <v-btn
                  v-if="connectionsSocket(port) == null"
                  color="cyan accent-3"
                  flat
                  v-on="on"
                  @click.native.stop
                >Free</v-btn>
                <v-btn
                  v-else-if="port.id = connectionsSocket(port).portIdStart"
                  color="pink accent-2"
                  flat
                  v-on="on"
                  @click.native.stop
                >Connected UP</v-btn>
                <v-btn
                  v-else-if="port.id === connectionsSocket(port).portIdEnd"
                  color="pink accent-2"
                  flat
                  v-on="on"
                  @click.native.stop
                >Connected DOWN</v-btn>
              </template>
              <v-list>
                <v-list-tile
                  v-if="connectionsSocket(port) != null"
                  @click="deleteConnection(connectionsSocket(port.connections))"
                >
                  <v-list-tile-title>Disconnect Port</v-list-tile-title>
                </v-list-tile>

                <ConnectedDeviceDialog v-if="connectionsSocket(port) != null" :port="port"/>

                <ConnectingDeviceDialog v-if="connectionsSocket(port) == null" :port="port"/>
              </v-list>
            </v-menu>
          </v-flex>

          <v-flex xs12 md6 v-if="deviceType == 'PatchPanel'">
            <v-menu offset-y auto>
              <template v-slot:activator="{ on }">
                <v-btn
                  v-if="connectionsPlug(port) == null"
                  color="cyan accent-3"
                  flat
                  v-on="on"
                  @click.native.stop
                >Free</v-btn>
                <v-btn
                  v-else-if="port.id == connectionsPlug(port).portIdStart"
                  color="pink accent-2"
                  flat
                  v-on="on"
                  @click.native.stop
                >Connected UP</v-btn>
                <v-btn
                  v-else-if="port.id === connectionsPlug(port).portIdEnd"
                  color="pink accent-2"
                  flat
                  v-on="on"
                  @click.native.stop
                >Connected DOWN</v-btn>
              </template>
              <v-list>
                <v-list-tile
                  v-if="connectionsPlug(port) != null"
                  @click="deleteConnection(connectionsSocket(port.connections))"
                >
                  <v-list-tile-title>Disconnect Port</v-list-tile-title>
                </v-list-tile>

                <ConnectedDeviceDialog v-if="connectionsPlug(port) != null" :port="port"/>

                <ConnectingDeviceDialog v-if="connectionsPlug(port) == null" :port="port"/>
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
              :deviceId="device.id"
              :deviceType="deviceType"
              :portId="port.id"
              :port="port"
            />
          </v-flex>

          <v-flex xs12 md6>
            <v-btn @click="deletePort(device.id, port.id)" @click.native.stop flat>DELETE</v-btn>
          </v-flex>
        </v-layout>
      </v-list>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import UpdatePortDialog from "@/components/addForms/UpdatePortDialog.vue";
import ConnectedDeviceDialog from "@/components/connectedDevices/ConnectedDeviceDialog.vue";
import connectedMixin from "@/mixins/connectedMixin";
import filteringPortsMixin from "@/mixins/filteringPortsMixin";

import ConnectingDeviceDialog from "@/components/connectingDevices/ConnectingDeviceDialog.vue";

export default {
  mixins: [connectedMixin, filteringPortsMixin],
  components: {
    UpdatePortDialog,
    ConnectedDeviceDialog,
    ConnectingDeviceDialog
  },
  data() {
    return {
      dialog: false
    };
  },
  computed: {
    displayedDeviceIdentifier() {
      if (this.device.identifier !== null) {
        return " - " + this.device.identifier;
      } else {
        return " ";
      }
    },

    ...mapGetters({
      getDeviceConnected: "moduleConnections/getDeviceConnected"
    })
  },
  methods: {
    deletePort(deviceId, portId) {
      this.$store.dispatch("moduleData/deletePort", {
        deviceId: deviceId,
        portId: portId,
        type: this.deviceType
      });
    },

    connectionsSocket(port) {
      if (port.connections != null) {
        return port.connections.find(conn => conn.connectionType === "SOCKET");
      } else return null;
    },

    connectionsPlug(port) {
      if (port.connections != null) {
        return port.connections.find(conn => conn.connectionType === "PLUG");
      } else return null;
    }
  }
};
</script>

<style>
</style>
