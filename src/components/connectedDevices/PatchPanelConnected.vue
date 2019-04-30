<template>
  <v-container>
    <v-flex lg12 class="text-md-center align-center title primary--text">{{getNameByType(item.deviceType)}}</v-flex>

    <v-subheader class="pa-0 text-md-center align-center">
      <v-flex xs12 md6>Building</v-flex>
      <v-flex xs12 md6>Room</v-flex>
      <v-flex xs12 md6>Identifier</v-flex>
      <v-flex xs12 md6>Localization</v-flex>
      <v-flex xs12 md6>Description</v-flex>
      <v-flex xs12 md6>Number of Ports</v-flex>
    </v-subheader>

    <v-layout row class="text-md-center align-center">
      <v-flex xs12 md6>
        <div>{{item.building}}</div>
      </v-flex>

      <v-flex xs12 md6>
        <div>{{item.room}}</div>
      </v-flex>

      <v-flex xs12 md6>
        <div>{{item.identifier}}</div>
      </v-flex>

      <v-flex xs12 md6>
        <div>{{item.localization}}</div>
      </v-flex>

      <v-flex xs12 md6>
        <div>{{item.description}}</div>
      </v-flex>

      <v-flex xs12 md6>
        <div>{{item.numberOfPorts}}</div>
      </v-flex>
    </v-layout>

    <PortsConnectedDevice :ports="item.ports" :deviceId="item.id" :deviceType="item.deviceType"/>

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
