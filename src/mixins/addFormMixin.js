import { mapActions } from "vuex";

const addFormMixin = {
  props: {
    deviceType: {
      type: String,
      required: true
    }
  },
  methods: {
    saveToStore() {
      this.$store.commit("moduleAdding/saveDeviceInfo", this.deviceInfo);
    }
  }
}

export default addFormMixin;