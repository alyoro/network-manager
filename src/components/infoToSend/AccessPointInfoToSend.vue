f<template>
  <v-card flat xl2>
    <v-layout column class="pa-2">
      <v-flex xs12 md6 class="pa-2">
        <div class="grey--text subheading">Localization</div>
        <div>{{getDeviceInfo(deviceType).localization}}</div>
      </v-flex>

      <v-flex xs12 md6 class="pa-2">
        <div class="grey--text subheading">IP Address</div>
        <div>{{getDeviceInfo(deviceType).ip}}</div>
      </v-flex>

      <v-flex xs12 md6 class="pa-2">
        <div class="grey--text subheading">Number of Ports</div>
        <div>{{getDeviceInfo(deviceType).numberOfPorts}}</div>
      </v-flex>
    </v-layout>

    <v-btn @click="sendDataToServer">Save in Database</v-btn>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    deviceType: {
      type: String,
      required: true
    }
  },

  computed: {
    ...mapGetters({
      getDeviceInfo: "moduleAdding/getDeviceInfo",
      getUrlByType: "getUrlByType"
    })
  },
  methods: {
    sendDataToServer() {
      this.$store.dispatch("moduleAdding/sendDataToServer", {
        type: this.deviceType
      });
    }
  }
};
</script>

<style>
</style>
