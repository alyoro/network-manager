<template>
  <div class="add">
    <v-container class="my-5">
      <PortSpeedList/>
      <VlanNamesList/>
    </v-container>
    <CheckLogin/>
  </div>
</template>

<script>
import PortSpeedList from "@/components/settings/PortSpeedList.vue";
import VlanNamesList from "@/components/settings/VlanNamesList.vue";
import CheckLogin from '@/components/CheckLogin.vue'

export default {
  components: {
    PortSpeedList,
    VlanNamesList,
    CheckLogin
  }
};
</script>

<style>
</style>
