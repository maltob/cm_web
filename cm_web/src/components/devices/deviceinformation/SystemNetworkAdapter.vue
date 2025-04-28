<script setup lang="ts">
import { CMRestService } from '@/service/CMRestService';
import { ref, onMounted  } from 'vue';
import SystemNetworkAdapterConfiguration from './SystemNetworkAdapterConfiguration.vue';
import { DataTable, Column } from 'primevue';
const props = defineProps({
    resourceID: Number

})


onMounted(() => {
    let resourceID = 0
    

    if(props.resourceID) {
        resourceID = (props.resourceID)
    }
    CMRestService.getDeviceNetworkAdapter(resourceID).then((data) => (data.json().then(v => {
        networkAdapters.value = v.value
    }
    )
));



});
const networkAdapters = ref();
</script>


<template >
<div v-if="networkAdapters" >

    <h1 class="text-xl font-bold pt-4">Network Adapter(s)</h1>
       
       <DataTable :value="networkAdapters" stripedRows tableStyle="min-width: 50rem">
        <Column field="Manufacturer" header="Manufacturer"></Column>
        <Column field="Name" header="Name"></Column>
        <Column field="Speed" header="Speed"></Column>
        <Column field="MACAddress" header="MACAddress"></Column>
        <Column field="ServiceName" header="ServiceName"></Column>
        <Column field="Config" header="Config" >
            <template #body="slotProps">
                <SystemNetworkAdapterConfiguration v-if="slotProps.data.MACAddress" :resourceID=props.resourceID :MACAddress=slotProps.data.MACAddress></SystemNetworkAdapterConfiguration>

            </template>
        </Column>
        
        
        </DataTable>

        
        

</div>
</template>