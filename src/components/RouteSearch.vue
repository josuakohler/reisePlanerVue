<template>
  <div class="from">
    <label for="from">Von:</label>
    <input
      type="text"
      id="from"
      placeholder="Sargans"
      list="from-locations"
      v-model="fromInput"
      @input="searchLocations($event)"
    />
    <datalist id="from-locations">
      <option v-for="location in fromLocations" :value="location.name" :key="location.name">
        {{ location.name }}
      </option>
    </datalist>
  </div>
  <div class="to">
    <label for="to">Nach:</label>
    <input
      type="text"
      id="to"
      placeholder="Chur"
      list="to-locations"
      v-model="toInput"
      @input="searchLocations($event)"
    />
    <datalist id="to-locations">
      <option v-for="location in toLocations" :value="location.name" :key="location.name">
        {{ location.name }}
      </option>
    </datalist>
  </div>
  <button @click="parentSearchRoute">Suche nach Routen</button>
  <p>Suche nach Routen Von: {{ from }} Nach:</p>
</template>

<script lang="ts">
import { ref } from "vue";

interface Location {
  name: string;
  score: number;
  coordinate: {
    type: string;
    x: number;
    y: number;
  };
}

export default {
  name: "RouteSearch",

  props: {
    from: {
      type: String,
    },
    to: {
      type: String,
    },

    searchRoutes: {
      type: Function,
      required: true,
    },
  },

  emits: {
    "search-routes": function () {},
  },

  data() {
    return {
      fromInput: "",
      toInput: "",
      fromLocations: ref<Location[]>([]),
      toLocations: ref<Location[]>([]),
    };
  },

  methods: {
    async searchLocations(event: any) {
      const target = event.target;
      if (target && target.value.length >= 2) {
        try {
          const response = await fetch(
            `http://transport.opendata.ch/v1/locations?query=${target.value}`
          );
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          const locations = data.stations.map((station: any) => ({
            name: station.name,
            score: station.score,
            coordinate: {
              type: station.coordinate.type,
              x: station.coordinate.x,
              y: station.coordinate.y,
            },
          }));

          if (target.id === "from") {
            this.fromLocations = locations;
          } else {
            this.toLocations = locations;
          }
        } catch (error) {
          console.error("There was a problem fetching locations:", error);
        }
      }
    },
    parentSearchRoute() {
      this.searchRoutes(this.fromInput, this.toInput);
      this.$emit("search-routes");
    },
  },
};
</script>