<script setup>
import { ref } from 'vue';
import DropDown from './components/ui/DropDown.vue';
import Button from './components/ui/Button.vue';
import Modal from './components/ui/Modal.vue';
import Form from './components/forms/Form.vue';
import CalendarDay from "./components/ui/CalendarDay.vue";
import localStorageService from "./services/localStorageService.js";

const logs = ref(localStorageService.getAllTimeLogs())
const logId = ref("")

if (logs.value.length > 0)
  logId.value = logs.value[0].id;

const modal = ref();
const form = ref();

const setLogs = () =>{
  logs.value = localStorageService.getAllTimeLogs()
  logId.value = logs.value.length > 0 ? logs.value[0].id : "";
}

const modalCloseFormReset = (visible) => {
  if  (visible) {
    form.value.reset();
  }
}

const handleComponentChange = (id) => {
  logId.value = id;
};

const handleDelete = () =>{
  localStorageService.deleteTimeLog(logId.value);
  modal.value.closeModal();
  setLogs()
}

const handleModalError = (error) => {
  if(error)
    return;
  modal.value.closeModal()
};

</script>

<template>
  <CalendarDay :cols="[13,14,15,16,17,18,19]"></CalendarDay>
  <div>
    <DropDown :options="logs" event-name="component-changed" @component-changed="handleComponentChange" />
  </div>
  <div>
    <Modal ref="modal" @shown="(visible) => modalCloseFormReset(visible)" :delete="logs.length >= 1" @delete-button="handleDelete()" :title="'Létrehozás'" :name="'create'">
      <template v-slot:body>
        <Form :id="'createForm'" :data="logId" ref="form" :after-submit="{'modalError': handleModalError}" @submit-refresh="setLogs">
        </Form>
        </template>
      <template v-slot:button>
        <Button :text="'Mentés'" class="btn btn-primary" type="submit" form="createForm"></Button>
      </template>
    </Modal>
  </div>

</template>