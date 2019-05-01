<template>
  <v-container>
    <v-flex
      lg12
      class="text-md-center align-center title primary--text"
    >{{getNameByType(deviceType)}}</v-flex>

    <v-subheader class="pa-0 text-md-center align-center">
      <v-flex xs12 md6>Identifier</v-flex>
      <v-flex xs12 md6>Localization</v-flex>
      <v-flex xs12 md6>Date of purchase</v-flex>
      <v-flex xs12 md6>Managment IP</v-flex>
      <v-flex xs12 md6>Number of Ports</v-flex>
      <v-flex xs12 md6>Show Ports</v-flex>
    </v-subheader>
    <v-list flat v-for="(item, index) in devices" :key="index">
      <v-divider></v-divider>
      <v-layout row class="text-md-center align-center">
        <v-flex xs12 md6>
          <div>{{item.identifier}}</div>
        </v-flex>

        <v-flex xs12 md6>
          <div>{{item.localization}}</div>
        </v-flex>

        <v-flex xs12 md6>
          <div>{{item.dateOfPurchase}}</div>
        </v-flex>

        <v-flex xs12 md6>
          <div>{{item.managementIP}}</div>
        </v-flex>

        <v-flex xs12 md6>
          <div>{{item.numberOfPorts}}</div>
        </v-flex>

        <v-flex xs12 md6>
          <v-btn flat @click="changeVisiblility(index)">Show Ports</v-btn>
        </v-flex>
      </v-layout>
      <div v-if="visible[index]">
        <PortsConnectingDevices :ports="item.ports" :portSlave="portSlave"/>
      </div>
    </v-list>
  </v-container>
</template>

<script>
import connectingMixin from "@/mixins/connectingMixin";

export default {
  mixins: [connectingMixin]
};
</script>

<style>
</style>
