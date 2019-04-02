<template>
  <div>
    <div v-for="item in items" :key="item.device.id">
      <div v-if="item.deviceType === 'PatchPanel'">
        <div class="primary--text title">Patch Panel</div>
        <DisplayInfoPatchPanel :item="item.device" :extend="extend" :masterBtn="masterBtn">
          <slot></slot>
        </DisplayInfoPatchPanel>
      </div>

      <div v-if="item.deviceType === 'RoomSocket'">
        <div class="primary--text title">Room Socket</div>
        <slot></slot>
      </div>

      <div v-if="item.deviceType === 'Switch'">
        <div class="primary--text title">Switch</div>
        <DisplayInfoSwitch :item="item.device" :extend="extend" :masterBtn="masterBtn">
          <slot></slot>
        </DisplayInfoSwitch>
      </div>

      <div v-if="item.deviceType === 'Router'">
        <div class="primary--text title">Router</div>
      </div>

      <div v-if="item.deviceType === 'Server'">
        <div class="primary--text title">Server</div>
      </div>

      <div v-if="item.deviceType === 'Printer'">
        <div class="primary--text title">Printer</div>
      </div>

      <div v-if="item.deviceType === 'AccessPoint'">
        <div class="primary--text title">Access Point</div>
      </div>

      <div v-if="item.deviceType === 'IPPhone'">
        <div class="primary--text title">IP Phone</div>
      </div>
    </div>
  </div>
</template>

<script>
import DisplayInfoPatchPanel from "@/components/displayInfo/DisplayInfoPatchPanel.vue";
import DisplayInfoSwitch from "@/components/displayInfo/DisplayInfoSwitch.vue";

export default {
  props: ["items", "extend", "masterBtn"],
  components: {
    DisplayInfoPatchPanel,
    DisplayInfoSwitch
  }
};
</script>

<style>
</style>
