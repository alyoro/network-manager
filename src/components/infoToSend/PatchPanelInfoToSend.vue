<template>
    <v-card flat xl2>
            <v-layout column class="pa-2" >
                <v-flex xs12 md6 class="pa-2">
                    <div class="grey--text subheading">Building</div>
                    <div>{{getDeviceInfo.building}}</div>
                </v-flex>

                <v-flex xs12 md6 class="pa-2">
                    <div class="grey--text subheading">Room</div>
                    <div>{{getDeviceInfo.room}}</div>
                </v-flex>

                <v-flex xs12 md6 class="pa-2">
                    <div class="grey--text subheading">Identifier</div>
                    <div>{{getDeviceInfo.identifier}}</div>
                </v-flex>

                <v-flex xs12 md6 class="pa-2">
                    <div class="grey--text subheading">Localization</div>
                    <div>{{getDeviceInfo.localization}}</div>
                </v-flex>

                <v-flex xs12 md6 class="pa-2">
                    <div class="grey--text subheading">Description</div>
                    <div>{{getDeviceInfo.description}}</div>
                </v-flex>

                <v-flex xs12 md6 class="pa-2">
                    <div class="grey--text subheading">Number of Ports</div>
                    <div>{{getDeviceInfo.numberOfPorts}}</div>
                </v-flex>
            </v-layout>
    </v-card>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
    computed: {
        ...mapGetters([
            'getDeviceInfo'
        ])
    }
}
</script>

<style scoped>

</style>
