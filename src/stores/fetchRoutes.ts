import { defineStore } from "pinia";
import { ref } from "vue";
import type { Connection } from "../types";

export const useFetchRoutes = defineStore({
  id: "data",
  state: () => ({
    routeList: ref<Connection[]>([]),
  }),
  getters: {
    firstConnection: (state) => state.routeList[0] || null,
  },
  actions: {
    async searchRoutes(from: string, to: string) {
      console.log("das ist in from:" + from);
      try {
        const response = await fetch(
          `http://transport.opendata.ch/v1/connections?from=${from}&to=${to}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        this.routeList = data.connections;
        console.log(this.routeList);

        // Save the recent search to localStorage
        localStorage.setItem('recentSearch', JSON.stringify({ from, to }));
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    },
  },
});