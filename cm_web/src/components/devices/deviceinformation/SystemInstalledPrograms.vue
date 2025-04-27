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
    CMRestService.getDeviceAddRemove(resourceID).then((data) => (data.json().then(v => {
        programs.value.push( ...v.value)
        loadedClasses.value++
        console.log(loadedClasses)
    }
    
    )));

    CMRestService.getDeviceAddRemove64(resourceID).then((data) => (data.json().then(v => {
        programs.value.push( ...v.value)
        
        loadedClasses.value++
        console.log(programs)
    }
    
    )));


});
const programs = ref(Array<any>());
const loadedClasses = ref(0)
</script>
<template >
<Panel header='Installed Programs' toggleable v-if="loadedClasses == 2">
    <DataTable :value="programs" stripedRows tableStyle="min-width: 50rem">
        <Column field="DisplayName" header="Name">
        <template #body="slotProps">
            <span v-if="slotProps.data.DisplayName">{{ slotProps.data.DisplayName }}</span>
            <span v-else>{{ slotProps.data.ProdID }}</span>
        </template>
        </Column>
        <Column field="Publisher" header="Publisher"></Column>
        <Column field="Version" header="Version"></Column>
        <Column field="InstallDate" header="InstallDate"></Column>
    </DataTable>
</Panel>
</template>