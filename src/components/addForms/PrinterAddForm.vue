<template>
  <v-layout column class="layout">
    <v-flex class="item titleText">
      <h1 class="title primary--text">{{getNameByType(deviceType)}}</h1>
    </v-flex>
    <v-form v-model="valid" class="item">
      <v-text-field v-model="deviceInfo.localization" label="Localization" required></v-text-field>

      <v-text-field v-model="deviceInfo.ip" label="Ip Address" required></v-text-field>

      <v-text-field
        v-model="deviceInfo.numberOfPorts"
        label="Number of Ports"
        type="number"
        required
      ></v-text-field>

      <v-btn color="primary" @click="saveToStore()">Save locally</v-btn>
    </v-form>
  </v-layout>
</template>

<script>
import addFormMixin from "@/mixins/addFormMixin";

export default {
  mixins: [addFormMixin],

  data() {
    return {
      valid: false,
      deviceInfo: {
        type: this.deviceType,
        localization: "",
        ip: "",
        numberOfPorts: 0
      }
    };
  }
};
</script>

<style>
</style>
