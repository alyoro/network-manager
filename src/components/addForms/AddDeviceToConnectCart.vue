<template>
    <v-btn
        flat
        grey
        @click="addToCart"
    >Add Connection to Cart
    </v-btn>
</template>

<script>
import {mapActions} from 'vuex';

export default {
    props:{
        device: null,
        deviceType: null
    },
    methods:{
        addToCart(){
            const payload = {
                device: this.device,
                deviceType: this.deviceType
            }
            this.$store.commit('moduleConnectionsToMakeCart/addNewDevice', payload)
        }
    }
}
</script>

<style>

</style>
