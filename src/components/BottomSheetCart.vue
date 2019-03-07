<template>
  <div class="text-xs-center">
    <v-bottom-sheet v-model="sheet">
      <v-btn flat grey slot="activator">Devices to Connect</v-btn>

      <DisplayDeviceListActions :items="getDeviceList">
        <v-subheader>Devices
          <v-spacer></v-spacer>
          <v-btn flat @click="clear">Clear list</v-btn>
          <v-btn icon ripple @click="sheet = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-subheader>
      </DisplayDeviceListActions>
    </v-bottom-sheet>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import DisplayDeviceListActions from "@/components/displayInfo/DisplayDeviceListActions.vue";
export default {
  components: {
    DisplayDeviceListActions
  },
  data() {
    return {
      sheet: false
    };
  },
  computed: {
    ...mapGetters({
      getDeviceList: "moduleConnectionsToMakeCart/getDeviceList"
    })
  },
  methods: {
    clear() {
      this.$store.commit("moduleConnectionsToMakeCart/clearDeviceList");
    },
    deleteFromList(item) {
      this.$store.commit("moduleConnectionsToMakeCart/deleteOneItem", item);
    },
    setMaster(item) {
      this.$store.commit("moduleConnectionsToMakeCart/setMaster", item);
    }
  }
};
</script>

<style>
</style>
