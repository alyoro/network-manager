<template>
  <v-layout column justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-btn flat slot="activator">UPDATE</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">Update Port</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-layout wrap>
              <v-flex xs12 lg6 class="pa-1">
                <v-text-field label="Port Number" required v-model="port.portNumber"></v-text-field>
              </v-flex>

              <v-flex xs12 lg6 class="pa-1">
                <v-text-field label="Port Speed" required v-model="port.portSpeed"></v-text-field>
              </v-flex>

              <v-flex xs12 lg6 class="pa-1">
                <v-select
                  label="Port Type"
                  v-model="portType"
                  item-text="name"
                  item-value="value"
                  :items="portTypes"
                ></v-select>
              </v-flex>

              <v-flex xs12 lg6 v-if="portType == 'logical'">
                <v-combobox
                  label="Insert Vlans"
                  v-model="vlanType"
                  :items="vlans"
                  chips
                  multiple
                  persistent-hint
                  hide-selected
                ></v-combobox>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="updatePort">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    deviceId: null,
    deviceType: null,
    portId: null,
    port: {
      portNumber: null,
      portOnTheUpperElement: null,
      devicePlugged: null
    }
  },

  data() {
    return {
      dialog: false,
      portType: "physical",
      vlanType: [],
      portTypes: [
        { name: "Physical", value: "physical" },
        { name: "Logical", value: "logical" }
      ],
      vlans: ["vlan1", "vlan2"]
    };
  },

  computed: {
    apiUrl: function() {
      return (
        "/" +
        this.getUrlByType(this.deviceType) +
        "/" +
        this.deviceId +
        "/ports/" +
        this.portId
      );
    },
    ...mapGetters({
      getDeviceTypes: "getDeviceTypes",
      getUrlByType: "getUrlByType"
    })
  },

  methods: {
    updatePort() {
      var payload = {
        deviceId: this.deviceId,
        deviceType: this.deviceType,
        portId: this.portId,
        url: this.apiUrl,
        port: this.port
      };
      this.$store.dispatch("moduleData/updatePortToServer", payload);
      this.dialog = false;
    }
  }
};
</script>

<style>
</style>
