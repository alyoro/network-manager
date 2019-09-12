<template>
  <nav>
    <v-toolbar app>
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="text-uppercase">
        <span class="font-weight-light">Network</span>
        <span>Manager</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <div v-if="!isExpired">
        <span>Hello, {{username}}</span>
        <v-btn @click="logout" flat>Logout</v-btn>
      </div>

      <v-btn v-else to="/login" flat>Log in</v-btn>
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
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      drawer: false,
      buttons: [
        { title: "Dashboard", icon: "dashboard", route: "/" },
        { title: "Search", icon: "search", route: "/search" },
        { title: "Add New", icon: "add_box", route: "/add" },
        {
          title: "Settings",
          icon: "settings_applications",
          route: "/settings"
        },
        { title: "Login", icon: "vpn_key", route: "/login" }
      ]
    };
  },
  computed: {
    ...mapGetters({
      isLoggedIn: "moduleAuthentication/isLoggedIn",
      username: "moduleAuthentication/getUsername",
      isExpired: "moduleAuthentication/isExpired",
    }),

  },
  methods: {
    logout() {
      this.$store.dispatch("moduleAuthentication/logout");
      this.$router.push("/login");
    }
  }


};
</script>

<style>
</style>
