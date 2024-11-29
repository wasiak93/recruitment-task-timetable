<script setup lang="ts">
import { StopsListItem } from "@/store";
import { computed } from "vue";
import { useStore } from "vuex";
import CardComponent from "./CardComponent.vue";

const store = useStore();

const times = computed(
  (): string[] => store.getters.getTimesForSelectedLineAndStop
);

const selectedStop = computed(
  (): StopsListItem => store.getters.getSelectedStop
);

const selectedLine = computed(
  (): number | null => store.getters.getSelectedLine
);
</script>

<template>
  <div
    v-if="selectedLine && Object.keys(selectedStop).length !== 0"
    class="bg-white rounded py-3"
  >
    <p class="py-3 px-4 m-0 fw-bold title" data-test="selected-stop-name">
      Bus Stop: {{ selectedStop.stop }}
    </p>
    <div class="table-responsive">
      <table class="table m-0">
        <thead>
          <tr>
            <th scope="col" class="d-flex align-items-center py-3 px-4">
              <span class="fw-normal table-head__text fw-bold">Bus Stops</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(time, index) in times" :key="index">
            <td class="py-3 px-4" data-test="times">
              {{ time }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <CardComponent v-else>{{
    !selectedLine
      ? "Please select the bus line first"
      : "Please select the bus stop first"
  }}</CardComponent>
</template>
<style scoped lang="scss">
.title {
  font-size: 14px;
  color: #1a1a1a;
}

.table {
  font-size: 12px;
  --bs-table-color: #33373c;
}
</style>
