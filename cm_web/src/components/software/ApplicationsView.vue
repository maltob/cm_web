<script setup lang="ts">
const props = defineProps({
  filter: String
})
import { ref, onMounted, watch  } from 'vue';
import { useRoute,useRouter } from 'vue-router'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import IconDeviceCollection from '@/components/icons/IconDeviceCollection.vue';
import { CMRestService } from '@/service/CMRestService';
import { FilterMatchMode } from '@primevue/core/api';
import InputText from 'primevue/inputtext';
import InputIcon from 'primevue/inputicon';
import { useToast } from 'primevue/usetoast';
import Toast from 'primevue/toast';



const router = useRouter();

const toast = useToast();

const filters = ref({
  global: { value: '', matchMode: FilterMatchMode.CONTAINS },
});

onMounted(() => {
    let filter = ''
    if(props.filter) {
      filter = props.filter
    }
    filters.value = {global: { value: filter, matchMode: FilterMatchMode.CONTAINS },}

    CMRestService.getApplicationLatest().then((data) => (data.json().then(v => (applications.value = v.value))));


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
    filters.value = {global: { value: nFilter, matchMode: FilterMatchMode.CONTAINS },}
    CMRestService.getApplicationLatest().then((data) => (data.json().then(v => (applications.value = v.value))));

  }
)

const applications = ref();


</script>

<template >
  <Toast />
    <IconDeviceCollection />
  <DataTable :value="applications" stripedRows tableStyle="min-width: 10rem"  v-model:filters="filters" filterDisplay="row">
    <template #header>
                <div class="flex justify-end">
                        <InputText v-model="filters['global'].value" placeholder="Search" />
                </div>
            </template>
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
