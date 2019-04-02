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
        <DisplayInfoRoomSocket :item="item.device" :extend="extend" :masterBtn="masterBtn">
          <slot></slot>
        </DisplayInfoRoomSocket>
      </div>

      <div v-if="item.deviceType === 'Switch'">
        <div class="primary--text title">Switch</div>
        <DisplayInfoSwitch :item="item.device" :extend="extend" :masterBtn="masterBtn">
          <slot></slot>
        </DisplayInfoSwitch>
      </div>

      <!-- <div v-if="item.deviceType === 'Router'">
        <div class="primary--text title">Router</div>
                <DisplayInfoServer :item="item.device" :extend="extend" :masterBtn="masterBtn">
          <slot></slot>
        </DisplayInfoServer>
      </div>-->

      <div v-if="item.deviceType === 'Server'">
        <div class="primary--text title">Server</div>
        <DisplayInfoServer :item="item.device" :extend="extend" :masterBtn="masterBtn">
          <slot></slot>
        </DisplayInfoServer>
      </div>

      <div v-if="item.deviceType === 'Printer'">
        <div class="primary--text title">Printer</div>
        <DisplayInfoPrinter :item="item.device" :extend="extend" :masterBtn="masterBtn">
          <slot></slot>
        </DisplayInfoPrinter>
      </div>

      <div v-if="item.deviceType === 'AccessPoint'">
        <div class="primary--text title">Access Point</div>
        <DisplayInfoAccessPoint :item="item.device" :extend="extend" :masterBtn="masterBtn">
          <slot></slot>
        </DisplayInfoAccessPoint>
      </div>

      <div v-if="item.deviceType === 'IPPhone'">
        <div class="primary--text title">IP Phone</div>
        <DisplayInfoIPPhone :item="item.device" :extend="extend" :masterBtn="masterBtn">
          <slot></slot>
        </DisplayInfoIPPhone>
      </div>
    </div>
  </div>
</template>

<script>
import DisplayInfoPatchPanel from "@/components/displayInfo/DisplayInfoPatchPanel.vue";
import DisplayInfoRoomSocket from "@/components/displayInfo/DisplayInfoRoomSocket.vue";
import DisplayInfoSwitch from "@/components/displayInfo/DisplayInfoSwitch.vue";
import DisplayInfoServer from "@/components/displayInfo/DisplayInfoServer.vue";
import DisplayInfoPrinter from "@/components/displayInfo/DisplayInfoPrinter.vue";
import DisplayInfoAccessPoint from "@/components/displayInfo/DisplayInfoAccessPoint.vue";
import DisplayInfoIPPhone from "@/components/displayInfo/DisplayInfoIPPhone.vue";

export default {
  props: ["items", "extend", "masterBtn"],
  components: {
    DisplayInfoPatchPanel,
    DisplayInfoRoomSocket,
    DisplayInfoSwitch,
    DisplayInfoServer,
    DisplayInfoPrinter,
    DisplayInfoAccessPoint,
    DisplayInfoIPPhone
  }
};
</script>

<style>
</style>
