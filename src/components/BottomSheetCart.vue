<template>
  <div class="text-xs-center">
    <v-bottom-sheet v-model="sheet">
      <v-btn flat grey slot="activator">Devices to Connect</v-btn>

      <v-list three-line>
        <v-subheader>Devices
            <v-spacer></v-spacer>
          <v-btn flat @click="clear">Clear list</v-btn>
        </v-subheader>
        <v-list-tile v-for="item in getDeviceList" :key="item.device.id" @click="sheet = sheet">
            <v-list-tile-content v-if="item.deviceType === 'PATCH_PANEL'">
                    <v-container>
                        <v-list-tile-title class="primary--text title">Patch Panel</v-list-tile-title>
                        <DisplayInfoPatchPanel :item="item.device"/>
                    </v-container>
            </v-list-tile-content>
            <v-list-tile-action>
                <v-btn icon ripple @click="deleteFromCart(item)">
                    <v-icon>remove_circle_outline</v-icon>
                </v-btn>
            </v-list-tile-action>
        </v-list-tile>

      </v-list>
    </v-bottom-sheet>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import DisplayInfoPatchPanel from "@/components/displayInfo/DisplayInfoPatchPanel.vue";

export default {
  components: {
    DisplayInfoPatchPanel
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
      this.sheet = false;
      this.$store.commit("moduleConnectionsToMakeCart/clearDeviceList");
    },
    deleteFromCart(item) {
        this.$store.commit("moduleConnectionsToMakeCart/deleteOneItem",item);
    }
  }
};
</script>

<style>
</style>
