import '@/assets/bootstrap.min.css'
import '@/assets/bootstrap.bundle.min.js'
import {router} from '../src/router/index'
import { createApp } from 'vue'
import App from './App.vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import axios from 'axios'

//axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.baseURL = 'https://backrestaurant-production.up.railway.app/';

const app = createApp(App);
app.use(router)
app.component('VueDatePicker', VueDatePicker)
app.mount('#app')