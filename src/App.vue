<script setup lang="ts">
import BaseHeader from "./components/BaseHeader.vue";
import { onMounted } from "vue";
import NavBar from "./components/NavBar.vue";
import { useStore } from "vuex";

const store = useStore();

onMounted(() => {
  store.dispatch("fetchDataList");
});
</script>

<template>
  <div class="container p-4 py-5 min-vh-100 d-flex flex-column">
    <BaseHeader />
    <NavBar />
    <router-view />
  </div>
</template>
