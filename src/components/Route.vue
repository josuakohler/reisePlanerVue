<template>
  <div class="route-list-item">
    <div class="route-header">
      <div class="route-icon">🚆</div>
      <div class="route-info">
        <div class="route-line">Richtung {{ stationName }}</div>
        <div class="route-time"></div>
        <div class="route-platform">Gl. {{ platForm }}</div>
        <div class="route-duration">
          {{ calculateDuration(departure, arrival) }}
        </div>
      </div>
    </div>
    <div class="route-progress">
      <div class="progress-dot"></div>
      <div class="progress-line"></div>
      <div class="progress-dot"></div>
    </div>
    <div class="route-capacity">
      <span>{{ formatTime(departure) }}</span>
      <span>{{ formatTime(arrival) }}</span>
    </div>
    <!-- Add to routelist -->
    <button>Add to Routelist</button>
  </div>
</template>

<script lang="ts">
export default {
  name: "RouteComp",
  props: {
    stationName: {
      type: String,
      required: true,
    },
    platForm: {
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
  },

  data() {
    return {};
  },

  methods: {
    calculateDuration(departure: string, arrival: string): string {
      const dep = new Date(departure);
      const arr = new Date(arrival);
      const diff = (arr.getTime() - dep.getTime()) / 60000; // difference in minutes
      return `${diff} min`;
    },
    formatTime(dateTime: string): string {
      const date = new Date(dateTime);
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    },
  },
};
</script>

<style>
body {
  font-family: Arial, sans-serif;
  background-color: #121212;
  color: #ffffff;
  margin: 0;
  padding: 20px;
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
</style>
