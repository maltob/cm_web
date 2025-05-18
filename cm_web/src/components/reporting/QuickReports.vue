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

onMounted(async () =>  {
    
    
});



const sampleQueries = ref();


</script>


<template>


<div v-if="sampleQueries">
  <h1 class="text-xl font-bold pt-4">Quick Queries</h1>
  
</div>

</template>