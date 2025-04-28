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
    CMRestService.getDeviceBIOS(resourceID).then((data) => (data.json().then(v => {
        deviceBIOS.value = v.value[0]
    }
    )
));



});
const deviceBIOS = ref();
</script>

<template >
<div v-if="deviceBIOS">
    <h1 class="text-xl font-bold  pt-4">BIOS</h1>
    <div class="flex items-center items-stretch">
       
        <div class="grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-24 lg:gap-x-36 place-content-between">
            <div >
                <span class="text-lg font-bold">Manufacturer and Name</span>
                <div class="font-medium mt-2">{{deviceBIOS.Manufacturer}} {{deviceBIOS.Name}}</div>
            </div>
            <div >
                <span class="text-lg font-bold">BIOS</span>
                <div class="font-medium mt-2">{{deviceBIOS.SMBIOSBIOSVersion}}</div>
            </div>
            <div >
                <span class="text-lg font-bold">ReleaseDate</span>
                <div class="font-medium mt-2">{{deviceBIOS.ReleaseDate}}</div>
            </div>

        </div>
    </div>
</div>
</template>