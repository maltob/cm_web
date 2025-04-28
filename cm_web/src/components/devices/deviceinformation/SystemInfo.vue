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
    CMRestService.getDeviceSystem(resourceID).then((data) => (data.json().then(v => {
        deviceSystem.value = v.value[0]
    }
    )
));



});
const deviceSystem = ref();
</script>
<template >
<Panel header='System Info' toggleable v-if="deviceSystem">
    <div class="flex items-center items-stretch">
        <div class="grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-24 lg:gap-x-36 place-content-between">
            <div >
                <span class="text-lg font-bold">Name</span>
                <div class="font-medium mt-2">{{deviceSystem.Name}}</div>
            </div>
            <div >
                <span class="text-lg font-bold">Resource ID</span>
                <div class="font-medium mt-2">{{deviceSystem.ResourceId}}</div>
            </div>
            <div >
                <span class="text-lg font-bold">Last AD Logon</span>
                <div class="font-medium mt-2">{{new Date(deviceSystem.LastLogonTimestamp).toLocaleString()}}</div>
            </div>
            <div >
                <span class="text-lg font-bold">Last Agent Sync</span>
                <div class="font-medium mt-2">{{new Date(deviceSystem.AgentTime[0]).toLocaleString()}}</div>
            </div>
            <div >
                <span class="text-lg font-bold">Domain</span>
                <div class="font-medium mt-2">{{deviceSystem.FullDomainName}}</div>
            </div>
            <div >
                <span class="text-lg font-bold">DistinguishedName</span>
                <div class="font-medium mt-2">{{deviceSystem.DistinguishedName}}</div>
            </div>
            <div >
                <span class="text-lg font-bold">SMBIOSGUID</span>
                <div class="font-medium mt-2">{{deviceSystem.SMBIOSGUID}}</div>
            </div>
            <div >
                <span class="text-lg font-bold">Client Version</span>
                <div class="font-medium mt-2">{{deviceSystem.ClientVersion}}</div>
            </div>
            

        </div>
    </div>
</Panel>
</template>