import { mapGetters, mapMutations } from "vuex";
import AddPortDialog from "@/components/addForms/AddPortDialog.vue";
import PortsSearchInfo from "@/components/searchDisplayInfo/PortsSearchInfo.vue";

const searchInfoMixin = {
  components: {
    AddPortDialog,
    PortsSearchInfo
  },

  props: {
    deviceType: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      getData: "moduleData/getData"
    }),

    ...mapMutations({
      setDevice: "moduleConnections/setDevice"
    })
  },
  methods: {
    deleteDevice(id) {
      this.$store.dispatch("moduleData/deleteDevice", {
        id: id,
        type: this.deviceType
      });
    }
  }
}

export default searchInfoMixin;