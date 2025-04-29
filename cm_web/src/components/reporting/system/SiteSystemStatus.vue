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
    CMRestService.getSiteSystemState().then((data) => (data.json().then(v => (siteSystemStatus.value = v.value))));


});

const siteSystemStatus = ref();


</script>
<template>

<div v-if="siteSystemStatus">
  <h1 class="text-xl font-bold pt-4">Site Systems </h1>

<DataTable :value="siteSystemStatus"  stripedRows tableStyle="min-width: 50rem">
    <Column field="Role" header="Name">
    <template #body="slotProps">
      <span v-if="slotProps.data.ObjectType == 0">{{slotProps.data.Role}}</span>
      <span v-if="slotProps.data.ObjectType == 1">{{slotProps.data.Role}} Database</span>
      <span v-if="slotProps.data.ObjectType == 2">{{slotProps.data.Role}} DB Log</span>
      </template>
    </Column>
    <Column field="Status" header="Status">
      <template #body="slotProps">
      <span v-if="slotProps.data.Status == 0" class="pi pi-circle-fill" style="color: var(--p-green-600)"></span>
      <span v-if="slotProps.data.Status == 1" class="pi pi-circle-fill" style="color: var(--p-amber-500)"></span>
      <span v-if="slotProps.data.Status == 2" class="pi pi-circle-fill" style="color: var(--p-rose-700)"></span>
      </template>
    </Column>
    <Column field="PercentFree" header="Percent Free Space">
      <template #body="slotProps">
        <!-- SQL Servers report negative free space?-->
        <span v-if="slotProps.data.PercentFree >= 0">{{slotProps.data.PercentFree}}%</span>
        <span v-else>{{Math.round((Number(slotProps.data.BytesFree)/Number(slotProps.data.BytesTotal))*100)}}%</span>
        </template>
    </Column>
  </DataTable>
</div>
</template>