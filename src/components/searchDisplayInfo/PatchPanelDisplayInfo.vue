<template>
<v-container>
    <v-card flat xl2 v-for="item in getTestData" :key="item.identifier">
            <v-layout row class="pa-2">
                <v-flex xs12 md6 class="pa-2">
                    <div class="grey--text subheading">Building</div>
                    <div>{{item.building}}</div>
                </v-flex>

                <v-flex xs12 md6 class="pa-2">
                    <div class="grey--text subheading">Room</div>
                    <div>{{item.room}}</div>
                </v-flex>

                <v-flex xs12 md6 class="pa-2">
                    <div class="grey--text subheading">Identifier</div>
                    <div>{{item.identifier}}</div>
                </v-flex>

                <v-flex xs12 md6 class="pa-2">
                    <div class="grey--text subheading">Localization</div>
                    <div>{{item.localization}}</div>
                </v-flex>

                <v-flex xs12 md6 class="pa-2">
                    <div class="grey--text subheading">Description</div>
                    <div>{{item.description}}</div>
                </v-flex>

                <v-flex xs12 md6 class="pa-2">
                    <div class="grey--text subheading">Number of Ports</div>
                    <div>{{item.numberOfPorts}}</div>
                </v-flex>
            </v-layout>
    </v-card>
</v-container>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
    computed: {
        ...mapGetters({
            getTestData: 'moduleTestData/getTestData',
            
        })
    },

}
</script>

<style>

</style>
