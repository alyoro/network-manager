<template>
  <div class="add">
    <v-container class="my-5">
      <PortSpeedList/>
      <VlanNamesList/>
    </v-container>
  </div>
</template>

<script>
import PortSpeedList from "@/components/settings/PortSpeedList.vue";
import VlanNamesList from "@/components/settings/VlanNamesList.vue";
export default {
  components: {
    PortSpeedList,
    VlanNamesList
  }
};
</script>

<style>
</style>
