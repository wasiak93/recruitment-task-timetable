<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed, watch } from "vue";
import { useStore } from "vuex";

const store = useStore();

const selectedLine = computed(
  (): number | null => store.getters.getSelectedLine
);

const cardRef = ref<HTMLDivElement | null>(null);
const updateMaxHeight = () => {
  if (cardRef.value) {
    const rect = cardRef.value.getBoundingClientRect();
    const top = rect.top;
    const maxHeight = `calc(100vh - ${top}px  - 2px)`;
    cardRef.value.style.maxHeight = maxHeight;
  }
};

watch(selectedLine, () => {
  updateMaxHeight();
});

onMounted(() => {
  updateMaxHeight();

  window.addEventListener("resize", updateMaxHeight);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateMaxHeight);
});
</script>
<template>
  <div
    ref="cardRef"
    class="card text-center d-flex justify-content-center h-100"
  >
    <p class="text-muted fs-6 m-0"><slot></slot></p>
  </div>
</template>
<style scoped>
.card {
  overflow: auto;
  border: none;
  background-image: repeating-linear-gradient(
      171deg,
      #9a9da4,
      #9a9da4 30px,
      transparent 30px,
      transparent 44px,
      #9a9da4 44px
    ),
    repeating-linear-gradient(
      261deg,
      #9a9da4,
      #9a9da4 30px,
      transparent 30px,
      transparent 44px,
      #9a9da4 44px
    ),
    repeating-linear-gradient(
      -9deg,
      #9a9da4,
      #9a9da4 30px,
      transparent 30px,
      transparent 44px,
      #9a9da4 44px
    ),
    repeating-linear-gradient(
      81deg,
      #9a9da4,
      #9a9da4 30px,
      transparent 30px,
      transparent 44px,
      #9a9da4 44px
    );
  background-size: 2px 100%, 100% 2px, 2px 100%, 100% 2px;
  background-position: 0 0, 0 0, 100% 0, 0 100%;
  background-repeat: no-repeat;
}
</style>
