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
    CMRestService.getDeviceLogicalDisk(resourceID).then((data) => (data.json().then(v => {
        deviceDisks.value = v.value
    }
    )
));



});
const deviceDisks = ref();
</script>
<template >
<div v-if="deviceDisks" >

    <h1 class="text-xl font-bold pt-4">Storage Volumes</h1>


    <DataTable :value="deviceDisks" stripedRows tableStyle="min-width: 50rem">
        <Column field="Caption" header="Drive Letter"></Column>
        <Column field="VolumeName" header="Label"></Column>
        <Column field="Size" header="Size">
        <template #body="slotProps">
            <!-- this seems to be non standard  -->
            <div  v-if="Number(slotProps.data.Size)>(1024*1024)" >{{Math.round((Number(slotProps.data.Size)/(1024*1024))).toLocaleString()}} TB total</div>
            <div  v-else > {{(Number(slotProps.data.Size)/1024).toLocaleString()}} GB total</div>
        </template>
        </Column>
        <Column field="Free" header="Free">
        <template #body="slotProps">
            <!--  this seems to be non standard  -->
            <div  v-if="Number(slotProps.data.Size)>1024*1024*1024*1024" >{{Math.round((Number(slotProps.data.FreeSpace)/(1024*1024*1024*1024))).toLocaleString()}} GB </div>
            <div  v-else >{{(Number(slotProps.data.FreeSpace)/1024).toLocaleString()}} GB</div>
        </template>
        </Column>
        <Column field="FileSystem" header="FileSystem"></Column>
        </DataTable>

</div>
</template>