<template>
  <div class="pa-4">
    <v-form v-model="valid">
      <v-text-field v-model="deviceInfo.identifier" label="Identifier" required></v-text-field>

      <v-text-field v-model="deviceInfo.localization" label="Localization" required></v-text-field>

      <v-text-field v-model="deviceInfo.dateOfPurchase" label="Date of purchase" required></v-text-field>

      <v-text-field v-model="deviceInfo.managementIP" label="Managment IP" required></v-text-field>

      <v-text-field
        v-model="deviceInfo.numberOfPorts"
        label="Number of Ports"
        required
        type="number"
      ></v-text-field>

      <v-btn color="primary" @click="saveToStore()">Save changes</v-btn>
    </v-form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    deviceType: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      valid: false,
      deviceInfo: {
        type: this.deviceType,
        identifier: "",
        localization: "",
        dateOfPurchase: "",
        managementIP: "",
        numberOfPorts: 0
      }
    };
  },

  methods: {
    saveToStore() {
      this.$store.commit("moduleAdding/saveDeviceInfo", this.deviceInfo);
    }
  }
};
</script>

<style>
</style>
