<script setup>
import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';
import {onMounted, ref, toRef } from "vue";
import isNumeric from "../../utils/utils.js";
import localStorageService from "../../services/localStorageService.js";
import Input from "../ui/Input.vue";
import Label from "../ui/Label.vue";


const fromId = uuid();
const toId = uuid();
const dateId = uuid();
const descriptionId = uuid();
const tagId = uuid();

const form = ref({
    from:{
      data: "",
      error: "",
    },
    to: {
      data: "",
      error: "",
    },
    date: {
      data: "",
      error: "",
    },
    description: {
      data: "",
      error: "",
    },
    tag: {
      data: "",
      error: "",
  }
});

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  data:{
    type: String,
    required: false,
    default: [],
  },
  afterSubmit:{
    type: Object,
    required: false,
  }
});

const emit = defineEmits(['submit-refresh'])

let logId =  toRef(() => props.data)

function getData(id){
  return localStorageService.getTimeLog(id);
}

function validateTime(time){
  const timeRegex = /^([0-1]\d|2[0-3]):([0-5]\d)$/;
  return timeRegex.test(time);
}

function validate() {
  let valid = true;
  if(form.value.from.data.length < 1){
    form.value.from.error = "Kötelező mező";
    valid = false;
  }
  if(form.value.from.data.length > 5){
    form.value.from.error = "Túl sok karakter";
    valid = false;
  }
  if(!validateTime(form.value.from.data)){
    form.value.from.error = "Nem megfelelő érték";
    valid = false;
  }
  if(form.value.to.data.length < 1){
    form.value.to.error = "Kötelező mező";
    valid = false;
  }
  if(form.value.to.data.length > 5){
    form.value.to.error = "Túl sok karakter";
    valid = false;
  }
  if(!validateTime(form.value.to.data)){
    form.value.to.error = "Nem megfelelő érték";
    valid = false;
  }
  if(form.value.date.data.length < 1){
    form.value.date.error = "Kötelező mező";
    valid = false;
  }
  if(form.value.date.data < Date.now()){
    form.value.date.error = "A dátum nem lehet kisebb a mai napnál";
    valid = false;
  }
  if(form.value.description.data.length < 1){
    form.value.description.error = "Kötelező mező";
    valid = false;
  }
  if(form.value.tag.data.length < 1){
    form.value.tag.error = "Kötelező mező";
    valid = false;
  }
  return valid;
}

const reset = () => {
  if(!logId.value){
    form.value.from.data = "";
    form.value.from.error = "";
    form.value.to.data = "";
    form.value.to.error = "";
    form.value.date.data = format(Date.now(),"yyyy-MM-dd");
    form.value.date.error = "";
    form.value.description.data = "";
    form.value.description.error = "";
    form.value.tag.data = "";
    form.value.tag.error = "";
    return;
  }

  let timeLog = getData(logId.value)
  form.value.from.data = timeLog.timeFrom;
  form.value.from.error = "";
  form.value.to.data = timeLog.timeTo;
  form.value.to.error = "";
  form.value.date.data = timeLog.date;
  form.value.date.error = "";
  form.value.description.data = timeLog.description;
  form.value.description.error = "";
  form.value.tag.data = timeLog.tag;
  form.value.tag.error = "";
}

const checkData = (e) => {
  if (e.key === "Backspace"){
    e.target.value = e.target.value.slice(0, -1)
    return;
  }

  if(e.target.value.length === 2){
    e.target.value=`${e.target.value}:`;
  }
  if (!isNumeric(e.key) || e.target.value.length === 5){
    e.preventDefault();
    e.stopPropagation();
  }
}

const submit = () => {
  if(!validate())
  {
    props.afterSubmit['modalError'](true)
    return;
  }
  props.afterSubmit['modalError'](false)
  if(logId.value){
    localStorageService.updateTimeLog({"id":logId.value,"date": format(form.value.date.data,"yyyy-MM-dd"),
      "timeFrom": form.value.from.data,
      "timeTo": form.value.to.data,
      "description": form.value.description.data,
      "tag": form.value.tag.data,
    })
  }
  else{
    localStorageService.setTimeLog({"date": format(form.value.date.data,"yyyy-MM-dd"),
      "timeFrom": form.value.from.data,
      "timeTo": form.value.to.data,
      "description": form.value.description.data,
      "tag": form.value.tag.data,
    })
  }
  reset()
  emit('submit-refresh')
}
defineExpose({
  reset,
})

onMounted(()=>{
  if(!logId.value)
    return;
  console.log(logId.value)
  let timeLog = getData(logId.value)
  form.value.from.data = timeLog.timeFrom;
  form.value.to.data = timeLog.timeTo;
  form.value.date.data = timeLog.date;
  form.value.description.data = timeLog.description;
  form.value.tag.data = timeLog.tag;
})

</script>

<template>
  <form @submit.prevent="submit" :id="id">
    <div class="row">
      <div class="col">
        <Label :for="fromId" :text="'Kezdési idő'"></Label>
      </div>
      <div class="col">
        <Input v-on:keydown="checkData" v-model="form.from" type="text" :id="fromId"></Input>
      </div>
      <div class="col">
        <Label :for="toId" :text="'Befejezési idő'"></Label>
      </div>
      <div class="col">
        <Input v-on:keydown="checkData" v-model="form.to" type="text" :id="toId"></Input>
      </div>
    </div>
    <div class="col">
      <Label :for="dateId" :text="'Dátum'"></Label>
    </div>
    <div>
      <Input v-model="form.date" type="date" :id="dateId"></Input>
    </div>
    <span id="startDateSelected"></span>
    <div class="col">
      <Label :for="descriptionId" :text="'Megjegyzés'"></Label>
    </div>
    <div class="col">
      <Input  v-model="form.description" :type="'textarea'" :id="descriptionId"></Input>
    </div>
    <div class="col">
      <Label :for="tagId" :text="'Címke'"></Label>
    </div>
    <div class="col">
      <Input  v-model="form.tag" type="text" :id="tagId"></Input>
    </div>
  </form>
</template>

<style scoped>

</style>