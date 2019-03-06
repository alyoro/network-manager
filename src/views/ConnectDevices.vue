<template>
  <div class="connect">
    <v-card>
    <v-card-title class="primary white--text title">
      Master Device
    </v-card-title>
    <v-card-text>
      {{getMaster}}
    </v-card-text>
    </v-card>

    <v-card>
     <v-card-title class="secondary white--text title">
       Slave Devices
     </v-card-title>
     <v-card-text>
       <div v-for="item in getSlaves" :key="item.device.id">
         {{item}}
       </div>
     </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  components: {},
  data() {
    return {
      list: []
    };
  },

  computed: {
    ...mapGetters({
      getDeviceList: "moduleConnectionsToMakeCart/getDeviceList",
      getMaster: "moduleConnectionsToMakeCart/getMaster",
      getSlaves: "moduleConnectionsToMakeCart/getSlaves"
    })
  }
};
</script>

<style>
</style>
