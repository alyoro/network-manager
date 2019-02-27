<template>
  <div class="text-xs-center">
    <v-bottom-sheet v-model="sheet">
      <v-btn
        flat
        grey
        slot="activator"
      >
        Devices to Connect
      </v-btn>

      <v-list>
        <v-subheader>
          Devices
          <v-spacer></v-spacer>
            <v-btn flat @click="clear">
              Clear list
            </v-btn>

        </v-subheader>
        <v-list-tile
          v-for="item in getDeviceList"
          :key="item.id"
          @click="sheet = false"
        >

          <v-list-tile-title>{{ item }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-bottom-sheet>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex';

  export default {
    data() {
      return{
        sheet: false,
      }
    },
    computed:{
      ...mapGetters({
        getDeviceList: 'moduleConnectionsToMakeCart/getDeviceList'
      })
    },
    methods:{

        clear(){
          this.sheet = false
          this.$store.commit('moduleConnectionsToMakeCart/clearDeviceList')
        },
    }



  }
</script>

<style>

</style>
