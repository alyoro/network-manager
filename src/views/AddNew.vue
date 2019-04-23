<template>
    <div class="add">
        <h1 class="subheading">Add New</h1>

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
