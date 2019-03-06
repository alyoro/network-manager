<template>
        <div class="add">
        <h1 class="subheading">Connect Devices</h1>

        <v-container class="my-5">

        </v-container>

    </div>
</template>

<script>
import {mapGetters} from 'vuex';


export default {
    components:{
        DisplayInfoPatchPanel,
    },
    data(){
        return{
            list: []
        }
    },

    computed:{
      ...mapGetters({
        getDeviceList: 'moduleConnectionsToMakeCart/getDeviceList',
      }),
    },

}
</script>

<style>

</style>
