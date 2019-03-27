<template>
  <v-btn flat grey @click="addToCart" @click.native.stop>Add Connection to Cart</v-btn>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    device: null,
    deviceType: null
  },
  methods: {
    addToCart() {
      const payload = {
        device: this.device,
        deviceType: this.deviceType,
        deviceMaster: false,
        deviceSlave: false
      };
      this.$store.commit("moduleConnectionsToMakeCart/addNewDevice", payload);
    }
  }
};
</script>

<style>
</style>
