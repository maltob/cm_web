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
    CMRestService.getDeviceCollections(filter).then((data) => (data.json().then(v => (deviceCollections.value = v.value))));


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
    CMRestService.getDeviceCollections(nFilter).then((data) => (data.json().then(v => (deviceCollections.value = v.value))));

  }
)

const deviceCollections = ref();


const  refreshCollection = async (collectionID: string) => {
  if(await CMRestService.refreshDeviceCollection(collectionID)) {
    console.log("Ref")
    toast.add({ severity: 'info', summary: 'Membership refresh queued', detail: `Membership refresh for ${collectionID} is queued`, life: 3000 });
  }else{
    console.log("Err")

    toast.add({ severity: 'warning', summary: 'Failed to refresh membership', detail: `Membership refresh for ${collectionID} failed.`, life: 3000 });
  } 
  
}
</script>

<template >
  <Toast />
    <IconDeviceCollection />
  <DataTable :value="deviceCollections" stripedRows tableStyle="min-width: 50rem">
    <Column header="I"><IconDeviceCollection /></Column>
    <Column field="Name" header="Name"></Column>
    <Column field="MemberCount" header="Member Count">
      <template #body="slotProps">
        <router-link :to="{ name: 'devicecollection', params: { collectionID: slotProps.data.CollectionID } }">{{ slotProps.data.MemberCount }}</router-link>
        </template>
    </Column>
    <Column field="CollectionID" header="Collection ID"></Column>
    <Column field="Comment" header="Comment"></Column>
    <Column field="ObjectPath" header="Folder"></Column>
    <Column header="Actions">
      <template #body="slotProps">
        <Button icon="pi pi-refresh" @click="refreshCollection(slotProps.data.CollectionID)" aria-label="Refresh Device Collection Membership" />
      </template>
    </Column>
</DataTable>
</template>
