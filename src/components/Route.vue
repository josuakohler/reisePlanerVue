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
    <button @click="() => TogglePopup('buttonTrigger')">...</button>

    <add-to-list-comp
      v-if="popupTriggers.buttonTrigger"
      :TogglePopup="() => TogglePopup('buttonTrigger')"
    >
      <select v-model="selectedRoute">
        <option disabled value="">Select a route</option>
        <option
          v-for="route in createList.routePlayList"
          :key="route.id"
          :value="route.name"
        >
          {{ route.name }}
        </option>
      </select>
    </add-to-list-comp>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoutePlayListStore } from "../stores/CreateList";
import { computed } from "vue";
const selectedRoute = ref<string>("");

const props = defineProps<{
  stationName: string;
  platForm: string;
  departure: string;
  arrival: string;
}>();

const createList = useRoutePlayListStore();

const popupTriggers = ref<{
  buttonTrigger: boolean;
  timedTrigger: boolean;
}>({
  buttonTrigger: false,
  timedTrigger: false,
});

const TogglePopup = (trigger: "buttonTrigger" | "timedTrigger") => {
  popupTriggers.value[trigger] = !popupTriggers.value[trigger];
};

setTimeout(() => {
  popupTriggers.value.timedTrigger = true;
}, 3000);

const calculateDuration = (departure: string, arrival: string): string => {
  const dep = new Date(departure);
  const arr = new Date(arrival);
  const diff = (arr.getTime() - dep.getTime()) / 60000; // difference in minutes
  return `${diff} min`;
};

const formatTime = (dateTime: string): string => {
  const date = new Date(dateTime);
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};
</script>

<style scoped>
/* Add your styles here */
</style>
