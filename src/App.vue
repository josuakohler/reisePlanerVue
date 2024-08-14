<template>
  <div class="container">
    <div class="search-bar">
      <img
        src="./assets/C91B68E9-0FD5-4224-9DA4-469BDD9A5A6D_4_5005_c.jpeg"
        class="logo-img"
        alt=""
      />

      <route-search-comp :searchRoutes="fetchRoutes.searchRoutes">
      </route-search-comp>
    </div>
    <div class="main-content">
      <div class="sidebar">
        <create-list-comp></create-list-comp>
      </div>
      <div class="route-list">
        <recently-searched-comp
          v-if="!fetchRoutes.routeList.length"
        ></recently-searched-comp>
        <transition-group name="route-animation" tag="div" v-else>
          <route-comp
            v-for="(connection, index) in fetchRoutes.routeList"
            :key="index"
            :stationName="fetchRoutes.firstConnection?.to.station.name"
            :platForm="connection.from.platform"
            :departure="connection.from.departure"
            :arrival="connection.to.arrival"
            @dragStart="onRouteDragStart"
          ></route-comp>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFetchRoutes } from "./stores/fetchRoutes";
const fetchRoutes = useFetchRoutes();

const onRouteDragStart = () => {
  console.log("Route drag started");
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  color: white;
}

.search-bar {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 20px;
  border-radius: 10px;
  gap: 30px;
  color: white;
  padding: 20px;
}

.main-content {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.sidebar {
  flex: 0 0 25%;
  padding: 60px;
  gap: 60px;

  background: transparent;
}

.route-list {
  width: 100%;
  padding-right: 5em;
}

.route-animation-enter-active,
.route-animation-leave-active {
  transition: all 0.5s ease;
}

.route-animation-enter-from,
.route-animation-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
