<template>
  <v-list-tile-content>
    <v-container v-if="item.deviceType === 'PATCH_PANEL'">
      <v-list-tile-title class="primary--text title">Patch Panel</v-list-tile-title>
      <DisplayInfoPatchPanel :item="item.device"/>
    </v-container>

    <v-container v-if="item.deviceType === 'ROOM_SOCKET'">
      <v-list-tile-title class="primary--text title">Room Socket</v-list-tile-title>
      <DisplayInfoPatchPanel :item="item.device"/>
    </v-container>

    <v-container v-if="item.deviceType === 'SWITCH'">
      <v-list-tile-title class="primary--text title">Switch</v-list-tile-title>
      <DisplayInfoPatchPanel :item="item.device"/>
    </v-container>

    <v-container v-if="item.deviceType === 'ROUTER'">
      <v-list-tile-title class="primary--text title">Router</v-list-tile-title>
      <DisplayInfoPatchPanel :item="item.device"/>
    </v-container>

    <v-container v-if="item.deviceType === 'SERVER'">
      <v-list-tile-title class="primary--text title">Server</v-list-tile-title>
      <DisplayInfoPatchPanel :item="item.device"/>
    </v-container>

    <v-container v-if="item.deviceType === 'PRINTER'">
      <v-list-tile-title class="primary--text title">Printer</v-list-tile-title>
      <DisplayInfoPatchPanel :item="item.device"/>
    </v-container>

    <v-container v-if="item.deviceType === 'ACCESS_POINT'">
      <v-list-tile-title class="primary--text title">Access Point</v-list-tile-title>
      <DisplayInfoPatchPanel :item="item.device"/>
    </v-container>

    <v-container v-if="item.deviceType === 'IP_PHONE'">
      <v-list-tile-title class="primary--text title">IP Phone</v-list-tile-title>
      <DisplayInfoPatchPanel :item="item.device"/>
    </v-container>
  </v-list-tile-content>
</template>

<script>
import DisplayInfoPatchPanel from "@/components/displayInfo/DisplayInfoPatchPanel.vue";

export default {
  props: ["item"],
  components: {
    DisplayInfoPatchPanel
  }
};
</script>

<style>
</style>
