<template>
        <div class="add">
        <h1 class="subheading">Connect Devices</h1>

        <v-container class="my-5">
            <select label="Select master device">
                <option v-for="item in getDeviceList" :key="item.device.id" >{{getTypeName(item.deviceType)}}</option>
            </select>
        </v-container>
        {{getDeviceList}}
    </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
    data(){
        return{
            list: []
        }
    },

    computed:{
      ...mapGetters({
        getDeviceList: 'moduleConnectionsToMakeCart/getDeviceList',
        // getTypeName: 'getTypeName'
      }),
    },

}
</script>

<style>

</style>
