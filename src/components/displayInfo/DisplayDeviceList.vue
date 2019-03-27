<template>
  <v-list-tile-content>
    <v-container v-if="item.deviceType === 'PatchPanel'">
      <v-list-tile-title class="primary--text title">Patch Panel</v-list-tile-title>
      <DisplayInfoPatchPanel :item="item.device"/>
    </v-container>

    <v-container v-if="item.deviceType === 'RoomSocket'">
      <v-list-tile-title class="primary--text title">Room Socket</v-list-tile-title>

    </v-container>

    <v-container v-if="item.deviceType === 'Switch'">
      <v-list-tile-title class="primary--text title">Switch</v-list-tile-title>
        <DisplayInfoSwitch :item="item.device"/>
    </v-container>

    <v-container v-if="item.deviceType === 'Router'">
      <v-list-tile-title class="primary--text title">Router</v-list-tile-title>

    </v-container>

    <v-container v-if="item.deviceType === 'Server'">
      <v-list-tile-title class="primary--text title">Server</v-list-tile-title>

    </v-container>

    <v-container v-if="item.deviceType === 'Printer'">
      <v-list-tile-title class="primary--text title">Printer</v-list-tile-title>

    </v-container>

    <v-container v-if="item.deviceType === 'AccessPoint'">
      <v-list-tile-title class="primary--text title">Access Point</v-list-tile-title>

    </v-container>

    <v-container v-if="item.deviceType === 'IPPhone'">
      <v-list-tile-title class="primary--text title">IP Phone</v-list-tile-title>

    </v-container>
  </v-list-tile-content>
</template>

<script>
import DisplayInfoPatchPanel from "@/components/displayInfo/DisplayInfoPatchPanel.vue";
import DisplayInfoSwitch from "@/components/displayInfo/DisplayInfoSwitch.vue";

export default {
  props: ["item"],
  components: {
    DisplayInfoPatchPanel,
    DisplayInfoSwitch
  }
};
</script>

<style>
</style>
