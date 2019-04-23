<template>
  <div class="dashboard">
    <v-progress-circular v-if="loading" indeterminate color="primary child-loading" :size="70" :width="7"></v-progress-circular>
    <v-container v-else class="ma-2">
      <v-card flat v-for="item in getCountedDevices" :key="item.type">
        <v-layout row wrap class="pa-2">
          <v-spacer></v-spacer>
          <v-flex xs12 md6>
            <div class="caption grey--text">Device Type</div>
            <div>{{ item.type }}</div>
          </v-flex>
          <v-flex xs6 sm4 md3>
            <div class="caption grey--text">Number of devices</div>
            <div>{{ item.number }}</div>
          </v-flex>
          <v-flex xs3 sm2 md1>
            <v-btn>View</v-btn>
          </v-flex>
          <v-flex xs3 sm2 md1>
            <v-btn router-link @click="goToAddView(item.type)">Add</v-btn>
          </v-flex>
          <v-spacer></v-spacer>
        </v-layout>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      loading: true
    };
  },

  computed: {
    ...mapGetters({
      getCountedDevices: "moduleData/getCountedDevices"
    })
  },
  methods: {
    goToAddView(type){
      this.$router.push({
        name: 'add',
        params: {
          deviceType: type
        }
      })
    }
  },
  created() {
    this.$store.dispatch("moduleData/getCountedDevices").then(response => {
      this.loading = false;
    });
  }
};
</script>

<style>
.dashboard {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 500px;
}

.child-loading {
  flex-shrink: 0;
}
</style>

