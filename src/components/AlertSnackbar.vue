<template>
  <v-snackbar v-model="snackbar" :timeout="timeout" :color="color" top>
    {{ message }}
    <v-btn flat @click="snackbar = false">Close</v-btn>
  </v-snackbar>
</template>

<script>
import { EventBus } from "@/main";

export default {
  data() {
    return {
      snackbar: false,
      timeout: 6000,
      message: "",
      color: "info"
    };
  },
  created() {
    EventBus.$on("snackbar-alert", payload => {
      this.message = payload.message;
      this.color = payload.color;
      this.snackbar = true;
    });
  }
};
</script>

<style>
</style>
