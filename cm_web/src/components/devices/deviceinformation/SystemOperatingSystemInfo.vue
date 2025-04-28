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
    CMRestService.getDeviceOperatingSystem(resourceID).then((data) => (data.json().then(v => {
        operatingSystem.value = v.value[0]
    }
    )
));



});
const operatingSystem = ref();
</script>
<template >
<Panel header='Operating System' toggleable v-if="operatingSystem">
    <div class="flex items-center items-stretch">
        <div class="grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-24 lg:gap-x-36 place-content-between">
            <div >
                <span class="text-lg font-bold">Operating System</span>
                <div class="font-medium mt-2">{{operatingSystem.Caption}}</div>
            </div>
            <div >
                <span class="text-lg font-bold">Build</span>
                <div class="font-medium mt-2">{{operatingSystem.BuildNumber}}</div>
            </div>
            <div >
                <span class="text-lg font-bold">Install Date</span>
                <div class="font-medium mt-2">{{new Date(operatingSystem.InstallDate).toLocaleString()}}</div>
            </div>
            <div >
                <span class="text-lg font-bold">Last Boot</span>
                <div class="font-medium mt-2">{{new Date(operatingSystem.LastBootUpTime).toLocaleString()}}</div>
            </div>
            

        </div>
    </div>
</Panel>
</template>