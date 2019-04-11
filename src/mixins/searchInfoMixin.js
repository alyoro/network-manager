import { mapGetters } from "vuex";
import AddPortDialog from "@/components/addForms/AddPortDialog.vue";

const searchInfoMixin = {
  components: {
    AddPortDialog
  },

  props: {
    deviceType: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      getNameByType: "getNameByType"
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