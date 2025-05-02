<script setup lang="ts">
import { CMRestService } from '@/service/CMRestService';
import { onMounted, ref } from 'vue';
import { DataTable, Column } from 'primevue';

const props = defineProps({
    assignmentID: Number,
    appStatusType: Number
})

onMounted(() => {
    let assignmentID = 0
    

    if(props.assignmentID) {
        assignmentID = (props.assignmentID)
    }

    if(props.appStatusType) {
        CMRestService.getDeploymentDetails(assignmentID,props.appStatusType).then((data) => (data.json().then(v => (deploymentDetails.value = v.value))));
        appStatusTypeStr.value = appStatusTypeLookup[props.appStatusType]
    }else{
        CMRestService.getDeploymentDetails(assignmentID).then((data) => (data.json().then(v => (deploymentDetails.value = v.value))));
    }
    


});
const appStatusTypeLookup = ["All","Success 🟩","In Progress 🟨","Requirements Not Met 🟦","Unknown ❔","Error 🟥"]
const deploymentDetails = ref();
const appStatusTypeStr = ref();
</script>

<template>
<div v-if="deploymentDetails && deploymentDetails[0]" >
    
    <h1 class="text-xl font-bold pt-4">Deployment Details for <span class="font-extrabold">{{ deploymentDetails[0].AppName }}</span> to <router-link class="underline" :to="{ name: 'devicecollection', params: { collectionID: deploymentDetails[0].CollectionID } }">{{ deploymentDetails[0].CollectionName }}</router-link><span v-if="props.appStatusType"> with a status of {{ appStatusTypeStr }}</span></h1>

    <DataTable :value="deploymentDetails" stripedRows tableStyle="min-width: 50rem">
        <Column field="MachineName" header="MachineName"></Column>
        <Column field="MachineID" header="MachineID"></Column>
        <Column field="AppStatusType" header="AppStatusType">
       <template #body="slotProps">
        {{appStatusTypeLookup[slotProps.data.AppStatusType]}}
       </template> 
        </Column>       
        <Column field="Technology" header="Technology"></Column>
        </DataTable>

    
</div>
<h1 v-else>No details found for deployment, maybe no clients have reported their status back or a summarization hasn't occured.</h1>
</template>
