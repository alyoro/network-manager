const connectionMixim = {
  methods: {
    showConnections(item, direction) {
      if (direction == 'UP') {
        this.$store.dispatch("moduleConnections/fetchDevicesLvlUp", {item: item})
        this.$router.push({
          name: 'connect',
          params: {
            direction: direction
          }
        })
      } else {
        this.$store.dispatch("moduleConnections/fetchDevicesLvlDown", {item: item})
        this.$router.push({
          name: 'connect',
          params: {
            direction: direction
          }
        })
      }
    }
  },
}

export default connectionMixim;