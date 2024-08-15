import { defineStore } from "pinia";
import { ref } from "vue";
import type { Connection } from "../types";
import type { Checkpoints } from "../types"

export const useFetchRoutes = defineStore({
  id: "data",
  state: () => ({
    routeList: ref<Connection[]>([]),
    intermediateStops: ref<Checkpoints[]>([]),

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
    async fetchIntermediateStops(from: string, to: string, departure: string) {
      try {
        const response = await fetch(
          `http://transport.opendata.ch/v1/connections?from=${from}&to=${to}&time=${departure}&journey`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.connections && data.connections.length > 0) {
          const connection = data.connections[0];
          
          this.intermediateStops = connection.sections.flatMap((section: any) => 
            section.journey ? section.journey.passList : []
          );


        } else {
          throw new Error('No connection found');
        }
      } catch (error) {
        console.error("There was a problem fetching intermediate stops:", error);
        throw error;
      }

      console.log(this.intermediateStops)
    },
  },
});