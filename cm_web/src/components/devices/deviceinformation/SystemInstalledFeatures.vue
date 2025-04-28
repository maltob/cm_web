<script setup lang="ts">
import { CMRestService } from '@/service/CMRestService';
import { ref, onMounted  } from 'vue';
import { Panel } from 'primevue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { FilterMatchMode } from '@primevue/core/api';
const props = defineProps({
    resourceID: Number

})


onMounted(() => {
    let resourceID = 0
    

    if(props.resourceID) {
        resourceID = (props.resourceID)
    }
    CMRestService.getDeviceOptionalFeature(resourceID).then((data) => (data.json().then(v => {
        optionalFeatures.value = v.value.filter((feature: { InstallState: number; }) => feature.InstallState == 1)

    }
    
    )));




});
const optionalFeatures = ref();

</script>
<template >
<Panel header='Installed Features' toggleable v-if="optionalFeatures">

    
    <DataTable :value="optionalFeatures"  stripedRows tableStyle="min-width: 50rem" sortField="Caption" :sortOrder="1" paginator :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]">
        <Column field="Caption" header="Caption"></Column>
        <Column field="Name" header="Name"></Column>
    </DataTable>
</Panel>


</template>