<template>
  <div>
    <v-divider></v-divider>
    <v-layout row class="pa-1" v-for="port in ports" :key="port.id">
      <v-flex xs12 md6 class="pa-1">
        <div class="grey--text subheading">Port number</div>
        <div>{{port.portNumber}}</div>
      </v-flex>

      <v-flex xs12 md6 class="pa-1">
        <div class="grey--text subheading">Device plugged</div>
        <div>{{displayDevicePlugged(port.devicePlugged)}}</div>
      </v-flex>

      <v-flex xs12 md6 class="pa-1">
        <div class="grey--text subheading">portOnTheUpperElement</div>
        <div>{{port.portOnTheUpperElement}}</div>
      </v-flex>

      <v-flex xs12 md6 class="pa-1">
        <div class="grey--text subheading">Connection Status</div>
        <v-menu offset-y auto>
          <template v-slot:activator="{ on }">
            <v-btn v-if="port.connections === null" color="cyan accent-3" v-on="on" @click.native.stop>Free</v-btn>
            <v-btn v-else color="pink accent-2" v-on="on" @click.native.stop>Occupied</v-btn>
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
            <v-list-tile v-else @click="disconnectPort(port.id)">
              <v-list-tile-title>Disconnect Port</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-flex>

      <v-flex xs12 md6 class="pa-1">
        <div class="grey--text subheading">Port status</div>
        <v-chip
          v-if="port.portStatus == 'UP'"
          color="success"
          @click="changePortStatus(port.id)"
        >{{port.portStatus}}</v-chip>
        <v-chip
          v-if="port.portStatus == 'DOWN'"
          color="error"
          @click="changePortStatus(port.id)"
        >{{port.portStatus}}</v-chip>
      </v-flex>

      <v-flex xs12 md6 lg2 class="pa-1">
        <UpdatePortDialog
          :deviceId="deviceId"
          :deviceType="deviceType"
          :portId="port.id"
          :port="port"
        />
      </v-flex>

      <v-flex xs12 md6 lg2 class="pa-1">
        <v-btn @click="deletePort(deviceId, port.id)" @click.native.stop flat>DELETE</v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import UpdatePortDialog from "@/components/addForms/UpdatePortDialog.vue";

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
  computed: {
    ...mapGetters({
      getNameByType: "getNameByType",
      getUrlByType: "getUrlByType"
    })
  },
  methods: {
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
