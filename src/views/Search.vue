<template>
    <div class="search">
        <h1 class="subheading">Search</h1>
        
        <v-container class="my-5">
            <v-card flat xs12 md4 lg3 class="pa-3">
                <v-form>
                    <v-select
                       label="Device Types"
                       item-text="name"
                       item-value="idType"
                       v-model="searchArgs.devType"
                       :items="getDeviceTypes"
                    ></v-select>
                    <v-text-field
                        v-model="searchArgs.identifier"
                        label="Search for ID (whatever it can be)"
                    >
                    </v-text-field>
                    <v-btn
                        color="primary"
                        @click="searchForData()"
                    >Search</v-btn>
                </v-form>

                <v-divider></v-divider>

                <div v-if="searchArgs.devType === 'PatchPanel'">
                    <PatchPanelDisplayInfo />
                </div>

                <div v-if="searchArgs.devType === 'RoomSocket'">
                                    
                </div>

                <div v-if="searchArgs.devType === 'Switch'">
                                    
                </div>

                <div v-if="searchArgs.devType === 'Router'">
                                    
                </div>

                <div v-if="searchArgs.devType === 'Server'">
                                    
                </div>

                <div v-if="searchArgs.devType === 'Printer'">
                                    
                </div>

                <div v-if="searchArgs.devType === 'AccessPoint'">
                                    
                </div>

                <div v-if="searchArgs.devType === 'IPPhone'">

                </div>
                                    
            </v-card>
        </v-container>
    </div>
</template>
<script>
import {mapGetters} from 'vuex';

import PatchPanelDisplayInfo from '../components/searchDisplayInfo/PatchPanelDisplayInfo.vue';

export default {
    components:{
        PatchPanelDisplayInfo,
    },
    data() {
        return {
            searchArgs:{
                devType: '',
                identifier: '',
            }

        }
    },
    computed: {
        ...mapGetters({
            getDeviceTypes: 'getDeviceTypes',       
    })
    },
    methods: {
        searchForData(){
            this.$store.commit('moduleTestData/search',this.searchArgs);
        }    
    }
}
</script>

