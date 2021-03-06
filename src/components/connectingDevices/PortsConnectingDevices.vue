<template>
  <div>
    <v-divider></v-divider>
    <v-subheader class="text-md-center align-center">
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
      <v-flex xs12 md6 v-if="deviceType=='PatchPanel'">Connect Wire</v-flex>
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
            <v-list-tile v-if="port.connections === null" @click="makeConnection(port, 'SOCKET')">
              <v-list-tile-title>Make connection</v-list-tile-title>
            </v-list-tile>

            <v-list-tile
              v-if="port.connections !== null"
              @click="deleteConnection(port.connections[0])"
            >
              <v-list-tile-title>Disconnect Port</v-list-tile-title>
            </v-list-tile>
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
            <v-list-tile v-if="!(connectionsSocket(port))" @click="makeConnection(port, 'SOCKET')">
              <v-list-tile-title>Make connection</v-list-tile-title>
            </v-list-tile>

            <v-list-tile
              v-if="connectionsSocket(port)"
              @click="deleteConnection(connectionsSocket(port))"
            >
              <v-list-tile-title>Disconnect Port</v-list-tile-title>
            </v-list-tile>
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
            <v-list-tile v-if="!(connectionsPlug(port))" @click="makeConnection(port, 'PLUG')">
              <v-list-tile-title>Make connection(PLUG)</v-list-tile-title>
            </v-list-tile>

            <v-list-tile
              v-if="connectionsPlug(port)"
              @click="deleteConnection(connectionsPlug(port))"
            >
              <v-list-tile-title>Disconnect Port</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import filteringPortsMixin from "@/mixins/filteringPortsMixin";

export default {
  mixins: [filteringPortsMixin],
  props: {
    portSlave: {
      type: Object
    },
    deviceType: {
      type: String
    }
  },
  methods: {
    makeConnection(port, connectionType) {
      var ports = [];
      ports.push(port);
      ports.push(this.portSlave);
      var payload = {
        ports: ports,
        connectionType: connectionType
      };
      this.$store.dispatch("moduleConnections/makeConnection", payload);
    },
    deleteConnection(connection) {
      var payload = {
        connection: connection
      };
      this.$store.dispatch("moduleConnections/deleteConnection", payload);
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
