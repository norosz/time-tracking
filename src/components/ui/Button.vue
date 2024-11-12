<script setup>
const props = defineProps({
  text:{
   type: String,
  },
  eventName:{
    type: String,
    required: false,
    default: null,
  },
  form:{
    type: String,
    required: false,
  }
});

</script>

<template>
    <button :class="[$attrs.class]" :type="$attrs.type"  @click="(e)=>eventName ? $emit(eventName) : ''" :form="form">{{ text }}</button>
</template>
