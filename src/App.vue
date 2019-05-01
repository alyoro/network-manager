<template>
    <v-app class="grey lighten-4">
        <AlertSnackbar />
        <NavBar />
        <v-content class="ma-4">
            <router-view/>
        </v-content>
    </v-app>
</template>

<script>
import AlertSnackbar from '@/components/AlertSnackbar.vue'
import NavBar from '@/components/NavBar.vue'

export default {
    name: 'App',
    components: {
        NavBar,
        AlertSnackbar
    },
    data () {
        return {
        //
        };
    },
}
</script>
