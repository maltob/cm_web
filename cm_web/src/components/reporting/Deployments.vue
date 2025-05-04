<script setup lang="ts">

import { ref, onMounted, watch  } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { CMRestService } from '@/service/CMRestService';
import DeploymentStatusChart from './deployments/deploymentStatusChart.vue';


import Tag from 'primevue/tag';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import { FilterMatchMode } from '@primevue/core/api';

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

const filters = ref({
  FeatureType: { value: null, matchMode: FilterMatchMode.EQUALS },
  DesiredConfigType: { value: null, matchMode: FilterMatchMode.EQUALS },
  ApplicationName: { value: null, matchMode: FilterMatchMode.CONTAINS },
  CollectionName: { value: null, matchMode: FilterMatchMode.CONTAINS }
});


const featureTypeLookup = ref(["_0","Application","Program","Mobile Program","Script","Software Update","Baseline","Task Sequence","_8","_9","_10","Configuration Policy"]);
const featureTypeOptions = ref([1,2,3,4,5,6,7,11]);

const desiredConfigTypeLookup = ref(["_","Install 🟩","Uninstall 🟥"])
</script>


<template>


<div v-if="deployments">
  <h1 class="text-xl font-bold pt-4">Deployments</h1>

<DataTable :value="deployments"  stripedRows tableStyle="min-width: 50rem" :rowClass="deploymentRowStyle" v-model:filters="filters" filterDisplay="row">
    <Column field="ApplicationName" header="Application"> 
      <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" placeholder="Search by application name" />
                </template>
    </Column>
    <Column field="DesiredConfigType" header="DesiredConfigType">
        <template #body="slotProps">
          {{desiredConfigTypeLookup[slotProps.data.DesiredConfigType]}}
      </template>
      <template #filter="{ filterModel, filterCallback }">
        <Select v-model="filterModel.value" @change="filterCallback()" :options="[1,2]" placeholder="Select One" style="min-width: 12rem" :showClear="true" filterField="DesiredConfigType">
        <template #option="slotProps">
                              {{desiredConfigTypeLookup[slotProps.option]}}
              </template>
              <template #value="slotProps">
                        <div v-if="slotProps.value" class="flex items-center">
                            {{desiredConfigTypeLookup[slotProps.value]}}
                        </div>
                        <div v-else>
                            Any
                        </div>
               </template>
            </Select>
          </template>
    </Column>
    <Column field="CollectionName" header="Collection">
      <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" placeholder="Search by collection" />
                </template>
    </Column>
    <Column field="DeploymentTime" header="Deployment Time"></Column>
    <Column field="FeatureType" header="FeatureType">
        <<template #body="slotProps">
        {{featureTypeLookup[slotProps.data.FeatureType]}}
       </template>
       <template #filter="{ filterModel, filterCallback }">
        <Select v-model="filterModel.value" @change="filterCallback()" :options="featureTypeOptions" placeholder="Select One" style="min-width: 12rem" :showClear="true" filterField="FeatureType">
                    <template #option="slotProps">
                            {{featureTypeLookup[slotProps.option]}}
                    </template>
                    <template #value="slotProps">
                        <div v-if="slotProps.value" class="flex items-center">
                            {{featureTypeLookup[slotProps.value]}}
                        </div>
                        <div v-else>
                            All
                        </div>
                    </template>
                </Select>
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