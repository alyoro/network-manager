<template>
  <v-stepper v-model="stepperStage">
    <v-stepper-header>
      <v-stepper-step :complete="stepperStage > 1" step="1">Chose device type</v-stepper-step>
      <v-divider></v-divider>

      <v-stepper-step :complete="stepperStage > 2" step="2">Fill device info</v-stepper-step>
      <v-divider></v-divider>

      <v-stepper-step :complete="stepperStage > 3" step="3">Checking info and save</v-stepper-step>
      <v-divider></v-divider>
    </v-stepper-header>
    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card class="mb-5" flat height="260px">
          <v-radio-group class="ma-2 pa-2" v-model="radioDevice">
            <v-radio
              v-for="type in getDeviceTypes"
              :key="`${type.idType}`"
              :label="`${type.name}`"
              :value="`${type.idType}`"
            ></v-radio>
          </v-radio-group>
        </v-card>
        <v-btn color="primary" @click="stepperStage = 2">Continue</v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card class="mb-5" flat>
          <div v-if="radioDevice === 'PatchPanel'">
            <PatchPanelAddForm :deviceType="radioDevice"/>
          </div>

          <div v-if="radioDevice === 'RoomSocket'">
            <RoomSocketAddForm :deviceType="radioDevice"/>
          </div>

          <div v-if="radioDevice === 'Switch'">
            <SwitchAddForm :deviceType="radioDevice"/>
          </div>

          <div v-if="radioDevice === 'Router'"></div>

          <div v-if="radioDevice === 'Server'">
            <ServerAddForm :deviceType="radioDevice"/>
          </div>

          <div v-if="radioDevice === 'Printer'">
            <PrinterAddForm :deviceType="radioDevice"/>
          </div>

          <div v-if="radioDevice === 'AccessPoint'">
            <AccessPointAddForm :deviceType="radioDevice"/>
          </div>

          <div v-if="radioDevice === 'IPPhone'">
            <IPPhoneAddForm :deviceType="radioDevice"/>
          </div>
        </v-card>
        <v-btn color="primary" @click="stepperStage = 3">Continue</v-btn>
        <v-btn flat @click="stepperStage -= 1">Back</v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card class="mb-5" color="grey lighten-5" flat>
          <div v-if="radioDevice === 'PatchPanel'">
            <PatchPanelInfoToSend :deviceType="radioDevice"/>
          </div>

          <div v-if="radioDevice === 'RoomSocket'">
            <RoomSocketInfoToSend :deviceType="radioDevice"/>
          </div>

          <div v-if="radioDevice === 'Switch'">
            <SwitchInfoToSend :deviceType="radioDevice"/>
          </div>

          <div v-if="radioDevice === 'Router'"></div>

          <div v-if="radioDevice === 'Server'">
            <ServerInfoToSend :deviceType="radioDevice"/>
          </div>

          <div v-if="radioDevice === 'Printer'">
            <PrinterInfoToSend :deviceType="radioDevice"/>
          </div>

          <div v-if="radioDevice === 'AccessPoint'">
            <AccessPointInfoToSend :deviceType="radioDevice"/>
          </div>

          <div v-if="radioDevice === 'IPPhone'">
            <IPPhoneInfoToSend :deviceType="radioDevice"/>
          </div>
        </v-card>
        <v-btn color="primary" @click="stepperStage = 1">Add New Device</v-btn>
        <v-btn flat @click="stepperStage -= 1">Back</v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import { mapGetters } from "vuex";

import PatchPanelAddForm from "@/components/addForms/PatchPanelAddForm.vue";
import RoomSocketAddForm from "@/components/addForms/RoomSocketAddForm.vue";
import SwitchAddForm from "@/components/addForms/SwitchAddForm.vue";
import ServerAddForm from "@/components/addForms/ServerAddForm.vue";
import PrinterAddForm from "@/components/addForms/PrinterAddForm.vue";
import AccessPointAddForm from "@/components/addForms/AccessPointAddForm.vue";
import IPPhoneAddForm from "@/components/addForms/IPPhoneAddForm.vue";

import PatchPanelInfoToSend from "@/components/infoToSend/PatchPanelInfoToSend.vue";
import RoomSocketInfoToSend from "@/components/infoToSend/RoomSocketInfoToSend.vue";
import SwitchInfoToSend from "@/components/infoToSend/SwitchInfoToSend.vue";
import ServerInfoToSend from "@/components/infoToSend/ServerInfoToSend.vue";
import PrinterInfoToSend from "@/components/infoToSend/PrinterInfoToSend.vue";
import AccessPointInfoToSend from "@/components/infoToSend/AccessPointInfoToSend.vue";
import IPPhoneInfoToSend from "@/components/infoToSend/IPPhoneInfoToSend.vue";

export default {
  components: {
    PatchPanelAddForm,
    RoomSocketAddForm,
    SwitchAddForm,
    ServerAddForm,
    PrinterAddForm,
    AccessPointAddForm,
    IPPhoneAddForm,

    PatchPanelInfoToSend,
    RoomSocketInfoToSend,
    SwitchInfoToSend,
    ServerInfoToSend,
    PrinterInfoToSend,
    AccessPointInfoToSend,
    IPPhoneInfoToSend
  },
  data() {
    return {
      stepperStage: 0,
      radioDevice: ""
    };
  },
  computed: {
    ...mapGetters({
      getDeviceTypes: "getDeviceTypes"
    })
  }
};
</script>

<style>
</style>
