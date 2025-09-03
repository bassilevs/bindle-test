<script setup lang="ts">
export interface SelectOption<T = string> {
  value: T;
  label: string;
}

defineProps<{
  label?: string;
  options: SelectOption[] | string[];
  modelValue?: string;
}>();

defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();
</script>

<template>
  <div>
    <label v-if="label" class="block text-sm font-medium text-gray-700 mb-2">{{ label }}</label>
    <select
      :value="modelValue"
      @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
      class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 appearance-none"
    >
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>
