<template>
  <v-dialog v-model="dialog" max-width="1000px" height="500px">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" flat :dialog="true">UPDATE</v-btn>
    </template>
    <v-card color="white" hide-overlay>
      <v-toolbar dark color="primary">
        <v-toolbar-title>Update Device</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon dark @click="dialog = false">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-layout wrap class="ma-2">
        <v-flex lg6 class="pa-2">
          <v-text-field label="Identifier" v-model="updatedDevice.identifier"></v-text-field>
        </v-flex>

        <v-flex lg6 class="pa-2">
          <v-text-field label="Localization" v-model="updatedDevice.localization"></v-text-field>
        </v-flex>

        <v-flex lg6 class="pa-2">
          <v-text-field label="Ip Address" v-model="updatedDevice.ip"></v-text-field>
        </v-flex>
      </v-layout>

      <v-divider></v-divider>

      <v-layout row nowrap class="pa-2" align-content-start>
        <v-btn flat color="primary" class="pa-2" @click="updateDevice()">Update</v-btn>

        <v-btn flat class="pa-2" @click="dialog = false">Close</v-btn>
      </v-layout>
    </v-card>
  </v-dialog>
</template>

<script>
import updateMixin from "@/mixins/updateMixin";

export default {
  mixins: [updateMixin]
};
</script>

<style>
</style>
