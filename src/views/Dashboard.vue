<template>
  <div class="dashboard">
    <h1 class="subheading">Dasboard</h1>
    <v-container class="my-5">
      <v-card flat v-for="item in items" :key="item.type">
        <v-layout row wrap class="pa-3">
          <v-flex xs12 md6>
            <div class="caption grey--text">Device Type</div>
            <div>{{ item.type }}</div>
          </v-flex>
          <v-flex xs6 sm4 md3>
            <div class="caption grey--text">Number of devices</div>
            <div>{{ item.number }}</div>
          </v-flex>
          <v-flex xs3 sm2 md1>
            <v-btn>View</v-btn>
          </v-flex>
          <v-flex xs3 sm2 md1>
            <v-btn>Add</v-btn>
          </v-flex>
          <v-flex xs3 sm2 md1>
            <v-btn>Delete</v-btn>
          </v-flex>
        </v-layout>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { type: "Switch", number: 12 },
        { type: "Router", number: 3 },
        { type: "PatchPanel", number: 40 }
      ]
    };
  }
};
</script>
