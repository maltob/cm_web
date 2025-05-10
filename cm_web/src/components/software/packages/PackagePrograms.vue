<script setup lang="ts">
const props = defineProps({
    packageID: String
})
import { ref, onMounted  } from 'vue';
import { CMRestService } from '@/service/CMRestService';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
onMounted(() => {
    let packageID = '';
    if(props.packageID) {
      packageID = props.packageID
    }
    CMRestService.getPackagePrograms(packageID).then((data) => (data.json().then(v => (packagePrograms.value = v.value))));


});

const packagePrograms = ref();

</script>

<template> 
<div v-if="packagePrograms">

    <DataTable :value="packagePrograms" tableStyle="min-width: 10rem" sortField="ProgramName" :sortOrder="1">

    <Column field="ProgramName" header="ProgramName"></Column>
    <Column field="CommandLine" header="Command Line"  class="max-lg:hidden"></Column>
  </DataTable>

</div>
</template>