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
      <button @click="createList.goToView">View</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoutePlayListStore } from "../stores/CreateList";

const createList = useRoutePlayListStore();

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  createList.setName(target.value);
};
</script>
