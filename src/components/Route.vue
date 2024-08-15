<template>
  <div class="background"></div>
  <div class="route-list-item" draggable="true" @dragstart="onDragStart">
    <div class="route-header">
      <div class="route-icon">🚆</div>
      <div class="route-info">
        <div class="route-line">
          {{ fromStationName }} &#10144; {{ stationName }}
        </div>
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
    <button @click="showStopsDialog">...</button>

    <dialog ref="stopsDialog" class="large-dialog">
      <div class="view-stop">
        <h2>Intermediate Stops</h2>
        <div>
          <ul class="stop-list">
            <li
              v-for="(stop, index) in fetchRoutes.intermediateStops"
              :key="index"
              class="stop-item"
            >
              <div class="stop-name">{{ stop.station.name }}</div>
              <div class="stop-times">
                <span class="arrival"
                  >Arrival: {{ formatTime(stop.arrival) }}</span
                >
                <span class="departure"
                  >Departure: {{ formatTime(stop.departure) }}</span
                >
              </div>
              <div class="stop-details">
                <span class="platform">Platform: {{ stop.platform }}</span>
                <span class="delay" v-if="stop.delay"
                  >Delay: {{ stop.delay }} min</span
                >
              </div>
            </li>
          </ul>
        </div>
      </div>

      <button @click="closeStopsDialog">Close</button>
    </dialog>

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
import RouteSearch from "./RouteSearch.vue";
import { defineAsyncComponent } from "vue";
import { useFetchRoutes } from "../stores/fetchRoutes";
console.log(RouteSearch.fromInput);
const fetchRoutes = useFetchRoutes();
const props = defineProps<{
  fromStationName: string;
  stationName: string;
  platForm: string;
  departure: string;
  arrival: string;
  connectionId: string;
}>();

const stopsDialog = ref<HTMLDialogElement | null>(null);
const showStopsDialog = () => {
  if (stopsDialog.value) {
    confirmDialog();
    stopsDialog.value.showModal();
  }
};

const closeStopsDialog = () => {
  if (stopsDialog.value) {
    stopsDialog.value.close();
  }
};

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
  // Create a route object with the current route details
  const route = {
    fromStationName: props.fromStationName,
    stationName: props.stationName,
    platForm: props.platForm,
    departure: props.departure,
    arrival: props.arrival,
  };

  // Add the route to the selected list
  fetchRoutes.fetchIntermediateStops(
    route.fromStationName,
    route.stationName,
    route.departure
  );

  console.log("departure:" + route.departure);
};
onMounted(() => {
  fetchRoutes.fetchIntermediateStops(
    props.fromStationName,
    props.stationName,
    props.departure
  );
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
        fromStationName: props.fromStationName,
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
}
.large-dialog {
  color: white;
  width: 80%;
  max-width: 600px;
  height: 80%;
  max-height: 800px;
}

.view-stop {
  padding: 20px;
}

.stop-list {
  list-style-type: none;
  padding: 0;
}

.stop-item {
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
}

.stop-name {
  font-weight: bold;
  font-size: 1.1em;
}

.stop-times,
.stop-details {
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
}

.delay {
  color: red;
}
</style>
