import { mapGetters } from "vuex";

const infoToSendMixin = {
  props: {
    deviceType: {
      type: String,
      required: true
    }
  },

  computed: {
    ...mapGetters({
      getDeviceInfo: "moduleAdding/getDeviceInfo",
      getNameByType: "getNameByType"
    })
  },

  methods: {
    sendDataToServer() {
      this.$store.dispatch("moduleAdding/sendDataToServer", {
        type: this.deviceType
      });
    }
  }
}

export default infoToSendMixin;