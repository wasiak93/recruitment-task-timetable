<script setup lang="ts">
import { computed, defineEmits } from "vue";
import { useStore } from "vuex";

const store = useStore();

const busLines = computed((): number[] => store.getters.getLinesList);

const selectedLine = computed(
  (): number | null => store.getters.getSelectedLine
);

const selectLine = (line: number): void => {
  emit("selected-line");
  store.commit("SET_SELECTED_LINE", line);
  store.commit("SET_SELECTED_STOP", line);
};

const emit = defineEmits(["selected-line"]);
</script>

<template>
  <div class="bg-white mt-3 py-3 px-4" v-if="busLines.length">
    <p class="pt-2 pb-4 mb-2 fw-bold title">Select Bus Line</p>
    <div class="d-flex flex-wrap justify-content-start">
      <button
        v-for="line in busLines"
        :key="line"
        class="btn btn-primary my-1 me-1"
        :class="{ 'btn-dark': selectedLine === line }"
        @click="selectLine(line)"
      >
        {{ line }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.title {
  font-size: 14px;
  color: #1a1a1a;
}

button {
  min-width: 50px;
}
.btn-primary {
  --bs-btn-bg: #1952e1;
}
.btn-dark {
  --bs-btn-bg: #2e3e6e;
}
</style>
