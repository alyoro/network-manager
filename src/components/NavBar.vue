<template>
    <nav>
        <v-toolbar app>
            <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title class="text-uppercase">
                <span class="font-weight-light">Network </span>
                <span>Manager</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>

            <BottomSheetCart />

            <!-- <v-btn flat color="grey">
                About
            </v-btn> -->
        </v-toolbar>

        <v-navigation-drawer v-model="drawer" app class="primary text-uppercase">
            <v-list>
                <v-list-tile v-for="button in buttons" :key="button.title" router :to="button.route">
                    <v-list-tile-action>
                        <v-icon class="white--text">{{ button.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title class="white--text">{{ button.title }}</v-list-tile-title>
                    </v-list-tile-content>

                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
    </nav>
</template>

<script>
import BottomSheetCart from '@/components/BottomSheetCart.vue'
export default {
    components:{
        BottomSheetCart,
    },
    data() {
        return {
            drawer: false,
            buttons: [
                {title: 'Dashboard', icon: 'dashboard', route: '/'},
                {title: 'Search', icon: 'search', route: '/search'},
                {title: 'Add New', icon: 'add_box', route: '/add'},
                {title: 'Connect Devices', icon: 'settings_input_component', route: '/connect'}
            ]
        }
    }

}
</script>

<style>

</style>
