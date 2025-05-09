<script setup lang="ts">
const props = defineProps({
    CI_ID: Number
})
import { ref, onMounted, watch  } from 'vue';
import { CMRestService } from '@/service/CMRestService';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import DeploymentStatusChart from '../../reporting/deployments/deploymentStatusChart.vue';
onMounted(() => {
    
    CMRestService.getDeploymentSummaries(props.CI_ID).then((data) => (data.json().then(v => (deployments.value = v.value))));


});

const deployments = ref();
const desiredConfigTypeLookup = ref(["_","Install 🟩","Uninstall 🟥"])

</script>

<template>
<div v-if="deployments">

    <DataTable :value="deployments" tableStyle="min-width: 10rem" >

    <Column field="DesiredConfigType" header="DesiredConfigType">
        <template #body="slotProps">
          {{desiredConfigTypeLookup[slotProps.data.DesiredConfigType]}}
      </template>
    </Column>
    <Column field="CollectionName" header="Collection"></Column>
    <Column field="DeploymentTime" header="Deployment Time"></Column>
    <Column field="NumberErrors" header="Errors"  class="max-lg:hidden">
      <template #body="slotProps">
      <router-link class="underline" :to="{ name: 'deploymentWithStatusType', params: { assignmentID: slotProps.data.AssignmentID, appStatusType: 5 } }" v-if="slotProps.data.FeatureType == 1">{{ slotProps.data.NumberErrors }}</router-link>
      <span v-else>{{ slotProps.data.NumberErrors }}</span>
    </template>
    </Column>
    <Column field="NumberInProgress" header="Progress"  class="max-lg:hidden">
      <template #body="slotProps">
      <router-link class="underline" :to="{ name: 'deploymentWithStatusType', params: { assignmentID: slotProps.data.AssignmentID, appStatusType: 2 } }" v-if="slotProps.data.FeatureType == 1">{{ slotProps.data.NumberInProgress }}</router-link>
      <span v-else>{{ slotProps.data.NumberInProgress }}</span>

    </template>
    </Column>
    <Column field="NumberOther" header="Other Status"  class="max-lg:hidden">
      <template #body="slotProps">
      <router-link class="underline" :to="{ name: 'deploymentWithStatusType', params: { assignmentID: slotProps.data.AssignmentID, appStatusType: 4 } }" v-if="slotProps.data.FeatureType == 1">{{ slotProps.data.NumberOther }}</router-link>
      <span v-else>{{ slotProps.data.NumberOther }}</span>

    </template>
  </Column>
    <Column field="NumberSuccess" header="Success" >
      <template #body="slotProps">
      <router-link class="underline" :to="{ name: 'deploymentWithStatusType', params: { assignmentID: slotProps.data.AssignmentID, appStatusType: 1 } }" v-if="slotProps.data.FeatureType == 1">{{ slotProps.data.NumberSuccess }}</router-link>
      <span v-else>{{ slotProps.data.NumberSuccess }}</span>

    </template>
    </Column>
    <Column field="NumberTargeted" header="Total" >
    <template #body="slotProps">
      <router-link class="underline" :to="{ name: 'deployment', params: { assignmentID: slotProps.data.AssignmentID } }" v-if="slotProps.data.FeatureType == 1">{{ slotProps.data.NumberTargeted }}</router-link>
      <span v-else>{{ slotProps.data.NumberTargeted }}</span>
    </template>
  </Column>
    <Column header="SummarizationStatus" class="max-lg:hidden">
        <template #body="slotProps">
         <DeploymentStatusChart :errors="slotProps.data.NumberErrors" :inprogress="slotProps.data.NumberInProgress" :other="slotProps.data.NumberOther" :success="slotProps.data.NumberSuccess" :unknown="slotProps.data.NumberUnknown"></DeploymentStatusChart>
        </template>
    </Column>
  </DataTable>

</div>
</template>