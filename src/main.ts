import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import Route from "./components/Route.vue";
import RouteSearch from "./components/RouteSearch.vue";
import CreateList from "./components/CreateList.vue";
import { createPinia } from "pinia";
import AddToList from "./components/AddToList.vue";

import Vuesax from 'vuesax';

import 'vuesax/dist/vuesax.css' //Vuesax styles

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.component("add-to-list-comp", AddToList);
app.component("route-comp", Route);
app.component("route-search-comp", RouteSearch);
app.component("create-list-comp", CreateList)
app.mount("#app");
app.use(Vuesax, {
    // options here
  })