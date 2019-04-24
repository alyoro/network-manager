<template>
  <div class="connect">
    <h1 class="subheading">Connecting Devices</h1>
    <v-container>
      <v-layout>
        <v-card>
          <div v-if="deviceType === 'PatchPanel'">
            <PatchPanelConnectingDevice :deviceType="deviceType" :name="getUrlByType(deviceType)" :portSlave="portSlave"/>
          </div>

          <div v-if="deviceType === 'Switch'">
            <SwitchConnectingDevice :deviceType="deviceType" :name="getUrlByType(deviceType)" :portSlave="portSlave"/>
          </div>
        </v-card>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import PatchPanelConnectingDevice from "@/components/connectionDevices/PatchPanelConnectingDevice.vue";
import SwitchConnectingDevice from "@/components/connectionDevices/SwitchConnectingDevice.vue";

export default {
  components: {
    PatchPanelConnectingDevice,
    SwitchConnectingDevice
  },
  props: {
    type: {
      default: "None"
    },
    portSlave: {
      type: Object
    }
  },
  data() {
    return {
      deviceType: this.type
    };
  },
  computed: {
    ...mapGetters({
      getData: "moduleData/getData",
      getUrlByType: "getUrlByType"
    })
  }
};
</script>

<style>
</style>
