import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Route from './components/Route.vue'

const app = createApp(App)


app.component('route-comp',Route)


app.mount('#app')
