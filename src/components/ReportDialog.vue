<template>
  <v-dialog v-model="dialog" width="1000">
    <template v-slot:activator="{ on }">
      <v-btn v-if="mutipleDevices" dark color="primary" v-on="on" @click="fetchAllDevicesReport()">
        <slot name="button-text"></slot>
      </v-btn>

      <v-btn v-else flat v-on="on" @click="fetchReport()">
        <slot name="button-text"></slot>
      </v-btn>
    </template>

    <v-card color="white" hide-overlay>
      <v-toolbar dark color="primary">
        <v-toolbar-title>
          <div class="inline-elements">
            <slot name="dialog-title"></slot>
          </div>
          <div class="inline-elements">&nbsp;- {{deviceType}}</div>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn flat v-if="mutipleDevices" @click="getReportCSV()">Download CSV</v-btn>
        <v-btn icon dark @click="dialog = false">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text>
        <v-textarea :value="getReport" autofocus persistent-hint hint="Report" rows="30"></v-textarea>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    deviceType: "",
    device: {},
    mutipleDevices: false
  },
  data() {
    return {
      dialog: false
    };
  },
  computed: {
    ...mapGetters({
      getReport: "moduleData/getReport"
    })
  },
  methods: {
    fetchAllDevicesReport() {
      var payload = {
        deviceType: this.deviceType
      };
      this.$store.dispatch("moduleData/getAllReport", payload);
    },
    fetchReport() {
      this.$store.dispatch("moduleData/fetchReport", {
        id: this.device.id,
        type: this.deviceType
      });
    },
    getReportCSV(){
      this.$store.dispatch("moduleData/downloadAllReportCSV", {
        deviceType: this.deviceType
      })
    }
  }
};
</script>

<style>
.inline-elements {
  display: inline-block;
}
</style>
