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
const deviceProcessor = ref();
const deviceMemory = ref();
const deviceNIC = ref();
const deviceStorage = ref();
const deviceLogicalDisk = ref();
const deviceInstalledPrograms = ref();


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
</template>