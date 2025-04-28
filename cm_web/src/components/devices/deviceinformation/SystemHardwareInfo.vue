 <script setup lang="ts">
 const props = defineProps({
   resourceID: Number 
 })
 
 import { ref, onMounted, watch  } from 'vue';
 import { useRoute } from 'vue-router';
 import { Panel } from 'primevue';
import SystemHardwareProcessorInfo from './SystemHardwareProcessorInfo.vue';
import SystemHardwareMemoryInfo from './SystemHardwareMemoryInfo.vue';
import SystemHardwareDiskInfo from './SystemHardwareDiskInfo.vue';
import SystemHardwareLogicalDiskInfo from './SystemHardwareLogicalDiskInfo.vue';
import SystemHardwareBIOSInfo from './SystemHardwareBIOSInfo.vue';
import SystemNetworkAdapter from './SystemNetworkAdapter.vue';
import SystemVideoController from './SystemVideoController.vue';
 </script>


<template>
<Panel header='System Hardware' toggleable>
 <SystemHardwareProcessorInfo :resourceID=props.resourceID></SystemHardwareProcessorInfo>
 <SystemHardwareBIOSInfo :resourceID=props.resourceID></SystemHardwareBIOSInfo>
 <SystemHardwareMemoryInfo :resourceID=props.resourceID></SystemHardwareMemoryInfo>
 <SystemHardwareDiskInfo :resourceID=props.resourceID></SystemHardwareDiskInfo>
 <SystemHardwareLogicalDiskInfo :resourceID=props.resourceID></SystemHardwareLogicalDiskInfo>
 <SystemNetworkAdapter :resourceID=props.resourceID></SystemNetworkAdapter>
 <SystemVideoController :resourceID=props.resourceID></SystemVideoController>
</Panel>

</template>

<!--
// TODO - Mainboard
-->