<template>
  <v-container>
    <v-flex
      lg12
      class="text-md-center align-center title primary--text"
    >{{getNameByType(item.deviceType)}}</v-flex>

    <v-subheader class="pa-0 text-md-center align-center">
      <v-flex xs12 md6>Localization</v-flex>
      <v-flex xs12 md6>IP Address</v-flex>
      <v-flex xs12 md6>Number of Ports</v-flex>
    </v-subheader>

    <v-layout row class="text-md-center align-center">
      <v-flex xs12 md6>
        <div>{{item.localization}}</div>
      </v-flex>

      <v-flex xs12 md6>
        <div>{{item.ip}}</div>
      </v-flex>

      <v-flex xs12 md6>
        <div>{{item.numberOfPorts}}</div>
      </v-flex>
    </v-layout>

    <PortsConnectedDevice :ports="item.ports" :device="item" :deviceType="item.deviceType"/>
  </v-container>
</template>

<script>
import PortsConnectedDevice from "@/components/connectedDevices/PortsConnectedDevice.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    PortsConnectedDevice
  },
  props: ["item"],
  computed: {
    ...mapGetters({
      getNameByType: "getNameByType"
    })
  }
};
</script>

<style>
</style>

