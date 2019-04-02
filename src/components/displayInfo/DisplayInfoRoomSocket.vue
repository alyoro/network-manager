<template>
  <div>
    <v-layout row justify-center class="ma-1">
            <v-flex xs12 md6 class="pa-2">
        <div class="grey--text subheading">Building</div>
        <div>{{getDeviceInfo(deviceType).building}}</div>
      </v-flex>

      <v-flex xs12 md6 class="pa-2">
        <div class="grey--text subheading">Room</div>
        <div>{{getDeviceInfo(deviceType).room}}</div>
      </v-flex>

      <v-flex xs12 md6 class="pa-2">
        <div class="grey--text subheading">Identifier</div>
        <div>{{getDeviceInfo(deviceType).identifier}}</div>
      </v-flex>

      <v-flex xs12 md6 class="pa-2">
        <div class="grey--text subheading">Description</div>
        <div>{{getDeviceInfo(deviceType).description}}</div>
      </v-flex>

      <v-flex xs12 md6 class="pa-1">
        <div class="grey--text subheading">Number of Ports</div>
        <div>{{item.numberOfPorts}}</div>
      </v-flex>
      <v-flex>
        <slot></slot>
      </v-flex>
    </v-layout>

    <div v-if="extend && item.ports !== null">
      <v-divider></v-divider>
      <v-layout v-for="port in item.ports" :key="port.id">
        <v-flex>
          <div class="grey--text subheading">Port Number</div>
          <div>{{port.portNumber}}</div>
        </v-flex>
        <v-flex>
          <div class="grey--text subheading">Device Plugged</div>
          <div>{{port.devicePlugged}}</div>
        </v-flex>
        <v-flex>
          <div class="grey--text subheading">Port on the upper Element</div>
          <div>{{port.portOnTheUpperElement}}</div>
        </v-flex>
        <v-flex>
          <div class="grey--text subheading">Connection</div>
          <v-chip v-if="port.connections !== null" color="error">Occupied</v-chip>
          <v-chip v-if="port.connections === null" color="success ">Free</v-chip>
        </v-flex>
        <v-flex xs4 md2 lg1 v-if="masterBtn">
          <div class="grey--text subheading">Master port</div>
          <v-btn icon ripple @click="setPortMaster(port)">
            <v-icon v-if="port.id === getPortMaster.id">add_circle</v-icon>
            <v-icon v-if="port.id !== getPortMaster.id">add_circle_outline</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs4 md2 lg1 v-if="!masterBtn">
          <div class="grey--text subheading">Slave port</div>
          <v-btn icon ripple @click="setPortSlave(port)">
            <v-icon v-if="port.id === getPortSlave.id">add_circle</v-icon>
            <v-icon v-if="port.id !== getPortSlave.id">add_circle_outline</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: ["item", "extend", "masterBtn"],
  computed: {
    ...mapGetters({
      getPortMaster: "moduleConnectionsToMakeCart/getPortMaster",
      getPortSlave: "moduleConnectionsToMakeCart/getPortSlave"
    })
  },
  methods: {
    setPortMaster(item) {
      this.$store.commit("moduleConnectionsToMakeCart/setPortMaster", item);
    },
    setPortSlave(item) {
      this.$store.commit("moduleConnectionsToMakeCart/setPortSlave", item);
    }
  }
};
</script>

<style>
</style>
