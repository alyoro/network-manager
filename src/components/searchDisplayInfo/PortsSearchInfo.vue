<template>
  <div>
    <v-divider></v-divider>
    <v-layout row class="pa-1" v-for="port in ports" :key="port.id">
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
        <UpdatePortDialog
          :deviceId="deviceId"
          :deviceType="deviceType"
          :portId="port.id"
          :port="port"
        />
      </v-flex>

      <v-flex xs12 md6 lg2 class="pa-1">
        <v-btn @click="deletePort(deviceId, port.id)" @click.native.stop flat>DELETE</v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import UpdatePortDialog from "@/components/addForms/UpdatePortDialog.vue";

export default {
  props: {
    ports: {
      required: true
    },
    deviceType: {
      type: String,
      required: true
    },
    deviceId: {
      required: true
    }
  },
  components: {
    UpdatePortDialog
  },
  computed: {
    ...mapGetters({
      getNameByType: "getNameByType"
    })
  },
  methods: {
    displayDevicePlugged(devicePlugged) {
      return this.getNameByType(devicePlugged);
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
