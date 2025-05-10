import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import DeviceCollectionsView from '@/components/devices/DeviceCollectionsView.vue'
import DeviceCollectionView from './components/devices/DeviceCollectionView.vue';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';
import { createWebHashHistory, createRouter } from 'vue-router'
import DeviceView from './components/devices/DeviceView.vue';
import ConfigMgrSystemStatus from './components/reporting/ConfigMgrSystemStatus.vue';
import Deployments from './components/reporting/Deployments.vue';
import DeploymentDetails from './components/reporting/deployments/DeploymentDetails.vue';
import SUMDeploymentDetails from './components/reporting/deployments/SUMDeploymentDetails.vue';
import ApplicationsView from './components/software/ApplicationsView.vue';
import PackagesView from './components/software/PackagesView.vue';

const routes = [
  { path: '/', component: DeviceCollectionsView, props: true  },
  { path: '/devicecollections/:filter?', component: DeviceCollectionsView, props: true  },
  { path: '/devicecollection/:collectionID?', component: DeviceCollectionView, name:'devicecollection',props: true  },
  { path: '/device/:resourceID', component: DeviceView, name:'device',props: true  },
  { path: '/reporting/system', component: ConfigMgrSystemStatus, name:'systeminfo' },
  { path: '/reporting/deployments', component: Deployments, name:'deployments' },
  { path: '/reporting/deployment/:assignmentID', component: DeploymentDetails, name:'deployment',props: true  },
  { path: '/reporting/deploymentsum/:assignmentID', component: SUMDeploymentDetails, name:'sumdeployment',props: true  },
  { path: '/reporting/deployment/:assignmentID/:appStatusType', component: DeploymentDetails, name:'deploymentWithStatusType',props: true  },
  { path: '/software/applications/:filter?', component: ApplicationsView, name:'applications' },
  { path: '/software/packages/:filter?', component: PackagesView, name:'packages' },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})


let app = createApp(App)
app.use(router)

app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});

app.use(ToastService);

app.mount('#app')