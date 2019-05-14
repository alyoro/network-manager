<template>
  <div>
    <v-divider></v-divider>
    <v-subheader class="text-md-center align-center pa-0">
      <v-flex xs12 md6>Port Number</v-flex>
      <v-flex xs12 md6>Port Speed</v-flex>
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
        <div>{{port.portSpeed}}</div>
      </v-flex>

      <v-flex xs12 md6>
        <div>{{port.devicePlugged}}</div>
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
            <ConnectingDeviceDialog :port="port"/>

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
import connectedMixin from "@/mixins/connectedMixin";
import filteringPortsMixin from "@/mixins/filteringPortsMixin";
import ConnectingDeviceDialog from "@/components/connectingDevices/ConnectingDeviceDialog.vue";

export default {
  mixins: [connectedMixin, filteringPortsMixin],
  components: {
    ConnectingDeviceDialog
  }
};
</script>

<style>
</style>
