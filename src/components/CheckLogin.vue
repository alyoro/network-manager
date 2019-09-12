<template>
  <div v-show="false">{{isExpired}}</div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      isExpired: "moduleAuthentication/isExpired"
    })
  },
  created() {
    this.$store.dispatch("moduleAuthentication/checkExpiration")
  }
};
</script>

<style>
</style>
