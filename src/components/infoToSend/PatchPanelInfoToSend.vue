<template>
  <v-card flat xl2>
    <v-layout column class="layout">
      <v-flex class="item titleText">
        <h1 class="title primary--text">{{getNameByType(deviceType)}}</h1>
      </v-flex>
      <v-flex xs12 md6 class="item">
        <div class="grey--text subheading">Building</div>
        <div>{{getDeviceInfo(deviceType).building}}</div>
      </v-flex>

      <v-flex xs12 md6 class="item">
        <div class="grey--text subheading">Room</div>
        <div>{{getDeviceInfo(deviceType).room}}</div>
      </v-flex>

      <v-flex xs12 md6 class="item">
        <div class="grey--text subheading">Identifier</div>
        <div>{{getDeviceInfo(deviceType).identifier}}</div>
      </v-flex>

      <v-flex xs12 md6 class="item">
        <div class="grey--text subheading">Localization</div>
        <div>{{getDeviceInfo(deviceType).localization}}</div>
      </v-flex>

      <v-flex xs12 md6 class="item">
        <div class="grey--text subheading">Description</div>
        <div>{{getDeviceInfo(deviceType).description}}</div>
      </v-flex>

      <v-flex xs12 md6 class="item">
        <div class="grey--text subheading">Number of Ports</div>
        <div>{{getDeviceInfo(deviceType).numberOfPorts}}</div>
      </v-flex>
    </v-layout>

    <v-btn @click="sendDataToServer">Save in Database</v-btn>
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
