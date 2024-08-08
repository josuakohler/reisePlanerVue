<template>
  <div class="from-to">
    <div class="from">
      <label for="from">Von:</label>
      <input
        type="text"
        id="from"
        v-model="from"
        placeholder="Sargans"
        list="from-locations"
      />
      <datalist id="from-locations">
        <option
          v-for="location in fromLocations"
          :key="location.toString"
          :value="location.toString"
        />
      </datalist>
    </div>
    <div class="to">
      <label for="to">Nach:</label>
      <input
        type="text"
        id="to"
        v-model="to"
        placeholder="Chur"
        list="to-locations"
      />
      <datalist id="to-locations">
        <option
          v-for="location in toLocations"
          :key="location.toString"
          :value="location.toString"
        />
      </datalist>
    </div>
  </div>
  <button @click="searchRoutes">Suche nach Routen</button>
  <p>Suche nach Routen Von: {{ from }} Nach: {{ to }}</p>
</template>

<script lang="ts">

import { ref, } from "vue";
import { method } from 'lodash';

interface Location {
  name: string;
  score: number;
  coordinate: {
    type: string;
    x: number;
    y: number;
  };
}

const from = ref("");
const to = ref("");
const fromLocations = ref<Location[]>([]);
const toLocations = ref<Location[]>([]);


export default {
  name: "RouteSearch",
  
  props: {
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    departure: {
      type: String,
      required: true,
    },
    arrival: {
      type: String,
      required: true,
    },
    fromLocations:{
        type: Location,
        required: false,
        default: ref<Location[]>([])
    },
    toLocations:{
        type: Location,
        required: false,
        default: ref<Location[]>([])
    },
    searchRoutes:{
        type: method ,
        required: true,
    }

  },
  data() {

  },
  
  methods: {
    async searchLocations(query: string, isFrom: boolean) {
        console.log(this.departure);
      if (query.length < 2) return;
      try {
        const response = await fetch(
          `http://transport.opendata.ch/v1/locations?query=${query}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (isFrom) {
          fromLocations.value = data.stations;
          return fromLocations;
        } else {
          toLocations.value = data.stations;
          return toLocations; 
        }
      } catch (error) {
        console.error("There was a problem fetching locations:", error);
      }

    },
    
  },
  
};



</script>
