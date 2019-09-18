import { mapGetters, mapMutations } from "vuex";
import AddPortDialog from "@/components/addForms/AddPortDialog.vue";
import PortsSearchInfo from "@/components/searchDisplayInfo/PortsSearchInfo.vue";
import ReportDialog from "@/components/ReportDialog.vue";

const searchInfoMixin = {
  components: {
    AddPortDialog,
    PortsSearchInfo,
    ReportDialog
  },

  props: {
    deviceType: {
      type: String,
      required: true
    },
    identifierFilter: ''
  },
  computed: {
    ...mapGetters({
      getData: "moduleData/getData"
    }),

    ...mapMutations({
      setDevice: "moduleConnections/setDevice"
    }),

    filteredDevices() {
      var arr = this.$store.getters["moduleData/getData"](this.deviceType);
      return arr.filter((device) => {
        return device.identifier.match(this.identifierFilter);
      })
    }
  },
  methods: {
    deleteDevice(id) {
      this.$store.dispatch("moduleData/deleteDevice", {
        id: id,
        type: this.deviceType
      });
    },
  }
}

export default searchInfoMixin;