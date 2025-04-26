<script setup lang="ts">
const props = defineProps({
  filter: String | null
})
import { ref, onMounted, watch  } from 'vue';
import { useRoute } from 'vue-router'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Row from 'primevue/row';
import IconDeviceCollection from '@/components/icons/IconDeviceCollection.vue';
import { CMRestService } from '@/service/CMRestService';

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
    CMRestService.getDeviceCollections(newFilter).then((data) => (data.json().then(v => (deviceCollections.value = v.value))));

  }
)

const deviceCollections = ref();
</script>

<template>
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
</DataTable>
</template>
