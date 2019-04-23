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
              <v-menu offset-y>
                <template v-slot:activator="{ on }">
                  <v-btn flat color="black" dark v-on="on" @click.native.stop>Show Connections</v-btn>
                </template>
                <v-list>
                  <v-list-tile @click="showConnections(item, 'UP')">
                    <v-list-tile-title>Level Up</v-list-tile-title>
                  </v-list-tile>
                  <v-list-tile @click="showConnections(item, 'DOWN')">
                    <v-list-tile-title>Level Down</v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
            </v-flex>

            <v-flex xs12 md6 lg2 class="pa-1">
              <AddPortDialog :deviceID="item.id" :deviceType="deviceType"/>
            </v-flex>

            <v-flex xs12 md6 lg2 class="pa-1">
              <v-btn @click="deleteDevice(item.id)" flat>DELETE</v-btn>
            </v-flex>
          </v-layout>
        </div>
        <PortsSearchInfo :ports="item.ports" :deviceId="item.id" :deviceType="deviceType"/>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-container>
</template>

<script>
import searchInfoMixin from "@/mixins/searchInfoMixin";
import connectionsMixin from "@/mixins/connectionsMixin"

export default {
  mixins: [searchInfoMixin, connectionsMixin]
};
</script>

<style>
</style>
