<template>
  <v-dialog v-model="dialog" max-width="1600px">
    <template v-slot:activator="{ on }">
      <v-list-tile v-on="on" v-if="port.connections" @click="showConnectedDevice(port)">
        <v-list-tile-title>Show Connected Device</v-list-tile-title>
      </v-list-tile>
    </template>
    <v-card color="white" hide-overlay>
      <v-toolbar dark color="primary">
        <v-toolbar-title>Connected Device</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon dark @click="dialog = false">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>

      <div v-if="getDeviceConnected.deviceType === 'PatchPanel'">
        <PatchPanelConnected :item="getDeviceConnected"/>
      </div>

      <div v-if="getDeviceConnected.deviceType === 'Switch'">
        <SwitchConnected :item="getDeviceConnected"/>
      </div>

      <div v-if="getDeviceConnected.deviceType === 'Server'">
        <ServerConnected :item="getDeviceConnected"/>
      </div>

      <div v-if="getDeviceConnected.deviceType === 'AccessPoint'">
        <AccessPointConnected :item="getDeviceConnected"/>
      </div>

      <div v-if="getDeviceConnected.deviceType === 'AccessPoint'">
        <PrinterConnected :item="getDeviceConnected"/>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import PatchPanelConnected from "@/components/connectedDevices/PatchPanelConnected.vue";
import SwitchConnected from "@/components/connectedDevices/SwitchConnected.vue";
import ServerConnected from "@/components/connectedDevices/ServerConnected.vue";
import AccessPointConnected from "@/components/connectedDevices/AccessPointConnected.vue";
import PrinterConnected from "@/components/connectedDevices/PrinterConnected.vue";

export default {
  components: {
    PatchPanelConnected,
    SwitchConnected,
    AccessPointConnected,
    PrinterConnected
  },
  props: ["port"],
  data() {
    return {
      dialog: false
    };
  },

  computed: {
    ...mapGetters({
      getUrlByType: "getUrlByType",
      getDeviceConnected: "moduleConnections/getDeviceConnected"
    })
  },
  methods: {
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
