<template>
  <div class="container">
    <div class="routes">
    </div>
    <div class="search">
      <route-search-comp :searchRoutes="fetchRoutes.searchRoutes"> </route-search-comp>
    </div>

    <div class="route-list"> 
      <div v-if="fetchRoutes.firstConnection">
        <route-comp 
          v-for="(connection, index) in fetchRoutes.routeList"
          :key="index"
          :stationName="fetchRoutes.firstConnection.to.station.name"
          :platForm="connection.from.platform"
          :departure="connection.from.departure"
          :arrival="connection.to.arrival"
        ></route-comp>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { useFetchRoutes } from "./stores/fetchRoutes";

const fetchRoutes = useFetchRoutes();

</script>

<style scoped>

</style>
