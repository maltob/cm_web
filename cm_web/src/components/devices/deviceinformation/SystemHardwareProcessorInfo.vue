<script setup lang="ts">
import { CMRestService } from '@/service/CMRestService';
import { ref, onMounted  } from 'vue';
import { Panel } from 'primevue';
const props = defineProps({
    resourceID: Number

})


onMounted(() => {
    let resourceID = 0
    

    if(props.resourceID) {
        resourceID = (props.resourceID)
    }
    CMRestService.getDeviceProcessor(resourceID).then((data) => (data.json().then(v => {
        deviceProcessor.value = v.value[0]
    }
    )
));



});
const deviceProcessor = ref();
</script>
<template >
<div v-if="deviceProcessor">
    <h1 class="text-xl font-bold">Processor </h1>
    <div class="flex items-center items-stretch">
       
        <div class="grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-24 lg:gap-x-36 place-content-between">
            <div >
                <span class="text-lg font-bold">Name</span>
                <div class="font-medium mt-2">{{deviceProcessor.Name}}</div>
            </div>
            <div >
                <span class="text-lg font-bold">Max Clockspeed</span>
                <div class="font-medium mt-2">{{deviceProcessor.MaxClockSpeed}}</div>
            </div>
            <div >
                <span class="text-lg font-bold">Core Count / Logical Processor Count (SMP/HT)</span>
                <div class="font-medium mt-2">{{deviceProcessor.NumberOfCores}}/{{deviceProcessor.NumberOfLogicalProcessors}}</div>
            </div>

        </div>
    </div>
</div>
</template>