<template>
<v-container>
    <!-- <v-btn @click="getAll()">Load data</v-btn> -->
    <v-card flat xl2 v-for="item in getTestData" :key="item.id">
            <v-divider></v-divider>
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
