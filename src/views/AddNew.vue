<template>
    <div class="add">
        <v-container class="my-5">
            <AddNewStepper :deviceType="deviceType"/>
        </v-container>
    </div>
</template>

<script>
import AddNewStepper from '../components/AddNewStepper.vue'

export default {
    props: ['deviceType'],
    components:{
        AddNewStepper,
    }
}
</script>

<style>

</style>
