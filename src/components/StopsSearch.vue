<script setup lang="ts">
import { defineEmits, defineProps } from "vue";

defineProps<{
  modelValue: string;
}>();

defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();
</script>

<template>
  <div class="input-group search mx-2">
    <div class="form-group">
      <input
        type="text"
        id="name rounded"
        placeholder="Name"
        class="px-3 py-2"
        :value="modelValue"
        @input="
          $emit('update:modelValue', ($event.target as HTMLInputElement).value)
        "
        data-test="filter-input"
      />
      <label for="name">Search</label>
    </div>
  </div>
</template>

<style scoped lang="scss">
.form-group {
  --pad: 0.5rem;
  --pad-left: 1rem;
  position: relative;

  input {
    border-radius: 5px;
    border: 1px solid #e2e4ea;
    font-size: 12px;
    line-height: 22px;
    color: #1a1a1a;
    width: 288px;
    background-image: url("../../public/icons/search.svg");
    background-repeat: no-repeat;
    background-position: right 2% top 50%;

    &::placeholder {
      opacity: 0;
    }

    &:focus,
    &:not(:placeholder-shown) {
      background-image: none;

      & + label {
        top: 0;
        transform: translateY(-50%) scale(0.8);
        font-size: 10px;
        background-color: white;
      }
    }

    &:focus-visible {
      outline-color: #007bff;
    }
  }

  label {
    position: absolute;
    left: var(--pad-left);
    top: 50%;
    padding: 2px;
    transform: translateY(-50%);
    pointer-events: none;
    font-size: 12px;
    color: #63666e;
  }
}
</style>
