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
      <button @click="createList.deleteRouteList(idxList)">delete</button>
      <button @click="showDialog(route)">View</button>
    </div>
  </div>

  <dialog ref="favDialog" class="large-dialog">
    <div v-if="selectedRoute" class="dialog-content">
      <h2>{{ selectedRoute.name }}</h2>
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
    <button @click="closeDialog" class="close-button">Close</button>
  </dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
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

<style scoped>
.large-dialog {
  width: 90%;
  height: 90%;
  max-width: none;
  max-height: none;
  padding: 20px;
  border: none;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.dialog-content {
  height: 100%;
  overflow-y: auto;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.close-button:hover {
  background-color: #d32f2f;
}
</style>