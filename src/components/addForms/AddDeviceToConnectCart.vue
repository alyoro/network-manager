<template>
  <v-btn flat grey @click="addToCart" @click.native.stop>Add to Cart</v-btn>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: {
    device: null,
    deviceType: null
  },
  computed: {
    ...mapGetters({
      getDeviceById: "moduleConnectionsToMakeCart/getDeviceById"
    })
  },

  methods: {
    addToCart() {
      const payload = {
        device: this.device,
        deviceType: this.deviceType,
        deviceMaster: false,
        deviceSlave: false
      };
      if(this.getDeviceById(payload.device.id).length < 1){
        this.$store.commit("moduleConnectionsToMakeCart/addNewDevice", payload);
      }
    }
  }
};
</script>

<style>
</style>
