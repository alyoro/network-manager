<template>
  <div class="connect">
    <v-card>
      <v-card-title class="primary white--text title">Master Device</v-card-title>
      <v-card-text>
        <DisplayDeviceListActions :items="getMaster" />
      </v-card-text>
    </v-card>

    <v-card>
      <v-card-title class="primary white--text title">Slave Device</v-card-title>
      <v-card-text>
        <DisplayDeviceListActions :items="getSlave" />
      </v-card-text>
    </v-card>

    <v-card>
      <v-card-title class="secondary white--text title">All Devices</v-card-title>
      <v-card-text>
        <DisplayDeviceListActions :items="getDeviceList" />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import DisplayDeviceListActions from "@/components/displayInfo/DisplayDeviceListActions.vue";

export default {
  components: {
    DisplayDeviceListActions
  },
  computed: {
    ...mapGetters({
      getDeviceList: "moduleConnectionsToMakeCart/getDeviceList",
      getMaster: "moduleConnectionsToMakeCart/getMaster",
      getSlave: "moduleConnectionsToMakeCart/getSlave"
    })
  }
};
</script>

<style>
</style>
