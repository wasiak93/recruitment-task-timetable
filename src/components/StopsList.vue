<script setup lang="ts">
import { computed, ref, defineProps } from "vue";
import { useStore } from "vuex";
import { StopsListItem } from "@/store";

const props = defineProps<{
  searchQuery: string;
}>();

const store = useStore();

const isSortedAsc = ref(true);

const stops = computed(() => store.getters.getAllStops);

const filteredAndSortedStops = computed((): StopsListItem[] => {
  if (!stops.value.length) return [];

  const filteredStops: StopsListItem[] = stops.value.filter(
    (stop: StopsListItem) =>
      stop.stop?.toLowerCase().includes(props.searchQuery.toLowerCase())
  );

  const sortedStops: StopsListItem[] = [...filteredStops].sort((a, b) => {
    if (a.stop && b.stop) {
      const stopComparison = a.stop.localeCompare(b.stop);
      if (stopComparison !== 0) {
        return isSortedAsc.value ? stopComparison : -stopComparison;
      }
    }
    const orderA = a.order ?? 0;
    const orderB = b.order ?? 0;
    return isSortedAsc.value ? orderA - orderB : orderB - orderA;
  });
  return sortedStops;
});

const handleClickSort = (): void => {
  isSortedAsc.value = !isSortedAsc.value;
};
</script>

<template>
  <div class="table-responsive mt-2">
    <table class="table">
      <thead>
        <tr>
          <th
            scope="col"
            class="d-flex align-items-center p-3 px-4"
            data-test="header-cell"
          >
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
                :class="{ 'd-inline-block--rotated': !isSortedAsc }"
              />
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(stop, index) in filteredAndSortedStops"
          :key="index"
          data-test="row-cell-with-stop"
        >
          <td class="p-3 px-4">{{ stop.stop ?? "" }}</td>
        </tr>
        <tr v-if="!filteredAndSortedStops.length">
          <td
            colspan="1"
            class="text-center text-muted"
            data-test="row-cell-no-stops"
          >
            No stops found.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style scoped lang="scss">
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
