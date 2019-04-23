<template>
  <v-card flat xl2 class="ma-3">
    <v-layout row wrap class="layout">
      <v-flex lg12 class="item titleText">
        <h1 class="title primary--text">{{getNameByType(item.deviceType)}}</h1>
      </v-flex>

      <v-flex xs12 md6 lg2 class="item">
        <div class="grey--text subheading">Identifier</div>
        <div>{{item.identifier}}</div>
      </v-flex>

      <v-flex xs12 md6 lg2 class="item">
        <div class="grey--text subheading">Localization</div>
        <div>{{item.localization}}</div>
      </v-flex>

      <v-flex xs12 md6 lg2 class="item">
        <div class="grey--text subheading">Date of Purchase</div>
        <div>{{item.dateOfPurchase}}</div>
      </v-flex>

      <v-flex xs12 md6 lg2 class="item">
        <div class="grey--text subheading">Managment IP</div>
        <div>{{item.managementIP}}</div>
      </v-flex>

      <v-flex xs12 md6 lg2 class="item">
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
    </v-layout>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import connectionsMixin from "@/mixins/connectionsMixin";

export default {
  props: ["item"],
  mixins: [connectionsMixin],
  computed: {
    ...mapGetters({
      getNameByType: "getNameByType"
    })
  }
};
</script>

<style scoped>
.item {
  padding: 0.3em;
}

.titleText {
  margin-bottom: 0.75em;
}
</style>
