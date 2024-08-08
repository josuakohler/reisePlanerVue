<template>
  <div class="container">
    <div class="routes">
      <CreateList initialRouteName=""></CreateList>
    </div>
    <div class="search">
      <route-search-comp
        :searchRoutes="searchRoutes"
      >
      </route-search-comp>
    </div>

    <div class="route-list">
      <route-comp></route-comp>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface Station {
  station: {
    name: string;
  };
  platform: string;
  departure: string;
  arrival: string;
}

interface Connection {
  from: Station;
  to: Station;
}

const routeList = ref<Connection[]>([]);
const searchRoutes = async (from: string, to: string) => {
  console.log("das ist in from:" + from);
  try {
    const response = await fetch(
      `http://transport.opendata.ch/v1/connections?from=${from}&to=${to}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    routeList.value = data.connections;
    console.log(routeList.value);
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};

</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  background-color: #121212;
  color: #ffffff;
  margin: 0;
  padding: 0;
}

.container {
  display: flex;
  flex-direction: row;
  gap: 40px;
}

.routes,
.route-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
}

.route-item {
  background-color: #1e1e1e;
  padding: 20px;
  border-radius: 10px;
  transition: background-color 0.3s;
}

.route-item:hover {
  background-color: #2c2c2c;
}

.search {
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  background-color: #1e1e1e;
  padding: 20px;
  border-radius: 10px;
}

.from-to {
  display: flex;
  gap: 10px;
}

.from,
.to {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

#from,
#to {
  padding: 10px;
  width: 200px;
  background-color: #2c2c2c;
  border: none;
  border-radius: 5px;
  color: white;
}

button {
  padding: 10px 20px;
  background-color: #00c853;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

button:hover {
  background-color: #00e676;
  transform: scale(1.05);
}

.route-list-item {
  background-color: #1e1e1e;
  padding: 10px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  transition: background-color 0.3s, transform 0.3s;
}

.route-list-item:hover {
  background-color: #2c2c2c;
  transform: scale(1.02);
}

.route-header {
  display: flex;
  align-items: center;
  gap: 10px;
}

.route-icon {
  font-size: 24px;
  color: #00c853;
}

.route-info {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.route-line {
  font-weight: bold;
  font-size: 18px;
  color: #00c853;
}

.route-time,
.route-platform,
.route-duration {
  font-size: 14px;
  color: #b0b0b0;
}

.route-progress {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.progress-dot {
  width: 10px;
  height: 10px;
  background-color: #00c853;
  border-radius: 50%;
}

.progress-line {
  flex: 1;
  height: 2px;
  background-color: #00c853;
  margin: 0 5px;
}

.route-capacity {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #b0b0b0;
}
a {
  text-decoration: none;
  color: white;
}
h1 {
  color: #00c853;
}

#checklistDiv {
  display: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #2c2c2c;
  padding: 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  height: 25em;
  width: 25em;
  border-radius: 5px;
}

#checklistDiv.show {
  display: block;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.checklist-item {
  margin: 10px 0;
  display: flex;
  align-items: center;
  background-color: #1e1e1e;
  padding: 10px;
  border-radius: 5px;
  transition: background-color 0.3s, transform 0.3s;
}

.checklist-item:hover {
  background-color: #2c2c2c;
  transform: scale(1.02);
}

.checklist-item input[type="checkbox"] {
  margin-right: 10px;
}

.checklist-item label {
  color: #ffffff;
  cursor: pointer;
}

#addToPlayList {
  background-color: rgb(25, 0, 255);
}
</style>
