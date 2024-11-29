<script setup lang="ts">
import { ref, defineEmits, defineProps } from "vue";

defineProps<{
  modelValue: string;
}>();

const isFocused = ref(false);

defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();
</script>

<template>
  <div class="input-group search mx-2" :class="{ 'search--border': isFocused }">
    <input
      type="text"
      class="form-control px-3 py-2 search__input"
      :class="{ 'search__input--not-border': !isFocused }"
      :value="modelValue"
      placeholder="Search..."
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
      @focus="isFocused = true"
      @blur="isFocused = false"
      data-test="filter-input"
    />
    <span v-if="isFocused" class="search__input-absolute-element px-1"
      >Search</span
    >
    <span class="input-group-text bg-white" v-if="!isFocused">
      <img
        src="/icons/search.svg"
        alt="Search Icon"
        width="16"
        height="16"
        class="d-inline-block"
        data-test="search-img"
      />
    </span>
  </div>
</template>

<style scoped lang="scss">
.form-control:focus {
  outline: none;
  border-color: #007bff;
}

.search {
  width: 288px;
  &__input {
    font-size: 12px;
    color: #1a1a1a;

    &-absolute-element {
      position: absolute;
      z-index: 999;
      top: 0;
      left: 14px;
      font-size: 10px;
      transform: translateY(-50%);
      background-color: white;
      color: #63666e;
    }

    &--not-border {
      border-right: none;
    }
  }

  &--border {
    &.input-group:not(.has-validation)
      > :not(:last-child):not(.dropdown-toggle):not(.dropdown-menu):not(.form-floating) {
      border-top-right-radius: 0.375rem;
      border-bottom-right-radius: 0.375rem;
    }
  }
}
</style>
