import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import Route from "./components/Route.vue";
import RouteSearch from "./components/RouteSearch.vue";
import { createPinia } from "pinia";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);

app.component("route-comp", Route);
app.component("route-search-comp", RouteSearch);

app.mount("#app");
