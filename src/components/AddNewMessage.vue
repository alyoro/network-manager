<template>
  <v-card flat :class="color+`--text`">{{message}}</v-card>
</template>

<script>
import { EventBus } from "@/main";

export default {
  data() {
    return {
      message: "",
      color: "info"
    };
  },
  methods: {
    clearMessage() {}
  },
  created() {
    EventBus.$on("snackbar-alert", payload => {
      this.message = payload.message;
      this.color = payload.color;
    });
  },
  updated() {
    EventBus.$on("clear-addMessage", payload => {
      this.message = "";
    });
  }
};
</script>

<style>
</style>

