<template>
    <div class="add">
        <v-container class="my-5">
            <AddNewStepper :deviceType="deviceType"/>
        </v-container>
        <CheckLogin/>
    </div>
</template>

<script>
import AddNewStepper from '../components/AddNewStepper.vue'
import CheckLogin from '@/components/CheckLogin.vue'

export default {
    props: ['deviceType'],
    components:{
        AddNewStepper,
        CheckLogin
    }
}
</script>

<style>

</style>
