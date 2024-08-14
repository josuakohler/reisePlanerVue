<template>
  <div class="from">
    <input
      type="text"
      id="from"
      placeholder="Von"
      list="from-locations"
      v-model="fromInput" autocomplete="off"

      @input="searchLocations($event)"
    />
    <datalist id="from-locations">
      <option v-for="location in fromLocations" :value="location.name" :key="location.name">
        {{ location.name }}
      </option>
    </datalist>
  </div>
  <div class="to">
    <input
      type="text"
      id="to"
      placeholder="Nach"
      list="to-locations"
      v-model="toInput"
      autocomplete="off"
      @input="searchLocations($event)"
      @keyup.enter="parentSearchRoute"
    />
    <datalist id="to-locations">
      <option v-for="location in toLocations" :value="location.name" :key="location.name">
        {{ location.name }}
      </option>
    </datalist>
  </div>
  <button @click="parentSearchRoute" @keyup.enter="parentSearchRoute">search</button>
</template>

<script lang="ts">
import { ref } from "vue";
import type { Location } from "../types"


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


<style scoped>
.route-search {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.search-input {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: black;
}

input {
  width: 200px;
  color: black;
}
</style>