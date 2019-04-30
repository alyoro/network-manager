<template>
  <v-container>
    <v-expansion-panel>
      <v-expansion-panel-content flat xl2 v-for="item in getData(deviceType)" :key="item.id">
        <div slot="header">
          <v-layout row class="pa-1" align-content-space-around="left">
            <v-flex xs12 md6 lg1 class="pa-1">
              <div class="grey--text subheading">Building</div>
              <div>{{item.building}}</div>
            </v-flex>

            <v-flex xs12 md6 lg1 class="pa-1">
              <div class="grey--text subheading">Room</div>
              <div>{{item.room}}</div>
            </v-flex>

            <v-flex xs12 md6 class="pa-1">
              <div class="grey--text subheading">Identifier</div>
              <div>{{item.identifier}}</div>
            </v-flex>

            <v-flex xs12 md6 class="pa-1">
              <div class="grey--text subheading">Localization</div>
              <div>{{item.localization}}</div>
            </v-flex>

            <v-flex xs12 md6 class="pa-1">
              <div class="grey--text subheading">Description</div>
              <div>{{item.description}}</div>
            </v-flex>

            <v-flex xs12 md6 lg2 class="pa-1">
              <div class="grey--text subheading">Number of Ports</div>
              <div>{{item.numberOfPorts}}</div>
            </v-flex>

            <v-flex xs12 md6 lg2 class="pa-1">
              <AddPortDialog :deviceID="item.id" :deviceType="deviceType"/>
            </v-flex>

            <v-flex xs12 md6 lg2 class="pa-1">
              <v-btn @click="deleteDevice(item.id)" flat>DELETE</v-btn>
            </v-flex>
          </v-layout>
        </div>
        <PortsConnectedDevice :ports="item.ports" :deviceId="item.id" :deviceType="deviceType" :portSlave="portSlave"/>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-container>
</template>

<script>
import searchInfoMixin from "@/mixins/searchInfoMixin";

import PortsConnectedDevice from '@/components/connectedDevices/PortsConnectedDevice.vue';

export default {
  mixins: [searchInfoMixin],
  components: {
    PortsConnectedDevice
  },
  props: {
    portSlave: {
      type: Object
    }
  }
};
</script>

<style>
</style>
