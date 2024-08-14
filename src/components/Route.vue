<template>
  <div class="background"></div>
  <div class="route-list-item" draggable="true" @dragstart="onDragStart">
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
    <slot />
    <button @click="showDialog">...</button>

    <dialog ref="favDialog" class="favDialog">
      <form @submit.prevent="confirmDialog">
        <select class="route-select" v-model="selectedRoute">
          <option value="default">Select a route</option>
          <option
            v-for="route in createList.routePlayList"
            :key="route.id"
            :value="route.name"
          >
            {{ route.name }}
          </option>
        </select>
        <div>
          <button @click="closeDialog" formmethod="dialog">Cancel</button>
          <button type="submit">Confirm</button>
        </div>
      </form>
    </dialog>
  </div>
</template>
<!-- Alls nächstes mit idxList versuchen auf die ID von der RouteList zuzugreifen um dann mit dieser ID die ausgewählte route in eine liste zu speichern am besten mit einer addToFavorites method -->

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoutePlayListStore } from "../stores/CreateList";

const props = defineProps<{
  stationName: string;
  platForm: string;
  departure: string;
  arrival: string;
}>();

const createList = useRoutePlayListStore();
const selectedRoute = ref<string>("default");
const favDialog = ref<HTMLDialogElement | null>(null);
const outputMessage = ref<string>("");

const showDialog = () => {
  if (favDialog.value) {
    favDialog.value.showModal();
  }
};

const closeDialog = () => {
  if (favDialog.value) {
    favDialog.value.close();
  }
};

const confirmDialog = () => {
  if (favDialog.value && selectedRoute.value !== "default") {
    // Create a route object with the current route details
    const route = {
      stationName: props.stationName,
      platForm: props.platForm,
      departure: props.departure,
      arrival: props.arrival,
    };

    // Add the route to the selected list
    createList.addRouteToList(selectedRoute.value, route);

    // Close the dialog
    favDialog.value.close(selectedRoute.value);

    // Optional: Reset the selected route
    selectedRoute.value = "default";
  }
};
onMounted(() => {
  if (favDialog.value) {
    favDialog.value.addEventListener("close", () => {
      outputMessage.value =
        favDialog.value?.returnValue === "default"
          ? "No return value."
          : `ReturnValue: ${favDialog.value?.returnValue}.`;
    });
  }
});
const popupTriggers = ref<{
  buttonTrigger: boolean;
  timedTrigger: boolean;
}>({
  buttonTrigger: false,
  timedTrigger: false,
});

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

const emit = defineEmits(["dragStart"]);

const onDragStart = (event: DragEvent) => {
  if (event.dataTransfer) {
    event.dataTransfer.setData(
      "text/plain",
      JSON.stringify({
        stationName: props.stationName,
        platForm: props.platForm,
        departure: props.departure,
        arrival: props.arrival,
      })
    );
  }
  emit("dragStart");
};
</script>

<style scoped>
.route-list-item {
  cursor: move;
}</style>
