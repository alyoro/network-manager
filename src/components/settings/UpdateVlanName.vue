<template>
  <v-dialog v-model="dialog" width="400">
    <template v-slot:activator="{ on }">
      <v-btn flat v-on="on">Update</v-btn>
    </template>

    <v-card>
      <v-toolbar dark color="primary">
        <v-toolbar-title>Update Vlan Name</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon dark @click="dialog = false">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-layout class="ma-3">
        <v-text-field label="Name" v-model="newNames"></v-text-field>
      </v-layout>

      <v-layout row nowrap class="pa-2" align-content-start>
        <v-btn flat color="primary" class="pa-2" @click="updateVlanName()">Update</v-btn>

        <v-btn flat class="pa-2" @click="dialog = false">Close</v-btn>
      </v-layout>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["name"],
  data() {
    return {
      dialog: false,
      newName: this.name,
    };
  },
  computed: {
    newNames: {
      get() {
        return this.newName;
      },
      set(newName) {
        this.newName = newName;
      }
    }
  },
  methods: {
    updateVlanName() {
      this.$store.dispatch("moduleVlans/updateVlansNames", {
        name: this.name,
        newName: this.newNames
      });
      this.dialog = false;
    }
  },
};
</script>

<style>
</style>
