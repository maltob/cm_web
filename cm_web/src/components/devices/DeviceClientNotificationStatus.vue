<script setup lang="ts">
const props = defineProps({
  resourceID: Number,
  isClient: Boolean
})

import { ref, onMounted,watch } from 'vue';
import { CMRestService } from '@/service/CMRestService';
onMounted(() => {
    if(props.isClient) {

        let resourceID = 0;
        if(props.resourceID) {
            resourceID = props.resourceID
        }
        CMRestService.getDeviceClientNotificationStatus(resourceID).then((data) => (data.json().then((v) => {
            if(v.value ) {
                if(v.value[0].OnlineStatus == 0) {
                    
                    iconColor.value =  'var(--p-rose-700)';
                }else{
                    iconColor.value =  'var(--p-green-600)';
                }
            }
        }
        )));

    }
}

);



let iconColor = ref('var(--p-slate-500)');
</script>

<template>
<span class="pi pi-circle-fill" :style="{color: iconColor}"></span>

</template>