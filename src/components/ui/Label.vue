<script setup>

const props = defineProps({
  text:{
    type: String,
  },
  id:{
    type: String,
  }
});
</script>

<template>
  <label :for="id">{{ text }}</label>
</template>

<style scoped>

</style>