<template>
  <div class="add">
    <v-container class="my-5">
      <PortSpeedList/>
    </v-container>
  </div>
</template>

<script>
import PortSpeedList from "@/components/settings/PortSpeedList.vue";

export default {
  components: {
    PortSpeedList
  }
};
</script>

<style>
</style>
