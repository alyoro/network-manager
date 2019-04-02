<template>
  <v-container>
    <v-expansion-panel>
      <v-expansion-panel-content flat xl2 v-for="item in getData(deviceType)" :key="item.id">
        <div slot="header">
          <v-layout row class="pa-1" align-content-space-around="left">
            <v-flex xs12 md6 lg1 class="pa-1">
              <div class="grey--text subheading">Building</div>
              <div>{{item.building}}</div>
            </v-flex>

            <v-flex xs12 md6 lg1 class="pa-1">
              <div class="grey--text subheading">Room</div>
              <div>{{item.room}}</div>
            </v-flex>

            <v-flex xs12 md6 class="pa-1">
              <div class="grey--text subheading">Identifier</div>
              <div>{{item.identifier}}</div>
            </v-flex>

            <v-flex xs12 md6 class="pa-1">
              <div class="grey--text subheading">Description</div>
              <div>{{item.description}}</div>
            </v-flex>

            <v-flex xs12 md6 lg2 class="pa-1">
              <div class="grey--text subheading">Number of Ports</div>
              <div>{{item.numberOfPorts}}</div>
            </v-flex>

            <v-flex xs12 md6 lg2 class="pa-1">
              <AddPortDialog :deviceID="item.id" :deviceType="deviceType"/>
            </v-flex>

            <v-flex xs12 md6 lg2 class="pa-1">
              <v-btn @click="deleteDevice(item.id)" flat>DELETE</v-btn>
            </v-flex>

            <v-flex xs12 md6 lg2 class="pa-1">
              <AddDeviceToConnectCart :device="item" :deviceType="deviceType"/>
            </v-flex>
          </v-layout>
        </div>
        <div>
          <v-divider></v-divider>
          <v-layout row class="pa-1" v-for="port in item.ports" :key="port.id">
            <v-flex xs12 md6 class="pa-1">
              <div class="grey--text subheading">Port number</div>
              <div>{{port.portNumber}}</div>
            </v-flex>

            <v-flex xs12 md6 class="pa-1">
              <div class="grey--text subheading">Device plugged</div>
              <div>{{displayDevicePlugged(port.devicePlugged)}}</div>
            </v-flex>

            <v-flex xs12 md6 class="pa-1">
              <div class="grey--text subheading">portOnTheUpperElement</div>
              <div>{{port.portOnTheUpperElement}}</div>
            </v-flex>

            <v-flex xs12 md6 lg2 class="pa-1">
              <v-btn @click="deletePort(item.id, port.id)" flat>{{port.id}}DELETE</v-btn>
            </v-flex>
          </v-layout>
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import NetworkManagerBackend from "@/services/api/NetworkManagerBackend";
import AddPortDialog from "@/components/addForms/AddPortDialog.vue";
import AddDeviceToConnectCart from "@/components/addForms/AddDeviceToConnectCart.vue";

export default {
  components: {
    AddPortDialog,
    AddDeviceToConnectCart
  },

  props: {
    deviceType: {
      type: String,
      required: true
    }
  },

  computed: {
    ...mapGetters({
      getData: "moduleData/getData",
      getTypeName: "getTypeName"
    })
  },

  methods: {
    displayDevicePlugged(devicePlugged) {
      return this.getTypeName(devicePlugged);
    },
    deleteDevice(id) {
      this.$store.dispatch("moduleData/deleteDevice", {
        id: id,
        type: this.deviceType
      });
    },
    deletePort(deviceId, portId) {
      this.$store.dispatch("moduleData/deletePort", {
        deviceId: deviceId,
        portId: portId,
        type: this.deviceType
      });
    }
  }
};
</script>

<style>
</style>
