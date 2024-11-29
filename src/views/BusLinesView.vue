<script setup lang="ts">
import { onUnmounted, ref } from "vue";
import BusLinesList from "@/components/BusLinesList.vue";
import BusLinesStopsList from "@/components/BusLinesStopsList.vue";
import BusLinesTimeSchedule from "@/components/BusLinesTimeSchedule.vue";
import { useStore } from "vuex";

const store = useStore();

const isSortedAsc = ref(true);

const changeIsSortedAsc = () => {
  isSortedAsc.value = true;
};

onUnmounted(() => {
  store.commit("SET_RESET_STOP");
  store.commit("SET_RESET_LINE");
});
</script>

<template>
  <div class="container d-flex flex-column flex-grow-1">
    <div class="row">
      <div class="col-md-12 p-0">
        <BusLinesList @selected-line="changeIsSortedAsc" />
      </div>
    </div>
    <div class="row flex-grow-1">
      <div class="col-md-6 mt-3 p-0 pe-md-2">
        <BusLinesStopsList v-model="isSortedAsc" />
      </div>
      <div class="col-md-6 mt-3 p-0 ps-md-2">
        <BusLinesTimeSchedule />
      </div>
    </div>
  </div>
</template>
