<script setup lang="ts">
const props = defineProps({
  collectionID: String 
})
import { ref, onMounted, watch  } from 'vue';
import { useRoute } from 'vue-router'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Row from 'primevue/row';
import IconDeviceCollection from '@/components/icons/IconDeviceCollection.vue';
import DeviceClientNotificationStatus from '@/components/devices/DeviceClientNotificationStatus.vue';
import { CMRestService } from '@/service/CMRestService';

onMounted(() => {
    
    if(props.collectionID) {
        collectionID = props.collectionID
        console.log(collectionID)
    }else{
        console.log("default collection")
    }
    CMRestService.getDeviceCollectionMembers(collectionID).then((data) => (data.json().then(v => (deviceCollectionMembers.value = v.value))));


});
let collectionID = 'SMS00001'
const route = useRoute()
watch(
  () => route.params.collectionID,
  (newCollectionID, oldCollectionID) => {
    CMRestService.getDeviceCollectionMembers(collectionID).then((data) => (data.json().then(v => (deviceCollectionMembers.value = v.value))));

  }
)

const deviceCollectionMembers = ref();
</script>

<template>
  <h1>Members of {{ collectionID }}</h1>
  <DataTable :value="deviceCollectionMembers" stripedRows tableStyle="min-width: 50rem">
    <Column header="Online"><template  #body="slotProps">
        <DeviceClientNotificationStatus :resourceID=slotProps.data.ResourceID :isClient=slotProps.data.IsClient />
    </template></Column>
    <Column header="Name">
    <template #body="slotProps">

      <router-link :to="{ name: 'device', params: { resourceID: slotProps.data.ResourceID } }" v-if="slotProps.data.IsClient">{{ slotProps.data.Name }}</router-link>
      <span v-else>{{ slotProps.data.Name }}</span>
    </template>
  </Column>
    <Column field="Domain" header="Domain"></Column>
    <Column field="CollectionID" header="Collection ID"></Column>
    <Column field="IsActive" header="Active"></Column>
    <Column field="IsVirtualMachine" header="IsVirtualMachine"></Column>
    <Column field="IsClient" header="IsClient"></Column>
    <Column field="ResourceID" header="ResourceID"></Column>
</DataTable>
</template>
