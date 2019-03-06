<template>
  <v-layout row justify-center>
    <v-flex xs12 md6 lg2 grow class="pa-1">
      <div class="grey--text subheading">Building</div>
      <div>{{item.building}}</div>
    </v-flex>

    <v-flex xs12 md6 lg2 grow class="pa-1">
      <div class="grey--text subheading">Room</div>
      <div>{{item.room}}</div>
    </v-flex>

    <v-flex xs12 md6 lg2 grow class="pa-1">
      <div class="grey--text subheading">Identifier</div>
      <div>{{item.identifier}}</div>
    </v-flex>

    <v-flex xs12 md6 lg2 grow class="pa-1">
      <div class="grey--text subheading">Localization</div>
      <div>{{item.localization}}</div>
    </v-flex>

    <v-flex xs12 md6 lg2 grow class="pa-1">
      <div class="grey--text subheading">Description</div>
      <div>{{item.description}}</div>
    </v-flex>

    <v-flex xs12 md6 lg2 grow class="pa-1">
      <div class="grey--text subheading">Number of Ports</div>
      <div>{{item.numberOfPorts}}</div>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
    props: ['item']
};
</script>

<style>

</style>
