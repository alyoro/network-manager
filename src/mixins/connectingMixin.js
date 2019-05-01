import { mapGetters } from "vuex";
import Vue from "vue";

import PortsConnectingDevices from "@/components/connectingDevices/PortsConnectingDevices.vue";


const connectingMixin = {
  components: {
    PortsConnectingDevices
  },
  props: {
    portSlave: {
      type: Object
    },
    deviceType: {
      defualt: "PatchPanel"
    }
  },
  data() {
    return {
      visible: [false]
    };
  },
  computed: {
    devices() {
      if(true){
        this.portSlave
      }
      return this.getData(this.deviceType)
    },
    ...mapGetters({
      getData: "moduleData/getData",
      getNameByType: "getNameByType",
      getUrlByType: "getUrlByType"
    })
  },
  methods: {
    changeVisiblility(index) {
      if (this.visible[index] == null || this.visible[index] == false) {
        Vue.set(this.visible, index, true);
      } else {
        Vue.set(this.visible, index, false);
      }
    }
  }
}

export default connectingMixin;