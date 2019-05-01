import { mapGetters } from "vuex";

const filteringPortsMixin = {
  props: {
    ports: {
      type: Array
    }
  },
  data() {
    return {
      activeFilter: "All"
    }
  },
  computed: {
    orderedPorts() {
      return _.orderBy(this.ports, "portNumber");
    },
    filteredPorts() {
      if (this.activeFilter === "All") {
        return this.orderedPorts;
      } else if (this.activeFilter === "Connected") {
        return this.orderedPorts.filter(port => {
          if (port.connections !== null) return port;
        });
      } else if (this.activeFilter === "Free") {
        return this.orderedPorts.filter(port => {
          if (port.connections === null) return port;
        });
      }
    },
    ...mapGetters({
      getNameByType: "getNameByType",
      getUrlByType: "getUrlByType",
    })
  },
  methods: {
    changeFilter(filter) {
      this.activeFilter = filter;
    },
  }
};

export default filteringPortsMixin;
