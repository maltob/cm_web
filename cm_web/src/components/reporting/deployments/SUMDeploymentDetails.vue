<script setup lang="ts">
import { CMRestService } from '@/service/CMRestService';
import { onMounted, ref } from 'vue';
import { DataTable, Column } from 'primevue';

import Tag from 'primevue/tag';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import { FilterMatchMode } from '@primevue/core/api';

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


const filters = ref({
    StatusType: { value: null, matchMode: FilterMatchMode.EQUALS },
    DeviceName: { value: null, matchMode: FilterMatchMode.CONTAINS },
    StatusDescription: { value: null, matchMode: FilterMatchMode.CONTAINS }
});


const appStatusTypeLookup = ["All","Success 🟩","In Progress 🟨","Requirements Not Met 🟦","Unknown ❔","Error 🟥"]
const deploymentDetails = ref();
const appStatusTypeStr = ref();
const statuses = ref([1,2,4,5]);
</script>

<template>
<div v-if="deploymentDetails && deploymentDetails[0]" >
    
    <h1 class="text-xl font-bold pt-4">Software Update Deployment Details for <span class="font-extrabold">{{ deploymentDetails[0].AssignmentName }}</span> to <router-link class="underline" :to="{ name: 'devicecollection', params: { collectionID: deploymentDetails[0].CollectionID } }">{{ deploymentDetails[0].CollectionName }}</router-link><span v-if="props.statusType"> with a status of {{ appStatusTypeStr }}</span></h1>

    <DataTable :value="deploymentDetails" stripedRows tableStyle="min-width: 50rem"  v-model:filters="filters" filterDisplay="row">
        <Column field="DeviceName" header="DeviceName">
            <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" placeholder="Search by device name" />
                </template>
            </Column>
        <Column field="StatusDescription" header="StatusDescription">
            <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" placeholder="Search by status text" />
                </template>
        </Column>
        <Column field="StatusType" header="Status" :showFilterMenu="false">
        <template #body="slotProps">
            {{appStatusTypeLookup[slotProps.data.StatusType]}}
        </template>
        <template #filter="{ filterModel, filterCallback }">
        <Select v-model="filterModel.value" @change="filterCallback()" :options="statuses" placeholder="Select One" style="min-width: 12rem" :showClear="true" filterField="StatusType">
                    <template #option="slotProps">
                        <Tag :value="slotProps.option" >
                            {{appStatusTypeLookup[slotProps.option]}}
                        </Tag>
                    </template>
                    <template #value="slotProps">
                        <div v-if="slotProps.value" class="flex items-center">
                            {{appStatusTypeLookup[slotProps.value]}}
                        </div>
                        <div v-else>
                            All
                        </div>
                    </template>
                </Select>
            </template>
        </Column>       
        <Column field="LastComplianceMessageDesc" header="LastComplianceMessageDesc"></Column>
        </DataTable>

    
</div>
<h1 v-else>No details found for deployment, maybe no clients have reported their status back or a summarization hasn't occured.</h1>
</template>
