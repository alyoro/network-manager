<template>
  <v-dialog v-model="dialog" max-width="1600px" height="500px">
    <template v-slot:activator="{ on }">
      <v-list-tile
        v-on="on"
        v-if="port.connections === null"
        @click="makeConnections(portSlave, 'PatchPanel')"
      >
        <v-list-tile-title>Make connection to Patch Panel</v-list-tile-title>
      </v-list-tile>
      <v-list-tile
        v-on="on"
        v-if="port.connections === null"
        @click="makeConnections(portSlave, 'Switch')"
      >
        <v-list-tile-title>Make connection to Switch</v-list-tile-title>
      </v-list-tile>
    </template>
    <v-card color="white" hide-overlay>
      <v-toolbar dark color="primary">
        <v-toolbar-title>Connecting to Device</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon dark @click="dialog = false">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>

      <div v-if="deviceType === 'PatchPanel'">
        <PatchPanelConnecting :portSlave="portSlave" :deviceType="deviceType"/>
      </div>

      <div v-if="deviceType === 'Switch'">
        <!-- <SwitchConnecting :item="getDeviceConnected"/> -->
        Switch
      </div>
      <!--
      <div v-if="deviceType === 'Server'">
        <ServerConnecting :item="getDeviceConnected"/>
      </div>

      <div v-if="deviceType === 'AccessPoint'">
        <AccessPointConnecting :item="getDeviceConnected"/>
      </div>

      <div v-if="deviceType === 'AccessPoint'">
        <PrinterConnecting :item="getDeviceConnected"/>
      </div>-->
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import PatchPanelConnecting from "@/components/connectingDevices/PatchPanelConnecting.vue";
// import SwitchConnected from "@/components/connectingDevices/SwitchConnected.vue";
// import ServerConnected from "@/components/connectingDevices/ServerConnected.vue";
// import AccessPointConnected from "@/components/connectingDevices/AccessPointConnected.vue";
// import PrinterConnected from "@/components/connectingDevices/PrinterConnected.vue";

export default {
  components: {
    PatchPanelConnecting
    // SwitchConnected,
    // AccessPointConnected,
    // PrinterConnected
  },
  props: ["port"],
  data() {
    return {
      dialog: false,
      deviceType: null,
    };
  },

  computed: {
    portSlave() {
      if(true){
        this.port
      }
      return this.port
    },
    ...mapGetters({
      getUrlByType: "getUrlByType",
      getDeviceConnected: "moduleConnections/getDeviceConnected"
    })
  },
  methods: {
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
      this.deviceType = deviceType;
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
    }
  }
};
</script>

<style>
</style>
