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
    CMRestService.getDeviceConsoleUsers(resourceID).then((data) => (data.json().then(v => {
        deviceConsoleUsers.value = v.value
    }
    )
));



});
const deviceConsoleUsers = ref();
</script>
<template >
<div v-if="deviceConsoleUsers" >

    <h1 class="text-xl font-bold pt-4">Most Recent User(s) </h1>

    <DataTable :value="deviceConsoleUsers" stripedRows tableStyle="min-width: 50rem" sortField="LastConsoleUse" :sortOrder="-1" paginator :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]">
        <Column field="SystemConsoleUser" header="User"></Column>
        <Column field="NumberOfConsoleLogons" header="Number of Logons"></Column>
        <Column field="LastConsoleUse" header="Last Use"></Column>
        <Column field="TotalUserConsoleMinutes" header="Total Time (min)"></Column>
        </DataTable>

    
</div>
</template>