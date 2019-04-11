<template>
  <v-container>
    <v-expansion-panel>
      <v-expansion-panel-content flat xl2 v-for="item in getData(deviceType)" :key="item.id">
        <div slot="header">
          <v-layout row class="pa-1" align-content-space-around="left">
            <v-flex xs12 md6 class="pa-1">
              <div class="grey--text subheading">Identifier</div>
              <div>{{item.identifier}}</div>
            </v-flex>

            <v-flex xs12 md6 class="pa-1">
              <div class="grey--text subheading">Localization</div>
              <div>{{item.localization}}</div>
            </v-flex>

            <v-flex xs12 md6 class="pa-1">
              <div class="grey--text subheading">Date of purchase</div>
              <div>{{item.dateOfPurchase}}</div>
            </v-flex>

            <v-flex xs12 md6 class="pa-1">
              <div class="grey--text subheading">Managment IP</div>
              <div>{{item.managementIP}}</div>
            </v-flex>

            <v-flex xs12 md6 class="pa-1">
              <div class="grey--text subheading">Number of Ports</div>
              <div>{{item.numberOfPorts}}</div>
            </v-flex>

            <v-flex xs12 md6 lg2 class="pa-1">
              <AddPortDialog :deviceID="item.id" :deviceType="deviceType"/>
            </v-flex>

            <v-flex xs12 md6 lg2 class="pa-1">
              <v-btn @click="deleteDevice(item.id)" flat>DELETE</v-btn>
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
              <v-btn @click="deletePort(item.id, port.id)" @click.native.stop flat>DELETE</v-btn>
            </v-flex>
          </v-layout>
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-container>
</template>

<script>
import searchInfoMixin from "@/mixins/searchInfoMixin";

export default {
  mixins: [searchInfoMixin],
};
</script>

<style>
</style>
