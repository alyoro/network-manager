<template>
  <div>
    <div v-for="item in items" :key="item.device.id">
      <div v-if="item.deviceType === 'PATCH_PANEL'">
              <div class="primary--text title">Patch Panel</div>
              <DisplayInfoPatchPanel :item="item.device" :extend="extend" :masterBtn="masterBtn">
                <slot></slot>
              </DisplayInfoPatchPanel>
      </div>

      <div v-if="item.deviceType === 'ROOM_SOCKET'">
        <div class="primary--text title">Room Socket</div>
                <slot></slot>
      </div>

      <div v-if="item.deviceType === 'SWITCH'">
        <div class="primary--text title">Switch</div>
      </div>

      <div v-if="item.deviceType === 'ROUTER'">
        <div class="primary--text title">Router</div>
      </div>

      <div v-if="item.deviceType === 'SERVER'">
        <div class="primary--text title">Server</div>
      </div>

      <div v-if="item.deviceType === 'PRINTER'">
        <div class="primary--text title">Printer</div>
      </div>

      <div v-if="item.deviceType === 'ACCESS_POINT'">
        <div class="primary--text title">Access Point</div>
      </div>

      <div v-if="item.deviceType === 'IP_PHONE'">
        <div class="primary--text title">IP Phone</div>
      </div>
    </div>
  </div>
</template>

<script>
import DisplayInfoPatchPanel from "@/components/displayInfo/DisplayInfoPatchPanel.vue";

export default {
  props: ['items', 'extend' , 'masterBtn'],
  components: {
    DisplayInfoPatchPanel
  }
};
</script>

<style>
</style>
