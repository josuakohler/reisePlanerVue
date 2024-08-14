<template>
  <input
    type="text"
    @input="handleInput"
    :value="createList.routePlayListName"
    @keyup.enter="createList.createList"
  />
  <button @click="createList.createList">Create List</button>
  <div class="route-list">
    <div
      class="route-list-item"
      v-for="(route, idxList) in createList.routePlayList"
      :key="route.id"
      @dragover.prevent
      @drop="onDrop($event, route.name)"
      @click.prevent.self="showDialog(route)"
    >
      <p class="list-name">{{ route.name }}</p>

      <p v-if="route.routen.length === 1">
        {{ route.routen.length + " Route" }}
      </p>
      <p v-else-if="route.routen.length > 1">
        {{ route.routen.length + " Routes" }}
      </p>
      <button @click="createList.deleteRouteList(idxList)" class="close-button">
        delete
      </button>
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
            :fromStationName="item.fromStationName"
            :stationName="item.stationName"
            :platForm="item.platForm"
            :departure="item.departure"
            :arrival="item.arrival"
          >
            <button
              class="delete-route"
              @click="deleteRoute(selectedRoute.name, index)"
            >
              delete
            </button>
          </route-comp>
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

const onDrop = (event: DragEvent, listName: string) => {
  event.preventDefault();
  const routeData = event.dataTransfer?.getData("text/plain");
  if (routeData) {
    const route = JSON.parse(routeData);
    createList.addRouteToList(listName, route);
  }
};

const deleteRoute = (listName: string, index: number) => {
  createList.deleteFromPlayList(listName, index);
  // Optionally, you might want to refresh the selectedRoute data here
  // if it's not automatically updated by the store
};
</script>

<style scoped>

.route-list-item {
  transition: background-color 0.3s;
}
.route-list-item.drag-over {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>

