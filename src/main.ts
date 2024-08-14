import { createApp } from "vue";
import { createPinia } from "pinia";
import draggable from "vuedraggable";

import "./style.css";
import App from "./App.vue";
import Route from "./components/Route.vue";
import RouteSearch from "./components/RouteSearch.vue";
import CreateList from "./components/CreateList.vue";
import AddToList from "./components/AddToList.vue";
import { useRoutePlayListStore } from "./stores/CreateList";
import "./global.css";
import RecentlySearched from "./components/RecentlySearched.vue";
const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.component("add-to-list-comp", AddToList);
app.component("recently-searched-comp", RecentlySearched);
app.component("route-comp", Route);
app.component("route-search-comp", RouteSearch);
app.component("create-list-comp", CreateList);

const routePlayListStore = useRoutePlayListStore();
routePlayListStore.init();
app.mount("#app");
