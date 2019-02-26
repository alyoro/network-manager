<template>
<v-container>
    <!-- <v-btn @click="getAll()">Load data</v-btn> -->
    <v-expansion-panel>
        <v-expansion-panel-content flat xl2 v-for="item in getTestData" :key="item.id">
                <div slot="header">
                <v-layout row class="pa-1">
                    <v-flex xs12 md6 class="pa-1">
                        <div class="grey--text subheading">Building</div>
                        <div>{{item.building}}</div>
                    </v-flex>

                    <v-flex xs12 md6 class="pa-1">
                        <div class="grey--text subheading">Room</div>
                        <div>{{item.room}}</div>
                    </v-flex>

                    <v-flex xs12 md6 class="pa-1">
                        <div class="grey--text subheading">Identifier</div>
                        <div>{{item.identifier}}</div>
                    </v-flex>

                    <v-flex xs12 md6 class="pa-1">
                        <div class="grey--text subheading">Localization</div>
                        <div>{{item.localization}}</div>
                    </v-flex>

                    <v-flex xs12 md6 class="pa-1">
                        <div class="grey--text subheading">Description</div>
                        <div>{{item.description}}</div>
                    </v-flex>

                    <v-flex xs12 md6 class="pa-1">
                        <div class="grey--text subheading">Number of Ports</div>
                        <div>{{item.numberOfPorts}}</div>
                    </v-flex>
                </v-layout>
                </div>
                <v-card>
                    <v-divider></v-divider>
                    <v-layout row class="pa-1" v-for="port in item.ports" :key="port.id">
                        <v-flex xs12 md6 class="pa-1">
                            <div class="grey--text subheading">Port number</div>
                            <div>{{port.portNumber}}</div>
                        </v-flex>

                        <v-flex xs12 md6 class="pa-1">
                            <div class="grey--text subheading">Device plugged</div>
                            <div>{{port.devicePlugged}}</div>
                        </v-flex>

                        <v-flex xs12 md6 class="pa-1">
                            <div class="grey--text subheading">portOnTheUpperElement</div>
                            <div>{{port.portOnTheUpperElement}}</div>
                        </v-flex>
                    </v-layout>
                </v-card>
        </v-expansion-panel-content>
    </v-expansion-panel>
</v-container>
</template>

<script>
import {mapGetters} from 'vuex';
import NetworkManagerBackend from '@/services/api/NetworkManagerBackend'

export default {
    data() {
        return{
            // getTestData: [],
        }
    },

    computed: {
        ...mapGetters({
            getTestData: 'moduleTestData/getTestData',
            
        })
    },

    // methods:{
    //     getAll() {
    //         NetworkManagerBackend.getAll('/PatchPanel/getAll')
    //             .then(data => {
    //                 this.getTestData = data
    //                 this.submitted = true
    //             })
    //             .catch(error => console.log(error))
    //     }
    // }

}
</script>

<style>

</style>
