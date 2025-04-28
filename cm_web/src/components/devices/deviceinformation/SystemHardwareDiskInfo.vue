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
    CMRestService.getDeviceDisks(resourceID).then((data) => (data.json().then(v => {
        deviceDisks.value = v.value
    }
    )
));



});
const deviceDisks = ref();
</script>
<template >
<div v-if="deviceDisks" >

    <h1 class="text-xl font-bold pt-4">Disk(s)</h1>

       
    <DataTable :value="deviceDisks" stripedRows tableStyle="min-width: 50rem">
        <Column field="Manufacturer" header="Manufacturer"></Column>
        <Column field="Model" header="Model"></Column>
        <Column field="Size" header="Size">
        <template #body="slotProps">

            <div  v-if="Number(slotProps.data.Size)>1024" >{{Math.round((Number(slotProps.data.Size)/1024)).toLocaleString()}} GB</div>
            <div  v-else >{{Number(slotProps.data.Size).toLocaleString()}} MB</div>
        </template>
        </Column>
        <Column field="DeviceID" header="DeviceID"></Column>
        </DataTable>



</div>
</template>