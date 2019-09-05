<template>
  <v-container>
    <v-card>
      <v-toolbar dark color="primary">
        <v-toolbar-title>Vlan Names</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>

      <v-layout class="px-3 py-1 text-md-center align-center" row>
        <v-flex xs12 md10>
          <v-text-field label="New Vlan Name" v-model="newName"></v-text-field>
        </v-flex>

        <v-flex xs12 md2>
          <v-btn flat @click="addNewVlanName()">Add New</v-btn>
        </v-flex>
      </v-layout>

      <v-divider></v-divider>

      <v-subheader class="pa-1 text-md-center align-center">
        <v-flex xs12 md3>Value</v-flex>
        <v-spacer></v-spacer>
        <v-flex xs12 md2>Update</v-flex>
        <v-flex xs12 md2>Delete</v-flex>
      </v-subheader>

      <v-list flat v-for="(item, index) in getVlansNames" :key="index">
        <v-layout row class="text-md-center align-center">
          <v-flex xs12 md3 left>
            <div>{{item}}</div>
          </v-flex>

          <v-spacer></v-spacer>

          <v-flex xs12 md2>
            <UpdateVlanName :name="item"/>
          </v-flex>

          <v-flex xs12 md2>
            <v-btn flat @click="deleteVlanName(item)">Delete</v-btn>
          </v-flex>
        </v-layout>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import UpdateVlanName from "@/components/settings/UpdateVlanName.vue"

export default {
  components: {
      UpdateVlanName
  },
  data() {
    return {
      newName: ""
    };
  },
  computed: {
    ...mapGetters({
      getVlansNames: "moduleVlans/getVlansNames"
    })
  },
  methods: {
    addNewVlanName() {
      this.$store.dispatch("moduleVlans/addVlansNames", {
        name: this.newName
      });
    },
    deleteVlanName(VlanName) {
      this.$store.dispatch("moduleVlans/deleteNameFromVlansNames", {
        name: VlanName
      });
    }
  },
  created() {
    if (this.getVlansNames.length <= 0) {
      this.$store.dispatch("moduleVlans/fetchVlansNames");
    }
  }
};
</script>

<style>
</style>
