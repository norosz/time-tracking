<script setup>
import { Modal } from 'bootstrap';
import { onMounted, ref} from "vue";

const props = defineProps({
  type: {
    type: String,
    required: false,
    default: 'button',
  },
  name:{
    type: String,
    required: true,
  },
  title:{
    type: String,
  },
  delete:{
    type: Boolean,
    default: false,
  }
});

const emit = defineEmits(['shown', 'deleteButton']);

const error = ref(false)
let isShown = ref(false)

const name = props.name;
const title = props.title;
let modalElement = undefined;
let modal = undefined;

const closeModal = () => {
  if(error.value)
    return
  modal.hide();
}

const showModal = () => {
  isShown.value = true
  emit('shown', true)
  modal.show();
}

defineExpose({
  closeModal,
  showModal,
})


onMounted( () =>{
  modalElement = document.getElementById(`${name}Modal`);
  modal = new Modal(modalElement, {backdrop: true});

  modalElement.addEventListener('hidden.bs.modal', () => {
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) backdrop.remove();
    if (isShown.value){
      isShown.value = false
      emit('shown', false)
    }
  });
})

</script>

<template>
  <div>
    <button type="button" class="btn btn-primary" @click="showModal">
      Létrehozás
    </button>
  </div>
  <div class="modal fade" :id="`${name}Modal`" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="false">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">{{ title }}</h1>
          <div class="gridContainer">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
        <div class="modal-footer">
             <div v-if="props.delete" class="deleteContainer">
               <button type="button" @click="$emit('deleteButton')">
                 <svg fill="#ff0000" height="24px" width="24px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 330 330" xml:space="preserve" stroke="#ff0000">
                   <g id="SVGRepo_bgCarrier" stroke-width="0"/><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
                    <g id="SVGRepo_iconCarrier">
                      <g id="XMLID_6_">
                       <g id="XMLID_11_">
                        <path d="M240,121.076H30V275c0,8.284,6.716,15,15,15h60h37.596c19.246,24.348,49.031,40,82.404,40c57.897,0,105-47.103,105-105 C330,172.195,290.816,128.377,240,121.076z M225,300c-41.355,0-75-33.645-75-75s33.645-75,75-75s75,33.645,75,75 S266.355,300,225,300z"/>
                       </g> <g id="XMLID_18_"> <path d="M240,90h15c8.284,0,15-6.716,15-15s-6.716-15-15-15h-30h-15V15c0-8.284-6.716-15-15-15H75c-8.284,0-15,6.716-15,15v45H45 H15C6.716,60,0,66.716,0,75s6.716,15,15,15h15H240z M90,30h90v30h-15h-60H90V30z"/></g><g id="XMLID_23_"><path d="M256.819,193.181c-5.857-5.858-15.355-5.858-21.213,0L225,203.787l-10.606-10.606c-5.857-5.858-15.355-5.858-21.213,0 c-5.858,5.858-5.858,15.355,0,21.213L203.787,225l-10.606,10.606c-5.858,5.858-5.858,15.355,0,21.213 c2.929,2.929,6.768,4.394,10.606,4.394c3.839,0,7.678-1.465,10.607-4.394L225,246.213l10.606,10.606 c2.929,2.929,6.768,4.394,10.607,4.394c3.839,0,7.678-1.465,10.606-4.394c5.858-5.858,5.858-15.355,0-21.213L246.213,225 l10.606-10.606C262.678,208.535,262.678,199.039,256.819,193.181z"/>
                      </g>
                    </g>
                   </g>
                 </svg>
               </button>
             </div>
            <div class>
              <button type="button" class="btn btn-secondary me-3" data-bs-dismiss="modal">Mégse</button>
              <slot name="button"></slot>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gridContainer{
  display: grid;
  width: 100%;
}
.btn-close{
  align-self: end;
}
.modal-footer{
  justify-content: space-between;
}

</style>
