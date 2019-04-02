<template>
  <div class="pa-4">
    <v-form v-model="valid">
      <v-text-field v-model="deviceInfo.building" label="Building" required></v-text-field>

      <v-text-field v-model="deviceInfo.room" label="Room" required></v-text-field>

      <v-text-field v-model="deviceInfo.identifier" label="Identifier" required></v-text-field>

      <v-text-field v-model="deviceInfo.description" label="Description" required></v-text-field>

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
        building: "",
        room: "",
        identifier: "",
        description: "",
        numberOfPorts: 2
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
