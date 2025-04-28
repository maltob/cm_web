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

const routes = [
  { path: '/', component: DeviceCollectionsView, props: true  },
  { path: '/devicecollections/:filter?', component: DeviceCollectionsView, props: true  },
  { path: '/devicecollection/:collectionID?', component: DeviceCollectionView, name:'devicecollection',props: true  },
  { path: '/device/:resourceID', component: DeviceView, name:'device',props: true  },
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