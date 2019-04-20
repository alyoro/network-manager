f<template>
  <v-card flat xl2>
    <v-layout column class="layout">
      <v-flex class="item titleText">
        <h1 class="title primary--text">{{getNameByType(deviceType)}}</h1>
      </v-flex>
      <v-flex xs12 md6 class="item">
        <div class="grey--text subheading">Localization</div>
        <div>{{getDeviceInfo(deviceType).localization}}</div>
      </v-flex>

      <v-flex xs12 md6 class="item">
        <div class="grey--text subheading">IP Address</div>
        <div>{{getDeviceInfo(deviceType).ip}}</div>
      </v-flex>

      <v-flex xs12 md6 class="item">
        <div class="grey--text subheading">Number of Ports</div>
        <div>{{getDeviceInfo(deviceType).numberOfPorts}}</div>
      </v-flex>
    </v-layout>

    <v-btn color="primary" @click="sendDataToServer">Save in Database</v-btn>
  </v-card>
</template>

<script>
import infoToSendMixin from "@/mixins/infoToSendMixin";

export default {
  mixins: [infoToSendMixin]
};
</script>

<style>
</style>
