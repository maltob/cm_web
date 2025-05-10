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
import { useToast } from 'primevue/usetoast';
import Toast from 'primevue/toast';
import PackagePrograms from './packages/PackagePrograms.vue';


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

    CMRestService.getPackages().then((data) => (data.json().then(v => (packages.value = v.value))));


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
    CMRestService.getPackages().then((data) => (data.json().then(v => (packages.value = v.value))));

  }
)

const packages = ref();
const expandedRows = ref({});
</script>

<template >
  <h1>Packages</h1>
  <Toast />
    <IconDeviceCollection />
  <DataTable :value="packages" v-model:expandedRows="expandedRows" stripedRows tableStyle="min-width: 10rem"  v-model:filters="filters" filterDisplay="row">
    <template #header>
                <div class="flex justify-end">
                        <InputText v-model="filters['global'].value" placeholder="Search" />
                </div>
            </template>
            <Column expander style="width: 5rem" />
    <Column field="Name" header="Name"></Column>
    <Column field="NumOfPrograms" header="Programs"> </Column>
    <Column field="Manufacturer" header="Manufacturer" class="max-sm:hidden"></Column>
    <Column field="Description" header="Description" class="max-lg:hidden"></Column>
    <Column field="ObjectPath" header="Folder"  class="max-lg:hidden"></Column>
    <Column field="PackageID" header="UniqueID" class="max-lg:hidden"></Column>
    <template #expansion="slotProps">

      <div v-if="slotProps.data.NumOfPrograms > 0"><h1>Programs in {{ slotProps.data.Name }}</h1>
        <PackagePrograms :packageID="slotProps.data.PackageID"></PackagePrograms>
      </div>
     
      </template>
</DataTable>
</template>
