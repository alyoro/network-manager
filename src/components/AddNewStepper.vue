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
                            color="grey lighten-5"
                            flat
                            height=200px
                        >
                            
                        </v-card>
                        <v-btn
                            color="primary"
                            @click="stepperStage = 2">
                        Continue</v-btn>
                        <v-btn flat>Cancel</v-btn>
                    </v-stepper-content>

                    <v-stepper-content step="2">
                        <v-card class="mb-5"
                            color="grey lighten-5"
                            flat
                            height=300px
                        >
                            <!-- ADD Select TYPE -->Stepper2
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
                            height=300px
                        >
                            <!-- ADD Select TYPE -->Stepper3
                        </v-card>
                        <v-btn
                            color="primary"
                            @click="stepperStage = 1"
                        >Continue</v-btn>
                        <v-btn 
                            flat
                            @click="stepperStage -= 1"
                        >Back</v-btn>
                    </v-stepper-content>

                </v-stepper-items>
            </v-stepper>
</template>

<script>
export default {
    data(){
            return {
                stepperStage: 0,

            }
        }
}
</script>

<style>

</style>
