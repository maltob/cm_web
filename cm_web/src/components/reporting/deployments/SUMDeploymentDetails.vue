<script setup lang="ts">
import { CMRestService } from '@/service/CMRestService';
import { onMounted, ref } from 'vue';
import { DataTable, Column } from 'primevue';

const props = defineProps({
    assignmentID: Number,
    statusType: Number
})

onMounted(() => {
    let assignmentID = 0
    

    if(props.assignmentID) {
        assignmentID = (props.assignmentID)
    }

    if(props.statusType) {
        CMRestService.getSUMDeploymentDetails(assignmentID,props.statusType).then((data) => (data.json().then(v => (deploymentDetails.value = v.value))));
        appStatusTypeStr.value = appStatusTypeLookup[props.statusType]
    }else{
        CMRestService.getSUMDeploymentDetails(assignmentID).then((data) => (data.json().then(v => (deploymentDetails.value = v.value))));
    }
    


});
const appStatusTypeLookup = ["All","Success 🟩","In Progress 🟨","Requirements Not Met 🟦","Unknown ❔","Error 🟥"]
const deploymentDetails = ref();
const appStatusTypeStr = ref();
</script>

<template>
<div v-if="deploymentDetails && deploymentDetails[0]" >
    
    <h1 class="text-xl font-bold pt-4">Software Update Deployment Details for <span class="font-extrabold">{{ deploymentDetails[0].AssignmentName }}</span> to <router-link class="underline" :to="{ name: 'devicecollection', params: { collectionID: deploymentDetails[0].CollectionID } }">{{ deploymentDetails[0].CollectionName }}</router-link><span v-if="props.statusType"> with a status of {{ appStatusTypeStr }}</span></h1>

    <DataTable :value="deploymentDetails" stripedRows tableStyle="min-width: 50rem">
        <Column field="DeviceName" header="DeviceName"></Column>
        <Column field="StatusDescription" header="StatusDescription"></Column>
        <Column field="StatusType" header="Status">
       <template #body="slotProps">
        {{appStatusTypeLookup[slotProps.data.StatusType]}}
       </template> 
        </Column>       
        <Column field="LastComplianceMessageDesc" header="LastComplianceMessageDesc"></Column>
        </DataTable>

    
</div>
<h1 v-else>No details found for deployment, maybe no clients have reported their status back or a summarization hasn't occured.</h1>
</template>
