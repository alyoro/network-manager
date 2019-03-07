<template>
  <v-list three-line>
      <slot></slot>
    <v-list-tile v-for="item in items" :key="item.device.id">
      <DisplayAllDevices :item="item"/>
      <v-list-tile-action>
        <v-container>
          <v-layout row wrap>
            <v-flex>
              <v-btn icon ripple @click="setMaster(item)">
                <v-icon v-if="item.deviceMaster">star</v-icon>
                <v-icon v-if="!item.deviceMaster">star_border</v-icon>
              </v-btn>
              <v-btn icon ripple @click="deleteFromList(item)">
                <v-icon>remove_circle_outline</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-list-tile-action>
    </v-list-tile>
  </v-list>
</template>

<script>
import DisplayAllDevices from "@/components/displayInfo/DisplayAllDevices.vue";

export default {
  props: ["items"],
    components: {
    DisplayAllDevices
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
