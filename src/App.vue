<template>
    <v-app class="grey lighten-4">
        <NavBar />
        <v-content class="ma-4">
            <router-view/>
        </v-content>
    </v-app>
</template>

<script>
import NavBar from '@/components/NavBar.vue'

export default {
    name: 'App',
    components: {
        NavBar,
    },
    data () {
        return {
        //
        };
    },
}
</script>
