<template>
  <v-container>
    <v-subheader class="pa-0 text-md-center align-center">
      <v-flex xs12 md6>Identifier</v-flex>
      <v-flex xs12 md6>Building</v-flex>
      <v-flex xs12 md6>Room</v-flex>
      <v-flex xs12 md6>Localization</v-flex>
      <v-flex xs12 md6>Description</v-flex>
      <v-flex xs12 md6>Number of Ports</v-flex>
      <v-flex xs12 md6>Show Ports</v-flex>
      <v-flex xs12 md6>Add Ports</v-flex>
      <v-flex xs12 md6>Update Device</v-flex>
      <v-flex xs12 md6>Delete Device</v-flex>
      <v-flex xs12 md6>Download Report</v-flex>
    </v-subheader>

    <v-list flat v-for="(item, index) in filteredDevices" :key="index">
      <v-divider></v-divider>
      <v-layout row class="text-md-center align-center">
        <v-flex xs12 md6>
          <div>{{item.identifier}}</div>
        </v-flex>

        <v-flex xs12 md6>
          <div>{{item.building}}</div>
        </v-flex>

        <v-flex xs12 md6>
          <div>{{item.room}}</div>
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

        <v-flex xs12 md6>
          <PortsSearchInfo :ports="item.ports" :device="item" :deviceType="deviceType"/>
        </v-flex>

        <v-flex xs12 md6>
          <AddPortDialog :deviceID="item.id" :deviceType="deviceType"/>
        </v-flex>

        <v-flex xs12 md6>
          <UpdatePatchPanelDialog :device="item" :deviceType="deviceType"/>
        </v-flex>

        <v-flex xs12 md6>
          <v-btn @click="deleteDevice(item.id)" flat>DELETE</v-btn>
        </v-flex>

        <v-flex xs12 md6>
          <ReportDialog :deviceType="deviceType" :device="item">
            <div slot="button-text">Report</div>
            <div slot="dialog-title">Report for Switch</div>
          </ReportDialog>
        </v-flex>
      </v-layout>
    </v-list>
  </v-container>
</template>

<script>
import searchInfoMixin from "@/mixins/searchInfoMixin";
import UpdatePatchPanelDialog from "@/components/updateDevices/UpdatePatchPanelDialog.vue";

export default {
  mixins: [searchInfoMixin],
  components: { UpdatePatchPanelDialog}
};
</script>

<style>
</style>
