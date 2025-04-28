<script setup lang="ts">
import { CMRestService } from '@/service/CMRestService';
import { ref, onMounted  } from 'vue';
import { Panel } from 'primevue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
const props = defineProps({
    resourceID: Number

})


onMounted(() => {
    let resourceID = 0
    

    if(props.resourceID) {
        resourceID = (props.resourceID)
    }
    CMRestService.getDeviceQuickFixEngineering(resourceID).then((data) => (data.json().then(v => {
        quickFixes.value = v.value

    }
    
    )));




});
const quickFixes = ref();
</script>
<template >
    <!-- This class isn't a default one to have in hardware inventory - check if any are found before reporting this-->
<Panel header='Installed Quick Fixes' toggleable v-if="quickFixes && quickFixes.length > 0">
    <DataTable :value="quickFixes" stripedRows tableStyle="min-width: 50rem">
        <Column field="HotFixID" header="Update ID"></Column>
        <Column field="Description" header="Description"></Column>
        <Column field="InstalledOn" header="Installed Date"></Column>
    </DataTable>
</Panel>
</template>