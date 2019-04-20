import { mapGetters } from "vuex";
import AddPortDialog from "@/components/addForms/AddPortDialog.vue";
import UpdatePortDialog from "@/components/addForms/UpdatePortDialog.vue";

const searchInfoMixin = {
  components: {
    AddPortDialog,
    UpdatePortDialog
  },

  props: {
    deviceType: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      getNameByType: "getNameByType",
      getData: "moduleData/getData"
    })
  },
  methods: {
    displayDevicePlugged(devicePlugged) {
      return this.getNameByType(devicePlugged);
    },

    deleteDevice(id) {
      this.$store.dispatch("moduleData/deleteDevice", {
        id: id,
        type: this.deviceType
      });
    },

    deletePort(deviceId, portId) {
      this.$store.dispatch("moduleData/deletePort", {
        deviceId: deviceId,
        portId: portId,
        type: this.deviceType
      });
    }
  }
}

export default searchInfoMixin;