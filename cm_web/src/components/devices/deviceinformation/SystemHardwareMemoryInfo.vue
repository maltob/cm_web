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
    CMRestService.getDevicePhysicalMemory(resourceID).then((data) => (data.json().then(v => {
        deviceMemory.value = v.value
    }
    )
));



});
const deviceMemory = ref();
</script>
<template >
<div v-if="deviceMemory" >

    <h1 class="text-xl font-bold pt-4">Memory Module(s) </h1>

    <DataTable :value="deviceMemory" stripedRows tableStyle="min-width: 50rem">
        <Column field="Manufacturer" header="Manufacturer"></Column>
        <Column field="PartNumber" header="PartNumber"></Column>
        <Column field="Size" header="Size">
        <template #body="slotProps">
            <!-- Oddly enough  this seems to be non standard ; One maching is in bytes and another in MB ; assume if over 1,000,000 that is in bytes -->
            <div  v-if="Number(slotProps.data.Capacity)>1_000_000">{{Number(slotProps.data.Capacity)/(1024*1024*1024)}} MB</div>
                <div  v-else>{{Number(slotProps.data.Capacity)}} MB</div>
        </template>
        </Column>
        <Column field="Speed" header="Speed"></Column>
        </DataTable>

    
</div>
</template>