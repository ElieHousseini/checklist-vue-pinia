import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrashAlt, faHeart } from '@fortawesome/free-solid-svg-icons';
import { createPinia } from 'pinia'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faTrashAlt, faHeart);

createApp(App).use(createPinia()).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
