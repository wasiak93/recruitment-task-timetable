<script setup lang="ts">
import { ref } from "vue";
import StopsSearch from "@/components/StopsSearch.vue";
import StopsList from "@/components/StopsList.vue";

const searchQuery = ref("");
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12 bg-white mt-3 pt-2 px-0 rounded">
        <StopsSearch v-model="searchQuery" />

        <StopsList :search-query="searchQuery" />
      </div>
    </div>
  </div>
</template>
