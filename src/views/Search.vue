<template>
  <div class="search">
    <v-container class="my-5">
      <v-card flat xs12 md4 lg3 class="pa-3">
        <v-form>
          <v-select
            label="Device Types"
            item-text="name"
            item-value="idType"
            v-model="devType"
            :items="getDeviceTypes"
            @change="searchForData()"
          ></v-select>
          <v-btn color="primary" @click="searchForData()">Search</v-btn>
          <v-btn v-if="!!devType" color="primary" @click="getReport">Get Report</v-btn>
        </v-form>

        <div v-if="devType === 'PatchPanel'">
          <PatchPanelSearchInfo :deviceType="devType" :name="getUrlByType(devType)"/>
        </div>

        <div v-if="devType === 'RoomSocket'">
          <RoomSocketSearchInfo :deviceType="devType" :name="getUrlByType(devType)"/>
        </div>

        <div v-if="devType === 'Switch'">
          <SwitchSearchInfo :deviceType="devType" :name="getUrlByType(devType)"/>
        </div>

        <div v-if="devType === 'Server'">
          <ServerSearchInfo :deviceType="devType" :name="getUrlByType(devType)"/>
        </div>

        <div v-if="devType === 'Printer'">
          <PrinterSearchInfo :deviceType="devType" :name="getUrlByType(devType)"/>
        </div>

        <div v-if="devType === 'AccessPoint'">
          <AccessPointSearchInfo :deviceType="devType" :name="getUrlByType(devType)"/>
        </div>

        <div v-if="devType === 'IPPhone'">
          <IPPhoneSearchInfo :deviceType="devType" :name="getUrlByType(devType)"/>
        </div>
      </v-card>
    </v-container>
    <CheckLogin/>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

import PatchPanelSearchInfo from "@/components/searchDisplayInfo/PatchPanelSearchInfo.vue";
import RoomSocketSearchInfo from "@/components/searchDisplayInfo/RoomSocketSearchInfo.vue";
import SwitchSearchInfo from "@/components/searchDisplayInfo/SwitchSearchInfo.vue";
import ServerSearchInfo from "@/components/searchDisplayInfo/ServerSearchInfo.vue";
import PrinterSearchInfo from "@/components/searchDisplayInfo/PrinterSearchInfo.vue";
import AccessPointSearchInfo from "@/components/searchDisplayInfo/AccessPointSearchInfo.vue";
import IPPhoneSearchInfo from "@/components/searchDisplayInfo/IPPhoneSearchInfo.vue";
import CheckLogin from '@/components/CheckLogin.vue'

export default {
  components: {
    PatchPanelSearchInfo,
    RoomSocketSearchInfo,
    SwitchSearchInfo,
    ServerSearchInfo,
    PrinterSearchInfo,
    AccessPointSearchInfo,
    IPPhoneSearchInfo,
    CheckLogin
  },
  props: {
    deviceType: {
      default: ''
    }
  },
  data() {
    return {
      devType: this.deviceType,
      identifier: ""
    };
  },
  computed: {
    url() {
      return "/" + this.getUrlByType(this.devType);
    },
    ...mapGetters({
      getDeviceTypes: "getDeviceTypes",
      getUrlByType: "getUrlByType"
    })
  },
  methods: {
    searchForData() {
      var payload = {
        devType: this.devType,
        identifier: this.identifier,
        url: this.url
      };
      this.$store.dispatch("moduleData/getAll", payload);
    },
    getReport(){
      var payload = {
        deviceType: this.devType
      }
      this.$store.dispatch("moduleData/getAllReport", payload);
    }
  },
  created() {
    this.$store.dispatch("moduleVlans/fetchVlansNames")
  }
};
</script>

