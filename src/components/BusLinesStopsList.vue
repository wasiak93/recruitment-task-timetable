<script setup lang="ts">
import { StopsListItem } from "@/store";
import { computed, defineProps, defineEmits } from "vue";
import { useStore } from "vuex";
import CardComponent from "./CardComponent.vue";

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits(["update:modelValue"]);

const store = useStore();

const stopsList = computed(
  (): StopsListItem[] => store.getters.getStopsForSelectedLine
);

const selectedStop = computed(
  (): StopsListItem => store.getters.getSelectedStop
);

const selectedLine = computed(
  (): number | null => store.getters.getSelectedLine
);

const sortedStopsList = computed((): StopsListItem[] => {
  if (!stopsList.value.length) return [];
  const sorted = [...stopsList.value].sort((a, b) => {
    const orderA = a.order ?? 0;
    const orderB = b.order ?? 0;
    return props.modelValue ? orderA - orderB : orderB - orderA;
  });
  return sorted;
});

const selectStop = (
  stop: string | undefined,
  order: number | undefined
): void => {
  if (!stop || order === undefined) return;
  store.commit("SET_SELECTED_STOP", { stop, order });
};

const handleClickSort = () => {
  emit("update:modelValue", !props.modelValue);
};
</script>

<template>
  <div class="bg-white rounded py-3" v-if="selectedLine">
    <p class="py-3 px-4 m-0 fw-bold title">Bus Line: {{ selectedLine }}</p>
    <div class="table-responsive">
      <table class="table m-0 table-hover">
        <thead>
          <tr>
            <th scope="col" class="d-flex align-items-center py-3 px-4">
              <span class="fw-normal table-head__text fw-bold">Bus Stops</span>
              <button
                @click="handleClickSort"
                class="stop-list__button btn d-flex align-items-center p-0 px-2"
                type="button"
                data-test="sort-button"
                sr-only="sort stops"
              >
                <img
                  src="/icons/sort.svg"
                  alt="Sort Icon"
                  width="16"
                  height="16"
                  class="d-inline-block"
                  :class="{ 'd-inline-block--rotated': !modelValue }"
                />
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(stop, id) in sortedStopsList" :key="id">
            <td class="p-0">
              <button
                class="list-group-item list-group-item-action py-3 px-4"
                :class="{ active: selectedStop.stop === stop.stop }"
                @click="selectStop(stop.stop, stop.order)"
                data-test="stop-button"
              >
                {{ stop.stop ?? "" }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <CardComponent v-else>Please select the bus line first</CardComponent>
</template>

<style scoped lang="scss">
.active {
  color: #1952e1 !important;
}
.title {
  font-size: 14px;
  color: #1a1a1a;
}

.table {
  font-size: 12px;
  --bs-table-color: #33373c;
}

.d-inline-block {
  transition: rotate 0.2s ease;
  &--rotated {
    rotate: 180deg;
  }
}
</style>
