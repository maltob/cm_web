<script setup lang="ts">
const props = defineProps({
  resourceID: Number 
})

import { ref, onMounted, watch  } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { useRoute } from 'vue-router';
import { CMRestService } from '@/service/CMRestService';
import SystemInfo from './deviceinformation/SystemInfo.vue';
import OperatingSystemInfo from './deviceinformation/SystemOperatingSystemInfo.vue';
import SoftwareInstalledPrograms from './deviceinformation/SystemInstalledPrograms.vue';
import SystemHardwareInfo from './deviceinformation/SystemHardwareInfo.vue';
import SystemInstalledQuickFixes from './deviceinformation/SystemInstalledQuickFixes.vue';
import SystemInstalledFeatures from './deviceinformation/SystemInstalledFeatures.vue';


onMounted(() => {
   

});

//Check for the URL being manually edited
const route = useRoute()
watch(
  () => route.params.resourceID,
  (newResourceID, oldResourceID) => {
    
    
  }
)




</script>

<template>
  <Toast />
  <SystemInfo :resourceID=props.resourceID ></SystemInfo>
  <OperatingSystemInfo :resourceID=props.resourceID ></OperatingSystemInfo>
  <SoftwareInstalledPrograms :resourceID=props.resourceID ></SoftwareInstalledPrograms>
  <SystemInstalledQuickFixes :resourceID=props.resourceID></SystemInstalledQuickFixes>
  <SystemInstalledFeatures :resourceID=props.resourceID></SystemInstalledFeatures>
  <SystemHardwareInfo :resourceID=props.resourceID></SystemHardwareInfo>

  <!--
   Quick Fix Engineering (Updates)
   Features
   Hardware
   Messages?
   Deployments?
  -->
</template>