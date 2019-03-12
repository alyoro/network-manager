<template>
    <v-card flat xl2>
            <v-layout column class="pa-2" >
                <v-flex xs12 md6 class="pa-2">
                    <div class="grey--text subheading">Building</div>
                    <div>{{getDeviceInfo('PATCH_PANEL').building}}</div>
                </v-flex>

                <v-flex xs12 md6 class="pa-2">
                    <div class="grey--text subheading">Room</div>
                    <div>{{getDeviceInfo('PATCH_PANEL').room}}</div>
                </v-flex>

                <v-flex xs12 md6 class="pa-2">
                    <div class="grey--text subheading">Identifier</div>
                    <div>{{getDeviceInfo('PATCH_PANEL').identifier}}</div>
                </v-flex>

                <v-flex xs12 md6 class="pa-2">
                    <div class="grey--text subheading">Localization</div>
                    <div>{{getDeviceInfo('PATCH_PANEL').localization}}</div>
                </v-flex>

                <v-flex xs12 md6 class="pa-2">
                    <div class="grey--text subheading">Description</div>
                    <div>{{getDeviceInfo('PATCH_PANEL').description}}</div>
                </v-flex>

                <v-flex xs12 md6 class="pa-2">
                    <div class="grey--text subheading">Number of Ports</div>
                    <div>{{getDeviceInfo('PATCH_PANEL').numberOfPorts}}</div>
                </v-flex>
            </v-layout>

            <v-btn @click="sendDataToServer">Save in Database</v-btn>
    </v-card>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
    data(){
        return{

        }
    },
    computed: {
        ...mapGetters({
            getDeviceInfo: 'moduleAdding/getDeviceInfo',

        })
    },
    methods: {
        sendDataToServer(){
            this.$store.dispatch('moduleAdding/sendDataToServer',{url: '/patchpanels'})
        }
    }
}
</script>

<style>

</style>
