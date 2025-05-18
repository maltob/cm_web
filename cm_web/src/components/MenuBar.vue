
<template>
    <div class="card">
        <Menubar :model="items">
            <template #item="{ item, props, hasSubmenu }">
                <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                <a v-ripple v-bind="props.action" @click="navigate">
                    <span :class="item.icon" />
                    <span>{{ item.label }}</span>
                </a>
                </router-link>
                <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
                    <span :class="item.icon" />
                    <span>{{ item.label }}</span>
                    <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down" />
                </a>
            </template>
            </Menubar>
    </div>
</template>

<script setup lang="ts">
import Menubar from 'primevue/menubar';

import { ref } from "vue";
import { useRouter } from 'vue-router';

const router = useRouter();
const items = ref([
    {
        label: 'Devices',
        icon: 'pi pi-desktop',
        items: [
            {
                label: 'Devices',
                icon: 'pi pi-desktop',
                route: '/devicecollection'
            },
            {
                label: 'Device Collections',
                icon: 'pi pi-objects-column',
                route: '/devicecollections'
            }]
    },
    {
        label: 'Software',
        icon: 'pi pi-star',
        items: [
            {
                label: 'Applications',
                icon: 'pi pi-gift',
                route: '/software/applications'
            },
            {
                label: 'Packages',
                icon: 'pi pi-bolt', 
                route: '/software/packages'
            },
            {
                label: 'Updates  🔧',
                icon: 'pi pi-wrench'
            },
            {
                label: 'Task Sequences 🔧',
                icon: 'pi pi-list'
            }]
    },
    {
        label: 'Reporting',
        icon: 'pi pi-gauge',
        items: [
            {
                label: 'Deployments',
                icon: 'pi pi-download',
                route: '/reporting/deployments'
            },
            {
                label: 'System Status',
                icon: 'pi pi-building',
                route: '/reporting/system'
            },
            {
                label: 'Quick Reports',
                icon: 'pi pi-angle-right',
                route: '/reporting/quick',
                    items: [ {
                        label: 'Storage Report',
                        icon: 'pi pi-database',
                        route: '/reporting/quick/storage'
                    },
                    {
                        label: 'Software Report',
                        icon: 'pi pi-truck',
                        route: '/reporting/quick/software'
                    },
                    {
                        label: 'Task Sequence Steps Report',
                        icon: 'pi pi-car',
                        route: '/reporting/ts/messages'
                    }
                ]
            }
            
        ]
    },
    {
        label: 'About 🔧',
        icon: 'pi pi-megaphone'
    }
]);

</script>
