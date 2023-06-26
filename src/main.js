import '@/assets/bootstrap.min.css'
import '@/assets/bootstrap.bundle.min.js'
import {router} from '../src/router/index'
import { createApp } from 'vue'
import App from './App.vue'
import VueDatePicker from '@vuepic/vue-datepicker'


const app = createApp(App);
app.use(router)
app.component('VueDatePicker', VueDatePicker)
app.mount('#app')