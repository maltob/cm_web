<script setup lang="ts">
import { CMRestService } from '@/service/CMRestService';
import { ref, onMounted  } from 'vue';
import { Panel } from 'primevue';
const props = defineProps({
    resourceID: Number,
    MACAddress: String

})


onMounted(() => {
    let resourceID = 0
    let MACAddress = ''

    if(props.resourceID) {
        resourceID = (props.resourceID)
    }
    if(props.MACAddress) {
        MACAddress = (props.MACAddress)
    }

    CMRestService.getDeviceNetworkAdapterConfigurationForAdapter(resourceID,MACAddress).then((data) => (data.json().then(v => {
        adapterConfiguration.value = v.value[0]
    }
    )
));



});
const adapterConfiguration = ref    ();
</script>
<template v-if="adapterConfiguration">
            <div v-if="adapterConfiguration.IPAddress">
                <span class="text-lg font-bold">IP Address</span>
                <div class="font-medium mt-2">{{adapterConfiguration.IPAddress}}</div>
            </div>
            <div >
                <span class="text-lg font-bold">Mask</span>
                <div class="font-medium mt-2">{{adapterConfiguration.IPSubnet}}</div>
            </div>
            <div  v-if="adapterConfiguration.DNSDomain">
                <span class="text-lg font-bold">Domain</span>
                <div class="font-medium mt-2">{{adapterConfiguration.DNSDomain}}</div>
            </div>
            <div v-if="adapterConfiguration.DHCPServer">
                <span class="text-lg font-bold">DHCP Server</span>
                <div class="font-medium mt-2">{{adapterConfiguration.DHCPServer}}</div>
            </div>
</template>