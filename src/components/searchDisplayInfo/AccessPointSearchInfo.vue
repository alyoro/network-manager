<template>
  <v-container>
    <v-subheader class="pa-0 text-md-center align-center">
      <v-flex xs12 md6>Identifier</v-flex>
      <v-flex xs12 md6>Localization</v-flex>
      <v-flex xs12 md6>Ip Address</v-flex>
      <v-flex xs12 md6>Number of Ports</v-flex>
      <v-flex xs12 md6>Show Ports</v-flex>
      <v-flex xs12 md6>Add Port</v-flex>
      <v-flex xs12 md6>Update Device</v-flex>
      <v-flex xs12 md6>Delete Device</v-flex>
    </v-subheader>

    <v-list flat v-for="item in getData(deviceType)" :key="item.id">
      <v-divider></v-divider>
      <v-layout row class="text-md-center align-center">
        <v-flex xs12 md6>
          <div>{{item.identifier}}</div>
        </v-flex>

        <v-flex xs12 md6>
          <div>{{item.localization}}</div>
        </v-flex>

        <v-flex xs12 md6>
          <div>{{item.ip}}</div>
        </v-flex>

        <v-flex xs12 md6>
          <div>{{item.numberOfPorts}}</div>
        </v-flex>

        <v-flex xs12 md6>
          <PortsSearchInfo :ports="item.ports" :deviceId="item.id" :deviceType="deviceType"/>
        </v-flex>

        <v-flex xs12 md6>
          <AddPortDialog :deviceID="item.id" :deviceType="deviceType"/>
        </v-flex>

        <v-flex xs12 md6>
          <UpdateAccessPointDialog :device="item" :deviceType="deviceType"/>
        </v-flex>

        <v-flex xs12 md6>
          <v-btn @click="deleteDevice(item.id)" flat>DELETE</v-btn>
        </v-flex>
      </v-layout>
    </v-list>
  </v-container>
</template>

<script>
import searchInfoMixin from "@/mixins/searchInfoMixin";
import UpdateAccessPointDialog from "@/components/updateDevices/UpdateAccessPointDialog.vue";

export default {
  mixins: [searchInfoMixin],
  components: {
    UpdateAccessPointDialog
  }
};
</script>

<style>
</style>
