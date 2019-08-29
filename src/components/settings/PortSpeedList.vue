<template>
  <v-container>
    <v-card>
      <v-toolbar dark color="primary">
        <v-toolbar-title>Port Speed Names</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>

      <v-layout class="px-3 py-1 text-md-center align-center" row>
        <v-flex xs12 md10>
          <v-text-field label="New Port Name" v-model="newName"></v-text-field>
        </v-flex>

        <v-flex xs12 md2>
          <v-btn flat @click="addNewPortSpeedName()">Add New</v-btn>
        </v-flex>
      </v-layout>

      <v-divider></v-divider>

      <v-subheader class="pa-1 text-md-center align-center">
        <v-flex xs12 md3>Value</v-flex>
        <v-spacer></v-spacer>
        <v-flex xs12 md2>Update</v-flex>
        <v-flex xs12 md2>Delete</v-flex>
      </v-subheader>

      <v-list flat v-for="(item, index) in getPortSpeedNames" :key="index">
        <v-layout row class="text-md-center align-center">
          <v-flex xs12 md3 left>
            <div>{{item}}</div>
          </v-flex>

          <v-spacer></v-spacer>

          <v-flex xs12 md2>
            <UpdatePortSpeedName :name="item"/>
          </v-flex>

          <v-flex xs12 md2>
            <v-btn flat @click="deletePortSpeedName(item)">Delete</v-btn>
          </v-flex>
        </v-layout>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import UpdatePortSpeedName from "@/components/settings/UpdatePortSpeedName.vue";

export default {
  components: {
    UpdatePortSpeedName
  },
  data() {
    return {
      newName: ""
    };
  },
  computed: {
    ...mapGetters({
      getPortSpeedNames: "moduleSpeedPorts/getPortSpeedNames"
    })
  },
  methods: {
    addNewPortSpeedName() {
      this.$store.dispatch("moduleSpeedPorts/addPortSpeedNames", {
        name: this.newName
      });
    },
    deletePortSpeedName(portSpeedName) {
      this.$store.dispatch("moduleSpeedPorts/deleteNameFromPortSpeedNames", {
        name: portSpeedName
      });
    }
  },
  created() {
    if (this.getPortSpeedNames.length <= 0) {
      this.$store.dispatch("moduleSpeedPorts/fetchPortSpeedNames");
    }
  }
};
</script>

<style>
</style>
