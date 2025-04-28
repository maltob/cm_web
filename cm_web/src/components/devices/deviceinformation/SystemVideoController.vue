<script setup lang="ts">
import { CMRestService } from '@/service/CMRestService';
import { ref, onMounted  } from 'vue';
import { DataTable, Column } from 'primevue';
const props = defineProps({
    resourceID: Number

})


onMounted(() => {
    let resourceID = 0
    

    if(props.resourceID) {
        resourceID = (props.resourceID)
    }
    CMRestService.getDeviceVideoController(resourceID).then((data) => (data.json().then(v => {
        deviceVideoControllers.value = v.value
    }
    )
));



});
const deviceVideoControllers = ref();
</script>
<template >
<div v-if="deviceVideoControllers" >

    <h1 class="text-xl font-bold pt-4">Video Controller(s) </h1>

    <DataTable :value="deviceVideoControllers" stripedRows tableStyle="min-width: 50rem">
        <Column field="Name" header="Name"></Column>
        <Column field="Description" header="Description"></Column>
        <Column field="VideoModeDescription" header="VideoModeDescription"></Column>
        <Column field="DriverVersion" header="DriverVersion"></Column>
        <Column field="DriverDate" header="DriverDate"></Column>
        <Column field="MaxRefreshRate" header="MaxRefreshRate"></Column>
        </DataTable>

    
</div>
</template>