<template>
  <div class="report">
      <v-textarea
      :value="getReport"
      autofocus
      persistent-hint
      hint="Report"
      rows=30>

      </v-textarea>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
computed:{
  ...mapGetters({
    getReport: "moduleData/getReport"
  })
}
}
</script>

<style>

</style>
