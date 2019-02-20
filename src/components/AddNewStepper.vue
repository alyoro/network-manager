<template>
    <v-stepper v-model="stepperStage">
                <v-stepper-header>
                    <v-stepper-step :complete="stepperStage > 1" step="1">Chose device type</v-stepper-step>
                    <v-divider></v-divider>

                    <v-stepper-step :complete="stepperStage > 2" step="2">Fill device info</v-stepper-step>
                    <v-divider></v-divider>

                    <v-stepper-step :complete="stepperStage > 3" step="3">Checking info and save</v-stepper-step>
                    <v-divider></v-divider>
                </v-stepper-header>
                <v-stepper-items>
                    <v-stepper-content step="1">
                        <v-card class="mb-5"
                            flat
                            height=260px
                        >
                            <v-radio-group class="ma-2 pa-2" v-model="radioDevice">
                                <v-radio
                                    v-for="type in getDeviceTypes"
                                    :key="`${type.idType}`"
                                    :label="`${type.name}`"
                                    :value="`${type.idType}`"                                
                                ></v-radio>
                            </v-radio-group>
                        </v-card>
                        <v-btn
                            color="primary"
                            @click="stepperStage = 2">
                        Continue</v-btn>

                    </v-stepper-content>

                    <v-stepper-content step="2">
                        <v-card class="mb-5"
                            flat
                            
                        >
                            <div v-if="radioDevice === 'PatchPanel'">
                                   <PatchPanelAddForm />
                            </div>

                            <div v-if="radioDevice === 'RoomSocket'">
                                    
                            </div>

                            <div v-if="radioDevice === 'Switch'">
                                    
                            </div>

                            <div v-if="radioDevice === 'Router'">
                                    
                            </div>

                            <div v-if="radioDevice === 'Server'">
                                    
                            </div>

                            <div v-if="radioDevice === 'Printer'">
                                    
                            </div>

                            <div v-if="radioDevice === 'AccessPoint'">
                                    
                            </div>

                            <div v-if="radioDevice === 'IPPhone'">
                                    
                            </div>
                        </v-card>
                        <v-btn
                            color="primary"
                            @click="stepperStage = 3">
                        Continue</v-btn>
                        <v-btn 
                            flat
                            @click="stepperStage -= 1"
                        >Back</v-btn>
                    </v-stepper-content>

                    <v-stepper-content step="3">
                        <v-card class="mb-5"
                            color="grey lighten-5"
                            flat
                        >
                            <div v-if="radioDevice === 'PatchPanel'">
                                   <PatchPanelInfoToSend />
                            </div>

                            <div v-if="radioDevice === 'RoomSocket'">
                                    
                            </div>

                            <div v-if="radioDevice === 'Switch'">
                                    
                            </div>

                            <div v-if="radioDevice === 'Router'">
                                    
                            </div>

                            <div v-if="radioDevice === 'Server'">
                                    
                            </div>

                            <div v-if="radioDevice === 'Printer'">
                                    
                            </div>

                            <div v-if="radioDevice === 'AccessPoint'">
                                    
                            </div>

                            <div v-if="radioDevice === 'IPPhone'">
                                    
                            </div>
                        </v-card>
                        <v-btn
                            color="primary"
                            @click="stepperStage = 1"
                        >Add New Device</v-btn>
                        <v-btn 
                            flat
                            @click="stepperStage -= 1"
                        >Back</v-btn>
                    </v-stepper-content>

                </v-stepper-items>
            </v-stepper>

            
</template>

<script>
import {mapGetters} from 'vuex';

import PatchPanelAddForm from './addForms/PatchPanelAddForm.vue';

import PatchPanelInfoToSend from './infoToSend/PatchPanelInfoToSend.vue';

export default {
    components: {
        PatchPanelAddForm,

        PatchPanelInfoToSend,
    },
    data(){
            return {
                stepperStage: 0,
                radioDevice: '',
            }
        },
    computed: {
        ...mapGetters({
            getDeviceTypes: 'moduleAdding/getDeviceTypes', 
            
    })
    }
}
</script>

<style>

</style>
