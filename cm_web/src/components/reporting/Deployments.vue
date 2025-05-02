<script setup lang="ts">

import { ref, onMounted, watch  } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { CMRestService } from '@/service/CMRestService';
import DeploymentStatusChart from './deployments/deploymentStatusChart.vue';

onMounted(() => {
    
    CMRestService.getDeploymentSummaries().then((data) => (data.json().then(v => (deployments.value = v.value))));


});


const deploymentRowStyle = (data: any) => {
  if (data.NumberTargeted > 0 && data.NumberSuccess == data.NumberTargeted) {
        return  '!bg-green-100' ;
    }

    if (data.NumberTargeted > 0 && data.NumberErrors == data.NumberTargeted) {
        return  '!bg-red-100' ;
    }
    
};


const deployments = ref();



</script>


<template>


<div v-if="deployments">
  <h1 class="text-xl font-bold pt-4">Deployments</h1>

<DataTable :value="deployments"  stripedRows tableStyle="min-width: 50rem" :rowClass="deploymentRowStyle">
    <Column field="ApplicationName" header="Application"> </Column>
    <Column field="DesiredConfigType" header="DesiredConfigType">
        <template #body="slotProps">
            <span v-if="slotProps.data.DesiredConfigType == 1">Install 🟩</span>
            <span v-if="slotProps.data.DesiredConfigType == 2">Remove 🟥</span>
      </template>
    </Column>
    <Column field="CollectionName" header="Collection"></Column>
    <Column field="DeploymentTime" header="Deployment Time"></Column>
    <Column field="FeatureType" header="FeatureType">
        <template #body="slotProps">
            <span v-if="slotProps.data.FeatureType == 1">Application</span>
            <span v-if="slotProps.data.FeatureType == 2">Program</span>
            <span v-if="slotProps.data.FeatureType == 3">Mobile Program</span>
            <span v-if="slotProps.data.FeatureType == 4">Script</span>
            <span v-if="slotProps.data.FeatureType == 5">Software Update</span>
            <span v-if="slotProps.data.FeatureType == 6">Baseline</span>
            <span v-if="slotProps.data.FeatureType == 7">Task Sequence</span>
            <span v-if="slotProps.data.FeatureType == 11">Configuration Policy</span>
      </template>
    </Column>
    <Column field="NumberErrors" header="Errors">
      <template #body="slotProps">
      <router-link class="underline" :to="{ name: 'deploymentWithStatusType', params: { assignmentID: slotProps.data.AssignmentID, appStatusType: 5 } }" v-if="slotProps.data.FeatureType == 1">{{ slotProps.data.NumberErrors }}</router-link>
      <span v-else>{{ slotProps.data.NumberErrors }}</span>
    </template>
    </Column>
    <Column field="NumberInProgress" header="Progress">
      <template #body="slotProps">
      <router-link class="underline" :to="{ name: 'deploymentWithStatusType', params: { assignmentID: slotProps.data.AssignmentID, appStatusType: 2 } }" v-if="slotProps.data.FeatureType == 1">{{ slotProps.data.NumberInProgress }}</router-link>
      <span v-else>{{ slotProps.data.NumberInProgress }}</span>

    </template>
    </Column>
    <Column field="NumberOther" header="Other Status">
      <template #body="slotProps">
      <router-link class="underline" :to="{ name: 'deploymentWithStatusType', params: { assignmentID: slotProps.data.AssignmentID, appStatusType: 4 } }" v-if="slotProps.data.FeatureType == 1">{{ slotProps.data.NumberOther }}</router-link>
      <span v-else>{{ slotProps.data.NumberOther }}</span>

    </template>
  </Column>
    <Column field="NumberSuccess" header="Success">
      <template #body="slotProps">
      <router-link class="underline" :to="{ name: 'deploymentWithStatusType', params: { assignmentID: slotProps.data.AssignmentID, appStatusType: 1 } }" v-if="slotProps.data.FeatureType == 1">{{ slotProps.data.NumberSuccess }}</router-link>
      <span v-else>{{ slotProps.data.NumberSuccess }}</span>

    </template>
    </Column>
    <Column field="NumberTargeted" header="Total">
    <template #body="slotProps">
      <router-link class="underline" :to="{ name: 'deployment', params: { assignmentID: slotProps.data.AssignmentID } }" v-if="slotProps.data.FeatureType == 1">{{ slotProps.data.NumberTargeted }}</router-link>
      <router-link class="underline" :to="{ name: 'sumdeployment', params: { assignmentID: slotProps.data.AssignmentID } }" v-else-if="slotProps.data.FeatureType == 5">{{ slotProps.data.NumberTargeted }}</router-link>
      <span v-else>{{ slotProps.data.NumberTargeted }}</span>

    </template>
  </Column>
    <Column header="SummarizationStatus">
        <template #body="slotProps">
         <DeploymentStatusChart :errors="slotProps.data.NumberErrors" :inprogress="slotProps.data.NumberInProgress" :other="slotProps.data.NumberOther" :success="slotProps.data.NumberSuccess" :unknown="slotProps.data.NumberUnknown"></DeploymentStatusChart>
        </template>
    </Column>
  </DataTable>
</div>

</template>