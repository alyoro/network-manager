import { mapGetters } from "vuex";

const addFormMixin = {
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
    saveToStore() {
      this.$store.commit("moduleAdding/saveDeviceInfo", this.deviceInfo);
    }
  }
}

export default addFormMixin;