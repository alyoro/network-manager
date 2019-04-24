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
        <v-btn
          v-if="port.connections === null"
          color="cyan accent-3"
          @click.native.stop
          @click="createConnection(port)"
        >Free</v-btn>
        <v-btn v-else color="pink accent-2" class="disable-events" @click.native.stop>Occupied</v-btn>
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
    },
    portSlave: {
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
    createConnection(port){
      var ports = []
      ports.push(port)
      ports.push(this.portSlave)
      this.$store.dispatch("moduleConnections/makeConnection", ports)
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
.disable-events {
  pointer-events: none;
}
</style>
