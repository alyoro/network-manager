<template>
  <div class="connect">
    <v-container >
      <v-layout justify-center>
        <v-flex class="text-xs-center">
          <v-btn class="primary" @click="makeConnection">Make Connection</v-btn>
        </v-flex>
      </v-layout>
    </v-container>

    <v-card>
      <v-card-title class="primary white--text title">Master Device</v-card-title>
      <v-card-text>
        <DisplayOneDevice :items="getMaster" :extend="true" :masterBtn="true"/>
      </v-card-text>
    </v-card>

    <v-card>
      <v-card-title class="primary white--text title">Slave Device</v-card-title>
      <v-card-text>
        <DisplayOneDevice :items="getSlave" :extend="true" :mastemasterBtnrBtn="false"/>
      </v-card-text>
    </v-card>

    <v-card>
      <v-card-title class="secondary white--text title">All Devices</v-card-title>
      <v-card-text>
        <DisplayDeviceListActions :items="getDeviceList"/>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import DisplayOneDevice from "@/components/displayInfo/DisplayOneDevice.vue";
import DisplayDeviceListActions from "@/components/displayInfo/DisplayDeviceListActions.vue";

export default {
  components: {
    DisplayOneDevice,
    DisplayDeviceListActions
  },
  computed: {
    ...mapGetters({
      getDeviceList: "moduleConnectionsToMakeCart/getDeviceList",
      getMaster: "moduleConnectionsToMakeCart/getMaster",
      getSlave: "moduleConnectionsToMakeCart/getSlave"
    })
  },
  methods: {
    makeConnection() {
      this.$store.dispatch("moduleConnectionsToMakeCart/makeConnection")
    }
  }
};
</script>

<style>
</style>
