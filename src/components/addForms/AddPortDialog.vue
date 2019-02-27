<template>
    <v-layout column justify-center>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-btn flat slot="activator">Add Port</v-btn>
            <v-card>
                <v-card-title>
                    <span class="headline">Add Port</span>
                </v-card-title>
                <v-card-text>
                        <v-container>
                            <v-layout wrap>
                                <v-flex xs12 lg6 class="pa-1">
                                    <v-text-field label="Port Number*" required v-model="port.portNumber"></v-text-field>
                                </v-flex>
                                <v-flex xs12 lg6 class="pa-1">
                                    <v-text-field label="Port On the upper element" v-model="port.portOnTheUpperElement"></v-text-field>
                                </v-flex>
                                <v-flex xs12 lg6>
                                    <v-select
                                    label="Device Types"
                                    item-text="name"
                                    item-value="idType"
                                    v-model="port.devicePlugged"
                                    :items="getDeviceTypes"
                                    ></v-select>
                                </v-flex>
                            </v-layout>
                        </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
                    <v-btn color="blue darken-1" flat @click="addPort">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
    props: {
        deviceID: null,
        deviceType: null,
    },

    data() {
        return{
            dialog: false,
            port:{
                portNumber: null,
                portOnTheUpperElement: null,
                devicePlugged: null,
            }
        }
    },

    computed:{
        ...mapGetters({
            getDeviceTypes: 'getDeviceTypes',
        })
    },

    methods: {
        addPort(){
            var payload = {
                url: {
                        deviceID: this.deviceID,
                        deviceType: this.deviceType
                    },
                port: this.port
            }
            console.log(payload)
            this.$store.dispatch('moduleAdding/savePortToServer', payload)
            this.dialog = false;
        }
    },
}
</script>

<style>

</style>
