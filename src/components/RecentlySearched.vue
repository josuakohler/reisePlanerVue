<template>
    <div v-if="recentSearch" class="route-list-item" @click="handleClick">
      <h3 class="list-name">Recently Searched</h3>
      <p>From: {{ recentSearch.from }}</p>
      <p>To: {{ recentSearch.to }}</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useFetchRoutes } from '../stores/fetchRoutes';
  
  const fetchRoutes = useFetchRoutes();
  const recentSearch = ref();
  
  const handleClick = () => {
    if (recentSearch.value) {
      fetchRoutes.searchRoutes(recentSearch.value.from, recentSearch.value.to);
    }
  };
  
  onMounted(() => {
    const savedSearch = localStorage.getItem('recentSearch');
    if (savedSearch) {
      recentSearch.value = JSON.parse(savedSearch);
    }
  });
  </script>
  
  <style scoped>
  .recently-searched {
    cursor: pointer;
    padding: 10px;
    border: 1px solid #ccc;
    margin-bottom: 20px;
  }
  </style>