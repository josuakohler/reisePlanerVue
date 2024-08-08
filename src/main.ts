import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Route from './components/Route.vue'
import RouteSearch from './components/RouteSearch.vue'
const app = createApp(App)


app.component('route-comp',Route)
app.component('route-search', RouteSearch)

app.mount('#app')
