<script setup lang="ts">
const props = defineProps({
    appModel: String
})
import { ref, onMounted  } from 'vue';
import { CMRestService } from '@/service/CMRestService';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
onMounted(() => {
    let appModel = '';
    if(props.appModel) {
      appModel = props.appModel
    }
    CMRestService.getApplicationLatestDeploymentTypes(appModel).then((data) => (data.json().then(v => (deploymentTypes.value = v.value))));


});

const deploymentTypes = ref();

</script>

<template>
<div v-if="deploymentTypes">

    <DataTable :value="deploymentTypes" tableStyle="min-width: 50rem" >

    <Column field="LocalizedDisplayName" header="Name"></Column>
    <Column field="PriorityInLatestApp" header="Priority">
      <template #body="slotProps">
      {{ slotProps.data.PriorityInLatestApp }}
    </template>
    </Column>
    <Column field="CreatedBy" header="Created By"  class="max-lg:hidden"></Column>
    <Column field="DateCreated" header="Creation Date"  class="max-lg:hidden"></Column>
  </DataTable>

</div>
</template>