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
    CMRestService.getAvailableComponentSummaries(0).then((data) => (data.json().then(v => 
    {
      let seenItem = new Map<String,Number>();
      componentStatus.value = [];
      for(let i=0; i<v.value.length; i++) {
        let item = v.value[i];
        if(!seenItem.has(item.ComponentName)) {
          seenItem.set(item.ComponentName,0);
          componentStatus.value.push(item);
        }
      }
       

    }
  )));


});

const componentStatus = ref();

const siteComponentRowStyle = (data: any) => {
  if (data.Errors > 0) {
        return  '!bg-pink-100' ;
    }
    if (data.Warnings > 0) {
        return  '!bg-yellow-100' ;
    }
};

</script>
<template>

<div v-if="componentStatus">
  <h1 class="text-xl font-bold pt-4">Site Components </h1>

<DataTable :value="componentStatus" :rowClass="siteComponentRowStyle" stripedRows tableStyle="min-width: 50rem">
    <Column field="ComponentName" header="Name"></Column>
    <Column field="MachineName" header="Machine"></Column>
    <Column field="Infos" header="Info Messages"></Column>
    <Column field="Warnings" header="Warning Messages"></Column>
    <Column field="Errors" header="Errors"></Column>
    <Column field="HeartbeatInterval" header="HeartbeatInterval"></Column>
  </DataTable>
</div>
</template>

