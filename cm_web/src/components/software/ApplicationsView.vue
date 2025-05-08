<script setup lang="ts">
const props = defineProps({
  filter: String
})
import { ref, onMounted, watch  } from 'vue';
import { useRoute } from 'vue-router'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Row from 'primevue/row';
import IconDeviceCollection from '@/components/icons/IconDeviceCollection.vue';
import { CMRestService } from '@/service/CMRestService';
import Button from 'primevue/button';
import { useToast } from 'primevue/usetoast';
import Toast from 'primevue/toast';
const toast = useToast();

onMounted(() => {
    let filter = ''
    if(props.filter) {
      filter = props.filter
    }
    CMRestService.getApplicationLatest(filter).then((data) => (data.json().then(v => (applications.value = v.value))));


});

const route = useRoute()
watch(
  () => route.params.filter,
  (newFilter, oldFilter) => {
    let nFilter = '';
    if( newFilter instanceof Array) {
      nFilter = newFilter[0];
    }else{
      nFilter= newFilter;
    }
    CMRestService.getApplicationLatest(nFilter).then((data) => (data.json().then(v => (applications.value = v.value))));

  }
)

const applications = ref();



</script>

<template >
  <Toast />
    <IconDeviceCollection />
  <DataTable :value="applications" stripedRows tableStyle="min-width: 10rem">
    <Column field="LocalizedDisplayName" header="Name">
    <template #body="slotProps">
      {{ slotProps.data.LocalizedDisplayName }} <span v-if="slotProps.data.IsExpired" area-label="Retired">🏖️</span>
    </template></Column>
    <Column field="NumberOfDeployments" header="Deployments"> </Column>
    <Column field="NumberOfDevicesWithApp" header="Devices with App Installed" class="max-sm:hidden"></Column>
    <Column field="NumberOfDeploymentTypes" header="Deployment Types" class="max-lg:hidden"></Column>
    <Column field="LocalizedDescription" header="Description" class="max-lg:hidden"></Column>
    <Column field="ObjectPath" header="Folder"  class="max-lg:hidden"></Column>
    <Column field="CI_UniqueID" header="UniqueID" class="max-lg:hidden"></Column>

</DataTable>
</template>
