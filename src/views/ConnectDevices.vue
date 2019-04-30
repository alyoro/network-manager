<template>
  <div class="connect">
    <h1 class="subheading">Connect Devices</h1>

    <v-container class="my-5">
      <v-card flat xs12 md4 lg3 class="pa-3">
        <h1 class="title primary--text">Connections to {{direction}}</h1>

        <v-card v-for="item in getDevicesConnected" :key="item.id">
          <div v-if="item.deviceType === 'PatchPanel'">
            <PatchPanelConnection :item="item" />
          </div>

          <div v-if="item.deviceType === 'RoomSocket'"></div>

          <div v-if="item.deviceType === 'Switch'">
            <SwitchConnection :item="item" />
          </div>

          <div v-if="item.deviceType === 'Server'"></div>

          <div v-if="item.deviceType === 'Printer'"></div>

          <div v-if="item.deviceType === 'AccessPoint'">
            <AccessPointConnection :item="item" />
          </div>

          <div v-if="item.deviceType === 'IPPhone'"></div>
        </v-card>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PatchPanelConnection from "@/components/connectionDevices/PatchPanelConnection.vue";
// import RoomSocketConnection from "@/components/connectionDevices/RoomSocketConnection.vue";
import SwitchConnection from "@/components/connectionDevices/SwitchConnection.vue";
import AccessPointConnection from '@/components/connectionDevices/AccessPointConnection.vue';

export default {
  components: {
    PatchPanelConnection,
    // RoomSocketSearchInfo,
    SwitchConnection,
    AccessPointConnection
  },
  props: ["direction"],

  computed: {
    ...mapGetters({
      getDevice: "moduleConnections/getDevice",
      getDeviceConnected: "moduleConnections/getDeviceConnected"
    })
  }
};
</script>

<style>
</style>
