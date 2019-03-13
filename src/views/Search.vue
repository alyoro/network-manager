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
                       v-model="devType"
                       :items="getDeviceTypes"
                    ></v-select>
                    <v-text-field
                        v-model="identifier"
                        label="Search for ID (whatever it can be)"
                    >
                    </v-text-field>
                    <v-btn
                        color="primary"
                        @click="searchForData()"
                    >Search</v-btn>
                </v-form>

                <v-divider></v-divider>

                <div v-if="devType === 'PatchPanel'">
                    <PatchPanelDisplayInfo />
                </div>

                <div v-if="devType === 'RoomSocket'">

                </div>

                <div v-if="devType === 'Switch'">

                </div>

                <div v-if="devType === 'Router'">

                </div>

                <div v-if="devType === 'Server'">

                </div>

                <div v-if="devType === 'Printer'">

                </div>

                <div v-if="devType === 'AccessPoint'">

                </div>

                <div v-if="devType === 'IPPhone'">

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
            devType: '',
            identifier: '',
        }
    },
    computed: {
        url(){
            return '/' + this.getUrlByType(this.devType);
        },
        ...mapGetters({
            getDeviceTypes: 'getDeviceTypes',
            getUrlByType: 'getUrlByType'
    })
    },
    methods: {
        searchForData(){
            var payload = {
                devType: this.devType,
                identifier: this.identifier,
                url: this.url
            }
            this.$store.dispatch('moduleTestData/getAll',payload);
        }
    }
}
</script>

