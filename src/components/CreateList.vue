<template>
  <input
    type="text"
    @input="handleInput"
    :value="createList.routePlayListName"
  />
  <button @click="createList.createList">Create List</button>
  <div class="route-list">
    <div
      class="route-list-item"
      v-for="(route, idxList) in createList.routePlayList"
      :key="route.id"
    >
      <p>{{ route.name }}</p>
      <button @click="createList.deleteRouteList(idxList)" class="close-button">
        delete
      </button>
      <button @click="showDialog(route)">View</button>
    </div>
  </div>

  <dialog ref="favDialog" class="large-dialog">
    <div v-if="selectedRoute" class="dialog-content">
      <div class="header-dialog">
        <h2 class="title-dialog">{{ selectedRoute.name }}</h2>
        <button @click="closeDialog" class="close-button-dialog">Close</button>
      </div>

      <!-- Add more details about the route here -->
      <ul>
        <li v-for="(item, index) in selectedRoute.routen" :key="index">
          <route-comp
            :stationName="item.stationName"
            :platForm="item.platForm"
            :departure="item.departure"
            :arrival="item.arrival"
          ></route-comp>
        </li>
      </ul>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoutePlayListStore } from "../stores/CreateList";
import type { RoutePlayListItem } from "../types";

const createList = useRoutePlayListStore();
const favDialog = ref<HTMLDialogElement | null>(null);
const selectedRoute = ref<RoutePlayListItem | null>(null);

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  createList.setName(target.value);
};

const showDialog = (route: RoutePlayListItem) => {
  selectedRoute.value = route;
  if (favDialog.value) {
    favDialog.value.showModal();
  }
};

const closeDialog = () => {
  if (favDialog.value) {
    favDialog.value.close();
  }
};
</script>

<style scoped></style>
