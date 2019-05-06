
const updateMixin = {
  props: ["device" ,"deviceType"],
  data() {
    return {
      dialog: false,
    };
  },
  computed: {
    updatedDevice() {
      return this.device;
    }
  },
  methods: {
    updateDevice() {
      var payload = {
        deviceType: this.deviceType,
        device: this.updatedDevice
      };
      this.$store.dispatch("moduleData/updateDevice", payload);
    }
  }
}

export default updateMixin;