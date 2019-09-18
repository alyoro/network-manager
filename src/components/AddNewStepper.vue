<template>
  <v-stepper v-model="stepperStage">
    <v-stepper-header>
      <v-spacer></v-spacer>
      <v-stepper-step :complete="stepperStage > 1" step="1" editable>Chose device type</v-stepper-step>
      <v-divider></v-divider>

      <v-stepper-step :complete="stepperStage > 2" step="2" editable>Fill device info</v-stepper-step>
      <v-divider></v-divider>

      <v-stepper-step :complete="stepperStage > 3" step="3" editable>Checking info and save</v-stepper-step>
      <v-spacer></v-spacer>
    </v-stepper-header>
    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card class="item" flat height="260px">
          <v-radio-group class="ml-1 item" v-model="radioDevice">
            <v-radio
              v-for="deviceType in getDeviceTypes"
              :key="deviceType.idType"
              :label="deviceType.name"
              :value="deviceType.idType"
            ></v-radio>
          </v-radio-group>
        </v-card>
        <v-divider></v-divider>
        <v-btn color="primary" flat @click="next()">Next</v-btn>
      </v-stepper-content>
      <v-stepper-content step="2">
        <v-card class="item" flat>
          <div v-if="radioDevice === 'PatchPanel'">
            <PatchPanelAddForm :deviceType="radioDevice"/>
          </div>

          <div v-if="radioDevice === 'RoomSocket'">
            <RoomSocketAddForm :deviceType="radioDevice"/>
          </div>

          <div v-if="radioDevice === 'Switch'">
            <SwitchAddForm :deviceType="radioDevice"/>
          </div>

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
        <v-divider></v-divider>
        <v-btn color="primary" flat @click="next()">Next</v-btn>
        <v-btn color="secondary" flat @click="back()">Back</v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card class="item" flat>
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
        <v-divider></v-divider>
        <v-btn color="primary" flat @click="next()">Add Next Device</v-btn>
        <v-btn color="secondary" flat @click="back()">Back</v-btn>
        <AddNewMessage/>
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

import AddNewMessage from "@/components/AddNewMessage.vue";
import { EventBus } from "@/main";

export default {
  props: {
    deviceType: {
      default: "PatchPanel"
    }
  },
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
    IPPhoneInfoToSend,

    AddNewMessage
  },
  data() {
    return {
      stepperStage: 1,
      radioDevice: this.deviceType
    };
  },
  computed: {
    ...mapGetters({
      getDeviceTypes: "getDeviceTypes"
    })
  },
  methods: {
    next() {
      if (this.stepperStage >= 3) {
        this.stepperStage = 1;
      } else {
        this.stepperStage += 1;
      }
      EventBus.$emit("clear-addMessage", {});
    },

    back() {
      if (this.stepperStage < 1) {
        this.stepperStage = 3;
      } else {
        this.stepperStage -= 1;
      }
      EventBus.$emit("clear-addMessage", {});
    }
  }
};
</script>

<style>
.item {
  padding: 0.3em;
}

.titleText {
  margin-bottom: 0.75em;
}
</style>
