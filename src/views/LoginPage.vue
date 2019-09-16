<template>
  <v-container>
    <v-card>
      <v-toolbar dark color="primary">
        <v-toolbar-title>Log In</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-form class="mx-5" @submit="loginSubmit">
        <v-text-field
          class="mx-5"
          v-model="username"
          :rules="[rules.loginRules]"
          label="Login"
          required
        ></v-text-field>
        <v-text-field
          class="mx-5"
          v-model="password"
          :rules="[rules.passwordRules]"
          label="Password"
          type="password"
          required
        ></v-text-field>
        <v-alert
          class="mx-5"
          :value="errorMessageLogin"
          color="error"
          icon="warning"
          outline
        >{{errorMessageLogin}}</v-alert>
        <v-flex text-xs-right class="mx-5">
          <v-btn flat color="primary" @click="loginSubmit()">Log In</v-btn>
        </v-flex>
      </v-form>
    </v-card>
    <CheckLogin/>
  </v-container>
</template>


<script>
import { mapGetters } from "vuex";
import { setTimeout } from "timers";
import CheckLogin from '@/components/CheckLogin.vue'

export default {
  components: {
    CheckLogin
  },
  data() {
    return {
      username: "",
      password: "",
      rules: {
        loginRules: v => !!v || "Login is required",
        passwordRules: v => !!v || "Password is required"
      }
    };
  },

  computed: {
    ...mapGetters({
      errorMessageLogin: "moduleAuthentication/errorMessageLogin"
    })
  },

  methods: {
    loginSubmit() {
      const username = this.username;
      const password = this.password;
      this.$store
        .dispatch("moduleAuthentication/doLogin", {
          username: username,
          password: password
        })
        .then(() => {
          setTimeout(() => {
            this.$router.push("/");
          }, 400);
        });
    }
  }
};
</script>

<style>
</style>
