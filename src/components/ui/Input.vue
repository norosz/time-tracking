<script setup>
import { v4 as uuid } from 'uuid';

let model =defineModel()
const props = defineProps({

  id:{
    type: String,
    default: uuid()
  },
  error:{
    type: String,
    default: "",
  }
});

</script>

<template >
  <input v-if="$attrs.type !== 'textarea'"
         v-model="model.data"
         v-bind="$attrs"
         :class="[model.error ? 'border-danger form-control' : 'form-control']"
         :id="id"
         :type="$attrs.type"
         :name="$attrs.name" />
  <textarea v-else
            v-model="model.data"
            v-bind="$attrs"
            :class="[model.error ? 'border-danger form-control' : 'form-control']"
            :id="id"
            :name="$attrs.name"
            rows="7"
            cols="33"/>
  <span class="text-danger" v-if="model.error">{{ model.error }}</span>
</template>
<style scoped>
textarea {
  resize: none;
}
input[type='date']::-webkit-calendar-picker-indicator {
  background: transparent;
  bottom: 0;
  color: transparent;
  height: 1rem;
  cursor: pointer;
  left: 0;
  position: relative;
  right: 0;
  top: 0;
  width: 80%;
}
</style>

