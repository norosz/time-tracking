<script setup>
import { toRef } from "vue";

const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  eventName: {
    type: String,
    required: false,
    default: null,
  }
});

const changeableOptions =  toRef(() => props.options)

</script>

<template>
  <select @change="(e => eventName ? $emit(eventName,e.target.value): '')">
    <option v-for="option in changeableOptions" :key="option" :value="option.id">{{ option }}</option>
  </select>
</template>