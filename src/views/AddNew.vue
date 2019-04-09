<template>
    <div class="add">
        <h1 class="subheading">Add New</h1>

        <v-container class="my-5">
            <AddNewStepper />
        </v-container>
    </div>
</template>

<script>
import AddNewStepper from '../components/AddNewStepper.vue'

export default {
    components:{
        AddNewStepper,
    }
}
</script>

<style>

</style>
