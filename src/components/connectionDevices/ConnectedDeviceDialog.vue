<template>
  <v-dialog v-model="dialog" max-width="1600px">
    <template v-slot:activator="{ on }">
      <v-list-tile v-on="on" v-if="port.connections" @click="showConnectedDevice(port)">
        <v-list-tile-title>Show Connected Device</v-list-tile-title>
      </v-list-tile>
    </template>
    <v-card color="white" hide-overlay>{{getDeviceConnected}}</v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import _ from "lodash";

export default {
  props: ["port"],
  data() {
    return {
      dialog: false
    };
  },

  computed: {
    ...mapGetters({
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
    },

    myDialogClose() {
      this.connectedDeviceDialog = false;
    }
  }
};
</script>

<style>
</style>
