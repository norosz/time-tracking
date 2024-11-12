import { createApp } from 'vue'
import "bootstrap/dist/css/bootstrap.css";
import './style.css'

import App from './App.vue'


import localStorageService from "/src/services/localStorageService.js";

localStorageService.populateLocalStorage()
createApp(App).mount('#app')
import "bootstrap/dist/js/bootstrap.js";