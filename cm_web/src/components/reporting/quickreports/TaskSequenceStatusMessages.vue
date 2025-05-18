<script setup lang="ts">
import { CMRestService } from '@/service/CMRestService';
import { onMounted, ref } from 'vue';
import { DataTable, Column } from 'primevue';

import Tag from 'primevue/tag';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import { FilterMatchMode } from '@primevue/core/api';



onMounted(() => {
  

    
        CMRestService.getTaskSequenceStatusMessages().then((data) => (data.json().then(v => (tsStatusMsgDetails.value = v.value))));
    
    


});


const filters = ref({
    InsString2: { value: null, matchMode: FilterMatchMode.CONTAINS },
    MachineName: { value: null, matchMode: FilterMatchMode.CONTAINS },
    InsString3: { value: null, matchMode: FilterMatchMode.CONTAINS },
    Message: { value: null, matchMode: FilterMatchMode.CONTAINS },
    Severity: { value: null, matchMode: FilterMatchMode.EQUALS }
});


const msgStatusSeverityLookup = new Map<Number,String>([[1073741824,"Informational"],[2147483648,"Warning"],[3221225472,"Error"]])
const tsStatusMsgDetails = ref();
const statuses = ref([1073741824,2147483648,3221225472]);
const msgIDLookup = new Map<number, string>([[11124,"Started Group"],[11127,"Completed group"],[11130,"Skipped action"],[11134,"Successfully completed action"],[11135,"Failed action"],[11138,"Ignored failed action"]
                        ,[11140,"Started Task Sequence"],[11142,"Started reboot"],[11144,"Started Task Sequence"]])
</script>

<template>
<div v-if="tsStatusMsgDetails && tsStatusMsgDetails[0]" >
    
   

    <DataTable :value="tsStatusMsgDetails" stripedRows tableStyle="min-width: 50rem"  v-model:filters="filters" filterDisplay="row">
        <Column field="Time" header="Time"> </Column>
        <Column field="MachineName" header="MachineName">
            <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" placeholder="Search by device name" />
                </template>
            </Column>

        <Column field="InsString3" header="Group" class="max-xl:hidden">
            <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" placeholder="Search by group name" />
                </template>
        </Column>
        <Column field="InsString2" header="Step">
            <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" placeholder="Search by step name" />
                </template>
        </Column>

        <Column field="MessageID" header="Step Details">
             <template #body="slotProps">
            {{msgIDLookup.get(Number( slotProps.data.MessageID))}}
        </template>
        </Column>

        <Column field="Severity" header="Severity" :showFilterMenu="false"  class="max-lg:hidden">
        <template #body="slotProps">
            {{msgStatusSeverityLookup.get(Number( slotProps.data.Severity))}}
        </template>
        <template #filter="{ filterModel, filterCallback }">
        <Select v-model="filterModel.value" @change="filterCallback()" :options="statuses" placeholder="Select One" style="min-width: 12rem" :showClear="true" filterField="StatusType">
                    <template #option="slotProps">
                            {{msgStatusSeverityLookup.get(slotProps.option)}}
                    </template>
                    <template #value="slotProps">
                        <div v-if="slotProps.value" class="flex items-center">
                             {{msgStatusSeverityLookup.get(slotProps.value)}}
                        </div>
                        <div v-else>
                            All
                        </div>
                    </template>
                </Select>
            </template>
        </Column>       
        <Column  header="Message" class="max-lg:hidden">
        <template #body="slotProps">
            <div v-if="slotProps.data.InsString5"> 
                {{slotProps.data.InsString5}}
                <span v-if="slotProps.data.InsString6">{{slotProps.data.InsString6}}</span>
                <span v-if="slotProps.data.InsString7">{{slotProps.data.InsString7}}</span>
                <span v-if="slotProps.data.InsString8">{{slotProps.data.InsString8}}</span>
                <span v-if="slotProps.data.InsString9">{{slotProps.data.InsString9}}</span>
            </div>
            </template>
       </Column>
        </DataTable>

    
</div>
<h1 v-else>No task sequence details found.</h1>
</template>
